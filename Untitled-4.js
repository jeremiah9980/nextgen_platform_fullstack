// Install the package first:
// npm install ring-client-api

const { RingApi } = require('ring-client-api');

const ringApi = new RingApi({
  // Replace with your Ring.com credentials
  email: 'your-email@example.com',
  password: 'your-password'
});

async function listDevices() {
  const locations = await ringApi.getLocations();
  for (const location of locations) {
    const cameras = await location.cameras;
    cameras.forEach(camera => {
      console.log(`Found camera: ${camera.name}`);
    });
  }
}

listDevices().catch(console.error);