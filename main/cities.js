

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


window.addEventListener('load',async()=>{

  //internal api
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
 

  const api_key = 'LU024MAR7zmPGtev8NDH9uZTvJtpcpbU'

  jsonDataBefore.city.forEach(async city =>{

    //fetching added cities to json with location keys

   const api =  `http://dataservice.accuweather.com/currentconditions/v1/${city.location_key}?apikey=${api_key}&language=en-us&details=false`
    try{

      const response = await fetch(api)
      
      
      if(response.status ==200){
        const data = await response.json(); // Parse the JSON data from the response
       
        const Fahrenheit = data[0].Temperature.Imperial.Value
        const Celsius = Math.round(data[0].Temperature.Metric.Value);
        
        const Time = data[0].LocalObservationDateTime.split('T')[1].split(':').slice(0, 2).join(':')
        

    

         //parent div
    const cityDiv = document.createElement('div');
    cityDiv.className = 'city--added grid grid-cols-6 items-center';

    //delete div
    const deleteDiv = document.createElement('div')
    deleteDiv.className = 'col-span-1 justify-self-center'

    const deleteBtn = document.createElement('button')
    deleteBtn.className = "text-red-500 text-2xl rounded-xl border border-red-600 px-2"
    deleteBtn.innerHTML = "&times;"
    deleteBtn.id = "deleteCity"
    
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




})



