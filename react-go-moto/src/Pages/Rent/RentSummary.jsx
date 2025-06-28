import axios from 'axios';
import {
  ArrowLeft,
  CalendarDays,
  CarFront,
  Clock,
  IndianRupee,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./RentSummary.css";

const RentSummary = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [showModal, setShowModal] = useState(false);



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
  const handleBookingSubmit = async () => {
    try {
      const bookingData = {
        pickup_datetime: pickupDate.toISOString(),
        dropoff_datetime: dropoffDate.toISOString(),
        payment_method: selectedPaymentMethod, // "esewa" or "office"
      };

      const response = await axios.post(
        `http://127.0.0.1:8000/api/book-car/${carId}/`,
        bookingData,
        {
          withCredentials: true,  // This is the key part!
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      alert(response.data.message);
      setShowModal(true);
    } catch (err) {
      if (err.response?.data?.error) {
        alert(err.response.data.error);
      } else {
        alert("Booking failed. Please try again later.");
      }
    }
  };


  // On confirm payment
  const handlePayAtOffice = () => {
    handleBookingSubmit();
    // You can also call API to store booking here
    setShowModal(true);
  };






  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const totalDays = calculateDays();
  const totalPrice = totalDays * car.price;

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
            <button className="esewa-btn">Pay with eSewa</button>
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
