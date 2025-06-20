import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleForgotClick = (e) => {
        e.preventDefault();
        setShowForgotPassword(true);
    };

    const closeForgotBox = () => {
        setShowForgotPassword(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/login/', formData);
                const user = response.data.user;

                // Save to localStorage (or sessionStorage)
                localStorage.setItem('user', JSON.stringify(user));
                window.dispatchEvent(new Event('storageChanged'));  // <-- notify others

                alert(response.data.message);
                navigate('/Home');
            } catch (err) {
                if (err.response?.data?.error) {
                    setError(err.response.data.error);
                } else {
                    setError('Login failed. Try again later.');
                }
            }
        };


    return (
        <div className="login-container">
            <video autoPlay muted loop className="bg-video">
                <source src="/videos/login_vdo.mp4" type="video/mp4" />
            </video>

            <div className="login-overlay">
                <div className="login-form">
                    <h2>LOGIN</h2>

                    {error && <p className="error">{error}</p>}

                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Login</button>

                        <div className="form-actions">
                            <a href="#" className="forgot-password" onClick={handleForgotClick}>Forgot password?</a>
                        </div>
                        <p className="signup-link">Don't have an account? <a href="/register">Sign up</a></p>
                    </form>
                </div>

                <div className="text-overlay">
                    <h1>Nepal's roads are calling.</h1>
                    <h1>Log in to answer.</h1>
                </div>
            </div>

            {showForgotPassword && (
                <div className="forgot-modal-overlay" onClick={closeForgotBox}>
                    <div className="forgot-modal animated" onClick={(e) => e.stopPropagation()}>
                        <span className="close-btn" onClick={closeForgotBox}>&times;</span>
                        <h3>Recover Your Password</h3>
                        <p className="modal-description">Enter your email and we'll send you instructions to reset your password.</p>
                        <div className="input-group">
                            <label htmlFor="recover-email">Email Address</label>
                            <input type="email" id="recover-email" placeholder="e.g. user@example.com" />
                        </div>
                        <button className="send-btn">Send Recovery Link</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
