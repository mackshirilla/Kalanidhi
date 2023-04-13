// Import the setCookie function from cookies.js
import { setCookie } from './cookies.js';

/**
 * Function to validate an email address
 * @param {string} email - The email address to validate
 * @returns {boolean} true if the email is valid, false otherwise
 */
function validateEmail(email) {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(email);
}

/**
 * Function to handle email input changes
 * @param {Object} event - The input change event
 */
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

/**
 * Function to handle the form submit event
 * @param {Object} event - The form submit event
 */
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

 
