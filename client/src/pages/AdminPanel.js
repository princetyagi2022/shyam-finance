import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // State for data
    const [users, setUsers] = useState([]);
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('loans'); // 'loans' or 'users'

    // Protect the route: Redirect if not admin
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
        } else {
            fetchAdminData();
        }
    }, [user, navigate]);

    // Fetch all data from the backend
    const fetchAdminData = async () => {
        try {
            // Make sure this matches your backend URL
            const res = await axios.get('http://localhost:3001/api/admin/data');
            setUsers(res.data.users);
            setLoans(res.data.loans);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching admin data:", err);
            setLoading(false);
        }
    };

    // Handle Loan Status Update (Approve/Reject)
    const handleStatusUpdate = async (loanId, newStatus) => {
        try {
            await axios.post('http://localhost:3001/api/admin/update-status', {
                applicationId: loanId,
                newStatus: newStatus
            });
            // Refresh data after update
            fetchAdminData();
            alert(`Loan ${newStatus} successfully!`);
        } catch (err) {
            alert('Failed to update status.');
            console.error(err);
        }
    };

    if (loading) return <div className="loading-screen">Loading Admin Panel...</div>;

    return (
        <div className="admin-container">
            {/* SIDEBAR */}
            <aside className="admin-sidebar">
                <div className="admin-profile">
                    <h3>Admin Panel</h3>
                    <p>Welcome, {user?.username}</p>
                </div>
                <nav className="admin-nav">
                    <button 
                        className={activeTab === 'loans' ? 'active' : ''} 
                        onClick={() => setActiveTab('loans')}
                    >
                        Loan Applications
                    </button>
                    <button 
                        className={activeTab === 'users' ? 'active' : ''} 
                        onClick={() => setActiveTab('users')}
                    >
                        Registered Users
                    </button>
                </nav>
                <button onClick={logout} className="logout-btn">Logout</button>
            </aside>

            {/* MAIN CONTENT */}
            <main className="admin-content">
                <header className="content-header">
                    <h2>{activeTab === 'loans' ? 'Manage Loans' : 'Manage Users'}</h2>
                </header>

                {/* LOANS TAB */}
                {activeTab === 'loans' && (
                    <div className="table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Applicant</th>
                                    <th>Amount (₹)</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loans.map((loan) => (
                                    <tr key={loan.id}>
                                        <td>#{loan.id}</td>
                                        <td>
                                            <div className="user-info">
                                                <span className="u-name">{loan.username}</span>
                                                <span className="u-email">{loan.email}</span>
                                            </div>
                                        </td>
                                        <td>{loan.phone}</td>
                                        <td>{Number(loan.loan_amount).toLocaleString()}</td>
                                        <td>{new Date(loan.application_date).toLocaleDateString()}</td>
                                        <td>
                                            <span className={`status-badge ${loan.status}`}>
                                                {loan.status}
                                            </span>
                                        </td>
                                        <td className="action-buttons">
                                            {loan.status === 'pending' && (
                                                <>
                                                    <button 
                                                        className="btn-approve"
                                                        onClick={() => handleStatusUpdate(loan.id, 'approved')}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button 
                                                        className="btn-reject"
                                                        onClick={() => handleStatusUpdate(loan.id, 'rejected')}
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            {loan.status !== 'pending' && <span className="no-action">-</span>}
                                        </td>
                                    </tr>
                                ))}
                                {loans.length === 0 && <tr><td colSpan="6">No loan applications found.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* USERS TAB */}
                {activeTab === 'users' && (
                    <div className="table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u.id}>
                                        <td>#{u.id}</td>
                                        <td>{u.username}</td>
                                        <td>{u.email}</td>
                                        <td>{u.phone}</td>
                                        <td>
                                            <span className={`role-badge ${u.role}`}>
                                                {u.role}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminPanel;