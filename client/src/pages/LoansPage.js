import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoanCalculator from '../components/LoanCalculator'; 
import './LoansPage.css';

const LoansPage = () => {
  // Enhanced Data with Icons and Details
  const loanTypes = [
    { 
      id: 1,
      name: 'Personal Loan', 
      rate: '10.99%', 
      tenure: 'Up to 5 Years',
      icon: 'fa-user-tie',
      desc: 'Instant funds for travel, wedding, or medical emergencies.' 
    },
    { 
      id: 2,
      name: 'Home Loan', 
      rate: '8.50%', 
      tenure: 'Up to 30 Years',
      icon: 'fa-house',
      desc: 'Buy your dream home with our affordable housing loans and quick processing.' 
    },
    { 
      id: 3,
      name: 'Car Loan', 
      rate: '9.25%', 
      tenure: 'Up to 7 Years',
      icon: 'fa-car',
      desc: 'Drive home your new car today with up to 100% on-road funding.' 
    },
    { 
      id: 4,
      name: 'Education Loan', 
      rate: '6.75%', 
      tenure: 'Up to 15 Years',
      icon: 'fa-graduation-cap',
      desc: 'Invest in your future. Covers tuition fees, accommodation, and travel.' 
    },
  ];

  // FAQ State
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: "What documents are required?", a: "Typically, you need Aadhaar, PAN card, last 3 months' bank statements, and salary slips." },
    { q: "How long does approval take?", a: "For personal loans, approval can happen in as little as 2 hours. Home loans take 3-5 days." },
    { q: "Can I prepay my loan?", a: "Yes, you can prepay your loan after 6 months with a minimal foreclosure charge." }
  ];

  return (
    <div className="loans-page">
      {/* 1. HERO SECTION */}
      <header className="loans-hero">
        <div className="hero-content">
          <h1>Fuel Your Dreams with Shyam Fin</h1>
          <p>Low interest rates. Minimal documentation. Instant approval.</p>
          <button className="hero-cta" onClick={() => document.getElementById('loan-list').scrollIntoView({ behavior: 'smooth' })}>
            View Products
          </button>
        </div>
      </header>

      <div className="loans-container">
        
        {/* 2. LOAN CARDS SECTION */}
        <section id="loan-list" className="loan-section">
          <div className="section-header">
            <h2>Our Loan Products</h2>
            <div className="underline"></div>
          </div>
          
          <div className="loan-grid">
            {loanTypes.map((loan) => (
              <div key={loan.id} className="loan-card">
                <div className="card-icon">
                  <i className={`fas ${loan.icon}`}></i>
                </div>
                <h3>{loan.name}</h3>
                <p className="loan-desc">{loan.desc}</p>
                
                <div className="loan-stats">
                  <div className="stat">
                    <span>Interest</span>
                    <strong>{loan.rate}</strong>
                  </div>
                  <div className="stat">
                    <span>Tenure</span>
                    <strong>{loan.tenure}</strong>
                  </div>
                </div>

                <Link to="/apply" className="btn-apply">Apply Now <i className="fas fa-arrow-right"></i></Link>
              </div>
            ))}
          </div>
        </section>

        {/* 3. CALCULATOR & FEATURES SPLIT */}
        <section className="features-calculator-split">
          
          {/* Why Choose Us */}
          <div className="why-choose-us">
            <h2>Why Choose Shyam Fin?</h2>
            <div className="feature-item">
              <i className="fas fa-bolt"></i>
              <div>
                <h4>Lightning Fast</h4>
                <p>Digital application process with approvals in minutes.</p>
              </div>
            </div>
            <div className="feature-item">
              <i className="fas fa-percent"></i>
              <div>
                <h4>Low Interest Rates</h4>
                <p>Competitive rates tailored to your credit score.</p>
              </div>
            </div>
            <div className="feature-item">
              <i className="fas fa-shield-alt"></i>
              <div>
                <h4>Secure & Transparent</h4>
                <p>No hidden charges. Your data is 100% secure.</p>
              </div>
            </div>
          </div>

          {/* Calculator Wrapper */}
          <div className="calculator-box">
            <h3>Plan Your EMI</h3>
            <LoanCalculator />
          </div>
        </section>

        {/* 4. FAQ SECTION */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${openFaq === index ? 'open' : ''}`} onClick={() => toggleFaq(index)}>
                <div className="faq-question">
                  {faq.q}
                  <i className={`fas fa-chevron-down ${openFaq === index ? 'rotate' : ''}`}></i>
                </div>
                {openFaq === index && <div className="faq-answer">{faq.a}</div>}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default LoansPage;