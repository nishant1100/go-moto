import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Home.css';

// Car and brand assets
import blog1 from '../../assets/blog1.jpg';
import blog2 from '../../assets/blog2.jpg';
import blog4 from '../../assets/blog4.jpg';
import deepal from '../../assets/deepal.jpeg';
import honda1 from '../../assets/honda.png';
import hyundai1 from '../../assets/hyundai.png';
import suv from '../../assets/suv.jpg';
import honda from '../../brands/honda.png';
import hyundai from '../../brands/hyundai.png';
import kia from '../../brands/kia.png';
import benz from '../../brands/mahindra.png';
import nissan from '../../brands/nissan.png';
import bmw from '../../brands/skoda.png';
import toyota from '../../brands/toyota.png';
import availabilityIcon from '../../icons/availability.png';
import comfortIcon from '../../icons/comfort.png';
import savingsIcon from '../../icons/saving.png';



const brandImages = [bmw, hyundai, benz, honda, nissan, toyota, kia];

const carList = [
  { name: 'Lexus CT200H', price: 3500, image: suv },
  { name: 'Marcedes Benz', price: 3500, image: honda1 },
  { name: 'Civic', price: 3504, image: deepal },
  { name: 'Hyundai Creta', price: 3200, image: hyundai1 },
];

const videoSources = ['/videos/intro1.mp4', '/videos/intro2.mp4', '/videos/intro3.mp4'];

const Home = () => {
  const [popularCars, setPopularCars] = useState([]);
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const videoSources = ['/videos/intro1.mp4', '/videos/intro2.mp4', '/videos/intro3.mp4'];

  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#contact') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        setTimeout(() => {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }, 100); 
      }
    }
  }, [location]);
  
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/cars/popular/')
      .then((res) => {
        setPopularCars(res.data.cars);
      })
      .catch((err) => {
        console.error("Failed to fetch popular cars:", err);
      });
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleVideoEnd = () => {
      const nextIndex = (currentIndex + 1) % videoSources.length;
      setCurrentIndex(nextIndex);
    };

    videoElement.addEventListener('ended', handleVideoEnd);
    return () => videoElement.removeEventListener('ended', handleVideoEnd);
  }, [currentIndex]);

  const goToRentCars = () => {
    navigate("/rent-cars");
  };

  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home-container">

      <section className="hero-video-wrapper">
        <video
          ref={videoRef}
          className="hero-video"
          src={videoSources[currentIndex]}
          autoPlay
          muted
          loop={false}
          playsInline
        />
        <div className="white-overlay"></div>
        <div className="hero-overlay">
          <div className="hero-text">
            <h1>Crafted for Nepal's Roads, Designed for Your Journey</h1>
            <p>Choose from a range of cars built for everything Nepal has to offer.</p>
            <div className="hero-buttons">
              <button className="btn-primary">Get In Touch</button>
              <button className="btn-outline" onClick={goToRentCars}>
                Our Cars
              </button>
            </div>
          </div>
        </div>
      </section>


      <section className="features">
        <div className="feature">
          <img src={availabilityIcon} alt="Availability" className="feature-icon" />
          <h4>Availability</h4>
          <p>Always available when you need it.</p>
        </div>
        <div className="feature">
          <img src={comfortIcon} alt="Comfort" className="feature-icon" />
          <h4>Comfort</h4>
          <p>Designed for a smooth and relaxing ride.</p>
        </div>
        <div className="feature">
          <img src={savingsIcon} alt="Savings" className="feature-icon" />
          <h4>Savings</h4>
          <p>Affordable rates with maximum value.</p>
        </div>
      </section>


      {/* Car Brands Animation */}
      <section className="brands-slider">
        <div className="brands-track">
          {brandImages.concat(brandImages).map((src, index) => (
            <img key={index} src={src} alt={`brand-${index}`} className="brand-logo" />
          ))}
        </div>
      </section>

      {/* Popular Rents */}
      <section className="popular-rents">
        <h2>Our popular rents</h2>
        <div className="cars">
          {popularCars.map((car, index) => (
            <div className="car-card enhanced" key={index}>
              <img src={`http://127.0.0.1:8000${car.image}`} alt={car.name} className="car-image" />
              <div className="car-info">
                <h3>{car.name}</h3>
                <p className="price">Nrs. {car.price} <span>/Day</span></p>
                <button className="rent-btn" onClick={() => navigate(`/car-details/${car.id}`)}>
                  View Detils
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h3>How Go Moto works</h3>
        <div className="how-it-works-image">
          <img src="/src/assets/howit.png" alt="How it works flow" />
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="advantages">
        <h3>Why Choose Us?</h3>
        <div className="advantage-list">
          {[
            { text: 'Easy Rent', gif: '/src/assets/easy1.gif' },
            { text: 'On Time Services', gif: '/src/assets/time.gif' },
            { text: 'Well Clean Car', gif: '/src/assets/clean.gif' },
            { text: 'Customer Statifactions', gif: '/src/assets/customer.gif' },
            { text: 'Best Price Gaurantee', gif: '/src/assets/price.gif' }
          ].map((item, i) => (
            <div className="advantage" key={i}>
              <img src={item.gif} alt={item.text} className="advantage-icon" />
              {item.text}
            </div>
          ))}
        </div>
      </section>


      {/* Achievements */}
      <section className="achievements">
        <h3 className="achievement-title">Our Achievements</h3>
        <div className="achievement-list">
          <div className="achievement">
            <h4>CAR RENTED</h4>
            <p className="highlight">240</p>
          </div>
          <div className="achievement">
            <h4>SATISFIED CLIENTS</h4>
            <p className="highlight">235</p>
          </div>
          <div className="achievement">
            <h4>YEARS EXPERIENCE</h4>
            <p className="highlight">12+</p>
          </div>
          <div className="achievement">
            <h4>CAR TYPES</h4>
            <p className="highlight">18</p>
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="contact-title">
          <h3>Contact us</h3>
          <p className="subtitle">We’re here to help you every step of the way</p>
        </div>
        <div className="contact-details">
          <div className="contact-card">
            <h4>Email & Phone</h4>
            <p>📧 gomoto@gmail.com</p>
            <p>📞 6619032</p>
          </div>
          <div className="contact-card">
            <h4>Working Hours</h4>
            <p>⏰ Everyday: 08.00–21.00</p>
          </div>
          <div className="contact-card">
            <h4>Location</h4>
            <p>📍 Sallaghari, Bhaktapur</p>
          </div>
        </div>
      </section>


      {/* Blog Section */}
      <section className="blog">
        <h3>Latest blog posts & news</h3>
        <div className="blog-cards">
          {[blog1, blog2, blog4].map((img, idx) => (
            <div
              className="blog-card"
              key={idx}
              onClick={() => navigate('/blog')}
              style={{ cursor: "pointer" }}
            >
              <img src={img} alt={`Blog ${idx + 1}`} />
              <h4>
                {[
                  'How To Choose The Right Car',
                  'Which plan is right for me?',
                  'Enjoy Speed, Choice & Total Control',
                ][idx]}
              </h4>
              <p>News / 12 April 2024</p>
            </div>
          ))}
        </div>
      </section>



      {/* Newsletter */}
      <section className="newsletter">
        <h3>Suscribe our news</h3>
        <p>We can help you provide the latest news whenever and wherever you are via email</p>
        <div className="subscribe">
          <input type="email" placeholder="example@gmail.com" />
          <button>Subscribe</button>
        </div>
      </section>

      {showTopBtn && (
  <button className="back-to-top-btn" onClick={scrollToTop}>
    ⬆️
  </button>
)}
    </div>
  );
};

export default Home;
