import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/Button';
import './HomePage.css';

const HomePage = () => {
  const { user } = useContext(AuthContext);

  // Simple Scroll Animation Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="homepage">
      
      {/* --- HERO SECTION --- */}
      <header className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content animate-on-scroll">
          <span className="hero-badge"> #1 Finance App in India</span>
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

      {/* --- TRUST BANNER --- */}
      <div className="trust-banner">
        <p>Trusted by industry leaders</p>
        <div className="logos">
            <span>FINCORP</span>
            <span>SECURE BANK</span>
            <span>SHYAM VENTURES</span>
            <span>GLOBAL TRUST</span>
        </div>
      </div>

      {/* --- SERVICES GRID --- */}
      <section className="features-section">
        <div className="section-header animate-on-scroll">
            <h2>Our Premium Services</h2>
            <div className="underline"></div>
            <p>Everything you need to manage your wealth.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card animate-on-scroll">
            <div className="icon-box">🏠</div>
            <h3>Home & Personal Loans</h3>
            <p>Low interest rates starting at 8.5% p.a. Quick approval process.</p>
          </div>
          
          <div className="feature-card animate-on-scroll">
            <div className="icon-box">📈</div>
            <h3>Smart Investments</h3>
            <p>Grow your money with our secure Fixed Deposits and Mutual Funds.</p>
          </div>
          
          <div className="feature-card animate-on-scroll">
            <div className="icon-box">⚡</div>
            <h3>Instant EMI</h3>
            <p>Pay your bills and manage EMI schedules directly from your dashboard.</p>
          </div>

          <div className="feature-card animate-on-scroll">
            <div className="icon-box">🛡️</div>
            <h3>Secure Banking</h3>
            <p>256-bit encryption ensures your data and money are always safe.</p>
          </div>
        </div>
      </section>

      {/* --- NEW: HOW IT WORKS --- */}
      <section className="how-it-works animate-on-scroll">
        <div className="section-header">
            <h2>How It Works</h2>
            <p>Get your loan disbursed in 3 simple steps.</p>
        </div>
        <div className="steps-container">
            <div className="step-item">
                <div className="step-number">1</div>
                <h3>Register</h3>
                <p>Create an account in less than 2 minutes.</p>
            </div>
            <div className="step-line"></div>
            <div className="step-item">
                <div className="step-number">2</div>
                <h3>Apply</h3>
                <p>Choose your loan type and submit documents.</p>
            </div>
            <div className="step-line"></div>
            <div className="step-item">
                <div className="step-number">3</div>
                <h3>Disburse</h3>
                <p>Get funds credited directly to your bank account.</p>
            </div>
        </div>
      </section>

      {/* --- STATISTICS SECTION --- */}
      <section className="stats-section animate-on-scroll">
        <div className="stat-overlay"></div>
        <div className="stat-content">
            <div className="stat-item">
            <h3>10k+</h3>
            <p>Happy Customers</p>
            </div>
            <div className="stat-item">
            <h3>₹50Cr+</h3>
            <p>Loans Disbursed</p>
            </div>
            <div className="stat-item">
            <h3>99.9%</h3>
            <p>Success Rate</p>
            </div>
            <div className="stat-item">
            <h3>24/7</h3>
            <p>Customer Support</p>
            </div>
        </div>
      </section>

      {/* --- NEW: TESTIMONIALS --- */}
      <section className="testimonials-section animate-on-scroll">
        <h2>What Our Users Say</h2>
        <div className="testimonial-grid">
            <div className="testimonial-card">
                <p>"Shyam Fin helped me buy my first home. The process was incredibly fast and the rates were unbeatable."</p>
                <h4>- Rahul Verma</h4>
                <span className="stars">⭐⭐⭐⭐⭐</span>
            </div>
            <div className="testimonial-card">
                <p>"I use the investment dashboard daily. It's so easy to track my mutual funds and FDs."</p>
                <h4>- Priya Singh</h4>
                <span className="stars">⭐⭐⭐⭐⭐</span>
            </div>
            <div className="testimonial-card">
                <p>"Customer support is top-notch. They resolved my EMI query in 10 minutes."</p>
                <h4>- Amit Patel</h4>
                <span className="stars">⭐⭐⭐⭐⭐</span>
            </div>
        </div>
      </section>

      {/* --- NEW: NEWSLETTER --- */}
      <section className="newsletter-section animate-on-scroll">
        <h2>Stay Updated</h2>
        <p>Get the latest financial tips and exclusive loan offers.</p>
        <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button>Subscribe</button>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="cta-section animate-on-scroll">
        <div className="cta-content">
            <h2>Ready to take control?</h2>
            <p>Join thousands of others who trust Shyam Fin.</p>
            {!user && (
                <Link to="/register">
                    <button className="cta-btn">Create Free Account</button>
                </Link>
            )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;