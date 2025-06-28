import React, { useState } from 'react';
import './userprofile.css';

const UserProfile = () => {
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
    // TODO: Validation and integration
    console.log('Profile updated:', formData);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
  <div className="cover-section"></div> {/* New cover background */}

  <div className="avatar-section">
    <label htmlFor="avatar-upload" className="avatar-label">
      <div className="avatar-border"> {/* Gradient ring */}
        <img
          src={formData.avatar || "/src/assets/userprofile.jpg"}
          alt="User Avatar"
          className="avatar-image"
        />
      </div>
      <span className="edit-avatar" title="Change Picture">✎</span>
    </label>
    <input
      type="file"
      id="avatar-upload"
      accept="image/*"
      style={{ display: 'none' }}
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFormData({ ...formData, avatar: reader.result });
          };
          reader.readAsDataURL(file);
        }
      }}
    />
  </div>

  <h2 className="username">Edit Profile</h2>
</div>


        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New password"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
            />
          </div>
          <div className="form-group">
          <label>Driving License</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setFormData({ ...formData, licenseFront: reader.result });
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
          <p className="verify-note">
            ⚠️ Please upload your driving license for verification. You won't be able to rent a car until this step is complete.
          </p>
          <button type="submit" className="save-button">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
