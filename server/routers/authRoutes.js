const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- USER REGISTRATION ---
// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, phone, email, password } = req.body;
    
    // 1. Check if user already exists
    const [existing] = await pool.query("SELECT email FROM users WHERE email = ? OR username = ?", [email, username]);
    if (existing.length > 0) {
      return res.status(400).json({ error: "Username or email already exists." });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Save user to database
    const query = "INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)";
    const [result] = await pool.query(query, [username, email, phone, hashedPassword]);

    res.status(201).json({ success: true, userId: result.insertId });

  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- USER LOGIN ---
// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find the user
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      return res.status(400).json({ error: "Invalid credentials." });
    }
    const user = users[0];

    // 2. Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    // 3. Create a JWT Token
    // We'll also add an 'isAdmin' role. Let's say user ID 1 is the admin.
    const isAdmin = user.id === 1; // DEMO: Make user 1 the admin
    
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        isAdmin: isAdmin
      }
    };

    const token = jwt.sign(payload, "your_jwt_secret_key", { expiresIn: '3h' }); 
    // ^^^ REPLACE with a real secret key in your .env file

    res.json({ token, isAdmin });

  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;