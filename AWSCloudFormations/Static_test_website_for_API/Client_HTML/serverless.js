
var API_ENDPOINT = 'https://5f0424dxoj.execute-api.ap-southeast-2.amazonaws.com/Production/TaskReminderAPI';
// if correct it should be similar to https://5f0424dxoj.execute-api.ap-southeast-2.amazonaws.com/Production/TaskReminderAPI

var errorDiv = document.getElementById('error-message')
var successDiv = document.getElementById('success-message')
var resultsDiv = document.getElementById('results-message')

// function output returns input button contents
function waitSecondsValue() { return document.getElementById('waitSeconds').value }
function messageValue() { return document.getElementById('message').value }
function emailValue() { return document.getElementById('email').value }
function phoneValue() { return document.getElementById('phone').value }

function clearNotifications() {
    errorDiv.textContent = '';
    resultsDiv.textContent = '';
    successDiv.textContent = '';
}

// When buttons are clicked, these are run passing values to API Gateway call
document.getElementById('bothButton').addEventListener('click', function(e) { sendData(e, 'both'); });
document.getElementById('emailButton').addEventListener('click', function(e) { sendData(e, 'email'); });
document.getElementById('smsButton').addEventListener('click', function(e) { sendData(e, 'sms'); });


function sendData (e, pref) {
    e.preventDefault()
    clearNotifications()
    fetch(API_ENDPOINT, {
        headers:{
            "Content-type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify({
            waitSeconds: waitSecondsValue(),
            preference: pref,
            message: messageValue(),
            email: emailValue(),
            phone: phoneValue()
        }),
        mode: 'cors'
    })
    .then((resp) => resp.json())
    .then(function(data) {
        console.log(data)
        successDiv.textContent = 'Submitted. But check the result below!';
        resultsDiv.textContent = JSON.stringify(data);
    })
    .catch(function(err) {
        errorDiv.textContent = 'Oops! Error Error:\n' + err.toString();
        console.log(err)
    });
};
