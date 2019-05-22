import React from 'react'
import { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import ViewFiles from '../ViewFiles/ViewFiles'

import './MainContent.css';
import CrearFile from '../ViewFiles/CrearFile/CrearFile';
import { Grid, Segment } from 'semantic-ui-react'
import Inicio from '../Inicio/Inicio';
import VerServicios from '../VerServicios/VerServicios';
import CrearServicio from '../VerServicios/CrearServicio/CrearServicio';
import ListaBiblias from '../VerBiblias/VerBiblias';
import MostradorProveedores from '../MostradorProovedores/MostradorProveedores';
import VerClientes from '../VerClientes/VerClientes';
import VerCalendario from '../Calendario/VerCalendario';
import Pruebas from '../Test/Pruebas';
import NavBar from '../../components/NavBar/NavBar';
import Auth from '../Auth/Auth';
import Requester from '../../common/Services/Requester';

class MainContent extends Component {

    state = {
        mostrarContenido: false,
        //logueado: false,
        token: null,
        usuario: null
    }

    cerrarSesion = () => {
        localStorage.removeItem("token");

        this.setState({
            token: null,
            mostrarContenido: true,
            usuario: null
        });
    }


    loggedInHandler = (obj) => {
        //console.log("aaaaaaaa: "+obj);
        this.setState({
            token: obj.token,
            mostrarContenido: true,
            usuario: obj.usuario
        });
    }

    componentDidMount = () => {
        //console.log("hah!");
        var token = localStorage.getItem("token");
        if (token) {
            console.log("HAY TOKEN!!!!!")
            //si hay token guardado
            Requester.getInfo((rpta) => {
                console.log("Info:", rpta.cont)
                this.setState({
                    usuario:
                    {
                        usuario: rpta.cont.usr,
                        rol: rpta.cont.rol,
                        nombre: rpta.cont.nombrePersona,
                        correo: rpta.cont.correoPersona,
                        genero: rpta.cont.genero
                    },

                    mostrarContenido: true
                });
            }, (error, errorCompleto) => {

                this.setState({ mostrarContenido: true, usuario: null });
            }, null, token)
        } else {
            console.log("NO HAY TOKEN!!!!!")
            //si no hay token guardado
            this.setState({ mostrarContenido: true, usuario: null });
        }

        //localStorage.removeItem("token");
    }

    render() {
        if (!this.state.mostrarContenido)
            return <div>Cargando!</div>

        let contenido = (
            <div>
                <Route component={(props) => { return <NavBar usuario={this.state.usuario} history={props.history} cerrarSesionHandler={this.cerrarSesion} /> }} />
                <div className="MainContent">
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={1}></Grid.Column>
                            <Grid.Column width={13}>
                                {/*<br />*/}
                                <Switch>
                                    <Route path="/pruebas" exact component={Pruebas} />
                                    <Route path="/inicio" exact component={Inicio} />
                                    <Route path="/files" exact component={ViewFiles} />
                                    <Route path="/files/crear" exact component={(a) => { return <CrearFile modo="crear" /> }} />
                                    <Route path="/file/ver/:idFile" exact component={(obj) => {/*console.log("@@@@@@@@",obj);*/return <CrearFile modo="ver" idFile={obj.match.params.idFile} /> }} />
                                    <Route path="/file/editar/:idFile" exact component={(obj) => { return <CrearFile modo="editar" idFile={obj.match.params.idFile} /> }} />
                                    <Route path="/servicios" exact component={VerServicios} />
                                    <Route path="/servicios/crear" exact component={CrearServicio} />
                                    <Route path="/biblias" exact component={ListaBiblias} />
                                    <Route path="/proveedores" exact component={MostradorProveedores} />
                                    <Route path="/clientes" exact component={VerClientes} />
                                    <Route path="/calendario" exact component={VerCalendario} />
                                    <Route path="/" exact component={Inicio} />
                                    <Route component={() => { return <div>404!</div> }} />
                                </Switch>
                            </Grid.Column>
                            <Grid.Column width={1}></Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </div>);

        if (!this.state.usuario) {
            contenido = (
                <div className="LoginContent">
                    <Switch>
                        {/*<Route path="/calendario" exact component={VerCalendario} />*/}
                        <Route component={() => { return <Auth loggedInHandler={this.loggedInHandler} /> }} />
                    </Switch>
                </div>);
        }

        return (contenido);
    }

}

export default MainContent;