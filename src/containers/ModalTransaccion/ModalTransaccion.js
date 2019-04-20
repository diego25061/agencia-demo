import React from 'react'
import {Component} from 'react'
import { Button,Modal } from 'semantic-ui-react';

class ModalTransaccion extends Component{

    state={
        innerAbierto:false
    }

    mensaje={
        titulo:"",
        msj:"",
        error:false
    }

    render(){
        return <Modal size={this.props.size ? this.props.size:"small"} open ={this.props.abierto && this.state.innerAbierto } centered={false} 
            onClose={() => {this.setState({abierto:false})}}>
                <Modal.Header>{this.props.titulo}</Modal.Header>
                <Modal.Content>{this.props.children}</Modal.Content>
                <Modal.Actions>
                    <Button positive icon='checkmark' labelPosition='right' content={this.props.textoAceptar} onClick={this.props.funcAceptar}/>
                    <Button negative onClick={()=>{if(this.props.enCancelar) this.props.enCancelar(); this.setState({abierto:false})}}>{this.props.textoCancelar}</Button>
                </Modal.Actions>
            </Modal>
    }
}

export default ModalTransaccion;