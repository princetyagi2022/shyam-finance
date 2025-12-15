const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function createAdmin() {
    try {
        // Direct Connection Details (No .env needed)
        const connection = await mysql.createConnection({
            host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
            user: '2N2XPmtXUt8R46U.root',
            password: 'KrWG2tb4aSoSYouN',
            database: 'test',
            port: 4000,
            ssl: { rejectUnauthorized: true }
        });

        console.log("Connected to database...");

        // Your Admin Details
        const email = 'princetyagi9997@gmail.com';
        const phone = '8218485967';
        const plainPassword = 'prince@#$01';
        
        // Encrypt the password
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        // Insert Admin User
        // First, delete any existing user with this email to prevent errors
        await connection.execute('DELETE FROM users WHERE email = ?', [email]);

        await connection.execute(
            `INSERT INTO users (username, email, phone, password, role) VALUES (?, ?, ?, ?, ?)`,
            ['Prince Admin', email, phone, hashedPassword, 'admin']
        );

        console.log("✅ Admin User Created Successfully!");
        console.log("🔑 Email: " + email);

        await connection.end();
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

createAdmin();