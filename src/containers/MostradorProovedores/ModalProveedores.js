import React from 'react'
import {Component} from 'react'
import { Button, Container, Message, Icon, Input, Modal, Grid } from 'semantic-ui-react';
import ElementoForm from '../../components/ElementoForm/ElementoForm';
import MensajeTransaccion from '../../components/MensajeTransaccion/MensajeTransaccion';
import NotificacionApi from '../NotificacionApi/NotificacionApi';

export default class ModalProveedores extends Component{

    render(){

        var msjSuccess="Objeto creado";
        
        if(this.props.modo === "edicion")
            msjSuccess ="Objeto editado exitosamente";

        var msjComp = <div></div>


        return  <Modal size="tiny"  open ={ this.props.abierto} centered={true}  onClose={() => {
            this.props.enCerrar();
        }}>

            <Modal.Header>{this.props.modo==='creacion'?'Crear '+ this.props.sustantivoTitulo:'Modificar ' + this.props.sustantivoTitulo}</Modal.Header>
            
            <Modal.Content>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <ElementoForm grid titulo="Nombre *">
                                <Input fluid placeholder={this.props.placeholderNombre} 
                                    value={this.props.campos.nombre} 
                                    onChange={(e)=>{this.props.onUpdateFields({nombre:e.target.value})}} />
                            </ElementoForm>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row columns={2}>
                        <Grid.Column>
                        <ElementoForm grid titulo="Correo electrónico">
                                <Input 
                                    fluid
                                    iconPosition="left" placeholder={this.props.placeholderCorreo} value={this.props.campos.correoContacto}
                                    onChange={(e)=>{this.props.onUpdateFields({correoContacto:e.target.value})}} 
                                    >
                                    <Icon name="at"></Icon>
                                    <input />
                                </Input>
                            </ElementoForm>
                        </Grid.Column>
                        <Grid.Column>
                            <ElementoForm grid titulo="Correo electrónico adicional">
                                <Input 
                                    fluid
                                    iconPosition="left" placeholder={this.props.placeholderCorreoAdic} value={this.props.campos.correoAdicional} 
                                    onChange={(e)=>{this.props.onUpdateFields({correoAdicional:e.target.value})}} >
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
                                    placeholder="+57 98 957 0845"
                                    iconPosition="left"
                                    value={this.props.campos.numeroContacto} 
                                    onChange={(e)=>{this.props.onUpdateFields({numeroContacto:e.target.value})}} >
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
                                    value={this.props.campos.numeroContactoAdicional}
                                    onChange={(e)=>{this.props.onUpdateFields({numeroContactoAdicional:e.target.value})}} >
                                    <Icon name="phone"></Icon>
                                    <input />
                                </Input>
                            </ElementoForm>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <ElementoForm grid titulo="Ciudad">
                                <Input fluid placeholder="Medellin" 
                                    value={this.props.campos.ciudad}
                                    onChange={(e)=>{this.props.onUpdateFields({ciudad:e.target.value})}} />
                            </ElementoForm>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
                
                <NotificacionApi
                    disabled={!this.props.crearEditarProveedor_mostrarNotificacion}
                    loading={this.props.crearEditarProveedor_enviando}
                    color={this.props.crearEditarProveedor_notif_color}
                    content={this.props.crearEditarProveedor_contenidoRespuesta} 
                    title={this.props.crearEditarProveedor_tituloRespuesta}
                    icon={this.props.crearEditarProveedor_notif_icono}>
                </NotificacionApi>
            </Modal.Content>

            <Modal.Actions>
                <Button negative onClick={() => {
                    this.props.enCancelar();
                }}>
                    Cancelar
                </Button>
                {
                    this.props.modo==='creacion'?
                    <Button positive icon='checkmark' labelPosition='right' content='Crear' onClick={ this.props.enEnviar } /> :
                    <Button color="yellow" icon='checkmark' labelPosition='right' content='Modificar' onClick={ this.props.enEditar}/>
                }
            </Modal.Actions>

        </Modal>

    }
}