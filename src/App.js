import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Maps from './components/Maps';
import OrderForm from './components/OrderForm';
import OrderTracking from './components/OrderTracking';
import Payment from './components/Payment';

const App = () => {
  return (
    <Router basename="/petroleum-app"> {/* Set the base path */}
      <div className="app-container">
        <Header />  {/* Header is always visible */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Set HomePage as the default */}
            <Route path="/maps" element={<Maps />} />
            <Route path="/order" element={<OrderForm />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-tracking" element={<OrderTracking />} />
          </Routes>
        </main>
        <Footer />  {/* Footer will be conditionally visible */}
      </div>
    </Router>
  );
};

export default App;
