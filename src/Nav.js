import React from 'react';
import {Link} from 'react-router-dom';

function Nav() {
    //needs to change to state
    let isLoggedIn = true;


    function handleLogout ()
    {
        //change state to logged out
        
    }

    if(isLoggedIn)
    {
        return (
            <nav>
                <Link to="/">
                    <img src='./logo.png' className='logo'/>
                </Link>
    
                <ul className='nav-links'>
                    <Link to='/about'>
                        <li>About</li>
                    </Link>
    
                    <Link to='/settings'>
                        <li>Settings</li>
                    </Link>
    
                    <Link to='/logout'>
                        <li><button className='logoutButton' onClick={handleLogout}>Logout</button></li>
                    </Link>
    
                    <Link to='/todo'>
                        <li>ToDo</li>
                    </Link>
                </ul>
            </nav>
        )//end return
    }//end if
    else{
            return (
            <nav>
                <Link to="/">
                    <img src='./logo.png' className='logo'/>
                </Link>

                <ul className='nav-links'>
                    <Link to='/about'>
                        <li>About</li>
                    </Link>

                    <Link to='/login'>
                        <li>Login</li>
                    </Link>
                </ul>
            </nav>
        )//end return
    }//end else

}//end class

export default Nav;