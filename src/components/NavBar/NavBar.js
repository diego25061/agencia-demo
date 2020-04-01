import React from 'react'
import { Component } from 'react';
import './NavBar.css';
import { Button, Menu, Flag, Icon } from 'semantic-ui-react'
import { Configuracion } from '../../common/Constantes'

import LogoYllari from '../../assets/logo_generic.png'

import moment from 'moment'
import 'moment/locale/es-us'

class NavBar extends Component {

    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    state = {
        enlace: '',
        usuarioNombre: '',
        fecha: this.capitalize(moment().tz('America/Lima').format('dddd D')) + ' de ' + moment().tz('America/Lima').format('MMMM'),
        hora: moment().tz('America/Lima').format('LT')
    }

    componentDidMount() {
        moment().locale("es");
        this.timerID = setInterval(() => this.tick(), 5000);
    }

    tick() {
        this.setState({
            fecha: this.capitalize(moment().tz('America/Lima').format('dddd D')) + ' de ' + moment().tz('America/Lima').format('MMMM'),
            hora: moment().tz('America/Lima').format('LT')
        });
    }

    navegar(direccion) {
        this.props.history.push(direccion);
    }
    render() {
        let nombre = "";
        let genero = 0;
        if (this.props.usuario) {
            nombre = this.props.usuario.username;
            genero = 0;//this.props.usuario.genero;
        }
        return (
            <div>
                <Menu /*style={{backgroundColor:"#ffb366"}}*/ size="huge" stackable >
                    <Menu.Item >
                        <img src={LogoYllari} />
                    </Menu.Item>
                    {Configuracion.EnlacesNavBar.map((element, index) => {
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
                            {genero == 0 ? "Bienvenido" : "Bienvenida"},&nbsp;{' '}<br /><b>{nombre ? nombre : "usuario"}</b>
                        </Menu.Item>
                        <Menu.Item>
                            <Button size="massive" style={{ backgroundColor: "#00000000", padding: "13.3px 5px" }} icon onClick={() => {
                                this.props.cerrarSesionHandler();
                            }}>
                                <Icon size="large" name='power off' />
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

            </div>
        );
    }
}

export default NavBar;