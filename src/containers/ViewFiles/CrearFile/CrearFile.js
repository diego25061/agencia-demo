import React from 'react'
import {Component} from 'react'
import ElementoForm from '../../../components/ElementoForm/ElementoForm';

class CrearFile extends Component{
    render(){
        return <div>
            Formulario de creacion: nuevo file

            <ElementoForm titulo="Codigo">
                <input type="text" placeholder="002-134s"></input>
            </ElementoForm>

            <ElementoForm titulo="Descripcion">
                <input  type="text" placeholder="bla bla blabl el ble ble"></input>
            </ElementoForm>

            <ElementoForm titulo="Biblia">
                <input  type="text" placeholder="2019, Mayo"></input>
            </ElementoForm>

            <ElementoForm titulo="Cliente">
                <input  type="text" placeholder="Javi"></input>
            </ElementoForm>
            
        </div>
    }

}

export default CrearFile;