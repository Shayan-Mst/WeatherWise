
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
app.get('/city', (req, res) => {
  res.status(200).sendFile(path.join(__dirname,'./cities.json')); // Serve cities.json directly from the  folder

  // Read the cities.json file asynchronously
  // fs.readFile('./cities.json', 'utf8', (data) => {
 

    
  //     // Parse the JSON data
  //     const cities = JSON.parse(data);

  //     // Send the parsed JSON data as a response
  //    return res.status(200).json(cities);
  
  // });
});

// API route to save city
app.post('/city', (req, res) => {
   const newCity = req.body;

// Read the JSON file
const jsonDataBefore = require('./cities.json');

// Print JSON data before updating


const cityExists = jsonDataBefore.city.some(city => city.location_key === newCity.location_key);

if(cityExists){
    // If the location_key exists, return a message and don't add the city
    return res.status(400).json({ message: 'City with this location_key already exists' });
}



  jsonDataBefore.city.push(newCity);

fs.writeFileSync('./cities.json', JSON.stringify(jsonDataBefore, null, 1),(err)=>{
  if (err) {
    console.error('Error writing file:', err);
    return res.status(500).json({ error: 'Error writing file' });
  }
  res.json({ success: true, jsonDataBefore });
});

  // // Read the existing cities from the cities.json file
 
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
