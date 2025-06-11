import React from 'react';

const TestimonialSec = () => {
  return (
    <>
      <div id="carouselExampleIndicators" className="carousel slide carouselslide">
      <div className="row text-center">
          <div className="col">
            <div className="ourfeatureheading mb-5">
              <h4 className="section-title">Our <span>reviews</span></h4>
              <p className="section-subtitle">There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration.</p>
            </div>
          </div>
        </div>
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        <div className="carousel-inner">
          {/* Testimonial 1 */}
          <div className="carousel-item active ">
            <div className="box ">
              <div className="sliderItem ">
                <div className="sliderPic">
                <img src="Images/client.png" alt="Jasmin" className="rounded-circle" />
                </div>
             <h5>Jerry</h5>
                <div className="stars">
                  <i className='bx bxs-star'></i>
                  <i className='bx bxs-star'></i>
                  <i className='bx bxs-star'></i>
                  <i className='bx bxs-star'></i>
                </div>
                <p>Nice gym with well-equipped machines and tools for bodybuilding and exercise.</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="carousel-item">
            <div className="box">
              <div className="sliderItem">
                <div className="sliderPic">
                  <img src="Images/images.jpg" alt="Jasmin" className="rounded-circle" />
                </div>
                <h5>Jhon</h5>
                <div className="stars">
                  <i className='bx bxs-star'></i>
                  <i className='bx bxs-star'></i>
                  <i className='bx bxs-star'></i>
                  <i className='bx bxs-star'></i>
                </div>
                <p>Shoutout to everyone at the gym today! Your energy is contagious and keeps me motivated!</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="carousel-item">
            <div className="box">
              <div className="sliderItem">
                <div className="sliderPic">
                <img src="Images/" alt="Jasmin" className="rounded-circle" />
                </div>
                <h5>Jerry</h5>
                <div className="stars">
                  <i className='bx bxs-star'></i>
                  <i className='bx bxs-star'></i>
                  <i className='bx bxs-star'></i>
                  <i className='bx bxs-star'></i>
                </div>
                <p>Taking a rest day today to recharge. Remember, recovery is just as important as the workouts!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialSec;
