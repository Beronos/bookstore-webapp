import React, {Component} from 'react';


class  Navbar extends Component{


    render(){
        return (
        <div id="admin-navbar">
            <div id="logo-container">
                <a href="/authors" id="logo-link"><h3 id="logo">GetABook</h3></a>
            </div>
            <div id="options-container">
                <ul id="options-list">
                    <li><a href="/books">Books</a></li>
                    <li><a href="/authors">Authors</a></li>
                    <li><a href="/loans">Loans</a></li>
                    <li><a href="/logout">Log Out</a></li>
                </ul>
            </div>
        </div>
    )
    
    }

}


export default Navbar;
