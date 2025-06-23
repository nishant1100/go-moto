import { differenceInCalendarDays, format } from "date-fns";
import {
  CalendarDays,
  Fuel,
  MoveRight,
  Settings,
  Snowflake,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./details.module.css";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [mainImg, setMainImg] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [recommendations, setRecommendations] = useState([]);

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  useEffect(() => {
    // Reset UI state when car ID changes
    setCar(null);
    setMainImg(null);
    setModalImage(null);
    setIsModalOpen(false);
    setRange({ from: undefined, to: undefined });

    const fetchCarDetails = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/cars/${id}/`);
        const data = await res.json();
        setCar(data);
        setMainImg(`http://127.0.0.1:8000${data.image}`);
        setModalImage(`http://127.0.0.1:8000${data.image}`);
        console.log("Fetched car details:", data);
        if (data.images) {
          data.images = data.images.map((img) => `http://127.0.0.1:8000${img}`);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.error("Error fetching car details:", err);
      }
    };

    fetchCarDetails();

  }, [id]);


  useEffect(() => {
    const fetchRecommendedCars = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/cars/?availability=available`);
        const data = await res.json();
        setRecommendations(data.cars.filter(c => c.id !== parseInt(id))); // exclude current car
      } catch (err) {
        console.error("Failed to fetch recommendations:", err);
      }
    };

    fetchRecommendedCars();
  }, [id]);

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

  if (!car) return <p>Loading car details...</p>;

  return (
    <section className={styles.carDetails}>
      <div className={styles.topSection}>
        {/* Left Panel */}
        <div className={styles.leftPanel}>
          <h1>{car.name}</h1>
          <p className={styles.price}>
            Nrs. <span>{car.price}</span> / day
          </p>
          <div className={styles.carImgContainer}>
            <img
              src={mainImg}
              alt={car.name}
              className={styles.mainCarImg}
              onClick={() => openModal(mainImg)}
            />
            <div className={styles.thumbnails}>
              {car.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  onClick={() => {
                    setMainImg(img);
                    openModal(img);
                  }}
                />
              ))}
            </div>

          </div>

          {/* Image Modal */}
          {isModalOpen && (
            <div className={styles.modalOverlay} onClick={closeModal}>
              <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={modalImage}
                  alt="Preview"
                  className={styles.modalMainImage}
                />
                <div className={styles.modalThumbnails}>
                  {car.images?.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`modal-thumb-${idx}`}
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
            <div><Settings size={18} /> <p>Gear Box<br /><strong>{car.transmission || "-"}</strong></p></div>
            <div><Fuel size={18} /> <p>Fuel<br /><strong>{car.fuel || "-"}</strong></p></div>
            <div><MoveRight size={18} /> <p>Doors<br /><strong>{car.doors || "-"}</strong></p></div>
            <div><Snowflake size={18} /> <p>AC<br /><strong>{car.ac ? "Yes" : "No"}</strong></p></div>
            <div><Users size={18} /> <p>Seats<br /><strong>{car.seats || "-"}</strong></p></div>
            <div><CalendarDays size={18} /> <p>Distance<br /><strong>{car.mileage} km</strong></p></div>
          </div>


          <h3>Car Equipment</h3>
          <div className={styles.equipmentList}>
            {car.equipment?.length > 0 ? (
              car.equipment.map((eq, idx) => (
                <span key={idx}>{eq}</span>
              ))
            ) : (
              <span>No equipment data available.</span>
            )}
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
              Total Days: <strong>{calculateDays()}</strong>
              <br />
              From: {format(range.from, "MMMM d, yyyy")}
              <br />
              To: {format(range.to, "MMMM d, yyyy")}
            </p>
          )}

          <div className={styles.btnWrapper}>
            <button className={styles.rentBtn}
              onClick={() =>
                navigate(`/rent-summary/${car.id}`, {
                  state: {
                    carId: car.id,
                    dateRange: range,
                  },
                })
              }
            >Rent a car</button>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </div>
      </div>



      {/* Reviews Section */}
      <div className={styles.reviewsSection}>
        <h2>
          Reviews <span className={styles.countBadge}>13</span>
        </h2>
        <div className={styles.reviewCard}>
          <strong>Ramesh Shrestha</strong>
          <p>
            We are very happy with the service from the Go Moto. Go Moto has a
            low price and also a large variety of cars with good and comfortable
            facilities.
          </p>
          <p>⭐⭐⭐⭐</p>
        </div>
        <div className={styles.reviewCard}>
          <strong>Prisha Shrestha</strong>
          <p>
            We are greatly helped by the services of Go Moto. Go Moto has low
            prices and the service provided by the officers is also very
            friendly.
          </p>
          <p>⭐⭐⭐⭐</p>
        </div>
        <p className={styles.showMore}>Show All ▼</p>
      </div>

      {/* You May Also Like Section */}
      <div className={styles.recommendSection}>
        <h2>You may also like</h2>
        {recommendations.length === 0 ? (
          <p className={styles.placeholder}>No recommendations available.</p>
        ) : (
          <div className={styles.recommendSlider}>
            {recommendations.map((car) => (
              <div className={styles.carRecommendationCard} key={car.id}>
                <img src={`http://127.0.0.1:8000${car.image}`} alt={car.name} />
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
                <p className={`${styles.availability} ${car.available ? styles.available : styles.unavailable}`}>
                  {car.available ? "Available" : "Unavailable"}
                </p>
                <button
                  className={styles.viewDetailsBtn}
                  onClick={() => navigate(`/car-details/${car.id}`)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CarDetails;
