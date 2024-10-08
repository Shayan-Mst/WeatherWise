 const cityContainer = document.getElementById('cityContainer');
 

async function  getCitySearchList(){

   
    const query = document.getElementById('searchInputCity');

    const api_key = 'LU024MAR7zmPGtev8NDH9uZTvJtpcpbU'
    const api = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${api_key}%20&q=${query.value}&language=en-us`
   

try{


   cityContainer.innerHTML = '';

    const response = await fetch(api); // Example API
    
    const data = await response.json(); // Parse the JSON data from the response
    
    if(response.status ==200){

    
        if(data){
            data.forEach(city => {
                // Create a new div for each city
                const cityDiv = document.createElement('div');
                cityDiv.className = 'city--added grid grid-cols-2 items-center cursor-pointer city--key';
                cityDiv.name = city.LocalizedName;
                cityDiv.id = city.Key;

                
                // Create city name paragraph
                const cityName = document.createElement('p');
                cityName.className = 'text-xl  font-semibold opacity-90 justify-self-start city--name';
                cityName.textContent = city.LocalizedName; // Set the city name
        
                // Create province/count paragraph
                const provCount = document.createElement('p');
                provCount.className = 'opacity-60 text-xs justify-self-end';
                provCount.textContent = `${city.AdministrativeArea.EnglishName} , ${city.Country.EnglishName}`; // Set a default value or modify as needed
        
                // Append paragraphs to the city div
                cityDiv.appendChild(cityName);
                cityDiv.appendChild(provCount);
        
                // Append the city div to the container
                cityContainer.appendChild(cityDiv);
              });
        
        }

      
    }
}

catch(error){
    console.error('Error fetching data:', error);
}

}



// Event delegation for handling clicks on dynamically added list items
cityContainer.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('city--added')) {
     
        adding_city(event.target.id,event.target.name);
    }
  });

  
  


  async function adding_city(id,name){
    
    fetch('http://localhost:3000/city', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, location_key: id }),
    })
    .then(response => response.json(),
    window.location.reload())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error('Error:', error));
    

  }

  // Function to handle the delete request
async function deleteCity(location_key) {
  try {
    const response = await fetch(`http://localhost:3000/city/${location_key}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message); // City deleted successfully
    } else {
      console.error('Error deleting city:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}