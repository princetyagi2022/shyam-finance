import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/Button';
import './ApplyLoanPage.css'; 
import './AuthPages.css';      

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); 
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); 

        try {
            // 1. Send login request
            const res = await axios.post('http://localhost:3001/api/login', { email, password });
            
            // 2. Update global state
            login(res.data.user, res.data.token);
            
            alert('Login Successful!');

            // 3. Redirect based on Role
            if (res.data.user.role === 'admin') {
                console.log("Redirecting to Admin Dashboard...");
                navigate('/admin-dashboard');
            } else {
                console.log("Redirecting to Home Screen...");
                // --- CHANGE IS HERE ---
                // Redirects regular users to the Home Screen as requested
                navigate('/'); 
            }

        } catch (err) {
            console.error("Login Failed:", err);
            setMessage(err.response?.data?.error || 'Invalid email or password');
        }
    };

    return (
        <div className="apply-loan-page">
            <div className="apply-form-container">
                <h2>Login to Your Account</h2>
                <p>Welcome back to Shyam Fin.</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@shyamfin.com"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    
                    <Button type="submit">Login</Button>

                    {message && (
                        <p className="form-message error">
                            {message}
                        </p>
                    )}
                </form>

                <div className="auth-switch-link">
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;