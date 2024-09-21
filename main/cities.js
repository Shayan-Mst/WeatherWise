// JavaScript to handle modal open/close
const searchInput = document.getElementById('searchInput');
const searchInputMain = document.getElementById('searchInputMain');
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


