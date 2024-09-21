// Function to get user location
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
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

  window.addEventListener('load', () => {

    let lat = localStorage.getItem('lat');
    let lon = localStorage.getItem('lon');
    let notif = localStorage.getItem('notif')
   
    if(lat && lon){
     location_lat.checked = true;
    }
    else{
    location_lat.checked = false;

    }
    if(notif == "true"){

        notifications.checked=true
    }
    else{

        notifications.checked = false
    }
    
  });



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