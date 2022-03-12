"use strict"


const express = require('express');
const cors = require('cors');
const e = require('express');
const port = 2001;//Designated listening port for SERVER
const app = express();
app.use(express.json());

// This is the services base url. All other endpoints start with this.
const baseUrl = "http://localhost";
//this is the base url. localhost for devopment and adastra for production


app.use(cors({ origin: `${baseUrl}:3000`, credentials: true}));
//look into security settings
//look into cross resource sharing 

// tell express app to serve our static webpage (html and javascript in the webapp directory)
//app.use(express.static('../webapp'));//may or may need it, to serve up static web page
//was used in star wars one to serve up a web page instead theirs
//think of this as the webserver that points to index??


/* 
   -how they need to do what they do. remember these are used in requests to the server
   -an endpoint for fecthing files on server associated with requesting user
   -an endpoint to change settings
   -endpoint/request handler for actually tranfering files via either upload or download
*/

const users = { users: [] };


  async function readCardDataFromFile() {

    //untested
    const fs = require('fs').promises;
    const fileData = await fs.readFile('./Users.json', 'utf8');
  
    const fileObj = JSON.parse(fileData);
    users.users = fileObj.users;

    //for troubleshooting
    // console.log('\n');
    // console.log('\n');
    // console.log("Users read from file!");
    // console.log("Users: " + users);
    // console.log("User.name: " + users.users[1].name);
    // console.log('\n');
    // console.log('\n');
  }



app.post('/login', (req,res) => {   
  console.log('\n');
  console.log("ServerSide log: entered server side request for /login");
  console.log('\n');
  console.log('\n');
  
  let email = req.body.email;
  let password = req.body.password;
  let user = {};
  let data = "";

  for(let i = 0; i < users.users.length; i++)
  {
    if(email == users.users[i].email && password == users.users[i].password)
    {
      user = 
      {
        id: users.users[i].id,
        email : users.users[i].email,
        password: users.users[i].password,
        name: users.users[i].name,
        token: users.users[i].token,
        background:users.users[i].background  
      }
      console.log('\n');
      console.log('\n');
      console.log("Login Success");
      console.log('\n');
      console.log('\n');
      data = user;
      break;      
    }
  }//end for
  res.send(JSON.stringify(data));
});




app.listen(port, () => {
    console.log(`Server is listening at ${baseUrl}:${port}`)
    readCardDataFromFile();
  });

















  /*
  maybe needed for endpoint? not sure

  app.get('/', (req, res) => {
  const endpoints = {
    "cards": baseUrl + "/cards",
  };
  res.send(endpoints);
});
  */