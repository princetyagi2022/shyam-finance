import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/Button';
import './ApplyLoanPage.css';

const ApplyLoanPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // New State Variables for Loan Type and Tenure
  const [amount, setAmount] = useState(50000);
  const [loanType, setLoanType] = useState('Personal Loan');
  const [tenure, setTenure] = useState(12);
  const [message, setMessage] = useState(''); 

  useEffect(() => {
    if (!user) {
      alert("You must be logged in to apply for a loan.");
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // ✅ FIX: Use the live Render URL instead of localhost
      const res = await axios.post('https://shyam-finance.onrender.com/api/apply-loan', {
        userId: user.id,
        amount: amount,
        loanType: loanType,
        tenure: tenure
      });

      setMessage('Application submitted successfully!');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      console.error("Loan Application Error:", error);
      const errorMsg = error.response?.data?.error || 'An error occurred.';
      setMessage(`Error: ${errorMsg}`);
    }
  };

  if (!user) return null;

  return (
    <div className="apply-loan-page">
      <div className="apply-form-container">
        <h2>Apply for a Loan</h2>
        <p>Hi <strong>{user.username}</strong>, customize your loan below.</p>
        
        <form onSubmit={handleSubmit}>
          {/* Read-Only Fields */}
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" value={user.username} disabled style={{backgroundColor: '#e9ecef'}} />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input type="text" value={user.phone} disabled style={{backgroundColor: '#e9ecef'}} />
          </div>

          {/* 1. Loan Type Dropdown */}
          <div className="input-group">
            <label>Loan Type</label>
            <select 
              value={loanType} 
              onChange={(e) => setLoanType(e.target.value)}
              className="form-select"
            >
              <option value="Personal Loan">Personal Loan</option>
              <option value="Home Loan">Home Loan</option>
              <option value="Car Loan">Car Loan</option>
              <option value="Education Loan">Education Loan</option>
            </select>
          </div>

          {/* 2. Tenure Dropdown */}
          <div className="input-group">
            <label>Tenure (Months)</label>
            <select 
              value={tenure} 
              onChange={(e) => setTenure(Number(e.target.value))}
              className="form-select"
            >
              <option value={6}>6 Months</option>
              <option value={12}>12 Months (1 Year)</option>
              <option value={24}>24 Months (2 Years)</option>
              <option value={36}>36 Months (3 Years)</option>
              <option value={60}>60 Months (5 Years)</option>
            </select>
          </div>

          {/* 3. Amount Field */}
          <div className="input-group">
            <label>Loan Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit">Apply Now</Button>

          {message && (
            <p className={`form-message ${message.startsWith('Error') ? 'error' : 'success'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ApplyLoanPage;