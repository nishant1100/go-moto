import React, { useState } from "react";
import styles from "./details.module.css";
import { CalendarDays, Fuel, Settings, Users, MoveRight, Snowflake } from "lucide-react";
import { format, differenceInCalendarDays } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

// ✅ Main image shown on top
import mainImage from "../../assets/hyundai.png";

// ✅ Mini thumbnail images
import carImage1 from "../../assets/carImage.png";
import carImage2 from "../../assets/carImage2.png";
import carImage3 from "../../assets/carImage3.png";

const images = [carImage1, carImage2, carImage3];

const CarDetails = () => {
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [mainImg, setMainImg] = useState(mainImage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(mainImage);

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  const calculateDays = () => {
    if (!range.from || !range.to) return 0;
    return differenceInCalendarDays(range.to, range.from) + 1;
  };

  const openModal = (img) => {
    setModalImage(img);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className={styles.carDetails}>
      <div className={styles.topSection}>
        {/* Left Panel */}
        <div className={styles.leftPanel}>
          <h1>Hyundai Creta</h1>
          <p className={styles.price}>
            Nrs. <span>2500</span> / day
          </p>
          <div className={styles.carImgContainer}>
            <img
              src={mainImg}
              alt="Hyundai Creta"
              className={styles.mainCarImg}
              onClick={() => openModal(mainImg)}
            />
            <div className={styles.thumbnails}>
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  onClick={() => {
                    openModal(img);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Image Modal */}
          {isModalOpen && (
            <div className={styles.modalOverlay} onClick={closeModal}>
              <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <img src={modalImage} alt="Preview" className={styles.modalMainImg} />
                <div className={styles.modalThumbnails}>
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`modal-thumb-${i}`}
                      className={img === modalImage ? styles.activeThumb : ""}
                      onClick={() => setModalImage(img)}
                    />
                  ))}
                </div>
                <button onClick={closeModal} className={styles.modalCloseBtn}>
                  ×
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className={styles.rightPanel}>
          <h2>Technical Specification</h2>
          <div className={styles.specsGrid}>
            <div><Settings size={18} /> <p>Gear Box<br /><strong>Manual</strong></p></div>
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
        <div className={styles.cardGrid}>
          {[
            {
              name: "Hyundai Creta",
              price: 2500,
              type: "Sedan",
              transmission: "Automat",
              availability: true,
            },
            {
              name: "Mercedes",
              price: 3000,
              type: "Sport",
              transmission: "Manual",
              availability: true,
            },
            {
              name: "Mercedes",
              price: 2700,
              type: "Sedan",
              transmission: "Automat",
              availability: true,
            },
          ].map((car, idx) => (
            <div className={styles.carRecommendationCard} key={idx}>
              <img src={mainImage} alt={car.name} />
              <div className={styles.carTitleRow}>
                <h3>{car.name}</h3>
                <p className={styles.pricePerDay}>
                  Nrs. {car.price} <span>/ day</span>
                </p>
              </div>
              <div className={styles.carMeta}>
                <p>{car.type}</p>
                <p>{car.transmission}</p>
              </div>
              <p className={`${styles.availability} ${car.availability ? styles.available : styles.unavailable}`}>
                {car.availability ? "Available" : "Unavailable"}
              </p>
              <button className={styles.viewDetailsBtn}>View Details</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarDetails;
