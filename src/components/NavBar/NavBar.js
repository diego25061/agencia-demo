import React from 'react'
import {Component} from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom'

 class NavBar extends Component{

    componentDidMount(){

    }
    
    render(){
        return(
            <header>
                <div className="NavBar">
                <Link to="inicio">Inicio</Link>
                <Link to="files">Files</Link>
                <Link to="servicios">Servicios</Link>
                <Link to="transportes">Transportes</Link>
                {/*
                    <a href="somewhere">Files</a>
                    <a href="somewhere">Servicios</a>
                <a href="somewhere">Transportes</a>*/}
                </div>
            </header>
        );
    }

 }

 export default NavBar;