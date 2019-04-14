import React from 'react'
import {Component} from 'react';
import ElementoForm from '../../../components/ElementoForm/ElementoForm';
import { Dropdown, Input, Icon } from 'semantic-ui-react';
import Constantes from '../../../common/Constantes';

class CamposCrearCliente extends Component{
    
    componentDidMount(){
        //this.props.contCliente.campos = {};
    }

    render(){
        return <div>
            <ElementoForm titulo="Nombre *">
                <Input fluid placeholder="Universal" 
                    onChange={(event)=>{ this.props.contenedor.nombre=event.target.value; /*this.props.contenedor.ff();*/ }}>
                </Input>
            </ElementoForm>
            <ElementoForm titulo="Tipo *">
                <Dropdown placeholder="Operador" selection fluid search options={Constantes.TiposClientes}
                    onChange = {(event,data)=>{this.props.contenedor.tipo=data.value}}
                ></Dropdown>
            </ElementoForm>
            <ElementoForm titulo="Correo de contacto">
                <Input placeholder="correo@gmail.com" iconPosition="left" fluid 
                    onChange={(event)=>{this.props.contenedor.correo=event.target.value}}>
                    <Icon name="at"></Icon>
                    <input />
                </Input>
            </ElementoForm>
            <ElementoForm titulo="Correo adicional">
                <Input placeholder="correo@gmail.com" iconPosition="left" fluid 
                    onChange={(event)=>{this.props.contenedor.correoAdicional=event.target.value}}>
                    <Icon name="at"></Icon>
                    <input />
                </Input>
            </ElementoForm>
            <ElementoForm titulo="Numero contacto">
                <Input placeholder="(511)97985020" fluid onChange={(event)=>{this.props.contenedor.numContacto=event.target.value}}></Input>
            </ElementoForm>
            <ElementoForm titulo="Numero contacto adicional">
                <Input placeholder="(511)97985020" fluid onChange={(event)=>{this.props.contenedor.numContactoAdic=event.target.value}}></Input>
            </ElementoForm>
            <ElementoForm titulo="Pais">
                <Input placeholder="Colombia" fluid onChange={(event)=>{this.props.contenedor.pais=event.target.value}}></Input>
            </ElementoForm>
            <ElementoForm titulo="Ciudad">
                <Input placeholder="Bogotá" fluid onChange={(event)=>{this.props.contenedor.ciudad=event.target.value}}></Input>
            </ElementoForm>
        </div>
    }
}

export default CamposCrearCliente;