import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './UserDashboard.css';

const UserDashboard = () => {
    const { user, login } = useContext(AuthContext); 
    const [loans, setLoans] = useState([]);
    
    // Toggle for Edit Mode
    const [isEditing, setIsEditing] = useState(false);

    // Form Data State
    const [formData, setFormData] = useState({
        email: '',
        phone: ''
    });

    // 1. Load User Data when page opens
    useEffect(() => {
        if (user) {
            setFormData({
                email: user.email || '',
                phone: user.phone || ''
            });

            // Fetch Loans from Render Backend
            axios.get(`https://shyam-finance.onrender.com/api/user-data/${user.id}`)
                .then(res => setLoans(res.data.loans))
                .catch(err => console.log("Error loading loans:", err));
        }
    }, [user]);

    // 2. Handle Typing in Input Fields
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 3. Save Changes to Backend
    const handleSaveProfile = async () => {
        try {
            // Send update to Render Backend
            const res = await axios.put('https://shyam-finance.onrender.com/api/user/update', {
                userId: user.id,
                email: formData.email,
                phone: formData.phone
            });

            if (res.status === 200) {
                alert('Profile Updated Successfully!');
                setIsEditing(false); // Turn off edit mode
                
                // CRITICAL: Update the Global App State so changes show immediately
                const updatedUser = { ...user, email: formData.email, phone: formData.phone };
                const token = localStorage.getItem('shyamFinToken'); 
                login(updatedUser, token); 
            }
        } catch (err) {
            console.error("Update failed:", err);
            alert('Failed to update profile. Please try again.');
        }
    };

    if (!user) return <div className="dashboard-container">Please Login</div>;

    return (
        <div className="dashboard-container">
            <h2>User Dashboard</h2>
            <p className="welcome-msg">Welcome back, <strong>{user.username}</strong>!</p>

            <div className="dashboard-grid">
                {/* --- PROFILE CARD --- */}
                <div className="card profile-card">
                    <div className="card-header">
                        <h3>My Profile</h3>
                        <button 
                            className="edit-btn" 
                            onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                            style={{ backgroundColor: isEditing ? '#28a745' : '#007bff' }}
                        >
                            {isEditing ? '💾 Save Changes' : '✏️ Edit Profile'}
                        </button>
                    </div>
                    
                    <div className="profile-details">
                        <div className="detail-row">
                            <label>Username:</label>
                            <span>{user.username}</span> {/* Username cannot be changed */}
                        </div>
                        
                        <div className="detail-row">
                            <label>Email:</label>
                            {isEditing ? (
                                <input 
                                    name="email" 
                                    type="email"
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    className="edit-input"
                                />
                            ) : (
                                <span>{user.email}</span>
                            )}
                        </div>

                        <div className="detail-row">
                            <label>Phone:</label>
                            {isEditing ? (
                                <input 
                                    name="phone" 
                                    type="tel"
                                    value={formData.phone} 
                                    onChange={handleChange} 
                                    className="edit-input"
                                />
                            ) : (
                                <span>{user.phone}</span>
                            )}
                        </div>
                        
                        {/* Cancel Button */}
                        {isEditing && (
                             <button 
                                className="cancel-btn" 
                                onClick={() => {
                                    setIsEditing(false);
                                    setFormData({ email: user.email, phone: user.phone }); // Reset data
                                }}
                             >
                                ✖ Cancel
                             </button>
                        )}
                    </div>
                </div>

                {/* --- LOAN STATUS CARD --- */}
                <div className="card loan-card">
                    <h3>My Loan Applications</h3>
                    {loans.length === 0 ? (
                        <p>No applications yet. <a href="/apply">Apply Now</a></p>
                    ) : (
                        <ul className="loan-list">
                            {loans.map(loan => (
                                <li key={loan.id} className="loan-item">
                                    <div className="loan-info">
                                        <span className="loan-amount">₹{Number(loan.loan_amount).toLocaleString()}</span>
                                        <span className="loan-date">{new Date(loan.application_date).toLocaleDateString()}</span>
                                    </div>
                                    <span className={`status-badge ${loan.status}`}>
                                        {loan.status}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;