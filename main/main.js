

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
    console.log(`Latitude: ${lat}  Longitude: ${lon}`);
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

  
  location_lat.addEventListener('change',(e)=>{

    if(location_lat.checked){

     
    getLocation();
    }
    
  })
  


  


// city

 // JavaScript to handle modal open/close
 const searchInput = document.getElementById('searchInput');
 const searchInputMain = document.getElementById('searchInputMain');
 const searchModal = document.getElementById('searchModal');
 const closeModal = document.getElementById('closeModal');
 const body = document.body;

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


 //dark mode light mode 

//  const color_mode = document.getElementById('color-mode')

 
//  color_mode.addEventListener("click", () => {
//   console.log(body)
//   // if(color_mode.checked){
//   //   body.classList.add(".light-mode")
//   // }
//   // else{
//   //   body.classList.add(".light-mode")
//   // }

//  })

 function dark_light_mode(){

  body.classList.toggle('light-mode')
 }