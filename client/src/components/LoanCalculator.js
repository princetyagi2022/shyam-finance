import React, { useState } from 'react';
import Button from './Button'; // Using our button again!
import './LoanCalculator.css';

const LoanCalculator = () => {
  // Setup state for each input and the final result
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(10); // Annual percentage rate
  const [tenure, setTenure] = useState(5); // In years
  const [emi, setEmi] = useState(0);

  /**
   * Calculates the Equated Monthly Installment (EMI).
   */
  const calculateEmi = () => {
    // Basic validation
    if (!amount || !rate || !tenure) {
      alert('Please fill in all fields');
      return;
    }

    const principal = parseFloat(amount);
    const annualRate = parseFloat(rate) / 100;
    const monthlyRate = annualRate / 12;
    const numberOfMonths = parseFloat(tenure) * 12;

    if (monthlyRate === 0) {
      // Handle 0% interest rate
      setEmi((principal / numberOfMonths).toFixed(2));
      return;
    }

    // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const factor = Math.pow(1 + monthlyRate, numberOfMonths);
    const calculatedEmi = (principal * monthlyRate * factor) / (factor - 1);

    setEmi(calculatedEmi.toFixed(2));
  };

  return (
    <div className="loan-calculator-container">
      <h2>Two-Wheeler Loan EMI Calculator</h2>
      
      <div className="input-group">
        <label>Loan Amount (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g., 100000"
        />
      </div>

      <div className="input-group">
        <label>Annual Interest Rate (%)</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="e.g., 10"
        />
      </div>

      <div className="input-group">
        <label>Tenure (in Years)</label>
        <input
          type="number"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
          placeholder="e.g., 5"
        />
      </div>

      <Button onClick={calculateEmi}>Calculate EMI</Button>

      {/* Conditionally render the result only if EMI has been calculated */}
      {emi > 0 && (
        <div className="emi-result">
          <h3>Your Monthly EMI is:</h3>
          <span className="emi-amount">₹ {emi}</span>
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;