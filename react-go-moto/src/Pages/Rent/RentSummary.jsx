import axios from 'axios';
import {ArrowLeft, CalendarDays, CarFront, Clock, IndianRupee, User,} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./RentSummary.css";
import CryptoJS from "crypto-js";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const savePaymentStatus = (carId, status) => {
  const key = `payment_status_${carId}`;
  localStorage.setItem(key, status);
};
const saveRentSummary = (carId, days, ratePerDay, totalPrice) => {
  const summaryKey = `rent_summary_${carId}`;
  const rentData = {
    days,
    ratePerDay,
    totalPrice,
  };
  localStorage.setItem(summaryKey, JSON.stringify(rentData));
};

const RentSummary = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const pickupTime = state?.pickupTime || "10:00"; // fallback if not available
const dropoffTime = state?.dropoffTime || "10:00";

const pickupDate = new Date(`${state.dateRange.from}T${pickupTime}`);
const dropoffDate = new Date(`${state.dateRange.to}T${dropoffTime}`);


  

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/cars/${id}/`);
        const data = await res.json();
        if (data.image) data.image = `http://127.0.0.1:8000${data.image}`;
        setCar(data);
      } catch (err) {
        console.error("Failed to load car data", err);
      }
    };
    fetchCar();
  }, [id]);

  if (!car) return <p>Loading summary...</p>;

  const calculateDays = () => {
    if (!state?.dateRange?.from || !state?.dateRange?.to) return 0;
    const from = new Date(state.dateRange.from);
    const to = new Date(state.dateRange.to);
    return (to - from) / (1000 * 60 * 60 * 24) + 1;
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const handleBookingSubmit = async () => {
    if (!state?.dateRange?.from || !state?.dateRange?.to) {
      alert("Please select valid pickup and dropoff dates.");
      return;
    }

    const pickupDate = new Date(state.dateRange.from);
    const dropoffDate = new Date(state.dateRange.to);

    const bookingData = {
      pick_up_date: pickupDate.toISOString(),
      drop_off_date: dropoffDate.toISOString(),
      payment_method: "office",
    };

    const token = localStorage.getItem("token");

try {
  const response = await axios.post(
    `http://127.0.0.1:8000/api/book-car/${id}/`,
    bookingData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
  );

  toast.success(response.data.message, {
    position: "top-right",
    autoClose: 3000,
  });
  setShowModal(true);
} catch (err) {
  if (err.response?.data?.error) {
    toast.error(err.response.data.error, {
      position: "top-right",
    });
  }
  console.error("Booking error:", err);
}

  };



const handlePayAtOffice = () => {
  savePaymentStatus(id, "Unpaid");
  saveRentSummary(id, totalDays, car.price, totalPrice);
  handleBookingSubmit();
};

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const totalDays = calculateDays();
  const totalPrice = totalDays * car.price;
  const handleEsewa = () => {
  navigate("/esewa", {
    state: {
      amount: totalPrice,
      carName: car.name,
      pickup: pickupDate.toISOString(),
      dropoff: dropoffDate.toISOString(),
      carId: id,
    },
  });
};

  return (
    <div className="summary-container">
      <div className="summary-card">
        <div
          className="summary-cover"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${car.image})`,
          }}
        >
          <h2>{car.name}</h2>
        </div>

        <div className="summary-content">
          <div className="summary-row">
            <User size={20} />
            <span><strong>Renter:</strong> Nishant Shrestha</span>
          </div>

          <div className="summary-row">
            <CarFront size={20} />
            <span><strong>Vehicle No:</strong> {car.vehicle_no}</span>
          </div>

          <div className="summary-row">
            <CalendarDays size={20} />
            <span><strong>From:</strong> {formatDate(state.dateRange.from)}</span>
          </div>

          <div className="summary-row">
            <CalendarDays size={20} />
            <span><strong>To:</strong> {formatDate(state.dateRange.to)}</span>
          </div>

          <div className="summary-row">
            <Clock size={20} />
            <span><strong>Days:</strong> {totalDays}</span>
          </div>

          <div className="summary-row">
            <IndianRupee size={20} />
            <span><strong>Rate/day:</strong> Nrs. {car.price}</span>
          </div>

          <div className="summary-total">
            <strong>Total:</strong> Nrs. {totalPrice}
          </div>

          <div className="payment-options">
            <h3>Choose Payment Method</h3>
              <button
                className="esewa-btn"
                onClick={() => {
                  savePaymentStatus(id, "Paid");
                  saveRentSummary(id, totalDays, car.price, totalPrice);
                  navigate("/esewa", {
                    state: {
                      carId: id,
                      pickup: state.dateRange.from.toISOString().slice(0, 10), // 'YYYY-MM-DD'
                      dropoff: state.dateRange.to.toISOString().slice(0, 10),
                      amount: totalPrice,
                      carName: car.name,
                    },
                  });
                }}
              >
                Pay with eSewa
              </button>



            <button className="office-btn" onClick={handlePayAtOffice}>
              Pay at Office
            </button>
          </div>

          <div className="summary-footer">
            <button onClick={() => navigate(-1)} className="back-btn">
              <ArrowLeft size={16} /> Back
            </button>
          </div>
        </div>
      </div>

      {/* 👉 MODAL GOES HERE */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>🎉 Booking Confirmed!</h2>
            <p>Your booking for <strong>{car.name}</strong> has been successfully recorded.</p>
            <p>Please visit our office to complete the payment.</p>

            <div className="modal-buttons">
              <button onClick={() => navigate("/")}>Go to Home</button>
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

};


export default RentSummary;
