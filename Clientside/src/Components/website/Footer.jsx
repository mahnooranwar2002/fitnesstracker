import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row gy-4">

          {/* About Section */}
          <div className="col-md-4">
            <h4 className="mb-3">About Us</h4>
            <p>
              Our team of certified trainers and fitness professionals are passionate about helping you succeed.
              We provide personalized guidance, support, and motivation in a welcoming atmosphere to help you reach your potential.
            </p>
          </div>

          {/* Links Section */}
          <div className="col-md-4">
            <h4 className="mb-3">Quick Links</h4>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
              <li><Link to="/about" className="text-white text-decoration-none">About</Link></li>
              <li><Link to="/contact" className="text-white text-decoration-none">Contact Us</Link></li>
              <li><Link to="/faq" className="text-white text-decoration-none">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-md-4">
            <h4 className="mb-3">Contact Us</h4>
            <p><i className='bx bx-phone'></i> +92 305 6784</p>
            <p><i className='bx bx-location-plus'></i> Star Gate Metro</p>
            <p><i className='bx bx-envelope'></i> fitnesstracker@gmail.com</p>
          </div>
        </div>

        <hr className="border-light mt-4" />

        <div className="text-center">
          <h6>
            © 2025 All Rights Reserved. Falak Naz and Mahnoor Anwar
            <span className="text-danger"> <i className='bx bxs-heart'></i></span>
          </h6>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
