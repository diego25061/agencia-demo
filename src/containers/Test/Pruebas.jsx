import React from 'react'
import {Component} from 'react'
import ModalPrueba1 from './ModalPrueba1';

class Pruebas extends Component{

    state={
        modal:{
            //parent:this,
            valor1:"a",
            valor2:"b"
        }
    }

    render = () =>{
        return <div> 
            <ModalPrueba1 parent={this} pack="modal"/>
        </div>
    }


}

export default Pruebas;