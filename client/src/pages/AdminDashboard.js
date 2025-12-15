import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [data, setData] = useState({ users: [], loans: [] });
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login'); // Protect Route
        } else {
            axios.get('http://localhost:3001/api/admin/data')
                .then(res => setData(res.data))
                .catch(err => console.log(err));
        }
    }, [user, navigate]);

    return (
        <div style={{padding: '20px'}}>
            <h1>Admin Dashboard</h1>
            <button onClick={logout} style={{backgroundColor: 'red', color: 'white'}}>Logout</button>

            {/* ALL USERS SECTION */}
            <h3>Registered Users</h3>
            <table border="1" width="100%">
                <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th></tr></thead>
                <tbody>
                    {data.users.map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.username}</td>
                            <td>{u.email}</td>
                            <td>{u.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* ALL LOANS SECTION */}
            <h3>Loan Applications</h3>
            <table border="1" width="100%" style={{marginTop: '20px'}}>
                <thead><tr><th>ID</th><th>User</th><th>Amount</th><th>Status</th></tr></thead>
                <tbody>
                    {data.loans.map(l => (
                        <tr key={l.id}>
                            <td>{l.id}</td>
                            <td>{l.username} ({l.email})</td>
                            <td>{l.loan_amount}</td>
                            <td>{l.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default AdminDashboard;