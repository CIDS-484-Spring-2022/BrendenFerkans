"use strict"

require('dotenv').config();
const baseUrl = "http://localhost";//this is the base url. localhost for devopment and adastra for production
const port = process.env.PORT || 2001;//Designated listening port for SERVER

const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({ origin: `${baseUrl}:3000`, credentials: true}));//port says 2001 i cant remember why the difference
const session = require('express-session');

//sets more cors permissions
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", `${baseUrl}:3000`); // update to match the domain you will make the request from///my edit might be wrong
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');//add whatever options I want
  next();
});


//sets cookie settings
app.set('trust proxy', 1);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60 * 1000
  }
}));



const users = { users: [] };


async function readUserDataFromFile() {

  const fs = require('fs').promises;
  const fileData = await fs.readFile('./Users.json', 'utf8');

  const fileObj = JSON.parse(fileData);
  users.users = fileObj.users;
}




// validate the user credentials
app.post('/users/signin', function (req, res) {
////////////////////////////////////////////////////
////////////second user cannot sign in//////////////
////////////////////////////////////////////////////
  const email = req.body.email;
  const password = req.body.password;
  let user;
  let data;

  // return 400 status if username/password is not exist(not passed in)
  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: "Username or Password required"
    });
  }

  // return 401 status if the credential is not match.
  for(let i = 0; i < users.users.length; i++)
  {
    if(email == users.users[i].email && password == users.users[i].password)
    {

      user = 
      {
        id: users.users[i].id,
        email: users.users[i].email,
        name: users.users[i].name,
        background: users.users[i].background
      }

      data = {user: user, token: req.session.id};
      //console.log("\n");
      //console.log("Login Successful");
      //console.log("\n");
      //console.log("\n");
      //console.log("Response Data is: " + JSON.stringify(data));

      return res.json({ data });
    }//end if pass user name match
    else{
	        return res.status(401).json({
            error: true,
            message: "Incorrect username or password"
          });//end return statement
        }//end else
  }//end for
 
});//end sign in



//signs out
app.post('/users/signout', function (req, res) {
  req.session.destroy();
  return res.send();
});



//load home screen
//json data with names of files
//the download request sends names of requested files for download



app.post('/users/upload', function (req, res) {
  console.log('\n');
  console.log('\n');
  console.log("Entered the server/users/upload endpoint");
  console.log('\n');
  console.log('\n');


  let request = req.body;
  let data = req.body.files;
  console.log('\n');
  console.log("Requset unstrinified looks like: " + request);

  console.log('\n');
  console.log("Request object looks like stringified: " + JSON.stringify(request));

  console.log('\n');
  console.log("Raw data from req.body looks like: " + data);

  console.log('\n');
  console.log("Stringified data looks like: " + JSON.stringify(data));


  //STEP 1: manually create a user1 folder and see if i cant get a file to appear there
  //STEP 2: maybe have to use node to put file there
  //Step etc. use error saving and hashing




//upload endpoint
//use a directory for users/shared and dump files into correct file

//check folder access
//dump files



//axios might have it error catching and repeat? it also might break down large files into smaller chunks?

//zipping and unzipping will carry file structrue
//hash product and compare to original hash for accuracy


  return res.send();
});



//sets listening port
app.listen(port, () => {
    console.log(`Server is listening at ${port}`)
    readUserDataFromFile();
  });