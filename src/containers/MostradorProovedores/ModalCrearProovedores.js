import React from 'react'
import {Component} from 'react'
import { Message ,Modal,Input,Grid,Button} from 'semantic-ui-react';
import ElementoForm from '../../components/ElementoForm/ElementoForm';

class ModalCrearProveedores extends Component{

    state={
        abierto:false,
        mensaje:{
            titulo:"",
            msj:"",
            error:false
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

    abrir(){
        this.setState({abierto:true});
    }

    cerrar(){
        this.setState({abierto:false});
    }

    render(){

        let msj = <Message>
            
        </Message>

        return (
            <Modal size="tiny"  open ={ this.state.abierto} centered={false}  onClose={() => {this.setState({abierto:false})}}>
                <Modal.Header>{this.props.titulo}</Modal.Header>
                <Modal.Content>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <ElementoForm grid titulo={this.props.tituloNombre}>
                                    <Input 
                                        fluid placeholder="Arawi" value={this.state.campos.nombre} onChange={(event)=>{
                                            var campos = {...this.state.campos};
                                            campos.nombre = event.target.value;
                                            this.setState({campos: campos});
                                            this.props.contenedorCampos = {...this.state.campos};}}
                                            />
                                </ElementoForm>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={2}>
                            <Grid.Column>
                            <ElementoForm grid titulo="Correo electrónico">
                                    <Input 
                                        fluid
                                        placeholder="correo@arawi.com"
                                        iconPosition="left" value={this.state.campos.correo} onChange={(event)=>{
                                            var campos = {...this.state.campos};
                                            campos.correo = event.target.value;
                                            this.setState({campos: campos});
                                            this.props.contenedorCampos = {...this.state.campos};}}
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
                                        placeholder="correo@gmail.com"
                                        iconPosition="left" 
                                        value={this.state.campos.correoAdic} onChange={(event)=>{
                                            var campos = {...this.state.campos};
                                            campos.correoAdic = event.target.value;
                                            this.setState({campos: campos});
                                            this.props.contenedorCampos = {...this.state.campos};}}>
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
                                        value={this.state.campos.num} onChange={(event)=>{
                                            var campos = {...this.state.campos};
                                            campos.num = event.target.value;
                                            this.setState({campos: campos});
                                            this.props.contenedorCampos = {...this.state.campos};}}>
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
                                        value={this.state.campos.numAdic} onChange={(event)=>{
                                            var campos = {...this.state.campos};
                                            campos.numAdic = event.target.value;
                                            this.setState({campos: campos});
                                            this.props.contenedorCampos = {...this.state.campos};}}>
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
                                    value={this.state.campos.ciudad} onChange={(event)=>{
                                        var campos = {...this.state.campos};
                                        campos.ciudad = event.target.value;
                                        this.setState({campos: campos});
                                        this.props.contenedorCampos = {...this.state.campos};}}/>
                                </ElementoForm>
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>
                    {msj}
                </Modal.Content>

                <Modal.Actions>
                    <Button negative onClick={() => {this.setState({abierto:false})}}>
                        Cancelar
                    </Button>
                    <Button positive icon='checkmark' labelPosition='right' content='Crear' onClick={this.props.enAceptar} />
                </Modal.Actions>

            </Modal>
        )
    }

}