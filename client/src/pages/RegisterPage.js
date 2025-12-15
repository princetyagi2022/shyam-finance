import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for the bottom text
import Button from '../components/Button'; // Use your custom Button
import './AuthPages.css'; // This file contains all the styles you need

const RegisterPage = () => {
    const [formData, setFormData] = useState({ username: '', email: '', phone: '', password: '' });
    const [message, setMessage] = useState(''); // To show success/error messages
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/register', formData);
            alert('Registration Successful! Please Login.');
            navigate('/login');
        } catch (err) {
            console.error(err);
            setMessage('Registration failed. User might already exist.');
        }
    };

    // Helper to update state
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        // 1. Main Container Class
        <div className="apply-loan-page">
            
            {/* 2. Form Card Class */}
            <div className="apply-form-container">
                <h2>Create an Account</h2>
                <p>Join Shyam Fin to manage your wealth.</p>
                
                <form onSubmit={handleSubmit}>
                    
                    {/* 3. Input Groups for Styling */}
                    <div className="input-group">
                        <label>Username</label>
                        <input 
                            name="username"
                            placeholder="e.g. Prince Tyagi" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <input 
                            name="email"
                            type="email"
                            placeholder="name@example.com" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <label>Phone Number</label>
                        <input 
                            name="phone"
                            type="tel"
                            placeholder="10-digit number" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input 
                            name="password"
                            type="password" 
                            placeholder="Create a strong password" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <Button type="submit">Register</Button>

                    {message && <p className="form-message error">{message}</p>}
                </form>

                {/* 4. Link to Login Page */}
                <div className="auth-switch-link">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;