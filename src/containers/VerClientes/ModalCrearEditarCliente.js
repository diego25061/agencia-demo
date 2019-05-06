import React from 'react'
import {Component} from 'react'
import { Button, Container, Message, Icon, Input, Modal, Grid } from 'semantic-ui-react';
import ElementoForm from '../../components/ElementoForm/ElementoForm';
import MensajeTransaccion from '../../components/MensajeTransaccion/MensajeTransaccion';

class ModalCrearEditarCliente extends Component{

    render(){

        var msjSuccess="Objeto creado";
        if(this.props.parent.state.modalCrearEditar.modo === "edicion")
            msjSuccess ="Objeto editado exitosamente";

        var msjComp = <div></div>


        return  <Modal size="tiny"  open ={ this.props.parent.state.modalCrearEditar.abierto} centered={true}  onClose={() => {
            var obj= {...this.props.parent.state.modalCrearEditar};
            obj.abierto=false;
            this.props.enCerrar();
            this.props.parent.setState({modalCrearEditar:obj});
        }}>

            <Modal.Header>{this.props.parent.state.modalCrearEditar.modo==='creacion'?'Crear '+ this.props.sustantivoTitulo:'Modificar ' + this.props.sustantivoTitulo}</Modal.Header>
            
            <Modal.Content>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <ElementoForm grid titulo="Nombre">
                                <Input fluid placeholder={this.props.placeholderNombre} value={this.props.parent.state.modalCrearEditar.campos.nombre} onChange={(event)=>{
                                        var obj = {...this.props.parent.state.modalCrearEditar};
                                        obj.campos.nombre = event.target.value;
                                        this.props.parent.setState({modalCrearEditar:obj});}}
                                        />
                            </ElementoForm>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row columns={2}>
                        <Grid.Column>
                        <ElementoForm grid titulo="Correo electrónico">
                                <Input 
                                    fluid
                                    iconPosition="left" placeholder={this.props.placeholderCorreo} value={this.props.parent.state.modalCrearEditar.campos.correo} onChange={(event)=>{
                                        var obj = {...this.props.parent.state.modalCrearEditar};
                                        obj.campos.correo = event.target.value;
                                        this.props.parent.setState({modalCrearEditar:obj});}}
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
                                    iconPosition="left" placeholder={this.props.placeholderCorreoAdic} value={this.props.parent.state.modalCrearEditar.campos.correoAdic} onChange={(event)=>{
                                        var obj = {...this.props.parent.state.modalCrearEditar};
                                        obj.campos.correoAdic = event.target.value;
                                        this.props.parent.setState({modalCrearEditar:obj});}}>
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
                                    value={this.props.parent.state.modalCrearEditar.campos.num} onChange={(event)=>{
                                        var obj = {...this.props.parent.state.modalCrearEditar};
                                        obj.campos.num = event.target.value;
                                        this.props.parent.setState({modalCrearEditar:obj});}}>
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
                                    value={this.props.parent.state.modalCrearEditar.campos.numAdic} onChange={(event)=>{
                                        var obj = {...this.props.parent.state.modalCrearEditar};
                                        obj.campos.numAdic = event.target.value;
                                        this.props.parent.setState({modalCrearEditar:obj});}}>
                                    <Icon name="phone"></Icon>
                                    <input />
                                </Input>
                            </ElementoForm>
                        </Grid.Column>
                    </Grid.Row>


                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <ElementoForm grid titulo="Ciudad">
                                <Input fluid placeholder="Medellin" 
                                    value={this.props.parent.state.modalCrearEditar.campos.ciudad} onChange={(event)=>{
                                        var obj = {...this.props.parent.state.modalCrearEditar};
                                        obj.campos.ciudad = event.target.value;
                                        this.props.parent.setState({modalCrearEditar:obj});}}/>
                            </ElementoForm>
                        </Grid.Column>
                        <Grid.Column>
                            <ElementoForm grid titulo="Pais">
                                <Input fluid placeholder="Colombia" 
                                    value={this.props.parent.state.modalCrearEditar.campos.pais} onChange={(event)=>{
                                        var obj = {...this.props.parent.state.modalCrearEditar};
                                        obj.campos.pais = event.target.value;
                                        this.props.parent.setState({modalCrearEditar:obj});}}/>
                            </ElementoForm>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
                <MensajeTransaccion
                    transaccionEnviada = {this.props.parent.state.modalCrearEditar.transaccionEnviada} 
                    responseRecibida = {this.props.parent.state.modalCrearEditar.responseRecibida}
                    rptaTransaccion = {this.props.parent.state.modalCrearEditar.rptaTransaccion}
                    //textoExito = "Puede usar la nueva biblia"
                />
            </Modal.Content>

            <Modal.Actions>
                <Button negative onClick={() => {
                    var obj= {...this.props.parent.state.modalCrearEditar};
                    obj.abierto=false;
                    this.props.enCerrar();
                    this.props.parent.setState({modalCrearEditar:obj});
                    }}>
                    Cancelar
                </Button>
                {
                    this.props.parent.state.modalCrearEditar.modo==='creacion'?
                    <Button positive icon='checkmark' labelPosition='right' content='Crear' onClick={ this.props.enEnviar } /> :
                    <Button color="yellow" icon='checkmark' labelPosition='right' content='Modificar' onClick={ this.props.enEditar}/>
                }
            </Modal.Actions>

        </Modal>

    }
}
export default ModalCrearEditarCliente;