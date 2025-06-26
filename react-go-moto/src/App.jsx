import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';

import Blog from '@/Pages/Blog/blog';
import Home from '@/Pages/Home/Home';
import Login from '@/Pages/Login/Login';
import SignUp from '@/Pages/Register/Signup';
import CarDetails from "./Pages/CarDetails/details";
import RentSummary from './Pages/Rent/RentSummary'; 
import RentCars from './Pages/RentCar/rentcar';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/rent-cars" element={<RentCars />} />
            <Route path="/car-details/:id" element={<CarDetails />} />
            <Route path="/rent-summary/:id" element={<RentSummary />} /> 
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
