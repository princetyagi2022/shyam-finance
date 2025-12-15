import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import your global components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import all your page components
import HomePage from './pages/HomePage';
import LoansPage from './pages/LoansPage';
import InvestmentsPage from './pages/InvestmentsPage';
import ApplyLoanPage from './pages/ApplyLoanPage'; 
import RegisterPage from './pages/RegisterPage'; // 1. IS THIS IMPORTED?
import LoginPage from './pages/LoginPage';       // 2. IS THIS IMPORTED?
import UserDashboard from './pages/UserDashboard';
import AdminPanel from './pages/AdminPanel';


// Import the App-level CSS
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
             {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/loans" element={<LoansPage />} />
            <Route path="/investments" element={<InvestmentsPage />} />
            <Route path="/apply" element={<ApplyLoanPage />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Private Routes */}
            <Route path="/dashboard" element={<UserDashboard />} /> 
            
            {/* FIX: Map the route used in LoginPage to your best Admin component */}
            <Route path="/admin-dashboard" element={<AdminPanel />} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;