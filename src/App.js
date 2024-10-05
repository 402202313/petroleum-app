import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Maps from './components/Maps';
import OrderForm from './components/OrderForm'; // Import OrderForm here
import OrderTracking from './components/OrderTracking';
import Payment from './components/Payment';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/order" element={<OrderForm />} /> {/* Add this line for OrderForm */}
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-tracking" element={<OrderTracking />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
