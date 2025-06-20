import { useEffect, useRef, useState } from 'react';
import './Home.css';

// Car and brand assets
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
import blog1 from '../../assets/blog1.jpg';
import blog2 from '../../assets/blog2.jpg';
import blog3 from '../../assets/blog3.png';



const brandImages = [bmw, hyundai, benz, honda, nissan, toyota, kia];

const carList = [
  { name: 'Lexus CT200H', price: 3500, image: suv },
  { name: 'Marcedes Benz', price: 3500, image: honda1 },
  { name: 'Civic', price: 3504, image: deepal },
  { name: 'Hyundai Creta', price: 3200, image: hyundai1 },
];

// Video sources (placed in /public/videos/)
const videoSources = ['/videos/intro1.mp4', '/videos/intro2.mp4'];

const Home = () => {
  const videoRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
        <div className="white-overlay"></div>  {/* <- add this line */}
        <div className="hero-overlay">
          <div className="hero-text">
            <h1>We Have Prepared a Car For Your Trip</h1>
            <p>We have many types of cars that are ready for your trip anywhere and anytime.</p>
            <div className="hero-buttons">
              <button className="btn-primary">Get In Touch</button>
              <button className="btn-outline">Our Car</button>
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
          {carList.map((car, index) => (
            <div className="car-card enhanced" key={index}>
              <img src={car.image} alt={car.name} className="car-image" />
              <div className="car-info">
                <h3>{car.name}</h3>
                <p className="price">Nrs. {car.price} <span>/Day</span></p>
                <button className="rent-btn">Rent Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
    <section className="how-it-works">
  <h3>How it works</h3>
  <div className="flow-container">
    <div className="flow-step">🧑‍✈️ SELECT</div>
    <div className="arrow">➡️</div>
    <div className="flow-step">📅 BOOK</div>
    <div className="arrow">➡️</div>
    <div className="flow-step">🚗 DRIVE</div>
    <div className="arrow">➡️</div>
    <div className="flow-step">🔁 RETURN</div>
  </div>
</section>


      {/* Why Choose Us */}
      <section className="advantages">
        <h3>Why Choose Us?</h3>
        <div className="advantage-list">
          {['Easy Rent', 'Premium Quality', 'Professional Agent', 'Car Safety', 'Refund', 'Live Monitoring'].map((text, i) => (
            <div className="advantage" key={i}>{text}</div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="achievements">
        <h3 className="achievement-title">Our achivements</h3>
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
      </section>


      {/* Contact Section */}
      <section className="contact">
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
              {[blog1, blog2, blog3].map((img, idx) => (
                <div className="blog-card" key={idx}>
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
        <h3>SUBSCRIBE OUR NEWS</h3>
        <p>We can help you provide the latest news whenever and wherever you are via email</p>
        <div className="subscribe">
          <input type="email" placeholder="example@gmail.com" />
          <button>Subscribe</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
