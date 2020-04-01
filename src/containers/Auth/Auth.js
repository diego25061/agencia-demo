import React, { Component } from 'react';
import { Grid, Header, Image, Form, Button, Segment, Message, Divider, Input } from 'semantic-ui-react';
import './Auth.css'

import LogoYllari from '../../assets/logo_generic.png'
import Requester from '../../common/Services/Requester';
import MensajeTransaccion from '../../components/MensajeTransaccion/MensajeTransaccion';
import NotificacionApi from '../NotificacionApi/NotificacionApi';
import NotificationStateHolder from '../../common/StateHolders/NotificationStateHolder';

class Auth extends Component {

    state = {
        usuario: "",
        clave: "",
        
        notificacion_login : new NotificationStateHolder()
    }

    render() {
        return (
            <div>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='black' textAlign='center'>
                            <Image src={LogoYllari} size="massive" style={{width:"150px"}} />
                            <Divider hidden />
                            Gestor de Recursos Agencia de Viajes
                        </Header>
                        <Form size='large'>
                            <Segment >
                                <Form.Input value={this.state.usuario}
                                    onChange={(event) => { this.setState({ usuario: event.target.value }) }}
                                    fluid icon='user' iconPosition='left' placeholder='Usuario' />
                                <Form.Input value={this.state.clave}
                                    onChange={(event) => {
                                        this.setState({ clave: event.target.value })
                                    }}
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Contraseña'
                                    type='password'
                                />
                                <Button color='teal' fluid size='large'
                                    onClick={() => {

                                        this.setState({ transaccionEnviada: true,
                                            responseRecibida: false });

                                        console.log("asd!", this.state);
                                        Requester.postLogin({
                                            identifier: this.state.usuario,
                                            password: this.state.clave
                                            },
                                            (rpta) => {

                                                console.log("Rpta > ",rpta);

                                                var token = rpta.cont.jwt;
                                                var userInfo = rpta.cont.user;

                                                //Requester.store.token = token;
                                                //console.log("Requester store: ",Requester.store)
 
                                                
                                                this.props.loggedInHandler(token,userInfo);

                                                /*
                                                var pack = { token: token };

                                                Requester.getInfo((rpta) => {
                                                    //console.log("Infooooo:",rpta.cont)
                                                    pack.usuario = {
                                                        usuario: rpta.cont.usr,
                                                        rol: rpta.cont.rol,
                                                        nombre:rpta.cont.nombrePersona,
                                                        correo: rpta.cont.correoPersona,
                                                        genero:rpta.cont.genero
                                                    }
                                                    pack.mostrarContenido = true;
                                                    this.props.loggedInHandler(pack);
                                                }, (error, errorCompleto) => {
                                                    //error etc
                                                }, null, token)
                                                */

                                            }, (rptaError) => {
                                                console.log("Rpta error > ",rptaError);
                                                
                                                let notif = this.state.notificacion_login;
                                                notif.mostrarNotificacion=true;
                                                notif.setRecibidoError("Credenciales inválidos","", rptaError.cont.statusCode, rptaError.cont.data);
                                                this.setState({notificacion_login:notif});
                                            }
                                        );

                                        /*
                                        var token = //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE1NTgzNDkyNDAsImV4cCI6MTU1ODk1NDA0MCwiaWF0IjoxNTU4MzQ5MjQwfQ.H-jsWOpteqIrJo9rkT8Z8_xd3XKHs8aEE6YVwQMoXlw";
                                        
                                        localStorage.setItem("token",token);
                                        var pack = {token:token};
                                        
                                        Requester.getInfo((rpta)=>{
                                            //console.log("Infooooo:",rpta.cont)
                                            pack.usuario={
                                                    usuario:rpta.cont.usr,
                                                    rol:rpta.cont.rol
                                                }
                                            pack.mostrarContenido=true;
                                            this.props.loggedInHandler(pack);
                                        }, (error,errorCompleto)=>{
                                            //error etc
                                        }, null, token)
                                        */
                                    }
                                    }>
                                    Ingresar
                                </Button>
                                <NotificacionApi
                                    disabled={!this.state.notificacion_login.mostrarNotificacion}
                                    loading={this.state.notificacion_login.enviando}
                                    color={this.state.notificacion_login.notif_color}
                                    content={this.state.notificacion_login.contenidoRespuesta} 
                                    title={this.state.notificacion_login.tituloRespuesta}
                                    icon={this.state.notificacion_login.notif_icono}
                                />

                                {/*
                                    <MensajeTransaccion
                                    transaccionEnviada={this.state.transaccionEnviada}
                                    responseRecibida={this.state.responseRecibida}
                                    rptaTransaccion={this.state.rptaTransaccion} />

                                <Button color='orange' fluid size='large' onClick={
                                    ()=>{
                                        localStorage.removeItem("token")
                                    }
                                }>sacar token</Button>
                                */}
                            </Segment>

                            <Message
                                info
                                header='Aplicación de demostración'
                                content={<>Usuario: demo <br/> Contraseña: demo123</>}
                            />
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>

        );
    }
}
export default Auth;