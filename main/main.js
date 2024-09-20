

 // Function to get user location
 function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      document.getElementById("location").innerText = "Geolocation is not supported by this browser.";
    }
  }

  // Success callback function to display the position
  function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    document.getElementById("location").innerHTML = `Latitude: ${lat} <br> Longitude: ${lon}`;
  }

  // Error callback function to handle geolocation errors
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        document.getElementById("location").innerText = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        document.getElementById("location").innerText = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        document.getElementById("location").innerText = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        document.getElementById("location").innerText = "An unknown error occurred.";
        break;
    }
  }

  // Call the getLocation function when the page loads
//   window.onload = getLocation;

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