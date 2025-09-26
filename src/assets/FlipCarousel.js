import React, { useEffect, useState } from "react";
import logo from "./beanworth1.png";
import "./flipcarous.css";
import beanpic from "./bg7.jpg";
import nextpic from "./tech.jpeg";
import another from "./bg3.png";
import customImg from "./bg2.jpg";
import devicesImg from "./ph.jpg";
import softImg from "./bg.jpg";
import picImg from "./ps4.jpg";


const images = [picImg, beanpic, nextpic, customImg, devicesImg, softImg, another];

function FlipCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showServices, setShowServices] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleServicesClick = () => {
    setShowServices(true);
  };

  const closeServices = () => {
    setShowServices(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };


  return (
    <>
      <div className="flip-carousel-container">
        <button className="nav-button prev-button" onClick={goToPrevious}>
          ‹
        </button>
        
        <div className="flip-card">
          <div className="flip-card-inner">
            <img
              src={images[currentIndex]}
              alt={`carousel-${currentIndex}`}
              className="flip-card-image"
            />
            
            <div className="text-overlay">
              <h2 className="overlay-title" onClick={handleServicesClick}>
                Our Services
              </h2>
            </div>
          </div>
        </div>
        
        <button className="nav-button next-button" onClick={goToNext}>
          ›
        </button>
      </div>
      

      
      {showServices && (
        <div className="services-modal-overlay" onClick={closeServices}>
          <div className="services-modal" onClick={(e) => e.stopPropagation()}>
            <div className="services-header">
              <img src={logo} className="App-logo" alt="beanworth" style={{
      width: '80px',
      height: '70px',
      margin: 'auto',
      display: 'block',
      marginLeft: '0',
      position: 'flex',
      top: '0',
      left: '0',
      zIndex: '1000'
      }} />
              <h2> Our Services</h2>
              <button className="close-button" onClick={closeServices}>
                ×
              </button>
            </div>
            <div className="services-content">
              <div className="service-item">
                <h3> Software Development</h3>
                <p>
                  Custom software solutions, web applications, mobile apps, and
                  enterprise systems tailored to your business needs.
                </p>
              </div>
              <div className="service-item">
                <h3> Network Design & Installation</h3>
                <p>
                  Professional network infrastructure design, installation,
                  configuration, and maintenance for businesses of all sizes.
                </p>
              </div>
              <div className="service-item">
                <h3> Web Hosting & Domain Services</h3>
                <p>
                  Reliable web hosting solutions, domain registration, SSL
                  certificates, and website maintenance services.
                </p>
              </div>
              <div className="service-item">
                <h3> IT Consultancy</h3>
                <p>
                  Professional IT training programs, technology consulting, and
                  strategic IT planning for your organization.
                </p>
              </div>
              <div className="service-item">
                <h3>🔧 Technical Support</h3>
                <p>
                  24/7 technical support, system maintenance, troubleshooting,
                  and IT infrastructure management.
                </p>
              </div>
              <div className="service-item">
                <h3> Cloud Solutions</h3>
                <p>
                  Cloud migration, cloud hosting, backup solutions, and
                  cloud-based application development.
                </p>
              </div>
            </div>
            <div className="services-footer">
              <p>
                Contact us at: <strong>info@beanworth.co.tz</strong> |{" "}
                <strong>+255 794872433</strong>
              </p>
              <a
                href="https://beanworth.co.tz"
                target="_blank"
                rel="noopener noreferrer"
                className="visit-website-btn"
              >
                continue to us
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FlipCarousel;