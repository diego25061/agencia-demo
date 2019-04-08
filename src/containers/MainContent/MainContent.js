import React from 'react'
import {Component} from 'react';
import {Route} from 'react-router-dom'
import ViewFiles from '../ViewFiles/ViewFiles'

import './MainContent.css';
import CrearFile from '../ViewFiles/CrearFile/CrearFile';
import {Grid, Segment} from 'semantic-ui-react'
import Inicio from '../Inicio/Inicio';

 class MainContent extends Component{

    componentDidMount(){
        console.log("hah!");
    }
    
    render(){
        return(
            <div className="MainContent">
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={2}></Grid.Column>
                        <Grid.Column width={12}>
                        <br/>
                            <Route path="/inicio" exact component={Inicio}/>
                            <Route path="/huehue" component={() => {return "heheh"}}/>
                            <Route path="/files" exact component={ViewFiles}/>
                            <Route path="/file/crear" exact component={CrearFile}/>
                        </Grid.Column>
                        <Grid.Column width={2}></Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }

 }

 export default MainContent;