import React, { Component } from 'react';
import { Grid, Header, Image, Form, Button, Segment, Message, Divider, Input } from 'semantic-ui-react';
import './Auth.css'

import LogoYllari from '../../assets/logo_yllari.png'
import Requester from '../../common/Services/Requester';
import MensajeTransaccion from '../../components/MensajeTransaccion/MensajeTransaccion';

class Auth extends Component {
    state = {
        usuario: "",
        clave: "",

        transaccionEnviada: false,
        responseRecibida: false,
        rptaTransaccion: null,
    }
    render() {
        return (
            <div>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='black' textAlign='center'>
                            <Image src={LogoYllari} size="massive" />
                            <Divider hidden />
                            Gestor de Recursos Yllari Travel
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
                                <Button color='orange' fluid size='large'
                                    onClick={() => {

                                        this.setState({ transaccionEnviada: true,
                                            responseRecibida: false });

                                        console.log("asd!", this.state);
                                        Requester.postLogin(
                                            {
                                            username: this.state.usuario,
                                            password: this.state.clave
                                        },
                                            (rpta) => {

                                                var token = rpta.cont.token;
                                                Requester.store.token = token;
                                                console.log("Requester store: ",Requester.store)

                                                localStorage.setItem("token", token);
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


                                            }, (rpta) => {
                                                this.setState({
                                                    responseRecibida: true,
                                                    rptaTransaccion: rpta
                                                });
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


                                <MensajeTransaccion
                                    transaccionEnviada={this.state.transaccionEnviada}
                                    responseRecibida={this.state.responseRecibida}
                                    rptaTransaccion={this.state.rptaTransaccion} />
                                {/*
                                <Button color='orange' fluid size='large' onClick={
                                    ()=>{
                                        localStorage.removeItem("token")
                                    }
                                }>sacar token</Button>
                            */}
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>

        );
    }
}
export default Auth;