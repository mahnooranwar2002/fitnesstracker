import React from 'react';

const Services = () => {
  const services = [
    { id: 1, title: "Personal Training", img: "Images/header.png" },
    { id: 2, title: "Group Classes", img: "Images/header2.webp" },
    { id: 3, title: "Nutrition Plan", img: "Images/hqdefault (1).jpg" },
    { id: 4, title: "Bodybuilding", img: "Images/hqdefault (2).jpg" },
  ];

  return (
    <section className="services-section py-5">
      <div className="container text-center">
        <h2 className="section-title text-black">Our <span>Services</span></h2>
        <p className="section-subtitle mb-5">
          We offer a variety of services to help you stay fit and strong
        </p>
        <div className="row g-4">
          {services.map(service => (
            <div className="col-md-6 col-lg-3" key={service.id}>
              <div className="service-card position-relative overflow-hidden">
                <img src={service.img} alt="service" className="img-fluid" />
                <div className="overlay d-flex justify-content-center align-items-center flex-column">
                  <h5 className="text-white">{service.title}</h5>
                  <p className="text-white small">Learn more about this</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
