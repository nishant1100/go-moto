import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './resetpw.css';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { uidb64, token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/reset-password-confirm/${uidb64}/${token}/`,
        {
          password,
          confirm_password: confirmPassword
        }
      );

      toast.success(response.data.message || "Password reset successful!");
      navigate('/login');
    } catch (error) {
      toast.error(
        error.response?.data?.error || 'Password reset failed. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resetpw-container">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit} className="resetpw-form">
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
