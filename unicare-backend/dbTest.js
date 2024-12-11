const { EmergencyRequest } = require('./models');

const testEmergencyRequest = async () => {
  try {
    const data = {
      description: 'Test emergency request',
      userId: 1,
      hospitalId: 2,
    };
    const request = await EmergencyRequest.createEmergencyRequest(data);
    console.log('Created EmergencyRequest:', request);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

testEmergencyRequest();
