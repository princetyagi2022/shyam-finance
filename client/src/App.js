import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Assuming you have a Footer component
import HomePage from './pages/HomePage';
import LoansPage from './pages/LoansPage';
import InvestmentsPage from './pages/InvestmentsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ApplyLoanPage from './pages/ApplyLoanPage';
import UserDashboard from './pages/UserDashboard';
import AdminPanel from './pages/AdminPanel';
import { AuthProvider } from './context/AuthContext';

// Create a layout component to handle the conditional rendering
const Layout = () => {
  const location = useLocation();
  
  // List of paths where we want to HIDE the Navbar and Footer
  const hideNavAndFooter = location.pathname === '/admin-dashboard';

  return (
    <>
      {/* Only show Navbar if we are NOT on the Admin Dashboard */}
      {!hideNavAndFooter && <Navbar />}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loans" element={<LoansPage />} />
        <Route path="/investments" element={<InvestmentsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/apply" element={<ApplyLoanPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminPanel />} />
      </Routes>

      {/* Only show Footer if we are NOT on the Admin Dashboard */}
      {!hideNavAndFooter && <Footer />} 
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;