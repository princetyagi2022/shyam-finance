import React from 'react';
import './InvestmentsPage.css';

const InvestmentsPage = () => {
  return (
    <div className="investments-page">
      <header className="investments-header">
        <h1>Grow Your Wealth with Shyam Fin</h1>
        <p>Secure, reliable, and high-return investment options.</p>
      </header>

      <div className="investments-content">
        <h2>Our Investment Plans</h2>
        <div className="plans-grid">
          <div className="plan-card">
            <h3>Fixed Deposit</h3>
            <p>Earn assured returns up to 8.5% p.a. Flexible tenures from 1 to 5 years.</p>
            <span className="interest-rate">Up to 8.5% p.a.</span>
          </div>
          <div className="plan-card">
            <h3>Recurring Deposit</h3>
            <p>Build your savings with small monthly investments. Ideal for long-term goals.</p>
            <span className="interest-rate">Up to 7.8% p.a.</span>
          </div>
          <div className="plan-card">
            <h3>Tax-Saving FD</h3>
            <p>Save on taxes under Section 80C while earning guaranteed returns.</p>
            <span className="interest-rate">Up to 8.2% p.a.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentsPage;