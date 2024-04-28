export function getAllCookies (){
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const cookieObject = {};
  
    cookies.forEach(cookie => {
      const [name, value] = cookie.split('=');
      cookieObject[name] = value;
    });
  
    return cookieObject;
  }