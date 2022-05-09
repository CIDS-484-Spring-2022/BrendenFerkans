import * as React from "react";
import {Link} from 'react-router-dom';
import {useNavigate, useLocation, Navigate} from "react-router-dom";
import { authProvider } from "./auth";


let AuthContext = React.createContext();

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);//this is for setting user object into something.... this is for my use

  let signin = (email, password, callback) => {
    return authProvider.signin(email, password, (message) => {
      setUser(email);
      callback(message);
      
    });
  };



  let signout = (callback) => {
    return authProvider.signout(() => {
      setUser(null);
      callback();
    });
  };



  let getToken = () => {
	  return authProvider.getToken();
  };

  let getUser = () => {
	  return authProvider.getUser();
  };




  let value = { user, signin, signout, getToken, getUser };

  

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.getToken()) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}



function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.getToken()) {
    return  (
      <ul className='login-link'>
        <Link style={{ textDecoration: 'none' }} to='/login'>
          <li>Login</li>
        </Link>
      </ul>
    )
  }

  return (
      <button className="logOutButton" onClick={() => {
          auth.signout(() => navigate("/login"));
        }}>
        Sign out
      </button>
  );
}

export { AuthProvider, RequireAuth, AuthStatus, useAuth };