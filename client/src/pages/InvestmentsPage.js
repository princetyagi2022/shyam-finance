import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './InvestmentsPage.css';

const InvestmentsPage = () => {
  // --- Calculator State ---
  const [amount, setAmount] = useState(10000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(8.5);

  const calculateReturns = () => {
    const totalValue = amount * Math.pow((1 + rate / 100), years);
    return Math.round(totalValue);
  };

  const plans = [
    {
      title: "Fixed Deposit",
      desc: "Guaranteed returns with complete safety of capital.",
      rate: "8.5%",
      min: "₹10,000",
      lockIn: "1-5 Years",
      icon: "fa-piggy-bank",
      color: "#4facfe"
    },
    {
      title: "Mutual Funds",
      desc: "High growth potential through diversified equity portfolios.",
      rate: "~12-15%",
      min: "₹500",
      lockIn: "No Lock-in",
      icon: "fa-chart-line",
      color: "#00f2fe"
    },
    {
      title: "Gold Bonds",
      desc: "Secure way to invest in gold without storage worries.",
      rate: "2.5% + Appreciation",
      min: "1 Gram",
      lockIn: "8 Years",
      icon: "fa-coins",
      color: "#ff9a9e"
    }
  ];

  return (
    <div className="investments-page">
      
      {/* 1. HERO SECTION */}
      <header className="invest-hero">
        <div className="hero-content">
          <h1>Grow Your Wealth with Confidence</h1>
          <p>Secure, high-return investment options tailored for your future.</p>
          <button className="cta-btn" onClick={() => document.getElementById('calc').scrollIntoView({behavior: 'smooth'})}>
            Calculate Returns
          </button>
        </div>
      </header>

      {/* 2. LIVE MARKET TRENDS (Visual Only) */}
      <div className="market-ticker">
        <div className="ticker-track">
          <span>NIFTY 50 ▲ 19,450 (+0.8%)</span>
          <span>SENSEX ▲ 65,300 (+0.75%)</span>
          <span>GOLD ▼ ₹59,000 (-0.2%)</span>
          <span>USD/INR ▲ 83.10 (+0.05%)</span>
          {/* Duplicate for infinite scroll effect */}
          <span>NIFTY 50 ▲ 19,450 (+0.8%)</span>
          <span>SENSEX ▲ 65,300 (+0.75%)</span>
        </div>
      </div>

      <div className="invest-container">
        
        {/* 3. INVESTMENT PLANS GRID */}
        <section className="plans-section">
          <h2>Our Top Investment Plans</h2>
          <div className="plans-grid">
            {plans.map((plan, index) => (
              <div key={index} className="plan-card">
                <div className="card-header" style={{background: `linear-gradient(135deg, ${plan.color}, #333)`}}>
                  <i className={`fas ${plan.icon}`}></i>
                  <h3>{plan.title}</h3>
                </div>
                <div className="card-body">
                  <p>{plan.desc}</p>
                  <div className="plan-details">
                    <div className="detail-row">
                      <span>Returns</span>
                      <strong>{plan.rate}</strong>
                    </div>
                    <div className="detail-row">
                      <span>Min. Invest</span>
                      <strong>{plan.min}</strong>
                    </div>
                    <div className="detail-row">
                      <span>Lock-in</span>
                      <strong>{plan.lockIn}</strong>
                    </div>
                  </div>
                  <button className="invest-btn">Start Investing</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. ROI CALCULATOR */}
        <section id="calc" className="calculator-section">
          <div className="calc-container">
            <div className="calc-inputs">
              <h2>Return on Investment Calculator</h2>
              <p>See how your money grows over time with compound interest.</p>
              
              <div className="input-group">
                <label>Investment Amount: ₹{amount.toLocaleString()}</label>
                <input 
                  type="range" min="5000" max="1000000" step="5000" 
                  value={amount} onChange={(e) => setAmount(Number(e.target.value))} 
                />
              </div>

              <div className="input-group">
                <label>Duration: {years} Years</label>
                <input 
                  type="range" min="1" max="20" step="1" 
                  value={years} onChange={(e) => setYears(Number(e.target.value))} 
                />
              </div>

              <div className="input-group">
                <label>Expected Rate: {rate}%</label>
                <input 
                  type="range" min="5" max="20" step="0.5" 
                  value={rate} onChange={(e) => setRate(Number(e.target.value))} 
                />
              </div>
            </div>

            <div className="calc-result">
              <h3>Projected Value</h3>
              <div className="result-amount">₹{calculateReturns().toLocaleString()}</div>
              <div className="profit-text">
                Total Profit: <span className="green">+₹{(calculateReturns() - amount).toLocaleString()}</span>
              </div>
              <p className="note">* Projections based on compounding interest.</p>
            </div>
          </div>
        </section>

        {/* 5. WHY INVEST WITH US */}
        <section className="why-invest">
          <div className="why-card">
            <i className="fas fa-shield-alt"></i>
            <h4>100% Safe</h4>
            <p>Regulated by RBI & SEBI guidelines.</p>
          </div>
          <div className="why-card">
            <i className="fas fa-percentage"></i>
            <h4>Zero Commission</h4>
            <p>Direct mutual funds with 0% commission.</p>
          </div>
          <div className="why-card">
            <i className="fas fa-headset"></i>
            <h4>Expert Support</h4>
            <p>Get portfolio advice from certified experts.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default InvestmentsPage;