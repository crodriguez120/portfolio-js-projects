const formEl = document.getElementById('form');
const firstPasswordEl = document.getElementById('firstPassword');
const secondPasswordEl = document.getElementById('secondPassword');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');

let isValid = false;
let passwordsMatch = false;

function validateForm() {
    // Using Contraint API 
    isValid = formEl.checkValidity();
    // Style main message for an error
    if (!isValid) {
        message.textContent = 'Please fill out all fields';
        message.style.color = 'red';
        messageContainer.style.borderColor = 'red';
        return;
    }
    // Check to see if passwords match
    if (firstPasswordEl.value === secondPasswordEl.value) {
        passwordsMatch = true;
        firstPasswordEl.style.borderColor = 'green';
        secondPasswordEl.style.borderColor = 'green';
    } else {
        passwordsMatch = false;
        firstPasswordEl.style.borderColor = 'red';
        secondPasswordEl.style.borderColor = 'red';
        message.textContent = 'Make sure the passwords match.';
        message.style.color = 'red'
        messageContainer.style.borderColor = 'red';
        return;
    }
    // If form is valid and password match
    if (isValid && passwordsMatch) {
        message.textContent = 'User successfully registered.'
        message.style.color = 'green';
        messageContainer.style.borderColor = 'green';
    }
}

function storeFormData() {
    const user = {
        name: formEl.name.value,
        phone: formEl.phone.value,
        website: formEl.website.value,
        email: formEl.email.value,
        password: formEl.password.value,
    }
    // Show data in the browser console
    console.log(user);
}

function processFormData(e) {
    e.preventDefault();
    // Validate Form
    validateForm();
    // Submit Data if valid
    if (isValid && passwordsMatch) {
        storeFormData()
    }
}

// Event Listener
formEl.addEventListener('submit', processFormData);