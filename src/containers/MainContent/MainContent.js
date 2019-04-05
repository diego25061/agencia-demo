import React from 'react'
import {Component} from 'react';
import {Route} from 'react-router-dom'
import ViewFiles from '../ViewFiles/ViewFiles'

import './MainContent.css';
import CrearFile from '../ViewFiles/CrearFile/CrearFile';

 class MainContent extends Component{

    componentDidMount(){
        console.log("hah!");
    }
    
    render(){
        return(
            <div className="MainContent">
                <Route path="/huehue" component={() => {return "heheh"}}/>
                <Route path="/files" exact component={ViewFiles}/>
                <Route path="/file/crear" exact component={CrearFile}/>
            </div>
        );
    }

 }

 export default MainContent;