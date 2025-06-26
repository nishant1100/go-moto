import React, { useState } from 'react';
import './userprofile.css';

const userprofile = () => {
  const [formData, setFormData] = useState({
    name: 'Your name',
    email: 'yourname@gmail.com',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add form validation & API integration
    console.log('Profile updated:', formData);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <button className="close-btn">×</button>
        <div className="profile-header">
          <div className="avatar-container">
            <div className="avatar-icon">👤</div>
            <div className="edit-icon">✎</div>
          </div>
          <h3 className="username">{formData.name}</h3>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <span>{formData.name}</span>
          </div>

          <div className="form-group">
            <label>Email account</label>
            <span>{formData.email}</span>
          </div>

          <div className="form-group">
            <label>New password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="save-button">
            Save Change
          </button>
        </form>
      </div>
    </div>
  );
};

export default userprofile;
