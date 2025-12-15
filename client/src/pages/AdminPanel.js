import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css'; // Make sure to use the new CSS below

const AdminPanel = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // State
    const [users, setUsers] = useState([]);
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('loans'); 
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // For mobile sidebar

    // Protect Route
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
        } else {
            fetchAdminData();
        }
    }, [user, navigate]);

    // Fetch Data from Live Backend
    const fetchAdminData = async () => {
        try {
            // ✅ FIX: Use Render URL
            const res = await axios.get('https://shyam-finance.onrender.com/api/admin/data');
            setUsers(res.data.users);
            setLoans(res.data.loans);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching admin data:", err);
            setLoading(false);
        }
    };

    // Handle Status Update
    const handleStatusUpdate = async (loanId, newStatus) => {
        try {
            // ✅ FIX: Use Render URL
            await axios.post('https://shyam-finance.onrender.com/api/admin/update-status', {
                applicationId: loanId,
                newStatus: newStatus
            });
            fetchAdminData(); // Refresh data
            alert(`Loan ${newStatus} successfully!`);
        } catch (err) {
            alert('Failed to update status.');
            console.error(err);
        }
    };

    if (loading) return <div className="loading-screen">Loading Admin Panel...</div>;

    return (
        <div className="admin-layout">
            {/* MOBILE HEADER */}
            <header className="mobile-header">
                <h3>Admin Panel</h3>
                <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    ☰
                </button>
            </header>

            {/* SIDEBAR */}
            <aside className={`admin-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>Shyam Fin</h2>
                    <p>Admin Portal</p>
                </div>
                
                <nav className="sidebar-nav">
                    <button 
                        className={activeTab === 'loans' ? 'active' : ''} 
                        onClick={() => { setActiveTab('loans'); setMobileMenuOpen(false); }}
                    >
                        📄 Loan Applications
                    </button>
                    <button 
                        className={activeTab === 'users' ? 'active' : ''} 
                        onClick={() => { setActiveTab('users'); setMobileMenuOpen(false); }}
                    >
                        👥 Registered Users
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <div className="admin-user-info">
                        <span>{user?.username}</span>
                    </div>
                    <button onClick={logout} className="logout-btn">Logout</button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="admin-main">
                <header className="main-header">
                    <h2>{activeTab === 'loans' ? 'Manage Loans' : 'User Management'}</h2>
                </header>

                <div className="content-container">
                    {/* --- LOANS TAB --- */}
                    {activeTab === 'loans' && (
                        <div className="table-responsive">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Applicant</th>
                                        <th>Amount</th>
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
                                                <div className="cell-user">
                                                    <strong>{loan.username}</strong>
                                                    <span>{loan.email}</span>
                                                    <small>{loan.phone}</small>
                                                </div>
                                            </td>
                                            <td>₹{Number(loan.loan_amount).toLocaleString()}</td>
                                            <td>{new Date(loan.application_date).toLocaleDateString()}</td>
                                            <td>
                                                <span className={`status-badge ${loan.status}`}>
                                                    {loan.status}
                                                </span>
                                            </td>
                                            <td>
                                                {loan.status === 'pending' ? (
                                                    <div className="action-buttons">
                                                        <button 
                                                            className="btn-approve"
                                                            onClick={() => handleStatusUpdate(loan.id, 'approved')}
                                                        >
                                                            ✓
                                                        </button>
                                                        <button 
                                                            className="btn-reject"
                                                            onClick={() => handleStatusUpdate(loan.id, 'rejected')}
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="no-action">-</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {loans.length === 0 && <tr><td colSpan="6" className="empty-msg">No loans found.</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* --- USERS TAB --- */}
                    {activeTab === 'users' && (
                        <div className="table-responsive">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>User Details</th>
                                        <th>Role</th>
                                        <th>Joined Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((u) => (
                                        <tr key={u.id}>
                                            <td>#{u.id}</td>
                                            <td>
                                                <div className="cell-user">
                                                    <strong>{u.username}</strong>
                                                    <span>{u.email}</span>
                                                    <small>{u.phone}</small>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`role-badge ${u.role}`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td>{new Date(u.created_at || Date.now()).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminPanel;