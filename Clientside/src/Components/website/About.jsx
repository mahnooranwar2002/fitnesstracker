import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import AboutSec from './Sections/AboutSec';

const About = () => {
  return (
    <div>
      <Navbar />

      {/* Banner Section */}
      <div className="container-fluid bannarSec  text-white py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h2>About <span className="text-light">Us</span></h2>
            <nav className="breadcrumbSec mt-3" aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center">
                <li className="breadcrumb-item">
                  <Link to="/home" className="text-white">Home</Link>
                </li>
                <li className="breadcrumb-item active text-white" aria-current="page">About</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* About Content Section */}
      <AboutSec />

      {/* Call to Action Section */}
      <Footer></Footer>
   </div>
  );
};

export default About;
