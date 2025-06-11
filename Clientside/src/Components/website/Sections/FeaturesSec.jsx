import React from 'react';

const FeaturesSec = () => {
  return (
    <section className="ourfeatureSec py-5  ">
      <div className="container">
        <div className="row text-center">
          <div className="col">
            <div className="ourfeatureheading mb-5">
              <h4 className="section-title">Our <span>Features</span></h4>
              <p className="section-subtitle">There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration.</p>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Card 1 */}
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="feature-card">
              <div className="feature-icon ">
                <img src="Images/1.svg" alt="Weightlifting" />
              </div>
              <h3>Weightlifting</h3>
              <p>There are many variations of passages of lorem Ipsum available.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="feature-card">
              <div className="feature-icon">
                <img src="Images/2.svg" alt="Specific Muscles" />
              </div>
              <h3>Specific Muscles</h3>
              <p>There are many variations of passages of lorem Ipsum available.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="feature-card">
              <div className="feature-icon">
                <img src="Images/3.svg" alt="Flex Your Muscles" />
              </div>
              <h3>Flex Your Muscles</h3>
              <p>There are many variations of passages of lorem Ipsum available.</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="feature-card">
              <div className="feature-icon">
                <img src="Images/3.svg" alt="Flex Your Muscles" />
              </div>
              <h3>Flex Your Muscles</h3>
              <p>There are many variations of passages of lorem Ipsum available.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSec;
