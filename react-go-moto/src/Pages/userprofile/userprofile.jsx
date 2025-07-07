import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userprofile.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEye, FiEyeOff } from "react-icons/fi";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
    avatar: '',
    licenseFront: '',
  });

  const [loading, setLoading] = useState(true);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [licenseLoading, setLicenseLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

useEffect(() => {
  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const res = await axios.get('http://localhost:8000/api/profile/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const userEmail = res.data.email;
      localStorage.setItem('logged_in_email', userEmail); // Save for later use

      setFormData((prev) => ({
        ...prev,
        name: res.data.username || '',
        email: userEmail || '',
        avatar: localStorage.getItem(`user_avatar_${userEmail}`) || '/src/assets/userprofile.jpg',
        licenseFront: localStorage.getItem(`user_license_${userEmail}`) || '',
      }));

      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  fetchUserProfile();
}, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert("You are not authenticated.");
      return;
    }

    const payload = {
      username: formData.name,
      email: formData.email,
      avatar: formData.avatar?.startsWith("data:image") ? formData.avatar : undefined,
      license_front: formData.licenseFront,
    };

    if (formData.newPassword) {
      payload.password = formData.newPassword;
    }

try {
  const res = await axios.put("http://localhost:8000/api/profile/update/", payload, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });

  setFormData((prevData) => ({
    ...prevData,
    avatar: res.data.avatar
  }));

  toast.success("✅ Profile updated successfully!", {
    position: "top-right",
    autoClose: 3000,
  });
} catch (error) {
  console.error("Error updating profile:", error.response?.data || error);
  toast.error("❌ Failed to update profile.", {
    position: "top-center",
    autoClose: 3000,
  });
}

  };

  if (loading) {
    return <p style={{ textAlign: 'center' }}>Loading your profile...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="cover-section"></div>

          <div className="avatar-section">
<div className="avatar-label">
  <div className="avatar-border">
    <img
      src={
        formData.avatar && formData.avatar.startsWith("data:image")
          ? formData.avatar
          : formData.avatar || '/src/assets/userprofile.jpg'
      }
      alt="User Avatar"
      className="avatar-image"
      onClick={() => setIsAvatarModalOpen(true)}
      style={{ cursor: 'pointer' }}
    />
  </div>

  <label htmlFor="avatar-upload" className="edit-avatar" title="Change Picture">
    ✎
  </label>
</div>

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
        const base64Image = reader.result;
        const userEmail = formData.email;
        setFormData((prev) => ({ ...prev, avatar: base64Image }));
        localStorage.setItem(`user_avatar_${userEmail}`, base64Image);
      };
      reader.readAsDataURL(file);
    }
  }}

/>

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
                    const base64Image = reader.result;
                    setFormData((prev) => ({ ...prev, avatar: base64Image }));
                    localStorage.setItem("user_avatar", base64Image);
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

<div className="form-container">
  <div className="form-group password-field">
    <label>New Password</label>
    <div className="password-wrapper">
      <input
        type={showNewPassword ? "text" : "password"}
        name="newPassword"
        value={formData.newPassword}
        onChange={handleChange}
        placeholder="New password"
      />
      <span
        className="toggle-visibility"
        onClick={() => setShowNewPassword(!showNewPassword)}
      >
        {showNewPassword ? <FiEye /> : <FiEyeOff />}
      </span>
    </div>
  </div>
  <div className="form-group password-field">
    <label>Confirm Password</label>
    <div className="password-wrapper">
      <input
        type={showConfirmPassword ? "text" : "password"}
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm password"
      />
      <span
        className="toggle-visibility"
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      >
        {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
      </span>
    </div>
  </div>
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
                      const base64License = reader.result;
                      const userEmail = formData.email;
                      setLicenseLoading(true);
                      setTimeout(() => {
                        setFormData((prev) => ({ ...prev, licenseFront: base64License }));
                        localStorage.setItem(`user_license_${userEmail}`, base64License);
                        setLicenseLoading(false);
                      }, 1500);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
            />
          </div>

          {licenseLoading ? (
            <p className="verify-note loading">🔄 Uploading license, please wait...</p>
          ) : formData.licenseFront ? (
            <div className="verification-success">
              <p className="verify-note success">✅ Congratulations on your verification.</p>
              <div className="license-preview">
                <p>Your Driving License:</p>
                <img
                  src={formData.licenseFront}
                  alt="Uploaded License"
                  className="license-image"
                  onClick={() => setIsLicenseModalOpen(true)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
          ) : (
            <p className="verify-note warning">
              ⚠️ Please upload your driving license for verification. You won't be able to rent a car until this step is complete.
            </p>
          )}

          <button type="submit" className="save-button">Save Changes</button>
        </form>
      </div>

      {isLicenseModalOpen && (
        <div className="modal-overlay" onClick={() => setIsLicenseModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-modal" onClick={() => setIsLicenseModalOpen(false)}>&times;</span>
            <img src={formData.licenseFront} alt="Large License" className="modal-image" />
          </div>
        </div>
      )}

{isAvatarModalOpen && (
  <div className="modal-overlay" onClick={() => setIsAvatarModalOpen(false)}>
    <div className="modal-content avatar-modal" onClick={(e) => e.stopPropagation()}>
      <span className="close-modal" onClick={() => setIsAvatarModalOpen(false)}>&times;</span>
      <img
        src={formData.avatar}
        alt="Avatar Preview"
        className="modal-avatar-image"
      />
    </div>
  </div>
)}

    </div>
  );
};

export default UserProfile;
