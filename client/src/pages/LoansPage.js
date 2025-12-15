import React from 'react';
import LoanCalculator from '../components/LoanCalculator'; // Reusing again!
import './LoansPage.css';

const LoansPage = () => {
  // Dummy data for loan types
  const loanTypes = [
    { name: 'Two-Wheeler Loan', desc: 'Get up to 90% financing for your new bike or scooter.' },
    { name: 'Personal Loan', desc: 'Instant personal loans for your urgent needs.' },
    { name: 'Used Car Loan', desc: 'Competitive rates for your pre-owned car purchase.' },
    { name: 'Business Loan', desc: 'Fuel your business growth with our capital loans.' },
  ];

  return (
    <div className="loans-page">
      <header className="loans-header">
        <h1>Explore Our Loan Products</h1>
        <p>Find the perfect loan to fit your life's needs.</p>
      </header>

      <div className="loans-content">
        <div className="loan-list">
          <h2>Available Loans</h2>
          {loanTypes.map((loan, index) => (
            <div key={index} className="loan-card">
              <h3>{loan.name}</h3>
              <p>{loan.desc}</p>
            </div>
          ))}
        </div>

        <div className="loan-calculator-wrapper">
          {/* We can place the calculator here for convenience */}
          <LoanCalculator />
        </div>
      </div>
    </div>
  );
};

export default LoansPage;