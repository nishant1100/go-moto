import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

import Login from '@/Pages/Login/Login';
import SignUp from '@/Pages/Register/Signup'; 
import Home from '@/Pages/Home/Home';
import RentCars from './Pages/RentCar/rentcar';
import CarDetails from "./Pages/CarDetails/details";
import Blog from '@/Pages/Blog/blog'; // ✅ Blog Import

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
            <Route path="/car-details/:slug" element={<CarDetails />} />
            <Route path="/blog" element={<Blog />} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
