import React from 'react'
import { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import ViewFiles from '../ViewFiles/ViewFiles'

import './MainContent.css';
import CrearFile from '../ViewFiles/CrearFile/CrearFile';
import { Grid, Segment, Loader, Dimmer } from 'semantic-ui-react'
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
import Mostrador404 from '../../components/Mostrador404/Mostrador404';
import UsuarioModel from './../../common/Models/Apis/UsuarioModel';

const tokenKey = "jwtToken";
const userKey ="userInfo";

const setGlobalToken = (token) =>{
    Requester.store.token = token;
}

class MainContent extends Component {

    state = {
        mostrarContenido: false,
        //logueado: false,
        token: null,
        usuario: null
    }

    cerrarSesion = () => {
        localStorage.removeItem(tokenKey);
        localStorage.removeItem(userKey);

        this.setState({
            token: null,
            mostrarContenido: true,
            usuario: null
        });
    }

    loggedInHandler = (token, userInfo) => {
        let user = new UsuarioModel(userInfo)
        if(user){
            localStorage.setItem(tokenKey, token);
            localStorage.setItem(userKey,JSON.stringify(user));

            setGlobalToken(token);

            this.setState({
                token: token,
                mostrarContenido: true,
                usuario: user
            });
        }
    }

/*
    loggedInHandler = (obj) => {
        //console.log("aaaaaaaa: "+obj);
        Requester.store.token = obj.token;
        Requester.store.usuario = obj.usuario;
        this.setState({
            token: obj.token,
            mostrarContenido: true,
            usuario: obj.usuario
        });
    }
    */


    componentDidMount = () => {
        var token = localStorage.getItem(tokenKey);
        if (token) {
            console.log("token : ",token)
            //si hay token guardado
            let userString = localStorage.getItem(userKey);
            console.log("user info : ", userString);
            if(userString){
                //sacar info de usuario
                var user = JSON.parse(localStorage.getItem(userKey));
                console.log("user > ",user);
                setGlobalToken(token);

                this.setState({
                    token : token,
                    usuario: user,
                    mostrarContenido:true
                });

            } else {
                //si no hay token guardado
                console.log("no hay token");
                this.setState({ mostrarContenido: true, usuario: null });
            }
            
            /*

            Requester.getInfo((rpta) => {
                //console.log("Info:", rpta.cont)
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
            */
        } else {
            //console.log("NO HAY TOKEN!!!!!")
            //si no hay token guardado
            this.setState({ mostrarContenido: true, usuario: null });
        }

        //localStorage.removeItem("token");
    }

    render() {
        if (!this.state.mostrarContenido)
            return (<div style={{height:"100%"}}>
                <Dimmer inverted active>
                    <Loader size="massive" content="" />
                </Dimmer>
                </div> 
                );
        let contenido = (
            <div>
                <Route component={(props) => { return <NavBar usuario={this.state.usuario} history={props.history} cerrarSesionHandler={this.cerrarSesion} /> }} />
                <div className="MainContent">
                                {/*<br />*/}
                            <Switch>
                                {/*<Route path="/pruebas" exact component={()=><Pruebas/>} />*/}
                                <Route path="/inicio" exact component={()=><Inicio/>} />
                                <Route path="/files" exact component={()=>contained(<ViewFiles/>)} />)}
                                <Route path="/files/crear" exact 
                                    component={(obj) => { return contained(<CrearFile modoPagina="create" history={obj.history} />) }} />
                                <Route path="/file/ver/:idFile" exact 
                                    component={(obj) => {return contained(<CrearFile modoPagina="view" history={obj.history} idFile={obj.match.params.idFile} /> )}} />

                                <Route path="/servicios" exact component={()=>contained(<VerServicios/>)} />
                                <Route path="/servicios/crear" exact component={()=>contained(<CrearServicio/>)} />
                                <Route path="/biblias" exact component={()=>contained(<ListaBiblias/>)} />
                                <Route path="/proveedores" exact component={()=>contained(<MostradorProveedores/>)} />
                                <Route path="/clientes" exact component={()=>contained(<VerClientes/>)} />
                                <Route path="/calendario/" exact component={(obj) => { return contained(<VerCalendario/>) }} />
                                <Route path="/calendario/:anho/:mes" component={(obj) => { return contained(<VerCalendario
                                fechaDefault={new Date(obj.match.params.anho,obj.match.params.mes-1,1)}/>) }} />
                                <Route path="/" exact component={Inicio} />
                                <Route component={Mostrador404} />
                            </Switch>
                </div>
            </div>);


        if (!this.state.usuario) {
            contenido = (
                <div className="LoginContent">
                    <Switch>
                        <Route component={() => { return <Auth loggedInHandler={this.loggedInHandler} /> }} />
                    </Switch>
                </div>);
        }

        return (contenido);
    }

}

const contained = ( Jsx ) =>{
    return <Contained>{Jsx}</Contained>
}

const Contained = (props) => {
    return <div className="contained">
        <Grid>
            <Grid.Row>
                <Grid.Column width={1} ></Grid.Column>
                <Grid.Column width={14} >
                    {props.children}
                </Grid.Column>
                <Grid.Column width={1} ></Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
}

export default MainContent;