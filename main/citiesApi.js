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
                cityDiv.className = 'city--added grid grid-cols-2 items-center cursor-pointer';
            

                
                // Create city name paragraph
                const cityName = document.createElement('p');
                cityName.id = city.Key;
                cityName.className = 'text-xl  font-semibold opacity-90 justify-self-start';
                cityName.textContent = city.LocalizedName; // Set the city name
        
                // Create province/count paragraph
                const provCount = document.createElement('p');
                provCount.id =city.Key;
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
      console.log('You clicked on:', event.target.textContent);
      // Perform any action you want when a list item is clicked
    }
  });

