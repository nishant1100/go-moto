import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import Blog from '@/Pages/Blog/blog';
import Home from '@/Pages/Home/Home';
import Login from '@/Pages/Login/Login';
import SignUp from '@/Pages/Register/Signup';
import CarDetails from "./Pages/CarDetails/details";
import MyRent from './Pages/myRent/myRent';
import RentSummary from './Pages/Rent/RentSummary';
import RentCars from './Pages/RentCar/rentcar';
import UserProfile from './Pages/userprofile/userprofile';
import ResetPassword from './Pages/reset/resetpw';
import FakeEsewa from './Pages/payment/esewa';
import PaymentSuccess from './Pages/payment/PaymentSuccess';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/myRent" element={<MyRent />} />
            <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />
            <Route path="/esewa" element={<FakeEsewa />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/blog" element={<Blog />} />  {/* ✅ only once */}

          </Routes>
        </main>
        <Footer />

        {/* ✅ Regular toast - top right */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />

        {/* ✅ Confirmation toast - center-middle with unique ID */}
        <ToastContainer
          containerId="confirm-center"
          position="top-center"
          autoClose={false}
          hideProgressBar
          closeOnClick={false}
          draggable={false}
          limit={1}
          pauseOnHover={false}
          theme="light"
          className="center-toast"
        />
      </div>
    </Router>
  );
}

export default App;
