
import React, { useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const [showPasswords, setShowPasswords] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Hook to programmatically redirect


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // clear field-specific error
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Full Name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    if (!formData.password) newErrors.password = 'Password is required.';
    if (formData.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters.';
    if (formData.password !== formData.password2)
      newErrors.password2 = 'Passwords do not match.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  setSuccessMessage('');
  if (!validateForm()) return;

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/register/', formData);
    setSuccessMessage(response.data.message);
    setErrors({});
    setFormData({
      username: '',
      email: '',
      password: '',
      password2: '',
    });

    // 🔁 Redirect to login page after a short delay
    setTimeout(() => navigate('/login'), 1000);
  } catch (error) {
    if (error.response && error.response.data) {
      const backendErrors = error.response.data;
      const fieldErrors = {};
      for (const key in backendErrors) {
        fieldErrors[key] = backendErrors[key][0];
      }
      setErrors(fieldErrors);
    } else {
      alert('Something went wrong. Try again.');
    }
  }
};


  return (
    <div className="signup-container">
      {/* Background Video */}
      <video autoPlay muted loop className="bg-video">
        <source src="/videos/login_vdo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="signup-overlay">
        {/* Left Side Tagline */}
        <div className="text-overlay">
          <h1>
            Drive your way with <span className="gomoto">GO MOTO</span>
          </h1>
        </div>

        {/* Right Side Form */}
        <div className="signup-form">
          <h2>Sign Up</h2>

          {successMessage && <p className="success">{successMessage}</p>}

          <form onSubmit={handleSubmit}>
            <input
              name="username"
              type="text"
              placeholder="Full Name"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <p className="error">{errors.username}</p>}

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <input
              name="password"
              type={showPasswords ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}

            <input
              name="password2"
              type={showPasswords ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={formData.password2}
              onChange={handleChange}
              required
            />
            {errors.password2 && <p className="error">{errors.password2}</p>}

            {/* Show Passwords Toggle */}
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="showPasswords"
                checked={showPasswords}
                onChange={() => setShowPasswords(!showPasswords)}
              />
              <label htmlFor="showPasswords">Show Passwords</label>
            </div>

            <button type="submit">Register</button>

            <p className="login-link">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
