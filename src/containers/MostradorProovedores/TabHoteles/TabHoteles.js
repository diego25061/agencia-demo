import React from 'react'
import {Component} from 'react'
import { Button, Container, Header, Icon, Input, Modal, Grid } from 'semantic-ui-react';
import ReactTable from "react-table";
import {Link} from 'react-router-dom'
import ModalTrxSimple from '../../ModalTrxSimple/ModalTrxSimple';
import ElementoForm from '../../../components/ElementoForm/ElementoForm';
import TablaBuscador from '../../TablaBuscador/TablaBuscador';
import Requester from '../../../common/Services/Requester';
import Constantes from '../../../common/Constantes';
import ModalTest from '../ModalTest';


class TabHoteles extends Component{

    state = {
        hoteles:[
            //{idProveedor:"-1",nombre:"Melia", correo:"asd@asd.com", correoAdic:"asljkdq@as.com", numeroContacto:"(51)65465",numeroContactoAdicional:"123312", ciudad:"city"}
        ],
        modalCrear:{
            abierto:false,
            mensaje:{
                enviado:false,
                recibido:false,
                respuesta:null
                //titulo:"",
                //msj:"",
                //error:false
            },

            campos:{
                nombre:null,
                correo:null,
                correoAdic:null,
                num:null,
                numAdic:null,
                ciudad:null
            }
            
        }
    }

    columnasTabla = [ 
        { Header: 'Nombre', accessor: 'nombre' },
        { Header: 'Correo', accessor: 'correo' },
        { Header: 'Correo Adic.',accessor: 'correoAdic' }, 
        { Header: 'Numero contacto',accessor: 'numeroContacto' }, 
        { Header: 'Numero contacto adicional', accessor: 'numeroContactoAdicional' },
        { Header: 'Ciudad', accessor: 'ciudad' },
        { Header: 'Accion', Cell: props => 
            <Container textAlign="center">
                <Button circular icon="eye"></Button>
                <Button circular color="yellow" icon="pencil"></Button>
                <Button circular color="red" icon="trash"></Button>
            </Container>
            } 
    ]
    
    contenedorModal = {
        campos:{}
    }

    render = () => {
        return <div>
            <Header size="medium">Hoteles</Header> 
            <Button primary onClick={ this.abrirModal }>Nuevo Hotel</Button>
            <Header size="small">Lista</Header>
            <TablaBuscador data={this.state.hoteles} columns={this.columnasTabla} />
            {/*this.ModalCrear()*/}
            <ModalTest parent={this} titulo="Crear Hoteles" 
                placeholderNombre="Arawi" 
                placeholderCorreo="correo@arawi.com" 
                placeholderCorreoAdic="arawi.ventas@gmail.com"
                enEnviar={this.enviarHotel}/>
        </div>
    }

    abrirModal = () =>{
        var obj = {...this.state.modalCrear};
        obj.abierto = true;
        this.setState({modalCrear:obj});
    }

    enviarHotel = () => { 
        console.log("enviando!");
        Requester.postProvHotel(this.state.modalCrear.campos, (rpta)=>{
            console.log(this.state.modalCrear.campos);
            console.log("success!");
            console.log(rpta);
            var obj = {...this.state.modalCrear};
            obj.mensaje.enviado=true;
            obj.mensaje.recibido=true;
            obj.mensaje.respuesta = rpta;
            this.setState({modalCrear:obj});
        },(rptaError)=>{
            console.log("err!");
            var obj = {...this.state.modalCrear};
            obj.mensaje.enviado=true;
            obj.mensaje.recibido=true;
            obj.mensaje.respuesta = rptaError;
            this.setState({modalCrear:obj});
        })
    }

    componentDidMount = () => {

        Requester.getProveedores(Constantes.AliasProovedores.HOTEL, (rpta)=>{
            var hoteles=rpta.cont.map((e,i)=>{
                var h = {
                    idProveedor:e.idProveedor,
                    nombre:e.nombre,
                    correo:e.correo?e.correo:"-",
                    correoAdic:e.correoAdic?e.correoAdic:"-",
                    numeroContacto:e.numeroContacto?e.numeroContacto:"-",
                    numeroContactoAdicional:e.numeroContactoAdicional?e.numeroContactoAdicional:"-",
                    ciudad:e.ciudad?e.ciudad:"-"
                }
                return h;
            });
            this.setState({hoteles:hoteles});
        })
    }
    
/*
    ModalCrear = () => {
        let msj = <div></div>
        return (
            <Modal size="tiny" 
                open ={this.state.modalCrearAbierto}
                centered={false} 
                onClose={() => {this.setState({modalCrearAbierto:false})}}>

                <Modal.Header>Nuevo Hotel</Modal.Header>

                <Modal.Content>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <ElementoForm grid titulo="Nombre">
                                    <Input 
                                        fluid placeholder="Arawi" value={this.state.modalCrear.nombre} onChange={(event)=>{
                                            var modalCrear = {...this.state.modalCrear};
                                            modalCrear.nombre = event.target.value;
                                            this.setState({modalCrear:modalCrear});
                                        } }/>
                                </ElementoForm>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={2}>
                            <Grid.Column>
                            <ElementoForm grid titulo="Correo electrónico">
                                    <Input 
                                        fluid
                                        placeholder="correo@arawi.com"
                                        iconPosition="left">
                                        <Icon name="at"></Icon>
                                        <input />
                                    </Input>
                                </ElementoForm>
                            </Grid.Column>
                            <Grid.Column>
                                <ElementoForm grid titulo="Correo electrónico adicional">
                                    <Input 
                                        fluid
                                        placeholder="correo@gmail.com"
                                        iconPosition="left" 
                                        value={this.state.modalCrear.correo} onChange={(event)=>{
                                            var modalCrear = {...this.state.modalCrear};
                                            modalCrear.correo = event.target.value;
                                            this.setState({modalCrear:modalCrear});
                                        }}>
                                        <Icon name="at"></Icon>
                                        <input />
                                    </Input>
                                </ElementoForm>
                            </Grid.Column>
                        </Grid.Row>
                        

                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <ElementoForm grid titulo="Numero contacto">
                                    <Input 
                                        fluid
                                        placeholder="98957845"
                                        iconPosition="left"
                                        value={this.state.modalCrear.num} onChange={(event)=>{
                                            var modalCrear = {...this.state.modalCrear};
                                            modalCrear.num = event.target.value;
                                            this.setState({modalCrear:modalCrear});
                                        } }>
                                        <Icon name="phone"></Icon>
                                        <input />
                                    </Input>
                                </ElementoForm>
                            </Grid.Column>
                            <Grid.Column>
                                <ElementoForm grid titulo="Numero contacto adicional">
                                    <Input 
                                        fluid
                                        placeholder="564-8790"
                                        iconPosition="left"
                                        value={this.state.modalCrear.numAdic} onChange={(event)=>{
                                            var modalCrear = {...this.state.modalCrear};
                                            modalCrear.numAdic = event.target.value;
                                            this.setState({modalCrear:modalCrear});
                                        } }>
                                        <Icon name="phone"></Icon>
                                        <input />
                                    </Input>
                                </ElementoForm>
                            </Grid.Column>
                        </Grid.Row>


                        <Grid.Row>
                            <Grid.Column>
                                <ElementoForm grid titulo="Ciudad">
                                    <Input fluid placeholder="Cusco" 
                                    value={this.state.modalCrear.ciudad} onChange={(event)=>{
                                        var modalCrear = {...this.state.modalCrear};
                                        modalCrear.ciudad = event.target.value;
                                        this.setState({modalCrear:modalCrear});
                                    } }/>
                                </ElementoForm>
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>
                    {msj}
                </Modal.Content>

                <Modal.Actions>
                    <Button negative onClick={() => {this.setState({modalCrearAbierto:false})}}>
                        Cancelar
                    </Button>
                    <Button positive icon='checkmark' labelPosition='right' content='Crear' onClick={this.EnviarPostBiblia} />
                </Modal.Actions>

            </Modal>
            )
        }*/
}

export default TabHoteles