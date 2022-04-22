import React from 'react';
import {useFileMover} from "../FileMovers/FileManager"



function Home() {
    let mover = useFileMover();

    let [message, setMessage] = React.useState("");

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

        let files = formData.get("file_uploads");//should be an array of different files

        //lets see what this actually is

        console.log('\n');
        console.log("Raw data 'files' is: " + files);//says its a object file

        console.log('\n');
        console.log("Stringified files is: " + JSON.stringify(files));//doesnt work?
        console.log('\n');



    

        mover.manageUpload(files, (msg) => {
            setMessage(msg);//should be a message of completed or not, maybe deal with the hashes as well

            
        });
    }



    function handleDownload(event)
    {
        event.preventDefault();
    
        let formData = new FormData(event.currentTarget);
        let email = formData.get("email");
        let password = formData.get("password");
    
        mover.manageDownload(email, password, (msg) => {
            setMessage(msg);

        });
    }



    return (
    <main className='homeBody'>
        <h3>Hello, {getName()}</h3>

        <aside className='localFileBox'>
            <fieldset><legend>Download</legend>
                <form onSubmit={handleDownload} encType="multipart/form-data">
                    <input type="file" id="file_downloads" name="file_downloads"  multiple />
                    <button type='submit'>Download</button>
                </form>
            </fieldset>
        </aside>



        <aside className='cloudFileBox'>
            <fieldset><legend>Upload</legend>
                <form onSubmit={handleUpload} encType="multipart/form-data">
                    <input type="file" id="file_uploads" name="file_uploads"  multiple />
                    <button type='submit'>Upload</button>
                </form>
            </fieldset>
        </aside>




        <aside className='testBox'>
                <div className='testFile'>
                    <form namemethod="post" encType="multipart/form-data">

                        <div>
                            <label htmlFor="image_uploads">Choose images to upload (PNG, JPG)</label>
                            <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" multiple />
                        </div>

                        <div className="preview">
                            <p>No files currently selected for upload</p>
                        </div>

                        <div>
                            <button>Submit</button>
                        </div>

                    </form>
                </div>
        </aside>

    </main>
    )//end return
}//end home class

export default Home;