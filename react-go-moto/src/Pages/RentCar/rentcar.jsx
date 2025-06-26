import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./rentcar.css";

const RentCars = () => {
  const navigate = useNavigate();

  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: [],
    location: [],
    availableOnly: false,
  });

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        let query = [];

        if (filters.type.length > 0) {
          query.push(`type=${filters.type.join('&type=')}`);
        }
        if (filters.location.length > 0) {
          query.push(`car_location=${filters.location.join('&car_location=')}`);
        }
        if (filters.availableOnly) {
          query.push(`availability=available`);
        }

        const url = `http://127.0.0.1:8000/api/cars/?${query.join('&')}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("Fetched car data:", data.cars);
        setCarData(data.cars);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch car data:", err);
      }
    };

    fetchData();
  }, [filters]);

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "availableOnly") {
      setFilters((prev) => ({ ...prev, availableOnly: checked }));
    } else {
      setFilters((prev) => {
        const updated = checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value);
        return { ...prev, [name]: updated };
      });
    }
  };

  const handleViewDetails = (car) => {
    const slug = car.name.toLowerCase().replace(/\s+/g, "-");
    console.log("Navigating to car details for:", car.id);
    navigate(`/car-details/${car.id}`);

  };

  return (
    <section className="rent-section">
      <h2>Select your car for rent</h2>
      <p>Find the perfect car for your needs.</p>
      <div className="rent-container">
        {/* Filter Sidebar */}
        <div className="search-container">
          <h3>Search Filters</h3>
          <form>
            {/* Car Type */}
            <label className="filter-heading">Car Type</label>
            {["Sedan", "Sports", "SUV", "EV"].map((type) => (
              <label className="checkbox-label" key={type}>
                <input
                  type="checkbox"
                  name="type"
                  value={type}
                  checked={filters.type.includes(type)}
                  onChange={handleCheckboxChange}
                />
                {type}
              </label>
            ))}

            {/* Location */}
            <label className="filter-heading">Location</label>
            {["Kathmandu", "Bhaktapur", "Pokhara", "Lalitpur"].map((loc) => (
              <label className="checkbox-label" key={loc}>
                <input
                  type="checkbox"
                  name="location"
                  value={loc}
                  checked={filters.location.includes(loc)}
                  onChange={handleCheckboxChange}
                />
                {loc}
              </label>
            ))}

            {/* Availability */}
            <label className="filter-heading checkbox-label">
              <input
                type="checkbox"
                name="availableOnly"
                checked={filters.availableOnly}
                onChange={handleCheckboxChange}
              />
              Available Only
            </label>
          </form>
        </div>

        {/* Car Cards */}
        <div className="car-grid">
          {loading ? (
            <p>Loading cars...</p>
          ) : carData.length > 0 ? (
            carData.map((car, index) => (
              <div className="car-card" key={index}>
                <img
                  src={car.image ? `http://127.0.0.1:8000${car.image}` : require("../../assets/hyundai.png")}
                  alt={car.name}
                  className="car-image1"
                />

                <div className="car-info">
                  <div className="car-header">
                    <h4>{car.name}</h4>
                    <span className="car-price">Nrs. {car.price} / day</span>
                  </div>
                  <div className="car-meta">
                    <span>{car.type}</span>
                    <span>{car.transmission}</span>
                  </div>
                  <div className="car-availability">
                    {car.available ? (
                      <span className="available">Available</span>
                    ) : (
                      <span className="unavailable">Unavailable</span>
                    )}
                  </div>
                  <button
                    className="view-btn"
                    onClick={() => handleViewDetails(car)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No cars match your search criteria.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default RentCars;
