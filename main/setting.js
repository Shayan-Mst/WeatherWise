
//onload user prefrence
window.addEventListener('load', () => {

    let lat = localStorage.getItem('lat');
    let lon = localStorage.getItem('lon');
    let notif = localStorage.getItem('notif')
    let temperature = localStorage.getItem('temperature')
    let wind = localStorage.getItem('wind')
    let pressure = localStorage.getItem('pressure')
    let precipitation = localStorage.getItem('precipitation')
    let distance =  localStorage.getItem('distance')

    
   
    //location
    if(lat && lon){
     location_lat.checked = true;
    }
    else{
    location_lat.checked = false;

    }

    //notif
    if(notif == "true"){

        notifications.checked=true
    }
    else{

        notifications.checked = false
    }

    //temperature

    if(temperature == "fahrenheit"){

        Fahrenheit.classList.add('setting--selected--item')
       
    }
    else{
        Celsius.classList.add('setting--selected--item')
    }

    //wind speed
    if(wind == "ms"){
        Ms.classList.add('setting--selected--item')
    }
    else if(wind == 'knots'){
        Knots.classList.add('setting--selected--item')
    }
    else{
        Kmh.classList.add('setting--selected--item')
    }

    //pressure

    if(pressure == "inHg") inHG.classList.add('setting--selected--item')
   
    else mB.classList.add('setting--selected--item')

    //precipitation

    if(precipitation == 'inch') Inch.classList.add('setting--selected--item')
    else Milimeter.classList.add('setting--selected--item')

    //distance

    if(distance == "mile") Mile.classList.add('setting--selected--item')
    else Km.classList.add('setting--selected--item')
    
  });


//Location

// Function to get user location
function getLocation() {
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

  const location_lat = document.getElementById('location_lat');
  const notifications = document.getElementById('notifications')

  
  location_lat.addEventListener('change',(e)=>{

    if(location_lat.checked){

     
    getLocation();
    }
    
  })



//notification
   // Function to ask for permission and send a notification
   function sendNotification() {
    // Check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support notifications.");
    } 
    // Check if permission is already granted
    else if (Notification.permission === "granted") {
      // If granted, create the notification
      new Notification("Hello! This is your notification.");
      localStorage.setItem("notif","true")
    } 
    // If permission is not yet asked or denied, request it
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification("Permission granted! Here is your notification.");
          localStorage.setItem("notif","true")
        }
      });
    }
  }


  //temperature

  let Celsius=document.getElementById('Celsius');
  let Fahrenheit = document.getElementById('Fahrenheit')

  function celsius(){
   
   Celsius.classList.add('setting--selected--item')
   Fahrenheit.classList.remove('setting--selected--item')
   localStorage.setItem('temperature','celsius')

  }

  function fahrenheit(){
   
    Celsius.classList.remove('setting--selected--item')
    Fahrenheit.classList.add('setting--selected--item')
    localStorage.setItem('temperature','fahrenheit')
 
   }

   //wind speed

   let Kmh = document.getElementById('kmh')
   let Ms = document.getElementById('ms')
   let Knots = document.getElementById('knots')

   function kmh(){

    Kmh.classList.add('setting--selected--item')
    Ms.classList.remove('setting--selected--item')
    Knots.classList.remove('setting--selected--item')
    localStorage.setItem('wind','kmh')

   }

   function ms(){
    Ms.classList.add('setting--selected--item')
    Knots.classList.remove('setting--selected--item')
    Kmh.classList.remove('setting--selected--item')
    localStorage.setItem('wind','ms')
   }

   function knots(){

    Knots.classList.add('setting--selected--item')
    Kmh.classList.remove('setting--selected--item')
    Ms.classList.remove('setting--selected--item')
    localStorage.setItem('wind','knots')
   }

   //pressure

   let mB = document.getElementById("mb")
   let inHG = document.getElementById("inHg")
  


   function mb(){
    mB.classList.add('setting--selected--item')
    inHG.classList.remove('setting--selected--item')
   
    localStorage.setItem('pressure','mb')

   }

   function inHg(){
    inHG.classList.add('setting--selected--item')
    mB.classList.remove('setting--selected--item')
   
    localStorage.setItem('pressure','inHg')
   }
  


//  PRECIPITATION

let Inch = document.getElementById("inch")
let Milimeter = document.getElementById("milimeters")

function inch(){
    Inch.classList.add('setting--selected--item')
    Milimeter.classList.remove('setting--selected--item')
    localStorage.setItem('precipitation','inch')
}

function milimeter(){
    Milimeter.classList.add('setting--selected--item')
    Inch.classList.remove('setting--selected--item')
    localStorage.setItem('precipitation','milimeter')
}

//distance

let Km = document.getElementById("km")
let Mile = document.getElementById("mile")
function km(){

    Km.classList.add('setting--selected--item')
    Mile.classList.remove('setting--selected--item')
    localStorage.setItem('distance','km')

}

function mile(){
    Km.classList.remove('setting--selected--item')
    Mile.classList.add('setting--selected--item')
    localStorage.setItem('distance','mile')

}