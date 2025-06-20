import React, { useState } from "react";
import "./details.css";
import carImage from "../../assets/suv.jpg";
import { CalendarDays, Fuel, Settings, Users, MoveRight, Snowflake } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CarDetails = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const today = new Date();
  const oneWeekLater = new Date();
  oneWeekLater.setDate(today.getDate() + 6);

  return (
    <section className="car-details-section">
      <div className="car-details-container">
        {/* Left Section */}
        <div className="car-left">
          <h2>Hyundai Creta</h2>
          <p className="price">Nrs. 2500 <span>/ day</span></p>
          <div className="main-img-box">
            <img src={carImage} alt="Hyundai Creta" className="main-img" />
          </div>
          <div className="thumbs">
            <img src={carImage} alt="thumb1" />
            <img src={carImage} alt="thumb2" />
            <img src={carImage} alt="thumb3" />
          </div>
        </div>

        {/* Right Section */}
        <div className="car-right">
          <h3>Technical Specification</h3>
          <div className="tech-grid">
            <div className="tech-box">
              <Settings size={20} />
              <p>Gear Box<br /><strong>Automat</strong></p>
            </div>
            <div className="tech-box">
              <Fuel size={20} />
              <p>Fuel<br /><strong>Petrol</strong></p>
            </div>
            <div className="tech-box">
              <MoveRight size={20} />
              <p>Doors<br /><strong>4</strong></p>
            </div>
            <div className="tech-box">
              <Snowflake size={20} />
              <p>Air Conditioner<br /><strong>Yes</strong></p>
            </div>
            <div className="tech-box">
              <Users size={20} />
              <p>Seats<br /><strong>5</strong></p>
            </div>
            <div className="tech-box">
              <CalendarDays size={20} />
              <p>Distance<br /><strong>500</strong></p>
            </div>
          </div>

          <h4>Car Equipment</h4>
          <div className="equipment-wrap">
            <span>✅ ABS</span>
            <span>✅ Seat Belt Warning</span>
            <span>✅ Cruise Control</span>
            <span>✅ Air Conditioner</span>
            <span>✅ Air Bags</span>
            <span>✅ GPS Navigation System</span>
          </div>

          <div className="date-section">
            <h4>Select Dates</h4>
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(dates) => {
                const [start, end] = dates;
                setStartDate(start);
                setEndDate(end);
              }}
              minDate={today}
              maxDate={oneWeekLater}
              dateFormat="MMMM d, yyyy"
              inline
            />
            {startDate && endDate && (
              <p><strong>Total Days:</strong> {calculateDays()} day(s)</p>
            )}
          </div>

          <div className="btn-group">
            <button className="rent">Rent a car</button>
            <button className="back">Back</button>
          </div>
        </div>
      </div>

      <div className="reviews">
        <h3>Reviews <span className="review-count">13</span></h3>
        <div className="review-box">
          <p><strong>Ramesh Shrestha</strong></p>
          <p>We are very happy with the service from the Go Moto. Go Moto has a low price and also a large variety of cars with good and comfortable facilities.</p>
          <p>⭐⭐⭐⭐</p>
        </div>
        <div className="review-box">
          <p><strong>Prisha Shrestha</strong></p>
          <p>We are greatly helped by the services of the Go Moto. Go Moto has low prices and the service provided by the officers is also very friendly.</p>
          <p>⭐⭐⭐⭐</p>
        </div>
        <p className="show-all">Show All ▼</p>
      </div>

      <div className="you-may-like">
        <h3>You may also like</h3>
        <div className="card-list">
          <div className="card">
            <img src={carImage} alt="Porsche" />
            <h4>Porsche</h4>
            <p>Nrs.2500 <span>per day</span></p>
            <div className="icons">
              <p>⚙ Automat</p>
              <p>❄ Air Conditioner</p>
            </div>
            <button>View Details</button>
          </div>
          <div className="card">
            <img src={carImage} alt="Toyota" />
            <h4>Toyota</h4>
            <p>Nrs.2500 <span>per day</span></p>
            <div className="icons">
              <p>⚙ Manual</p>
              <p>❄ Air Conditioner</p>
            </div>
            <button>View Details</button>
          </div>
          <div className="card">
            <img src={carImage} alt="Porsche" />
            <h4>Porsche</h4>
            <p><span>Per day</span></p>
            <div className="icons">
              <p>⚙ Automat</p>
              <p>❄ Air Conditioner</p>
            </div>
            <button>View Details</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarDetails;
