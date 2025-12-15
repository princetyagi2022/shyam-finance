import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Import the new CSS file

const AdminDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [data, setData] = useState({ users: [], loans: [] });
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login'); 
        } else {
            // ✅ FIX: Use the Live Render URL
            axios.get('https://shyam-finance.onrender.com/api/admin/data')
                .then(res => setData(res.data))
                .catch(err => console.log(err));
        }
    }, [user, navigate]);

    return (
        <div className="admin-container">
            <header className="admin-header">
                <h1>Admin Dashboard</h1>
                <button onClick={logout} className="logout-btn">Logout</button>
            </header>

            {/* STATS SUMMARY (Optional but looks good) */}
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Users</h3>
                    <p>{data.users.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Loan Applications</h3>
                    <p>{data.loans.length}</p>
                </div>
            </div>

            {/* USERS SECTION */}
            <section className="admin-section">
                <h3>👥 Registered Users</h3>
                <div className="table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.users.map(u => (
                                <tr key={u.id}>
                                    <td data-label="ID">#{u.id}</td>
                                    <td data-label="Name">{u.username}</td>
                                    <td data-label="Email">{u.email}</td>
                                    <td data-label="Phone">{u.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* LOANS SECTION */}
            <section className="admin-section">
                <h3>📄 Loan Applications</h3>
                <div className="table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.loans.map(l => (
                                <tr key={l.id}>
                                    <td data-label="ID">#{l.id}</td>
                                    <td data-label="User">
                                        <div className="user-cell">
                                            <span className="user-name">{l.username}</span>
                                            <span className="user-email">{l.email}</span>
                                        </div>
                                    </td>
                                    <td data-label="Amount">₹{l.loan_amount}</td>
                                    <td data-label="Status">
                                        <span className={`status-badge ${l.status}`}>
                                            {l.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;