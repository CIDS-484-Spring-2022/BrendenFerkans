"use strict"
require('dotenv').config();



//----------------------URL constructing-------------------------------
const baseUrl = process.env.BASEURL;//this is the base url. localhost for devopment and adastra for production
const serverPort = process.env.SERVER_PORT;//Designated listening port for SERVER i think i usually have 2001
const clientPort = process.env.CLIENT_PORT;//For the cors and allowing requests from the client
//-------------------------------END-----------------------------------





//-------------------Express server and misc----------------------------
const express = require('express');
const fs = require('fs/promises');
const app = express();
app.use(express.json());
//------------------------------END--------------------------------------





//--------------------------Express session---------------------------------------
const session = require('express-session');
const { Store } = require('express-session');
//sets cookie settings
app.set('trust proxy', 1);
app.use(session({
  //store: new RedisStore({ client: redisClient }),*************************For production REDIS******************
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 //the last spot is for hours, as so the next number would be number of days
  }
}));

//add true to cookie for only https, secure connections only
//httpOnly???--token yes, user no
//---------------------------------END-----------------------------------------------





//-------------------------------------CORS----------------------------------------------
const cors = require('cors');
app.use(cors({ origin: `${baseUrl}:${clientPort}`, credentials: true}));//port says 2001 i cant remember why the difference

//sets more cors permissions
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", `${baseUrl}:${clientPort}`); // update to match the domain you will make the request
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods', 'POST');//add whatever options
  next();
});
//--------------------------------------END-----------------------------------------------





//--------------------------------Multer-------------------------------------
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
//------------------------------------END-------------------------------------





//--------------------------------Adm-zip-------------------------------------
const Admzip = require("adm-zip");
//------------------------------------END-------------------------------------





//--------------------------------Redis--------------------------------------------
//const redis = require('redis');
//const connectRedis = require('connect-redis');
//const RedisStore = connectRedis(session);

//Configure redis client
// const redisClient = redis.createClient({
//   host: 'localhost',
//   port: 6379
// });


// redisClient.on('error', function (err) {
//   console.log('Could not establish a connection with redis. ' + err);
// });
// redisClient.on('connect', function (err) {
//   console.log('Connected to redis successfully');
// });
//-----------------------------------END-----------------------------------------





async function getReadUserDataFromFile() {
  const fss = require('fs').promises;
  const fileData = await fss.readFile('./Users.json', 'utf8');

  const fileObj = JSON.parse(fileData);
  return fileObj.users;
}




// validate the user credentials
app.post('/users/signin', async function (req, res) {
  let users = { users: [] };

  try{
    users.users = await getReadUserDataFromFile();
  }
  catch(error)
  {
    console.log("Error grabbing user from file: " + error);
  }
  

  const email = req.body.email;
  const password = req.body.password;
  let user;
  let data;

  // return 400 status if username/password is not exist(not passed in)
  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: "Username and Password required"
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
      //saves user indo data for payload
      data = {user: user, token: req.session.id};


      req.session.email = user.email;

      return res.json({ data });
    }//end if pass user name match
  }//end for

  return res.status(401).json({
    error: true,
    message: "Incorrect username or password"
  });//end return statement
 
});//end sign in



//signs out
app.post('/users/signout', function (req, res) {
  req.session.destroy();//perhaps destroy by id??
  return res.send();
});




app.post('/users/download', function (req, res){
  //check if logged in
  if(!req.session.email)
  {
    return res.status(401).json({
      error: true,
      message: "Login Required"
    });
  }


  //find all file names
  //search for files
  //send files back

  let zip = new Admzip();

  let fileNames = req.body.fileNames;

  console.log("fileNames: " + fileNames);


  for(let i = 0; i < fileNames.length; i++)
  {
    let path = `./Storage/${req.session.email}/${fileNames[i]}`;
    zip.addLocalFile(path);

  }

  zip.writeZip("zippedToSend", `./Storage/${req.session.email}/files.zip`);
  //clean up above after success??

  //res.download(`./Storage/${req.session.email}/`);

});//end download






app.post('/users/loadHomePage', async function (req, res){
  //check if logged in
  if(!req.session.email)
  {
    return res.status(401).json({
      error: true,
      message: "Login Required"
    });
  }

  let data = [];

  try
  {
    const files = await fs.readdir(`./Storage/${req.session.email}`);
    for (const file of files)
    {
      console.log(file);
      data.push(file);
    }

    console.log("Data: " + data);
    console.log("Data[0]: " + data[0]);
  }
  catch (err)
  {
    console.error("Error reading Directory: " + err);
  }

  return res.json({ data });
});//end loadHomePage







app.post('/users/upload', upload.array('file_uploads') , async function (req, res) {
//check if logged in
  if(!req.session.email)
  {
    return res.status(401).json({
      error: true,
      message: "Login Required"
    });
  }


  const existSync = require('fs').existsSync;

  for(let i = 0; i <req.files.length; i++)
  {
    //get file name from uploads first
    let fileName = req.files[i].filename;


    if(!existSync(`./Storage/${req.session.email}`))
    {
      try
      {
        await fs.mkdir(`./Storage/${req.session.email}`);
      }
      catch(error)
      {
        console.log("Error making directory: " + error);
        return res.status(500).json({
          error: true,
          message: "Error directroy"
        });
      }
    }

  
    try
    {
      await  fs.rename(`./uploads/${fileName}`,`./Storage/${req.session.email}/${req.files[i].originalname}`);
    }
    catch(error)
    {
      console.log("Error moving files: " + error);
      return res.status(500).json({
        error: true,
        message: "Error in file moving"
      });
    }
  }//end for loop on moving files

  //future features: catching and repeat after intrurrupt, handling zipped files for file structure, hashing and comparing for accuracy

  return res.status(200).json({
    message: "Upload Successful"
  });
});//end upload



//sets listening port
app.listen(serverPort, () => {
    console.log(`Server is listening at ${serverPort}`)
    //any methods you want on start
  });