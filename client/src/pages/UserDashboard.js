import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './UserDashboard.css';

const UserDashboard = () => {
    const { user, login } = useContext(AuthContext); 
    const [loans, setLoans] = useState([]);
    
    // ✅ STATE: Tracks if we are in "Edit Mode" or "View Mode"
    const [isEditing, setIsEditing] = useState(false);

    // ✅ STATE: Holds the temporary data while typing
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

            // Fetch Loans
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
            const token = localStorage.getItem('shyamFinToken'); // Get Token
            
            const res = await axios.put(
                'https://shyam-finance.onrender.com/api/user/update', 
                {
                    userId: user.id,
                    email: formData.email,
                    phone: formData.phone
                },
                {
                    headers: { Authorization: `Bearer ${token}` } // ✅ Important: Send Token
                }
            );

            if (res.status === 200) {
                alert('Profile Updated Successfully!');
                setIsEditing(false); // Switch back to View Mode
                
                // Update Global User State
                const updatedUser = { ...user, email: formData.email, phone: formData.phone };
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
                {/* --- PROFILE CARD (Matches your Screenshot) --- */}
                <div className="card profile-card">
                    <div className="card-header">
                        <h3>My Profile</h3>
                        {/* ✅ Toggle Button: Shows 'Edit' or 'Save' */}
                        <button 
                            className="edit-btn" 
                            onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                        >
                            {isEditing ? '💾 Save' : '✏️ Edit'}
                        </button>
                    </div>
                    
                    <div className="profile-details">
                        <div className="detail-row">
                            <label>Username:</label>
                            {/* Username is never editable */}
                            <span>{user.username}</span> 
                        </div>
                        
                        <div className="detail-row">
                            <label>Email:</label>
                            {/* ✅ CONDITIONAL RENDERING: Input if editing, Text if not */}
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
                            {/* ✅ CONDITIONAL RENDERING */}
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
                        
                        {/* Cancel Button (Only shows when editing) */}
                        {isEditing && (
                             <button 
                                className="cancel-btn" 
                                onClick={() => {
                                    setIsEditing(false);
                                    setFormData({ email: user.email, phone: user.phone }); // Reset changes
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