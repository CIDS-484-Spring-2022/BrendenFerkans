import React, {Component} from 'react';

//global variables to login.js
//change values for production
//these should match what is on the serverSide

let baseUrl = 'http://localhost';
let port = '2001';
let loginError = "";

let webMessage = "";

export default class Login extends Component {
    constructor(props)
    {
        super(props);
    
        this.state = 
        {
            email: "",
            password: "",
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }//end Constructor



    handleChange(event) 
    {
        this.setState({[event.target.name]: event.target.value});
    }//handleChange



    async handleSubmit(event)
    { 
        console.log("Entered the Handle Submit");

        const payload = {
            email: this.state.email,
            password:this.state.password
        }
        console.log(payload);

        fetch('http://localhost:2001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
        .then(response => response.json())
        .then(data => {

            console.log("Entered the Handle Submit second then, should log recieved below:");
            console.log("Data returned is: " + data);

            if(data !== "")
            {
                //save user in session and chagne logged in variable for nav bar
                //forward to dashboard

            }
            else{
                webMessage = "Invalid Login, If you forgot password please contact support";
                alert("error should apprear, i think it needs to refresh in a way, or use state?");
                //this should fill web message eith error, however when it does it does not refresh on page, thus it does not
                //display the message
            }
        })
        .catch((error) => {
            //perhaps forward to an error page
            console.error('Error:', error);
            alert("Error Occured, check log");
            console.log("Error follows:: " + error);
        });
        event.preventDefault();
    }//end handleSubmit
    


    render() 
    { 
        //put an error component at the top of each page that can be filled with data, like the error in my ferkansDesk
        return (
            <main className='loginBody'>
                <div className='error'>{webMessage}</div>
                <fieldset><legend>Login</legend>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Email'
                            onChange={this.handleChange}
                            value={this.state.email}
                            autocomplete="on"
                            required
                        />

                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder='Password'
                            onChange={this.handleChange}
                            value= {this.state.password}
                            aautocomplete="off"
                            required
                        />
                        <button type='submit'>Login</button>
                    </form>
                </fieldset>
            </main>
        )//end return
    }//end render
}//end class