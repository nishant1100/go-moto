import { CheckCircle } from "lucide-react";
import "./RentSummary.css"; 

const RentSummary = ({ car, onCancel, onBack }) => {
  return (
    <div className="container">
      <h2>Your Rent</h2>
      <div className="card">
        <div className="leftSection">
          <h3>{car.name}</h3>
          <div className="mainImage" />
          <div className="thumbnailRow">
            {car.images.map((img, i) => (
              <img key={i} src={img} alt={`thumb-${i}`} />
            ))}
          </div>
          <p className="description">Vehicles Description Here</p>
        </div>

        <div className="rightSection">
          <p>
            <strong>Price:</strong> <span className="blue">Nrs. {car.price}</span> / day
          </p>
          <p>
            <strong>Vehicle's No. :</strong> <span className="blue">{car.vehicle_no}</span>
          </p>
          <p>
            <strong>Fuel Type:</strong> <span className="blue">{car.fuel}</span>
          </p>
          <p>
            <strong>Seating Capacity:</strong> <span className="blue">{car.seats}</span>
          </p>
          <p>
            <strong>Air Conditioner:</strong> <span className="blue">{car.ac ? "Yes" : "No"}</span>
          </p>
          <p>
            <strong>Payment Status:</strong> <span className="blue">Pending</span>
          </p>
          <p>
            <strong>Car Rented Duration:</strong> <span className="blue">In Days</span>
          </p>

          <p><strong>Car Equipment</strong></p>
          <div className="equipmentGrid">
            {car.equipment.map((item, i) => (
              <div key={i} className="equipmentItem">
                <CheckCircle size={16} className="checkIcon" /> {item}
              </div>
            ))}
          </div>

          <div className="buttonRow">
            <button className="cancelBtn" onClick={onCancel}>Cancel this rent</button>
            <button className="backBtn" onClick={onBack}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentSummary;
