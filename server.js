

const express = require('express');
const fs = require('fs');
const path = require('path'); 
const cors = require('cors');

const app = express();
const PORT = 3000;

// Use CORS middleware
app.use(cors());
// Middleware to parse JSON data
app.use(express.json());

// Define a route for the root URL "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'main', 'cities.html')); // Serve cities.html directly from the main folder
});

// API route to save city
app.post('/city', (req, res) => {
   const newCity = req.body;

 

// Read the JSON file
const jsonDataBefore = require('./cities.json');

// Print JSON data before updating

console.log(JSON.stringify(newCity))

if(jsonDataBefore.city.length != 0 ?jsonDataBefore.city.some((City)=>City.location_key != newCity.location_key):true){
  jsonDataBefore.city.push(newCity);

fs.writeFileSync('./cities.json', JSON.stringify(jsonDataBefore, null, 1),(err)=>{
  if (err) {
    console.error('Error writing file:', err);
    return res.status(500).json({ error: 'Error writing file' });
  }
  res.json({ success: true, jsonDataBefore });
});
}
  // // Read the existing cities from the cities.json file
  else {
      res.json({ message: 'City already exists', jsonDataBefore });
    }

});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
