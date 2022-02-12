const countdownForm = document.getElementById('countdownForm');
const inputContainer = document.getElementById('input-container');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

//populate countdown
const updateDOM = () => {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        //hide input
        inputContainer.hidden = true;

        //if the countdown has ended, show complete 
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        }
        else {
            //show the countdown in progress
            countdownElTitle.textContent = countdownTitle;
            timeElements[0].textContent = days;
            timeElements[1].textContent = hours;
            timeElements[2].textContent = minutes;
            timeElements[3].textContent = seconds;

            countdownEl.hidden = false;
            completeEl.hidden = true;
        }

        //populate countdown
        // countdownElTitle.textContent = countdownTitle;
        // timeElements[0].textContent = days;
        // timeElements[1].textContent = hours;
        // timeElements[2].textContent = minutes;
        // timeElements[3].textContent = seconds;
    }, second)
}

//reset all values
const reset = () => {
    inputContainer.hidden = false;
    countdownEl.hidden = true;
    completeEl.hidden = true;
    //stop the countdown
    clearInterval(countdownActive);
    //reset the values
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
    countdownForm[0].reset();
}

//restore previous countdown
const restoreCountdown = () => {
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(savedCountdown.date).getTime();
        updateDOM();
    }
}

//event listeners
//take values fro input
countdownForm.addEventListener('submit', function (e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    }
    console.log(savedCountdown);
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    //check for valid date
    if (countdownDate == '') {
        alert('Please enter a valid date');
        return;
    }
    //check for valid title
    if (countdownTitle == '') {
        alert('Please enter a valid title');
        return;
    }
    else {
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
})

countdownBtn.addEventListener('click', reset); 
completeBtn.addEventListener('click', reset);

//on load 
restoreCountdown();