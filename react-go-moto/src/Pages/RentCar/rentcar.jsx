import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./rentcar.css";
import carImage from "../../assets/suv.jpg";

const carData = [
  { name: "Hyundai Creta", type: "Sedan", price: 2500, transmission: "Automat", ac: true, location: "Kathmandu", available: true },
  { name: "Mercedes", type: "Sport", price: 3000, transmission: "Manual", ac: true, location: "Kathmandu", available: false },
  { name: "Mercedes", type: "Sedan", price: 2700, transmission: "Automat", ac: true, location: "Kathmandu", available: true },
  { name: "Porsche", type: "SUV", price: 3500, transmission: "Automat", ac: true, location: "Pokhara", available: false },
  { name: "Toyota", type: "Sedan", price: 2300, transmission: "Manual", ac: true, location: "Kathmandu", available: true },
  { name: "Porsche", type: "SUV", price: 3600, transmission: "Automat", ac: true, location: "Pokhara", available: true },
  { name: "Porsche", type: "Sport", price: 3600, transmission: "Automat", ac: true, location: "Pokhara", available: true },
  { name: "Porsche", type: "Sport", price: 3600, transmission: "Automat", ac: true, location: "Pokhara", available: false },
  { name: "Porsche", type: "SUV", price: 3600, transmission: "Automat", ac: true, location: "Pokhara", available: true },
];

const RentCars = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    type: [],
    location: [],
    availableOnly: false,
  });

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

  const filteredCars = carData.filter((car) => {
    const matchType = filters.type.length ? filters.type.includes(car.type) : true;
    const matchLocation = filters.location.length ? filters.location.includes(car.location) : true;
    const matchAvailable = filters.availableOnly ? car.available === true : true;
    return matchType && matchLocation && matchAvailable;
  });

  const handleViewDetails = (car) => {
    const slug = car.name.toLowerCase().replace(/\s+/g, "-"); // hyundai-creta
    navigate(`/car-details/${slug}`, { state: { car } });
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
            <label className="filter-heading">Car Type</label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="type"
                value="Sedan"
                checked={filters.type.includes("Sedan")}
                onChange={handleCheckboxChange}
              />
              Sedan
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="type"
                value="Sport"
                checked={filters.type.includes("Sport")}
                onChange={handleCheckboxChange}
              />
              Sport
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="type"
                value="SUV"
                checked={filters.type.includes("SUV")}
                onChange={handleCheckboxChange}
              />
              SUV
            </label>

            <label className="filter-heading">Location</label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="location"
                value="Kathmandu"
                checked={filters.location.includes("Kathmandu")}
                onChange={handleCheckboxChange}
              />
              Kathmandu
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="location"
                value="Pokhara"
                checked={filters.location.includes("Pokhara")}
                onChange={handleCheckboxChange}
              />
              Pokhara
            </label>

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
          {filteredCars.length > 0 ? (
            filteredCars.map((car, index) => (
              <div className="car-card" key={index}>
                <img src={carImage} alt={car.name} className="car-image1" />
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
