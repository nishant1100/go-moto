import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./esewa.css"; 
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FakeEsewa = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("Esewa page received state:", state);
  const [processing, setProcessing] = useState(false);

const handlePayment = async () => {
  setProcessing(true);

  const token = localStorage.getItem("token");

  try {
    const pickUpDatetime = new Date(`${state.pickup}T10:00:00`);
    const dropOffDatetime = new Date(`${state.dropoff}T10:00:00`);

    if (isNaN(pickUpDatetime) || isNaN(dropOffDatetime)) {
      alert("Invalid date format. Cannot process booking.");
      setProcessing(false);
      return;
    }

    const pickUpISOString = pickUpDatetime.toISOString();
    const dropOffISOString = dropOffDatetime.toISOString();

    // Wait 3 seconds to simulate loading
    setTimeout(async () => {
      await axios.post(
        `http://127.0.0.1:8000/api/book-car/${state.carId}/`,
        {
          pick_up_date: pickUpISOString,
          drop_off_date: dropOffISOString,
          payment_method: "esewa",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      toast.success(
        `Payment of Nrs. ${state.amount} for ${state.carName} was successful.`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );

      setTimeout(() => {
        navigate("/");
      }, 3000); // Redirect after toast
    }, 3000); // Simulated delay

  } catch (err) {
    console.error("Payment failed:", err);
    toast.error(err.response?.data?.error || "Payment failed. Try again.");
    setProcessing(false);
  }
};




  return (
    <div className="esewa-fake-container">
      <div className="esewa-card">
        <h2>eSewa Payment</h2>
        <p><strong>Merchant:</strong> GoMoto Pvt. Ltd</p>
        <p><strong>Amount:</strong> Nrs. {state.amount}</p>
        <p><strong>Booking:</strong> {state.carName}</p>

        {!processing ? (
          <button onClick={handlePayment} className="pay-btn">
            Pay Now
          </button>
        ) : (
          <p className="processing">Processing transaction...</p>
        )}

        <button onClick={() => navigate(-1)} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FakeEsewa;
