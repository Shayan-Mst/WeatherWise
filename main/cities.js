



// JavaScript to handle modal open/close
const searchInput = document.getElementById('searchInput');
const searchInputMain = document.getElementById('searchInputCity');
const searchModal = document.getElementById('searchModal');
const closeModal = document.getElementById('closeModal');


// Open modal when input is focused
searchInput.addEventListener('focus', () => {
  searchModal.classList.remove('hidden');
 
  body.classList.add('modal-open');
  searchInputMain.focus();
});

// Close modal when clicking the close button
closeModal.addEventListener('click', () => {
  searchModal.classList.add('hidden');
  body.classList.remove('modal-open');
});

// Close modal when clicking outside of the modal content (optional)
searchModal.addEventListener('click', (e) => {
  if (e.target === searchModal) {
    searchModal.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});


const selected_city = document.getElementById("selected-city")
const api_key = 'LU024MAR7zmPGtev8NDH9uZTvJtpcpbU'



 async function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError,
      {
        enableHighAccuracy: true, // Try to get the most accurate location (e.g., from GPS)
        timeout: 5000, // Wait up to 5 seconds for a result
        maximumAge: 0 // Do not use a cached position
      });
  } 
}

// Success callback function to display the position
 function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
   localStorage.setItem('lat',lat)
   localStorage.setItem('lon',lon)

   currentLocation()
}

// Error callback function to handle geolocation errors
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}

window.addEventListener('load',()=>{

 getLocation()


 
})


async function currentconditions(){

  console.log('current Condition')
  try{

   var jsonDataBefore;
   
    await fetch('http://localhost:3000/city')
    .then(response => {
      // Check if the response is okay
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      return response.json(); // This returns a promise
    })
    .then(data => {
      // Now you can work with the data
     
      // Example: Accessing cities array
     jsonDataBefore = data;
    })
    .catch(error => {
      console.error('Error:', error); // Catch and log any error
    });
   

    document.getElementById('c--n').innerHTML = jsonDataBefore.city[0].name
  
    jsonDataBefore.city.forEach(async (city,index) =>{
  

      //fetching added cities to json with location keys
  
     const api =  `http://dataservice.accuweather.com/currentconditions/v1/${city.location_key}?apikey=${api_key}&language=en-us&details=false`
      try{
  
        const response = await fetch(api)
        
        
        if(response.status ==200){
          const data = await response.json(); // Parse the JSON data from the response
         
          const Fahrenheit = data[0].Temperature.Imperial.Value
          const Celsius = Math.round(data[0].Temperature.Metric.Value);
          
          const Time = data[0].LocalObservationDateTime.split('T')[1].split(':').slice(0, 2).join(':')
          
  
      
          if(index==0){
            document.getElementById('temp').innerHTML = localStorage.getItem('temperature') == 'fahrenheit'?`${Fahrenheit} &deg;`:`${Celsius} &deg;`;
          }
  
           //parent div
      const cityDiv = document.createElement('div');
      cityDiv.className = 'city--added grid grid-cols-6 items-center get--';
      cityDiv.id = city.location_key;
      cityDiv.addEventListener('click',()=>{

        window.location.href = `home.html?location_key=${city.location_key}?name=${city.name}`

      })
      
  
      //delete div
      const deleteDiv = document.createElement('div')
      deleteDiv.className = 'col-span-1 justify-self-center'
  
      
      const deleteBtn = document.createElement('button')
      deleteBtn.className = "text-red-500 text-2xl rounded-xl border border-red-600 px-2"
      deleteBtn.innerHTML = "&times;"
      deleteBtn.id = "deleteCity"
      deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const cityElement = this.closest('.city--added'); // Get the closest city container
        const locationKey = cityElement.id; // Get the location_key from the parent div's id
        deleteCity(locationKey); // Call the delete function with the locationKey
        cityElement.remove(); // Optionally remove the city from the DOM immediately
      });
      
      //image weather
      const imageDiv = document.createElement('div');
      imageDiv.className = 'col-span-1'
      const imageImg = document.createElement('img')
      imageImg.className = "w-16 h-16"
      imageImg.src="./../pics/sun.png"
  
      //info city
  
      const infoDiv = document.createElement('div')
  
      infoDiv.className = "justify-self-start col-span-2"
  
      const nameP = document.createElement('p');
      nameP.className = "text-xl md:text-3xl font-semibold opacity-90"
      nameP.textContent = city.name;
      const timeP = document.createElement('p')
      timeP.className = "opacity-60"
      timeP.textContent = Time;
  
  
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  // Set attributes for the SVG element
  svg.setAttribute("class", "inline current-location");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "currentColor");
  svg.setAttribute("width", "20px");
  svg.setAttribute("height", "20px");

  // Create the path element
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M12 2l7.5 19.5-7.5-5-7.5 5L12 2z");

  // Append the path to the SVG
  svg.appendChild(path);
    
      //temperature 
  
      const temperatureDiv = document.createElement('div');
      temperatureDiv.className = "justify-self-end col-span-2"
  
      const temperatureSpan = document.createElement('span');
      temperatureSpan.className = "text-2xl md:text-4xl font-semibold opacity-90"
      
  
        localStorage.getItem('temperature') == 'fahrenheit'?temperatureSpan.innerHTML = `${Fahrenheit} &deg;`:temperatureSpan.innerHTML=`${Celsius} &deg;`
        
       
  
  
       deleteDiv.appendChild(deleteBtn)
       cityDiv.appendChild(deleteDiv)
       
       imageDiv.appendChild(imageImg)
       cityDiv.appendChild(imageDiv)
      
       infoDiv.appendChild(nameP)
       city.userLocation?nameP.appendChild(svg):null;
       infoDiv.appendChild(timeP)
       cityDiv.appendChild(infoDiv)
      
      
       temperatureDiv.appendChild(temperatureSpan)
       cityDiv.appendChild(temperatureDiv)
       
       selected_city.appendChild(cityDiv);
  
  
     
        }
  
      }
      catch(error){
  
        console.log("error fetching data : " , error)
  
      }
  
     
      
    })
  
  
  }
  catch(error){
    console.log(error)
  }
  
  

}


async function currentLocation() {

  const lat = localStorage.getItem('lat')
  const lon = localStorage.getItem('lon')

  
  
  const api_location = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${api_key}&q=${lat}%2C${lon}&language=en-us&details=false`


      try {
        const response = await fetch(api_location);
        const data = await response.json();
        const location_key = data.Key;
        const name = data.EnglishName;
        

        await fetch('http://localhost:3000/current-city', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: name, location_key: location_key,userLocation:true }),
        })
        .then((response) =>{
         
            currentconditions()
          
         
         } ).catch(error => {
          console.error('Error:', error);
         
        });

       

        
        
      } catch (error) {
        console.log(error);
       
      }
    
  
}


