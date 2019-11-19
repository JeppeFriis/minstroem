import React from 'react';
import './Header.css';


class Header extends React.Component {

    render() {
        return (
            <div className="header"> 
                <nav className="site-nav wrapper">
                    <a className="site-title page-link active" id="title">Vores Energi</a>
                    <a className="page-link ">Om projektet</a>
                </nav>
            </div>
        );
    }
}




export default Header;