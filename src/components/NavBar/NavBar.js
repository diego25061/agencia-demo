import React from 'react'
import {Component} from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom'
import {Grid, Button, Menu, Image, Header,Container} from 'semantic-ui-react'
import {Configuracion} from '../../common/Constantes'

import LogoYllari from '../../assets/logo_yllari.png'

import { withRouter } from 'react-router-dom'
 
  
class NavBar extends Component{

    state={
        enlace:''
    }

    componentDidMount(){
    }

    navegar(direccion){
        this.props.history.push(direccion);
    }
    render(){
        return(
                <div>
                    <Menu /*style={{backgroundColor:"#ffb366"}}*/ stackable > 
                            <Menu.Item >
                                <img src={LogoYllari} />
                            </Menu.Item>
                            {Configuracion.EnlacesNavBar.map((element)=>{
                                return <Menu.Item as='a' active={this.state.enlace === element.nombre} 
                                    onClick={()=>{this.setState({enlace:element.nombre});this.navegar(element.valor)}}> 
                                        {element.nombre}
                                    {/*<Link to={element.valor} style={{color:"black"}}>{element.nombre}</Link>*/}
                                </Menu.Item>
                            })}
                            
                            <Menu.Item position='right'>
                            
                                <Button as='a' >
                                    Cerrar sesión
                                </Button>{/*
                                <Button as='a' style={{ marginLeft: '0.5em' }}>
                                    Sign Up
                                </Button>*/}
                            </Menu.Item> 
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