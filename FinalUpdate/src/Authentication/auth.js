import axios from 'axios';
import { setUserSession, removeUserSession, getToken, getUser } from '../local-storage';

/**
 * API to connect to auth server
 */

//NOTE: in a way this page is being used like an interface to the authentication.js page



//this is where it is sending the reqeust
const port = 2001;
const baseUrl = 'http://localhost';


const authProvider = {
  isAuthenticated: false,
  async signin(email, password, callback) {
    let message = '';


    try {
      const response = await axios.post(`${baseUrl}:${port}/users/signin`, { email: email, password: password }, { withCredentials: true });
      setUserSession(response.data.data.token, response.data.data.user);//here it recieves the user and token from the server, then it asks the localStorage page to save it into a session
      authProvider.isAuthenticated = true;

      //console.log("Response from server in auth.js: " + JSON.stringify(response));
	}
    catch(error) {
      message = error.response.data.message;
      console.log("Auth.js-> signIn server returned Error: " + error);
    }
    
    callback(message);
  },
  async signout(callback) {
	try {
		const response = await axios.post(`${baseUrl}:${port}/users/signout`, { username: getUser().username }, { withCredentials: true });
		removeUserSession();
		authProvider.isAuthenticated = false;
		console.log(response);
		callback();
    }
    catch(error) {
    alert("Check error log");
		console.log("Could not sign out!");
		console.log("Auth.js-> signOut server returned Error: " + error);
	}
  },
  getToken() {
	  return getToken();
  },
  getUser() {
	  return getUser();
  },
};


export { authProvider };