//should this file be deleted and then a method in the auth.js

//or do i put axios in this and use it for my backend

import axios from 'axios';

const port = 2001;//server listening port
const baseUrl = 'http://localhost';

const fileMover = {

    async upload(files, callback){

        let message = '';

        try {
            const response = await axios.post(`${baseUrl}:${port}/users/upload`, {files : files}, { withCredentials: true });//maybe this credential thing will mess it up, unsure if needed

        }//end try
        catch(error)
        {
            message = error.response.data.message;
            console.log("FileMover->upload server returned error: " + error);
        }

        callback(message);
    },//end upload
    async download(fileNames, callback)
    {
        //sends file names to server and response should then be files
    },

};//end fileMover

export { fileMover };