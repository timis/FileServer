import React from 'react';
import {Link} from 'react-router-dom';

class NavBar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <nav class="navbar navbar-dark bg-primary fixed-top">
                <Link class="navbar-brand" to="/">
                    AppNameHere
                </Link>
            </nav>
        );
    }
}

export default NavBar;