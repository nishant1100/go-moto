// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './userprofile.css';

// const UserProfile = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     newPassword: '',
//     confirmPassword: '',
//     avatar: '',
//     licenseFront: '',
//   });

//   const [loading, setLoading] = useState(true);

//   const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
//   const [licenseLoading, setLicenseLoading] = useState(false);


//   // Fetch profile on mount
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
//       if (!token) {
//         console.error('No token found');
//         return;
//       }

//       try {
//         const res = await axios.get('http://localhost:8000/api/profile/', {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         });

//         setFormData((prev) => ({
//           ...prev,
//           name: res.data.username || '',
//           email: res.data.email || '',
//           avatar: localStorage.getItem("user_avatar") || res.data.avatar || '',
//           licenseFront: localStorage.getItem("user_license") || res.data.license_front || '',
//  // Optional: if you return an avatar URL
//         }));

//         setLoading(false);
//       } catch (error) {
//         console.error('Failed to fetch profile:', error);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (formData.newPassword !== formData.confirmPassword) {
//     alert("Passwords do not match!");
//     return;
//   }

//   const token = localStorage.getItem('token');
//   if (!token) {
//     alert("You are not authenticated.");
//     return;
//   }

//   const payload = {
//     username: formData.name,
//     email: formData.email,
//     avatar: formData.avatar?.startsWith("data:image") ? formData.avatar : undefined,
//     license_front: formData.licenseFront,
//   };

//   if (formData.newPassword) {
//     payload.password = formData.newPassword;
//   }

//   try {
//     const res = await axios.put("http://localhost:8000/api/profile/update/", payload, {
//       headers: {
//         Authorization: `Token ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     setFormData((prevData) => ({
//   ...prevData,
//   avatar: res.data.avatar // update avatar from response
// }));
// alert("Profile updated successfully!");

//   } catch (error) {
//     console.error("Error updating profile:", error.response?.data || error);
//     alert("Failed to update profile.");
//   }
// };


//   if (loading) {
//     return <p style={{ textAlign: 'center' }}>Loading your profile...</p>;
//   }

//   return (
//     <div className="profile-container">
//       <div className="profile-card">
//         <div className="profile-header">
//           <div className="cover-section"></div>

//           <div className="avatar-section">
//             <label htmlFor="avatar-upload" className="avatar-label">
//               <div className="avatar-border">
//                 <img
//                   src={
//                     formData.avatar && formData.avatar.startsWith("data:image")
//                       ? formData.avatar
//                       : formData.avatar || '/src/assets/userprofile.jpg'
//                   }
//                   alt="User Avatar"
//                   className="avatar-image"
//                 />
//               </div>
//               <span className="edit-avatar" title="Change Picture">✎</span>
//             </label>
//             <input
//               type="file"
//               id="avatar-upload"
//               accept="image/*"
//               style={{ display: 'none' }}
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 if (file) {
//                   const reader = new FileReader();
//                   reader.onloadend = () => {
//                     const base64Image = reader.result;
//                     setFormData((prev) => ({ ...prev, avatar: base64Image }));
//                     localStorage.setItem("user_avatar", base64Image);  // ✅ Save to localStorage
//                   };
//                   reader.readAsDataURL(file);
//                 }
//               }}
//             />
//           </div>

//           <h2 className="username">Edit Profile</h2>
//         </div>

//         <form className="profile-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               placeholder="Enter your name"
//             />
//           </div>

//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               placeholder="Enter your email"
//             />
//           </div>

//           <div className="form-group">
//             <label>New Password</label>
//             <input
//               type="password"
//               name="newPassword"
//               value={formData.newPassword}
//               onChange={handleChange}
//               placeholder="New password"
//             />
//           </div>

//           <div className="form-group">
//             <label>Confirm Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               placeholder="Confirm password"
//             />
//           </div>

//           <div className="form-group">
//             <label>Driving License</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 if (file) {
//                   const reader = new FileReader();
//                   reader.onloadend = () => {
//                   const base64License = reader.result;

//                   setLicenseLoading(true); // start loading

//                   setTimeout(() => {
//                     setFormData((prev) => ({ ...prev, licenseFront: base64License }));
//                     localStorage.setItem("user_license", base64License);
//                     setLicenseLoading(false); // end loading
//                   }, 1500); // simulate 1.5 seconds of loading
//                 };
//                   reader.readAsDataURL(file);
//                 }
//               }}
//             />
//           </div>

//             {licenseLoading ? (
//               <p className="verify-note loading">🔄 Uploading license, please wait...</p>
//             ) : formData.licenseFront ? (
//               <div className="verification-success">
//                 <p className="verify-note success">✅ Congratulations on your verification.</p>
//                 <div className="license-preview">
//                   <p>Your Driving License:</p>
//                   <img
//                     src={formData.licenseFront}
//                     alt="Uploaded License"
//                     className="license-image"
//                     onClick={() => setIsLicenseModalOpen(true)}
//                     style={{ cursor: 'pointer' }}
//                   />
//                 </div>
//               </div>
//             ) : (
//               <p className="verify-note warning">
//                 ⚠️ Please upload your driving license for verification. You won't be able to rent a car until this step is complete.
//               </p>
//             )}
//           <button type="submit" className="save-button">
//             Save Changes
//           </button>
//         </form>
//       </div>
//       {isLicenseModalOpen && (
//   <div className="modal-overlay" onClick={() => setIsLicenseModalOpen(false)}>
//     <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//       <span className="close-modal" onClick={() => setIsLicenseModalOpen(false)}>&times;</span>
//       <img src={formData.licenseFront} alt="Large License" className="modal-image" />
//     </div>
//   </div>
// )}

//     </div>
//   );
  

// };

// export default UserProfile;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userprofile.css';

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

        setFormData((prev) => ({
          ...prev,
          name: res.data.username || '',
          email: res.data.email || '',
          avatar: localStorage.getItem("user_avatar") || res.data.avatar || '',
          licenseFront: localStorage.getItem("user_license") || res.data.license_front || '',
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

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
      alert("Failed to update profile.");
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
        setFormData((prev) => ({ ...prev, avatar: base64Image }));
        localStorage.setItem("user_avatar", base64Image);
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
                    const base64License = reader.result;
                    setLicenseLoading(true);
                    setTimeout(() => {
                      setFormData((prev) => ({ ...prev, licenseFront: base64License }));
                      localStorage.setItem("user_license", base64License);
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
