import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/Button';
import './HomePage.css';

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="homepage">
      
      {/* --- HERO SECTION --- */}
      <header className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Banking on Your Future.</h1>
          <p>Secure loans, high-yield investments, and financial freedom at your fingertips.</p>
          
          <div className="hero-buttons">
            {user ? (
              <Link to="/dashboard">
                <Button>Go to My Dashboard</Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button>Get Started Today</Button>
              </Link>
            )}
            <Link to="/loans">
              <button className="secondary-btn">Explore Loans</button>
            </Link>
          </div>
        </div>
      </header>

      {/* --- SERVICES GRID --- */}
      <section className="features-section">
        <div className="section-header">
            <h2>Our Premium Services</h2>
            <p>Everything you need to manage your wealth.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon">🏠</div>
            <h3>Home & Personal Loans</h3>
            <p>Low interest rates starting at 8.5% p.a. Quick approval process.</p>
          </div>
          
          <div className="feature-card">
            <div className="icon">📈</div>
            <h3>Smart Investments</h3>
            <p>Grow your money with our secure Fixed Deposits and Mutual Funds.</p>
          </div>
          
          <div className="feature-card">
            <div className="icon">⚡</div>
            <h3>Instant EMI</h3>
            <p>Pay your bills and manage EMI schedules directly from your dashboard.</p>
          </div>

          <div className="feature-card">
            <div className="icon">🛡️</div>
            <h3>Secure Banking</h3>
            <p>256-bit encryption ensures your data and money are always safe.</p>
          </div>
        </div>
      </section>

      {/* --- STATISTICS SECTION --- */}
      <section className="stats-section">
        <div className="stat-item">
          <h3>10k+</h3>
          <p>Happy Customers</p>
        </div>
        <div className="stat-item">
          <h3>₹50Cr+</h3>
          <p>Loans Disbursed</p>
        </div>
        <div className="stat-item">
          <h3>24/7</h3>
          <p>Customer Support</p>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="cta-section">
        <h2>Ready to take control?</h2>
        <p>Join thousands of others who trust Shyam Fin.</p>
        {!user && (
            <Link to="/register">
                <button className="cta-btn">Create Free Account</button>
            </Link>
        )}
      </section>
    </div>
  );
};

export default HomePage;