import React from 'react'
import { Component } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom'
import { Grid, Button, Menu, Image, Header, Container, Segment, Flag, Icon } from 'semantic-ui-react'
import { Configuracion } from '../../common/Constantes'

import LogoYllari from '../../assets/logo_yllari.png'

import { withRouter } from 'react-router-dom'
import moment from 'moment'
import momentTz from 'moment-timezone'
import 'moment/locale/es-us'

class NavBar extends Component {

    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    state = {
        enlace: '',
        usuarioNombre: '',
        fecha:this.capitalize(moment().tz('America/Lima').format('dddd D')) + ' de ' + moment().tz('America/Lima').format('MMMM'),
        hora:moment().tz('America/Lima').format('LT')
    }

    componentDidMount() {
        moment().locale("es");
        this.timerID = setInterval(() => this.tick(), 5000);
    }

    tick() {
        this.setState({
            fecha:this.capitalize(moment().tz('America/Lima').format('dddd D')) + ' de ' + moment().tz('America/Lima').format('MMMM'),
            hora:moment().tz('America/Lima').format('LT')
        });
    }

    navegar(direccion) {
        this.props.history.push(direccion);
    }
    render() {
        let nombre = "";
        let genero = 0;
        if (this.props.usuario) {
            nombre = this.props.usuario.nombre;
            genero = this.props.usuario.genero;
        }
        return (
            <div>
                <Menu /*style={{backgroundColor:"#ffb366"}}*/ size="huge" stackable >
                    <Menu.Item >
                        <img src={LogoYllari} />
                    </Menu.Item>
                    {Configuracion.EnlacesNavBar.map((element,index) => {
                        return <Menu.Item key={index} as='a' active={this.state.enlace === element.nombre}
                            onClick={() => { this.setState({ enlace: element.nombre }); this.navegar(element.valor) }}>
                            {element.nombre}
                            {/*<Link to={element.valor} style={{color:"black"}}>{element.nombre}</Link>*/}
                        </Menu.Item>
                    })}

                    <Menu.Menu position='right'>
                        <Menu.Item style={{ padding: "4px 16px" }}>
                            <div style={{ lineHeight: "1.4" }}>
                                <div style={{ fontSize: "11px" }}>{this.state.fecha}{/*Martes, 21 de Mayo*/}</div>
                                <Flag name='pe' />{' '}<b>{this.state.hora}</b>
                            </div>
                        </Menu.Item>
                        <Menu.Item style={{ padding: "4px 16px" }}>
                            {genero == 0 ? "Bienvenido" : "Bienvenida"},{' '}<br /><b>{nombre ? nombre : "usuario"}</b>
                        </Menu.Item>
                        <Menu.Item>
                            <Button size="massive" style={{ backgroundColor: "#00000000", padding: "13.3px 5px" }} icon onClick={() => {
                                this.props.cerrarSesionHandler();
                            }}>
                                <Icon size="large" name='power off' />
                            </Button>
                            {/*
                            <Button as='a' onClick={() => {
                                this.props.cerrarSesionHandler();
                            }}>
                                Cerrar sesión
                                </Button>
                                */}
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                {/*
                <Grid>
                    <Grid.Row className="Spaced">

                        <Grid.Column width={4} verticalAlign="middle" textAlign="left">
                            <Image src ={LogoYllari} size="tiny"></Image>
                        </Grid.Column>

                        <Grid.Column width={8} textAlign="center"  verticalAlign="middle">
                            <Grid columns="equal">
                                <Grid.Row >
                                    <Grid.Column>
                                        <Link to="/inicio"><h4>Inicio</h4></Link>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Link to="/files"><h4>Files</h4></Link>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Link to="/servicios"><h4>Servicios</h4></Link>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Link to="/transportes"><h4>Transportes</h4></Link>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Link to="/clientes"><h4>Clientes</h4></Link>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Link to="/calendario"><h4>Calendario</h4></Link>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>

                        <Grid.Column width ={4} textAlign="right"  verticalAlign="middle">
                            <Link floated="right" to="/inicio">Cerrar sesión</Link>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>

                */}


                {/*
                    <Link to="/inicio">Inicio</Link>
                    <Link to="/files">Files</Link>
                    <Link to="/servicios">Servicios</Link>
                <Link to="/transportes">Transportes</Link>*/}
            </div>
        );
    }
}

export default NavBar;