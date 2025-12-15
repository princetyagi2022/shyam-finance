const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

// --- DATABASE CONNECTION (TiDB Cloud - Hardcoded) ---
const pool = mysql.createPool({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    user: '2N2XPmtXUt8R46U.root',
    password: 'KrWG2tb4aSoSYouN',
    database: 'test',
    port: 4000,
    ssl: {
        rejectUnauthorized: true
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const JWT_SECRET = 'shyam_fin_secret_key';

// --- ROUTES ---

// 1. REGISTER
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await pool.query(
            'INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)',
            [username, email, phone, hashedPassword]
        );
        res.json({ success: true, message: 'User registered!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. LOGIN
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check User
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(400).json({ error: 'User not found' });
        
        const user = users[0];

        // Check Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        // Generate Token
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);

        // Send back token AND user info
        res.json({ 
            success: true, 
            token, 
            user: { id: user.id, username: user.username, email: user.email, phone: user.phone, role: user.role } 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/// 3. APPLY FOR LOAN (Updated for new schema)
app.post('/api/apply-loan', async (req, res) => {
    // We now accept loanType and tenure from the frontend
    const { userId, amount, loanType, tenure } = req.body; 
    try {
        await pool.query(
            'INSERT INTO loan_applications (user_id, loan_amount, loan_type, tenure_months) VALUES (?, ?, ?, ?)', 
            [userId, amount, loanType || 'Personal Loan', tenure || 12]
        );
        res.json({ success: true, message: 'Loan application submitted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. GET USER DATA
app.get('/api/user-data/:id', async (req, res) => {
    try {
        const [loans] = await pool.query('SELECT * FROM loan_applications WHERE user_id = ?', [req.params.id]);
        res.json({ loans });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. ADMIN: GET ALL DATA
app.get('/api/admin/data', async (req, res) => {
    try {
        const [users] = await pool.query('SELECT id, username, email, phone, role FROM users');
        
        const [loans] = await pool.query(`
            SELECT l.id, l.loan_amount, l.status, l.application_date, u.username, u.email, u.phone 
            FROM loan_applications l 
            JOIN users u ON l.user_id = u.id
            ORDER BY l.application_date DESC
        `);
        
        res.json({ users, loans });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. ADMIN: UPDATE STATUS
app.post('/api/admin/update-status', async (req, res) => {
    try {
        const { applicationId, newStatus } = req.body;
        await pool.query(
            "UPDATE loan_applications SET status = ? WHERE id = ?", 
            [newStatus, applicationId]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 7. USER: UPDATE PROFILE
app.put('/api/user/update', async (req, res) => {
    try {
        const { userId, email, phone } = req.body;
        await pool.query(
            'UPDATE users SET email = ?, phone = ? WHERE id = ?', 
            [email, phone, userId]
        );
        res.json({ success: true, message: 'Profile updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// --- START SERVER ---
app.listen(3001, () => {
    console.log('--------------------------------------------------');
    console.log('✅ Shyam Fin Backend Running on Port 3001');
    console.log('✅ Connected to TiDB Cloud Database');
    console.log('--------------------------------------------------');
});