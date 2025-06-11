import React from 'react';
import { Link } from 'react-router-dom';

const AboutSec = () => {
  return (
    <section className="aboutsecCon py-5">
      <div className="container">
        <div className="row align-items-center">
          
          {/* Text Section */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="about-content">
              <h2 className="heading mb-4 text-white">Why <span>Choose Us?</span></h2>
              <p className='mb-3 text-white'>
                At our gym, we believe that fitness is not just about working out; it's about building a lifestyle.
                Our state-of-the-art facility is equipped with the latest fitness technology and a wide range of
                equipment to cater to all your workout needs.
              </p>
              <p className='mb-4 text-white'>
                Our team of certified trainers and fitness professionals are passionate about helping you succeed.
                They are here to provide personalized guidance, support, and motivation every step of the way.
              </p>
              <Link to="" className="btn    px-4 py-2 rounded-pill">Book a Free Class</Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="col-lg-6">
            <div className="aboutPic text-center">
              <img src="Images/home.jpg" className="img-fluid rounded shadow" alt="About Us" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSec;
