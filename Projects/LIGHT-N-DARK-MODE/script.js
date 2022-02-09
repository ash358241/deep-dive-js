const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

//imageMode
function imageMode(color) {
    image1.src = `img/proud_${color}.svg`; 
    image2.src = `img/feeling_${color}.svg`;
    image3.src = `img/conceptual_${color}.svg`;
}

//darkMode
function darkMode() {
    nav.style.background = 'rgb(0 0 0 / 50%)';
    textBox.style.background = 'rgb(255 255 255 / 50%)';
    toggleIcon.children[0].textContent = 'Dark Mode';
    // toggleIcon.children[1].classList.remove('fa-sun');
    // toggleIcon.children[1].classList.add('fa-moon');
    toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
    imageMode('dark');
}

//lightMode
function lightMode() {
    nav.style.background = 'rgb(255 255 255 / 50%)';
    textBox.style.background = 'rgb(0 0 0 / 50%)';
    toggleIcon.children[0].textContent = 'Light Mode';
    // toggleIcon.children[1].classList.remove('fa-moon');
    // toggleIcon.children[1].classList.add('fa-sun');
    toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
    imageMode('light');
}

//switch theme dynamically
function switchTheme(e) {
    // console.log(e.target.checked);
    if(e.target.checked){
        document.documentElement.setAttribute('data-theme', 'dark'); 
        localStorage.setItem('theme', 'dark');
        darkMode();  
    }else{
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        lightMode();
    }
}

//event listeners
toggleSwitch.addEventListener('change', switchTheme);

//check local storage for theme 
const currentTheme = localStorage.getItem('theme');
if(currentTheme){
    document.documentElement.setAttribute('data-theme', currentTheme); 
    if(currentTheme === 'dark'){
        toggleSwitch.checked = true;
        darkMode();  
    }
}