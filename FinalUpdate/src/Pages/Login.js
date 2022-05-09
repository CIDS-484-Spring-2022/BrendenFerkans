import * as React from "react";
import {useNavigate,useLocation,} from "react-router-dom";
import { useAuth } from "../Authentication/Authentication";


function Login() {

    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();

    let [message, setMessage] = React.useState("");
    let [email, setEmail] = React.useState("");
    let [password, setPassword] = React.useState("");

    let from = location.state?.from?.pathname || "/";


    function handleSubmit(event) {
        event.preventDefault();
    
        let formData = new FormData(event.currentTarget);
        let email = formData.get("email");
        let password = formData.get("password");
    
        auth.signin(email, password, (msg) => {
            setMessage(msg);

            if(msg === "")
            {
                navigate(from, { replace: true });
            }
        });
      }

    return (
        <div className='loginBody'>
            <div className='error'>{message}</div>
            <fieldset><legend>Login</legend>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder='Email'
                        autoComplete="on"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />

                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <button type='submit'>Login</button>
                </form>
            </fieldset>
        </div>
    )//end return
}//end class

export default Login;