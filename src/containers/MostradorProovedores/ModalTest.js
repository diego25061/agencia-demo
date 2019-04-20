import React from 'react'
import {Component} from 'react'
import { Button, Container, Message, Icon, Input, Modal, Grid } from 'semantic-ui-react';
import ElementoForm from '../../components/ElementoForm/ElementoForm';

class ModalTest extends Component{

    render(){

        var msjComp = <div></div>
        //console.log("weee");
        //console.log(this.props.parent.state.modalCrear);
        if(this.props.parent.state.modalCrear && this.props.parent.state.modalCrear.mensaje ){
            var mensaje = this.props.parent.state.modalCrear.mensaje;
            if (mensaje.enviado && !mensaje.recibido){
                msjComp = <Message icon>
                    <Icon name='circle notched' loading />
                    <Message.Content>
                        <Message.Header>Espere un momento...</Message.Header>
                        Completando la transacción
                    </Message.Content>
                </Message>
            }else
            if (mensaje.recibido){ 
                if(mensaje.respuesta.transaccionExitosa()){
                    msjComp = <Message success header='Transaccion exitosa'>
                        <Message.List>
                            <Message.Item>Objeto creado</Message.Item>
                            { mensaje.respuesta.msj ? <Message.Item> {mensaje.respuesta.msj} </Message.Item> : null }
                        </Message.List>
                    </Message>
                } else {
                    msjComp = <Message negative>
                        <Message.Header>Error en transaccion</Message.Header>
                        <Message.List>
                            <Message.Item>{mensaje.respuesta.msj}</Message.Item>
                            {mensaje.respuesta.trace?<Message.Item>{mensaje.respuesta.trace}</Message.Item>:null}
                        </Message.List>
                    </Message>
                }
            }        
        }



        return  <Modal size="tiny"  open ={ this.props.parent.state.modalCrear.abierto} centered={false}  onClose={() => {
            var obj= {...this.props.parent.state.modalCrear};
            obj.abierto=false;
            this.props.parent.setState({modalCrear:obj});
        }}>

            <Modal.Header>{this.props.titulo}</Modal.Header>
            
            <Modal.Content>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <ElementoForm grid titulo="Nombre">
                                <Input fluid placeholder={this.props.placeholderNombre} value={this.props.parent.state.modalCrear.campos.nombre} onChange={(event)=>{
                                        var obj = {...this.props.parent.state.modalCrear};
                                        obj.campos.nombre = event.target.value;
                                        this.props.parent.setState({modalCrear:obj});}}
                                        />
                            </ElementoForm>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row columns={2}>
                        <Grid.Column>
                        <ElementoForm grid titulo="Correo electrónico">
                                <Input 
                                    fluid
                                    iconPosition="left" placeholder={this.props.placeholderCorreo} value={this.props.parent.state.modalCrear.campos.correo} onChange={(event)=>{
                                        var obj = {...this.props.parent.state.modalCrear};
                                        obj.campos.correo = event.target.value;
                                        this.props.parent.setState({modalCrear:obj});}}
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
                                    iconPosition="left" placeholder={this.props.placeholderCorreoAdic} value={this.props.parent.state.modalCrear.campos.correoAdic} onChange={(event)=>{
                                        var obj = {...this.props.parent.state.modalCrear};
                                        obj.campos.correoAdic = event.target.value;
                                        this.props.parent.setState({modalCrear:obj});}}>
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
                                    value={this.props.parent.state.modalCrear.campos.num} onChange={(event)=>{
                                        var obj = {...this.props.parent.state.modalCrear};
                                        obj.campos.num = event.target.value;
                                        this.props.parent.setState({modalCrear:obj});}}>
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
                                    value={this.props.parent.state.modalCrear.campos.numAdic} onChange={(event)=>{
                                        var obj = {...this.props.parent.state.modalCrear};
                                        obj.campos.numAdic = event.target.value;
                                        this.props.parent.setState({modalCrear:obj});}}>
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
                                    value={this.props.parent.state.modalCrear.campos.ciudad} onChange={(event)=>{
                                        var obj = {...this.props.parent.state.modalCrear};
                                        obj.campos.ciudad = event.target.value;
                                        this.props.parent.setState({modalCrear:obj});}}/>
                            </ElementoForm>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
                {msjComp}
            </Modal.Content>

            <Modal.Actions>
                <Button negative onClick={() => {
                    var obj= {...this.props.parent.state.modalCrear};
                    obj.abierto=false;
                    this.props.parent.setState({modalCrear:obj});
                    }}>
                    Cancelar
                </Button>
                <Button positive icon='checkmark' labelPosition='right' content='Crear' onClick={this.props.enEnviar} />
            </Modal.Actions>

        </Modal>


    }
}
export default ModalTest;