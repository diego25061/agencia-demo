import React from 'react'
import {Component} from 'react';
import {Route} from 'react-router-dom'
import ViewFiles from '../ViewFiles/ViewFiles'

import './MainContent.css';
import CrearFile from '../ViewFiles/CrearFile/CrearFile';
import {Grid, Segment} from 'semantic-ui-react'
import Inicio from '../Inicio/Inicio';
import VerServicios from '../VerServicios/VerServicios';
import CrearServicio from '../VerServicios/CrearServicio/CrearServicio';
import ListaBiblias from '../VerBiblias/VerBiblias';
import MostradorProveedores from '../MostradorProovedores/MostradorProveedores';
import VerClientes from '../VerClientes/VerClientes';

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
                            <Route path="/servicios" exact component={VerServicios}/>
                            <Route path="/servicios/crear" exact component={CrearServicio}/>
                            <Route path="/biblias" exact component={ListaBiblias}/>
                            <Route path="/proveedores" exact component={MostradorProveedores}/>
                            <Route path="/clientes" exact component={VerClientes}/>
                        </Grid.Column>
                        <Grid.Column width={2}></Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }

 }

 export default MainContent;