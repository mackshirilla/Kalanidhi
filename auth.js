import { setCookie } from './cookies.js'; // Import the setCookie function from cookies.js

function validateEmail(email) {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(email);
}

function handleEmailInput(event) {
  const emailInput = event.target;
  const email = emailInput.value;
  const emailErrorMessage = document.querySelector('[w-el="emailErrorMessage"]');

  if (!email || !validateEmail(email)) {
    emailErrorMessage.style.display = 'block';
    emailErrorMessage.textContent = 'Please enter a valid email address';
    emailInput.style.boxShadow = '0 0 0 1px #ff3b30';
  } else {
    emailErrorMessage.style.display = 'none';
    emailInput.style.boxShadow = '';
  }
}

async function handleSignupFormSubmit(event) {
  event.preventDefault();
  event.stopImmediatePropagation();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const emailInput = document.getElementById('email');
  const email = emailInput.value;

  const loadingElement = document.querySelector('[w-el="loadingCreateAccount"]');
  const submitErrorMessage = document.querySelector('[w-el="submitErrorMessage"]');
  const emailErrorMessage = document.querySelector('[w-el="emailErrorMessage"]');

  // Validate email
  if (!email || !validateEmail(email)) {
    emailErrorMessage.style.display = 'block';
    emailErrorMessage.textContent = 'Please enter a valid email address';
    emailInput.style.boxShadow = '0 0 0 1px #ff3b30';
    return;
  } else {
    emailErrorMessage.style.display = 'none';
    emailInput.style.boxShadow = '';
  }

  loadingElement.style.display = 'block';
  submitErrorMessage.style.display = 'none';

  try {
    const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:uf0rJHld/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        firstName,
        lastName,
      }),
    });

    const responseData = await response.json();

    if (response.ok) {
      // Store the token in a cookie before navigating to the dashboard
      setCookie('authToken', responseData.authToken, 1);
      window.location.assign('/my-dashboard');
    } else {
      submitErrorMessage.style.display = 'block';
      submitErrorMessage.textContent = responseData.message || 'User registration failed';
      console.error('User registration failed:', responseData);
    }
  } catch (error) {
    submitErrorMessage.style.display = 'block';
    submitErrorMessage.textContent = 'An error occurred during user registration';
    console.error('An error occurred during user registration:', error);
  } finally {
    loadingElement.style.display = 'none';
  }
}

// Add event listeners to the form and email input
const signupForm = document.getElementById('wf-form-Form');
const emailInput = document.getElementById('email');
signupForm.addEventListener('submit', handleSignupFormSubmit);
emailInput.addEventListener('input', handleEmailInput);
