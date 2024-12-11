import React from 'react';
import Profile from './Profile.js';
import SubmitSymptoms from './SubmitSymptoms.js';
import HealthTip from './HealthTip.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Profile />
      <SubmitSymptoms />
      <HealthTip />
      <div className="social-media">
        <a href="https://www.instagram.com/princeevans379" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} className="social-icon" />
          @princeevans379
        </a>
        <a href="https://www.facebook.com/Evans Prince" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} className="social-icon" />
          @Evans Prince
        </a>
        <a href="https://wa.me/+263712172407" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faWhatsapp} className="social-icon" />
          Whatsapp
        </a>
      </div>

      <p className='Contact-us'>
        Contact Us
      </p>
    </div>
  );
};

export default Dashboard;
