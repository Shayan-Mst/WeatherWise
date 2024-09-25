
const regex = /(\d+)\?name=([\w\s]+)/;



function getLocationKeyFromURL() {
    const params = new URLSearchParams(window.location.search);
    const location_keys = params.get('location_key').match(regex)
    const location_key = location_keys[1];
    return location_key;
  }

  function getNameFromURL() {
    const params = new URLSearchParams(window.location.search);
    const names = params.get('location_key').match(regex)
    const name = names[2];
    return name;
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
    const api_current =  `http://dataservice.accuweather.com/currentconditions/v1/${location_key}?apikey=${api_key}&language=en-us&details=true`

 
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

first_section.appendChild(nameP)

//devider
const dDiv = document.createElement('div');
dDiv.className = 'p-1';

first_section.appendChild(dDiv)
//chance of either rain / snow / sleet
const chanceP = document.createElement('p')
chanceP.className = 'opacity-70 text-sm'
chanceP.innerHTML = `chance of rain : 17 %`
first_section.appendChild(chanceP)
//pressure

const pressureP = document.createElement('p')
const pressureType = localStorage.getItem('pressure')
pressureP.className = 'opacity-70 text-sm'
pressureP.innerHTML = pressureType === 'inHg'? `pressure : ${data[0].Pressure.Imperial.Value} inHg` : `pressure : ${data[0].Pressure.Metric.Value} mb`
first_section.appendChild(pressureP)
//br
const br =  document.createElement('br')
first_section.appendChild(br)
first_section.appendChild(br)
//temperature
const temperatureType = localStorage.getItem('temperature')
const temperatureP = document.createElement('p')
temperatureP.className = 'text-6xl font-bold hidden md:block'
temperatureP.innerHTML = temperatureType=='fahrenheit'?`${data[0].Temperature.Imperial.Value} &deg;`:`${data[0].Temperature.Metric.Value} &deg;`

first_section.appendChild(temperatureP)
//second section

//image weather

const imageImg = document.createElement('img')
imageImg.classList = 'w-48 h-48 mx-auto'
imageImg.src = './../pics/sun.png'

second_section.appendChild(imageImg)

//temperature

const tempP = document.createElement('p')
tempP.className = 'text-6xl font-bold  md:hidden'
tempP.innerHTML = temperatureType=='fahrenheit'?`${data[0].Temperature.Imperial.Value} &deg;`:`${data[0].Temperature.Metric.Value} &deg;`

second_section.appendChild(tempP)

//details real feel ,chance of rain , wind speed , UV Index

const real_feel = document.getElementById('real--feel')
const chance_rain = document.getElementById('chance--rain')
const wind_speed = document.getElementById('wind--speed')
const uv_index = document.getElementById('uv--index')


//real feel
const feelDiv = document.createElement('div')
feelDiv.className = 'mx-12 text-2xl font-semibold'
feelDiv.innerHTML = temperatureType=='fahrenheit'?`${data[0].RealFeelTemperature.Imperial.Value} &deg;`:`${data[0].RealFeelTemperature.Metric.Value} &deg;`

//visiblity
const visiblityDiv = document.createElement('div')
const visiblityType = localStorage.getItem('distance')
visiblityDiv.className = 'mx-12 text-2xl font-semibold'
visiblityDiv.innerHTML =  visiblityType=='mile'?`${data[0].Visibility.Imperial.Value} Miles`:`${data[0].Visibility.Metric.Value} Km`


//wind speed 


const windDiv = document.createElement('div')
const windType = localStorage.getItem('wind')
windDiv.className = 'mx-12 text-2xl font-semibold'
windDiv.innerHTML = ((windType=='ms')?`${(data[0].Wind.Speed.Metric.Value/3.6)} m/s`:(windType == 'knots')?`${(data[0].Wind.Speed.Metric.Value/1.852)} knots`:`${data[0].Visibility.Metric.Value} Km`) + `${data[0].Wind.Direction.Degrees} &deg; ${data[0].Wind.Direction.English}`



//uv index

const uvDiv = document.createElement('div')
uvDiv.className = 'mx-12 text-2xl font-semibold'
uvDiv.innerHTML = `${data[0].UVIndex}`




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



 
  

 
    