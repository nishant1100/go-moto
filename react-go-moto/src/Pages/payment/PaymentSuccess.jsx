import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Success.css'; // Create CSS to style success page

const PaymentSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="payment-success-container">
      <div className="success-box">
        <h2>✅ Payment Successful!</h2>
        <p>Your payment of <strong>Nrs. {state?.amount}</strong> for <strong>{state?.carName}</strong> was successful.</p>
        <button onClick={() => navigate('/')}>Go to Homepage</button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
