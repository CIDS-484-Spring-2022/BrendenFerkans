import React from 'react';
import {Link} from 'react-router-dom';
import { AuthStatus } from "./Authentication/Authentication";

function Nav() {

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
    
                    <Link to='/todo'>
                        <li>ToDo</li>
                    </Link>
                </ul>
            
                <AuthStatus />
                {/*   <Outlet />   renders the current select route */}
            </nav>

        )//end return
}//end class

export default Nav;