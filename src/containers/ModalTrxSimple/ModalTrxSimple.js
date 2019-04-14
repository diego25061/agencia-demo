import React from 'react'
import {Component} from 'react'
import { Button,Modal } from 'semantic-ui-react';


class ModalTrxSimple extends Component{
    state={
        abierto:false
    }

    abrir(){
        this.setState({abierto:true});
    }

    render(){
        return <Modal size={this.props.size}
        open ={this.state.abierto} 
        centered={false} 
        onClose={() => {this.setState({abierto:false})}}>
                <Modal.Header>{this.props.titulo}</Modal.Header>
                <Modal.Content>
                    {this.props.children}
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={()=>{if(this.props.enCancelar) this.props.enCancelar(); this.setState({abierto:false})}}>{this.props.textoCancelar}</Button>
                    <Button positive icon='checkmark' labelPosition='right' content={this.props.textoAceptar} onClick={this.props.enAceptar}/>
                </Modal.Actions>
            </Modal>
    }
}


export default ModalTrxSimple;