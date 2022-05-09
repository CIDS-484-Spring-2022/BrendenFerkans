import axios from 'axios';

const port = 2001;//server listening port
const baseUrl = 'http://localhost';

const fileMover = {

    async upload(files, callback){

        let message = '';

        try {
            const response = await axios.post(`${baseUrl}:${port}/users/upload`, files, { withCredentials: true }, {headers:{ "Content-Type": "multipart/form-data"}});

            message = response.data.message;
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
        let message = '';
        try {
            const response = await axios.post(`${baseUrl}:${port}/users/download`, fileNames, { withCredentials: true });

            message = response.data.message;
        }//end try
        catch(error)
        {
            message = error.response.data.message;
            console.log("FileMover->download server returned error: " + error);
        }

        callback(message);
    },
    async loadHomePage(user, callback){
        let message = '';
        try {
            const response = await axios.post(`${baseUrl}:${port}/users/loadHomePage`, user, { withCredentials: true });

            message = response.data.data;
        }//end try
        catch(error)
        {
            message = "Error";
            console.log("FileMover->load Home page error: " + error);
        }

        callback(message);
    },

};//end fileMover

export { fileMover };