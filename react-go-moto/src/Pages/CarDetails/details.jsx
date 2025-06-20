import React, { useState } from "react";
import styles from "./details.module.css";
import carImage from "../../assets/suv.jpg";
import { CalendarDays, Fuel, Settings, Users, MoveRight, Snowflake } from "lucide-react";
import { format, differenceInCalendarDays } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const CarDetails = () => {
  const [range, setRange] = useState({ from: undefined, to: undefined });

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  const calculateDays = () => {
    if (!range.from || !range.to) return 0;
    return differenceInCalendarDays(range.to, range.from) + 1;
  };

  return (
    <section className={styles.carDetails}>
      <div className={styles.topSection}>
        {/* Left Panel */}
        <div className={styles.leftPanel}>
          <h1>Hyundai Creta</h1>
          <p className={styles.price}>Nrs. <span>2500</span> / day</p>
          <div className={styles.carImgContainer}>
            <img src={carImage} alt="Hyundai Creta" className={styles.mainCarImg} />
          </div>
          <div className={styles.thumbnails}>
            {[1, 2, 3].map((_, i) => (
              <img key={i} src={carImage} alt={`thumb-${i}`} />
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className={styles.rightPanel}>
          <h2>Technical Specification</h2>
          <div className={styles.specsGrid}>
            <div><Settings size={18} /> <p>Gear Box<br /><strong>Automat</strong></p></div>
            <div><Fuel size={18} /> <p>Fuel<br /><strong>Petrol</strong></p></div>
            <div><MoveRight size={18} /> <p>Doors<br /><strong>4</strong></p></div>
            <div><Snowflake size={18} /> <p>AC<br /><strong>Yes</strong></p></div>
            <div><Users size={18} /> <p>Seats<br /><strong>5</strong></p></div>
            <div><CalendarDays size={18} /> <p>Distance<br /><strong>500</strong></p></div>
          </div>

          <h3>Car Equipment</h3>
          <div className={styles.equipmentList}>
            {["ABS", "Seat Belt Warning", "Cruise Control", "Air Conditioner", "Air Bags", "GPS Navigation System"].map((eq, idx) => (
              <span key={idx}>✅ {eq}</span>
            ))}
          </div>

          <h3>Select Dates</h3>
          <div className={styles.customCalendar}>
            <DayPicker
              mode="range"
              selected={range}
              onSelect={(selectedRange) => {
                if (
                  selectedRange?.from &&
                  selectedRange?.to &&
                  differenceInCalendarDays(selectedRange.to, selectedRange.from) > 6
                ) {
                  alert("You can only rent for up to 7 days.");
                  return;
                }
                setRange(selectedRange);
              }}
              disabled={{
                before: today,
                after: maxDate,
              }}
              defaultMonth={today}
              numberOfMonths={1}
            />
          </div>

          {range.from && range.to && (
            <p className={styles.daysSelected}>
              Total Days: <strong>{calculateDays()}</strong><br />
              From: {format(range.from, "MMMM d, yyyy")}<br />
              To: {format(range.to, "MMMM d, yyyy")}
            </p>
          )}

          <div className={styles.btnWrapper}>
            <button className={styles.rentBtn}>Rent a car</button>
            <button className={styles.backBtn}>Back</button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className={styles.reviewsSection}>
        <h2>Reviews <span className={styles.countBadge}>13</span></h2>
        <div className={styles.reviewCard}>
          <strong>Ramesh Shrestha</strong>
          <p>We are very happy with the service from the Go Moto. Go Moto has a low price and also a large variety of cars with good and comfortable facilities.</p>
          <p>⭐⭐⭐⭐</p>
        </div>
        <div className={styles.reviewCard}>
          <strong>Prisha Shrestha</strong>
          <p>We are greatly helped by the services of Go Moto. Go Moto has low prices and the service provided by the officers is also very friendly.</p>
          <p>⭐⭐⭐⭐</p>
        </div>
        <p className={styles.showMore}>Show All ▼</p>
      </div>

      {/* You May Also Like Section */}
      <div className={styles.recommendSection}>
        <h2>You may also like</h2>
        <div className={styles.carCards}>
          {[
            { name: "Porsche", gear: "Automat" },
            { name: "Toyota", gear: "Manual" },
            { name: "Suzuki", gear: "Manual" },
          ].map((car, index) => (
            <div className={styles.carCard} key={index}>
              <img src={carImage} alt={car.name} />
              <h4>{car.name}</h4>
              <p>Nrs. 2500 <span>per day</span></p>
              <div className={styles.cardIcons}>
                <p>⚙ {car.gear}</p>
                <p>❄ Air Conditioner</p>
              </div>
              <button className={styles.cardBtn}>View Details</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarDetails;
