
//dark mode light mode 

 

 let body = document.body
 let checkBox_color_mode = document.getElementById('color-mode')

function dark_light_mode(){

    body.classList.toggle('light-mode')
  
    if(body.classList.contains('light-mode')){
      localStorage.setItem('theme', 'light'); // Save the selected theme in localStorage
    }
    else{
      localStorage.setItem('theme', 'dark'); // Save the selected theme in localStorage
    }
   }
  
   
  //function for loading user prefrence on page load      
window.addEventListener('load', () => {

    let savedTheme = localStorage.getItem('theme');
    if(savedTheme=='light'){
      body.classList.add('light-mode')
    
      checkBox_color_mode.checked = true;
    }
    else{
      body.classList.remove('light-mode')

    }
    
  });