import React, { useState, useEffect } from 'react';
import './Profile.css';
import { getProfile } from '../api.js'; // Import the API function

const Profile = () => {
  const [image, setImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showMessages, setShowMessages] = useState(false);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showFAQs, setShowFAQs] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [profile, setProfile] = useState({ name: '', id: '' }); // Use profile state

  const predefinedSicknesses = [
    'Flu',
    'Cold',
    'Headache',
    'Stomach Ache',
    'Fever',
    'Cough',
    'Sore Throat',
    'Back Pain',
    'Allergy',
    'Asthma'
  ];

  const faqs = [
    { question: 'What are the symptoms of the flu?', answer: 'Symptoms of the flu include fever, chills, muscle aches, cough, congestion, runny nose, headaches, and fatigue.' },
    { question: 'How can I prevent a cold?', answer: 'To prevent a cold, wash your hands frequently, avoid close contact with sick individuals, and maintain a healthy lifestyle.' },
    { question: 'What should I do if I have a headache?', answer: 'If you have a headache, rest in a quiet, dark room, stay hydrated, and take over-the-counter pain relievers if necessary.' },
    { question: 'How can I treat a stomach ache?', answer: 'To treat a stomach ache, try drinking clear fluids, eating bland foods, and avoiding spicy or fatty foods.' },
    { question: 'What are the signs of a fever?', answer: 'Signs of a fever include elevated body temperature, sweating, chills, headache, muscle aches, and dehydration.' },
    { question: 'How can I relieve a cough?', answer: 'To relieve a cough, stay hydrated, use cough drops or lozenges, and consider using a humidifier.' },
    { question: 'What causes a sore throat?', answer: 'A sore throat can be caused by viral infections, bacterial infections, allergies, dry air, or irritants like smoke.' },
    { question: 'How can I manage back pain?', answer: 'To manage back pain, practice good posture, stay active, use over-the-counter pain relievers, and apply heat or ice.' },
    { question: 'What are common allergy symptoms?', answer: 'Common allergy symptoms include sneezing, runny or stuffy nose, itchy eyes, and skin rashes.' },
    { question: 'How can I control asthma?', answer: 'To control asthma, take prescribed medications, avoid triggers, and monitor your symptoms regularly.' }
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const profileData = await getProfile(token);
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      const filteredSuggestions = predefinedSicknesses.filter(sickness =>
        sickness.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sickness:', searchTerm);
    setSearchTerm('');
    setSuggestions([]);
  };

  const handleMessagesClick = () => {
    setShowMessages(true);
    setShowEmergencyContacts(false);
    setShowMedicalHistory(false);
    setShowSettings(false);
    setShowFAQs(false);
  };

  const handleEmergencyContactsClick = () => {
    setShowEmergencyContacts(true);
    setShowMessages(false);
    setShowMedicalHistory(false);
    setShowSettings(false);
    setShowFAQs(false);
  };

  const handleMedicalHistoryClick = () => {
    setShowMedicalHistory(true);
    setShowMessages(false);
    setShowEmergencyContacts(false);
    setShowSettings(false);
    setShowFAQs(false);
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
    setShowMessages(false);
    setShowEmergencyContacts(false);
    setShowMedicalHistory(false);
    setShowFAQs(false);
  };

  const handleFAQsClick = () => {
    setShowFAQs(true);
    setShowMessages(false);
    setShowEmergencyContacts(false);
    setShowMedicalHistory(false);
    setShowSettings(false);
  };

  const handleBackClick = () => {
    setShowMessages(false);
    setShowEmergencyContacts(false);
    setShowMedicalHistory(false);
    setShowSettings(false);
    setShowFAQs(false);
    setSelectedFAQ(null);
  };

  const handleAddContact = () => {
    const name = prompt("Enter the name of the emergency contact:");
    const phone = prompt("Enter the phone number of the emergency contact:");
    if (name && phone) {
      setEmergencyContacts([...emergencyContacts, { name, phone }]);
    }
  };

  const handleDeleteContact = (index) => {
    const updatedContacts = emergencyContacts.filter((_, i) => i !== index);
    setEmergencyContacts(updatedContacts);
  };

  const handleFAQClick = (index) => {
    setSelectedFAQ(index);
  };

  return (
    <div className="profile-container">
      <div className="profile-picture">
        {image ? <img src={image} alt="Profile" /> : <p className="upload-text">Upload Image</p>}
        {!image && (
          <label className="file-upload">
            <input type="file" onChange={handleImageChange} />
            +
          </label>
        )}
      </div>
      <div className="profile-info">
        <h2 className='name-header'>{profile.fullname}</h2>
        <p className='id-paragraph'>ID: {profile.regNumber}</p>
      </div>
      {!showMessages && !showEmergencyContacts && !showMedicalHistory && !showSettings && !showFAQs ? (
        <>
          <div className="profile-buttons">
            <button onClick={handleMessagesClick}>Messages</button>
            <button onClick={handleEmergencyContactsClick}>Emergency Contacts</button>
            <button onClick={handleMedicalHistoryClick}>Medical History</button>
            <button onClick={handleSettingsClick}>Settings</button>
            <button onClick={handleFAQsClick}>FAQs</button>
            <button>Call for Help</button>
          </div>
          <form onSubmit={handleSubmit} className="search-form">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search for a sickness..."
              className="search-input"
            />
            <button type="submit" className="search-button">Submit</button>
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => setSearchTerm(suggestion)}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </>
      ) : showMessages ? (
        <div className="messages-container">
          <h3>Your Messages</h3>
          <p>No new messages.</p>
          <button onClick={handleBackClick} className="back-button">Back</button>
        </div>
      ) : showEmergencyContacts ? (
        <div className="emergency-contacts-container">
          <h3>Emergency Contacts</h3>
          {emergencyContacts.length === 0 ? (
            <p>No emergency contacts.</p>
          ) : (
            <ul>
              {emergencyContacts.map((contact, index) => (
                <li key={index}>
                  {contact.name}
                  <button onClick={() => handleDeleteContact(index)} className="delete-button">Delete</button>
                </li>
              ))}
            </ul>
          )}
          <button onClick={handleAddContact} className="add-button">Add</button>
          <button onClick={handleBackClick} className="back-button">Back</button>
        </div>
      ) : showMedicalHistory ? (
        <div className="medical-history-container">
          <h3>Medical History</h3>
          <p>No medical history available.</p>
          <button onClick={handleBackClick} className="back-button">Back</button>
        </div>
      ) : showSettings ? (
        <div className="settings-container">
          <h3>Settings</h3>
          <form className="settings-form">
            <label>
              Name:
              <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            </label>
            <label>
              Profile Picture:
              <input type="file" onChange={handleImageChange} />
            </label>
            <label>
              ID:
              <input type="text" value={profile.id} onChange={(e) => setProfile({ ...profile, id: e.target.value })} />
            </label>
          </form>
          <button onClick={handleBackClick} className="back-button">Back</button>
        </div>
      ) : (
        <div className="faqs-container">
          <h3>Frequently Asked Questions</h3>
          <ul className="faqs-list">
            {faqs.map((faq, index) => (
              <li key={index} onClick={() => handleFAQClick(index)}>
                {faq.question}
              </li>
            ))}
          </ul>
          {selectedFAQ !== null && (
            <div className="faq-answer">
              <p>{faqs[selectedFAQ].answer}</p>
            </div>
          )}
          <button onClick={handleBackClick} className="back-button">Back</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
