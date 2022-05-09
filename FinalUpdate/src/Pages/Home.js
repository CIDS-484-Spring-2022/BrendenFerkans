import React from 'react';
import {useFileMover} from "../FileMovers/FileManager"
import {useEffect } from 'react';
import { flushSync } from 'react-dom';



function Home() {
    let mover = useFileMover();


    let [message, setMessage] = React.useState("");
    let [formd, setFormd] = React.useState('');

    //maybe abstract this by putting it in the localStorage component and then import and use
    function getName()
    {
        let user = JSON.parse(sessionStorage.getItem("user"));
        return user.name;
    }



    function handleUpload(event)
    {
        event.preventDefault();
    
        let formData = new FormData(event.currentTarget);

        formData.append("token",sessionStorage.getItem("token"));


        //logging the array of files 
        // for (var [key, value] of formData.entries()) { 
        //     console.log(key, value);
        //    }


        mover.manageUpload(formData, (msg) => {
            setMessage(msg);
        });

        setFormd('');
    }



    function handleDownload(event)
    {
        event.preventDefault();
    
        let formData = new FormData(event.currentTarget);
        let email = formData.get("email");
        let password = formData.get("password");
    
        mover.manageDownload(email, password, (msg) => {
            setMessage(msg);
            console.log("Mesage from server is: " + msg);
        });
    }

    useEffect(() => {
        loadHomePage();
    }, [])


    //this is for checkboxes on the html
    let checkboxes = [];

    function loadHomePage()
    {
        let data = JSON.parse(sessionStorage.getItem("user"));
        let user = data.email;

        mover.loadHomePage(user, (msg) => {

            console.log("msg: " + msg);
            console.log("msg[0]: " + msg[0]);

            if(msg === "Error")
            {
                console.log("Mesage from server is: " + msg);
            }
            else
            {
                for(const box of msg)
                {
                    checkboxes.push(<input type="checkbox" id={`${box}`} name={`${box}`} value={`${box}`}>${box}</input>);
                }
            }
        });
    }

    

   



    return (
    <main className='homeBody'>
        <h3>Hello, {getName()}</h3>
        <div className='error'>{message}</div>

        <aside className='localFileBox'>
            <fieldset><legend>Download</legend>
                <form onSubmit={handleDownload} encType="multipart/form-data">
                    {checkboxes}
                    <button type='submit'>Download</button>
                </form>
            </fieldset>
        </aside>



        <aside className='cloudFileBox'>
            <fieldset><legend>Upload</legend>
                <form onSubmit={handleUpload} encType="multipart/form-data">
                    <input 
                        type="file"
                        id="file_uploads"
                        name="file_uploads"
                        multiple
                        onChange={(e)=> setFormd(e.target.value)}
                        value={formd}
                        title=" "
                    />
                    <button type='submit'>Upload</button>
                </form>
            </fieldset>
        </aside>
    </main>
    )//end return
}//end home class

export default Home;