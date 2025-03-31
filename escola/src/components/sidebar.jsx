import React from 'react';
import "./css/navbar.css";
import logo from "./assets/logo.svg";

export default function Sidebar() {
    return (
        <div id='root'>
            <div id='navbar'>
                <div id='nav-logo'><img src={logo}></img></div>
                <div id='nav-topCont'>
                    <div id='top' className='nav-main-button'>A</div>
                    <div id='bottom' className='nav-main-button'>B</div>
                </div>
            </div>
        
        </div>
    );
}