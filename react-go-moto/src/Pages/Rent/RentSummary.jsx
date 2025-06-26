import { useLocation, useParams, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import "./RentSummary.css";

const RentSummary = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/cars/${id}/`);
        const data = await res.json();
        if (data.images) {
          data.images = data.images.map((img) => `http://127.0.0.1:8000${img}`);
        }
        if (data.image) {
          data.image = `http://127.0.0.1:8000${data.image}`;
        }
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
    const diff = (to - from) / (1000 * 60 * 60 * 24) + 1;
    return diff;
  };

  const totalDays = calculateDays();
  const totalPrice = totalDays * car.price;

  return (
    <div className="container">
      <h2>Your Rent Summary</h2>
      <div className="card">
        <div className="leftSection">
          <h3>{car.name}</h3>

          <div
            className="mainImage"
            style={{
              backgroundImage: `url(${car.image || "/fallback.jpg"})`,
            }}
          ></div>

          <div className="thumbnailRow">
            {car.images?.length > 0 ? (
              car.images.map((img, i) => (
                <img key={i} src={img} alt={`thumb-${i}`} />
              ))
            ) : (
              <p>No additional images</p>
            )}
          </div>

          <p className="description">{car.description || "No description provided."}</p>
        </div>

        <div className="rightSection">
          <p>
            <strong>Price:</strong> <span className="blue">Nrs. {car.price}</span> / day
          </p>
          <p>
            <strong>Vehicle No.:</strong> <span className="blue">{car.vehicle_no}</span>
          </p>
          <p>
            <strong>Fuel Type:</strong> <span className="blue">{car.fuel}</span>
          </p>
          <p>
            <strong>Seats:</strong> <span className="blue">{car.seats}</span>
          </p>
          <p>
            <strong>AC:</strong> <span className="blue">{car.ac ? "Yes" : "No"}</span>
          </p>
          <p>
            <strong>Rent Duration:</strong> <span className="blue">{totalDays} day(s)</span>
          </p>
          <p>
            <strong>Total Price:</strong> <span className="blue">Nrs. {totalPrice}</span>
          </p>

          <p><strong>Car Equipment:</strong></p>
          {car.equipment?.length > 0 ? (
            <div className="equipmentGrid">
              {car.equipment.map((item, i) => (
                <div key={i} className="equipmentItem">
                  <CheckCircle size={16} className="checkIcon" /> {item}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-equipment">No equipment listed.</p>
          )}

          <div className="buttonRow">
            <button className="cancelBtn" onClick={() => navigate("/")}>Cancel</button>
            <button className="backBtn" onClick={() => navigate(-1)}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentSummary;
