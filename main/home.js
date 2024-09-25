

function getLocationKeyFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('location_key');
  }

  function getNameFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('name');
  }

  const api_key= "LU024MAR7zmPGtev8NDH9uZTvJtpcpbU"
  const location_key = getLocationKeyFromURL();
  const name_city = getNameFromURL(); 
  const temperature = localStorage.getItem('temperature')

  async function fetchCityWeather() {
    
    current_condition()
    hourly_condition()
    daily_condition()
    
   
  }

  async function current_condition(){
    const api_current =  `http://dataservice.accuweather.com/currentconditions/v1/${location_key}?apikey=${api_key}&language=en-us&details=false`

 
    if (location_key) {
        //current condition
      try {

    
        const response = await fetch(api_current);
        const data = await response.json();

        // Update your UI with current conditions
        console.log('Weather data:', data);

        if(response.status == 200){

const first_section = document.getElementById('current-condition--first-section')
const second_section = document.getElementById('current-condition--second-section')

//first section

//city name

const nameP = document.createElement('p')
nameP.className =  'text-4xl font-bold'
nameP.textContent = name_city;

//devider
const dDiv = document.createElement('div');
dDiv.className = 'p-1';

//chance of either rain / snow / sleet
          
        }

      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    } else {
      console.log('Location key not found');
    }
  }


  async function hourly_condition(){

    if (location_key) {
    try{

      const api_forecast_hour =  temperature == 'fahrenheit'?   `http://dataservice.accuweather.com/forecasts/v1/hourly/24hour/${location_key}?apikey=${api_key}&language=en-us&details=false&metric=false`
      :`http://dataservice.accuweather.com/forecasts/v1/hourly/24hour/${location_key}?apikey=${api_key}&language=en-us&details=false&metric=true`
     

      const response = await fetch(api_forecast_hour)

      const data = await response.json();
   
      console.log('Weather hourly data:', data);


     }
     catch(error){
       console.error('Error fetching weather data:', error);
     }

    }
    else {
      console.log('Location key not found');
    }
  }

  async function daily_condition(){

    const api_forecast_day = `http://dataservice.accuweather.com/forecasts/v1/daily/10day/${location_key}?apikey=${api_key}&language=en-us`
    if(location_key){

      try{

        const response = fetch(api_forecast_day)

        const data = await response.json();

        console.log('Weather data day:', data);

      }
      catch(error){
        console.error('Error fetching weather data:', error);
      }
    }
    else{
      console.log('location key not found')
    }
  }

  window.addEventListener('load', fetchCityWeather);



 
  

 
    