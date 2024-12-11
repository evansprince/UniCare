import React, { useEffect, useState } from 'react';
import healthTips from './healthTips.js';
import './HealthTip.css';

const HealthTip = () => {
  const [healthTip, setHealthTip] = useState({});

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * healthTips.length);
    setHealthTip(healthTips[randomIndex]);
  }, []);

  return (
    <div className="health-tip-container">
      <div className="health-tip-content">
        <h2>Health Tip </h2>
        <p>{healthTip.tip}</p>
      </div>
      <div className="health-tip-image">
        <img src={healthTip.image} alt="Health Tip Illustration" />
      </div>
    </div>
  );
};

export default HealthTip;
