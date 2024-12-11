import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import './SubmitSymptoms.css';

const SubmitSymptoms = () => {
  const [symptoms, setSymptoms] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add the logic to send the message to the clinic
    console.log('Symptoms:', symptoms);
    console.log('Message:', message);
    // Reset the form
    setSymptoms('');
    setMessage('');
  };

  return (
    <div className="submit-symptoms-container">
      
      <h2 className='submit-symptoms-header'>
        <FontAwesomeIcon icon={faHeartbeat} className="heartbeat-icon" />
        Submit Symptoms
      </h2>
      <h3 className='name-header-1'>
        Uni Care Medical Help
      </h3>
      <h4 className='tagline-1'>
        medical help at your fingertips
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="symptoms">Symptoms:</label>
          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Describe your symptoms here..."
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Additional message (optional)..."
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmitSymptoms;
