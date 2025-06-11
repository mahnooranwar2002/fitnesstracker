import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import Services from './Services'

import AboutSec from './Sections/AboutSec'
import Footer from './Footer'
import FeaturesSec from './Sections/FeaturesSec'
import TestimonialSec from './Sections/TestimonialSec'

const Home = () => {
  return (
    <>
    
      <Navbar></Navbar>
      <section className='bannar container-fluid' id='home'>
  <div className="home-content">
    <h2>Push Your <span>Limits</span></h2>
    <p>
      We believe that fitness is not just about lifting weights; it's about building confidence,
      strength, and a healthier lifestyle. Join us today and take the first step towards a
      stronger, fitter you.
    </p>
    <Link className="btn" to="/join">Join Us</Link>
  </div>
</section>

  <Services></Services>
    <AboutSec></AboutSec>
<FeaturesSec></FeaturesSec>
<TestimonialSec></TestimonialSec>
<Footer></Footer>
    </>
  )
}

export default Home
