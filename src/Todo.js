import React from 'react';

function Todo() {



    return (

    <main>
        <h3>TODO:</h3>

        <ol>
            <li>Add abstraction with functions</li>
            <li>the thick border is caused by changeing the divs to bodys, this is weird as nav does not have that problem, look into it.</li>
            <li>Further CSS</li>
            <li>Start server side, endpoints and processes</li>
            <li>Change loggedIn variable for nav change to use state or session</li>
            <li>Maybe make 2 busttons, one for upload, one for download</li>
            <li>change the body to main and format accordinly</li>
            <li>Add file transfer mechanisms</li>
            <li>When logged in use cookies. Save entire logged in user with token as cookie, on logout delete cookie of entire user.</li>
            <li>change login when loggedin to logout...note on app.js page</li>
            <li>format 404 page with a cat ryan reynolds</li>
            <li>Make error component</li>
        </ol>
    </main>

    )
}

export default Todo;