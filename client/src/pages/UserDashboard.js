import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './UserDashboard.css'; // Ensure you have this CSS file

const UserDashboard = () => {
    const { user, login } = useContext(AuthContext); // 'login' is used to update local storage
    const [loans, setLoans] = useState([]);
    
    // Editing State
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        email: user?.email || '',
        phone: user?.phone || ''
    });

    // Fetch Loans
    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:3001/api/user-data/${user.id}`)
                .then(res => setLoans(res.data.loans))
                .catch(err => console.log(err));
            
            // Sync form data with user data
            setFormData({ email: user.email, phone: user.phone });
        }
    }, [user]);

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Save Profile Changes
    const handleSaveProfile = async () => {
        try {
            await axios.put('http://localhost:3001/api/user/update', {
                userId: user.id,
                email: formData.email,
                phone: formData.phone
            });
            
            alert('Profile Updated Successfully!');
            setIsEditing(false);
            
            // Update the Context/LocalStorage with new data
            // We keep the old token, just update the user object
            const updatedUser = { ...user, email: formData.email, phone: formData.phone };
            const token = localStorage.getItem('shyamFinToken'); // Get existing token
            login(updatedUser, token); 

        } catch (err) {
            alert('Failed to update profile.');
            console.error(err);
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
                        >
                            {isEditing ? '💾 Save' : '✏️ Edit'}
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
                                    value={formData.phone} 
                                    onChange={handleChange} 
                                    className="edit-input"
                                />
                            ) : (
                                <span>{user.phone}</span>
                            )}
                        </div>
                        
                        {isEditing && (
                             <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
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