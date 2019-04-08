import React from 'react'
import {Component} from 'react';
import ElementoForm from '../../../components/ElementoForm/ElementoForm';
import { Dropdown, Input, Icon } from 'semantic-ui-react';
import Constantes from '../../../common/Constantes';

class CamposCrearCliente extends Component{
    
    render(){
        return <div>
            <ElementoForm titulo="Nombre *">
                <Input fluid placeholder="Universal"></Input>
            </ElementoForm>
            <ElementoForm titulo="Tipo *">
                <Dropdown placeholder="Operador" selection fluid search options={Constantes.TiposClientes}></Dropdown>
            </ElementoForm>
            <ElementoForm titulo="Correo de contacto">
                <Input placeholder="correo@gmail.com" iconPosition="left" fluid >
                    <Icon name="at"></Icon>
                    <input />
                </Input>
            </ElementoForm>
            <ElementoForm titulo="Correo adicional">
                <Input placeholder="correo@gmail.com" iconPosition="left" fluid >
                    <Icon name="at"></Icon>
                    <input />
                </Input>
            </ElementoForm>
            <ElementoForm titulo="Numero contacto">
                <Input placeholder="(511)97985020" fluid ></Input>
            </ElementoForm>
            <ElementoForm titulo="Numero contacto adicional">
                <Input placeholder="(511)97985020" fluid ></Input>
            </ElementoForm>
            <ElementoForm titulo="Pais">
                <Input placeholder="Colombia" fluid ></Input>
            </ElementoForm>
            <ElementoForm titulo="Ciudad">
                <Input placeholder="Bogotá" fluid ></Input>
            </ElementoForm>
        </div>
    }
}

export default CamposCrearCliente;