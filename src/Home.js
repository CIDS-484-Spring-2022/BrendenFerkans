import React from 'react';

function Home() {
    return (

    <main className='homeBody'>
        <h3>Hello, USER</h3>
        <p>Here will be the greeting message and 
            the file explorers. See mockup for details

            NOTE:  I might need to add enctype which is encodeing. would need to = multipart/form-data when using file submission
        </p>


        <aside className='localFileBox'>
            Choose 1 or more file(s) to upload to the cloud:

            <input
            type="file"
            id="localFiles"
            name="localFiles"
            multiple
            />

            To cloud server
        </aside>


        <aside className='cloudFileBox'>
            Choose 1 or more file to download from the cloud:
            <input
            type="file"
            id="cloudFiles"
            name="cloudFiles"
            multiple
            />  
            To local machine  
        </aside>


        <br/>
        <button>Transfer Changes</button>






        <div className='testFile'>
            <form namemethod="post" enctype="multipart/form-data">

                <div>
                    <label for="image_uploads">Choose images to upload (PNG, JPG)</label>
                    <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" multiple />
                </div>

                <div class="preview">
                    <p>No files currently selected for upload</p>
                </div>

                <div>
                    <button>Submit</button>
                </div>

            </form>
        </div>

    </main>
    )//end return
}//end home class

export default Home;