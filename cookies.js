/**
 * Function to set a cookie
 * @param {string} name - The name of the cookie
 * @param {string} value - The value of the cookie
 * @param {number} days - The number of days the cookie should be stored for
 */
function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '')  + expires + '; path=/';
}

/**
 * Function to get the value of a cookie
 * @param {string} name - The name of the cookie
 * @returns {string} The value of the cookie
 */
function getCookie(name) {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

/**
 * Function to delete a cookie
 * @param {string} name - The name of the cookie
 */
function eraseCookie(name) {   
  document.cookie = name + '=; Max-Age=-99999999;';  
}

// Export the functions to be used in other files
export { setCookie, getCookie, eraseCookie };
