import React from 'react'
import {Component} from 'react'
import { Tab, Menu, Label, Icon} from 'semantic-ui-react';
import TabHoteles from './TabHoteles/TabHoteles';
import TabTodos from './TabTodos/TabTodos';
import TabRestaurantes from './TabRestaurantes/TabRestaurantes';
import TabTransportes from './TabTransportes/TabTransportes';
import TabGuias from './TabGuias/TabGuias';
import TabOperadores from './TabOperadores/TabOperadores';
import TabEmpresas from './TabEmpresas/TabEmpresas';
import TabPersonas from './TabPersonas/TabPersonas';
import TabProovs from './TabHoteles/TabProovs';
import Constantes from '../../common/Constantes';
import Requester from '../../common/Services/Requester';



class MostradorProveedores extends Component{

    state={
        activeIndex:0
    }

    

    panes = [ 
        {
            menuItem: (
                <Menu.Item key='Todos'>
                    Todos 
                </Menu.Item>
            ),
            render: () => {
                return <Tab.Pane>
                    <TabTodos/>
                </Tab.Pane>},
        },
        {
            menuItem: (
                <Menu.Item key='Hoteles'>
                    <Icon name="hotel"/>Hoteles 
                </Menu.Item>
            ),
            render: () => {
                return <Tab.Pane>
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    <TabProovs sust="Hotel" 
                        sustPlural="Hoteles"
                        placeholderNombre="Arawi" 
                        placeholderCorreo="correo@arawi.com" 
                        placeholderCorreoAdic="arawi.ventas@gmail.com"
                        alias = {Constantes.AliasProovedores.HOTEL}
                        funcEnviar = {Requester.crearProveedor}
                        tipo="hotel"
                        />
                </Tab.Pane>},
        },
        {
            menuItem: (
                <Menu.Item key='Restaurantes'>
                    <Icon name="food"/>Restaurantes
                </Menu.Item>
            ),
            render: () => {
                return <Tab.Pane>
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    <TabProovs sust="Restaurant" 
                        sustPlural="Restaurantes"
                        placeholderNombre="Punto Azul" 
                        placeholderCorreo="ventas@puntoazul.com" 
                        placeholderCorreoAdic="contacto@puntoazul.com"
                        alias = {Constantes.AliasProovedores.RESTAURANTE}
                        funcEnviar = {Requester.crearProveedor}
                        tipo="restaurante"
                        />
                </Tab.Pane>},
        },
        {
            menuItem: (
                <Menu.Item key='Transportes'>
                    <Icon name="truck"/>Transportes
                </Menu.Item>
            ),
            render: () => {
                return <Tab.Pane><div ></div><div></div><div></div><div></div><div></div>
                    <TabProovs sust="Transporte" 
                        sustPlural="Transportes"
                        placeholderNombre="Javier" 
                        placeholderCorreo="javier.tran@gmail.com" 
                        placeholderCorreoAdic="javier.tran@hotmail.com"
                        alias = {Constantes.AliasProovedores.TRANSPORTE}
                        funcEnviar = {Requester.crearProveedor}
                        tipo="transporte"
                        />
                </Tab.Pane>},
        },
        {
            menuItem: (
                <Menu.Item key='Guias'>
                    <Icon name="user"/>Guias
                </Menu.Item>
            ),
            render: () => {
                return <Tab.Pane><div></div><div></div><div></div><div></div>
                    <TabProovs sust="Guia" 
                        sustPlural="Guias"
                        genero="f"
                        placeholderNombre="Guia" 
                        placeholderCorreo="carlos.guia@gmail.com" 
                        placeholderCorreoAdic="carlos.guia@hotmail.com"
                        alias = {Constantes.AliasProovedores.GUIA}
                        funcEnviar = {Requester.crearProveedor}
                        tipo="guia"
                        />
                </Tab.Pane>},
        },
        {
            menuItem: (
                <Menu.Item key='Operadores'>
                    <Icon name="cog"/>Operadores
                </Menu.Item>
            ),
            render: () => {
                return <Tab.Pane>
                    <div></div><div></div><div></div>
                    <TabProovs sust="Operador" 
                        sustPlural="Operadores"
                        placeholderNombre="Matias" 
                        placeholderCorreo="correo@gmail.com" 
                        placeholderCorreoAdic="correo.ventas@gmail.com"
                        alias = {Constantes.AliasProovedores.OPERADOR}
                        funcEnviar = {Requester.crearProveedor}
                        tipo="operador"
                        />
                </Tab.Pane>},
        },
        {
            menuItem: (
                <Menu.Item key='Empresas'>
                    <Icon name="building"/>Empresas
                </Menu.Item>
            ),
            render: () => {
                return <Tab.Pane>
                    <div></div><div></div>
                    <TabProovs sust="Empresa" 
                        sustPlural="Empresas"
                        genero="f"
                        placeholderNombre="asda" 
                        placeholderCorreo="empresa@gmail.com" 
                        placeholderCorreoAdic="correo.ventas@gmail.com"
                        alias = {Constantes.AliasProovedores.EMPRESA}
                        funcEnviar = {Requester.crearProveedor}
                        tipo="empresa"
                        />
                </Tab.Pane>},
        },
        {
            menuItem: (
                <Menu.Item key='Personas'>
                    <Icon name="id card"/>Personas
                </Menu.Item>
            ),
            render: () => {
                return <Tab.Pane >
                    <div></div>
                    <TabProovs
                        i={this.state.activeIndex}
                        sust="Persona" 
                        sustPlural="Personas"
                        genero="f"
                        placeholderNombre="Christian cueva" 
                        placeholderCorreo="christian@gmail.com" 
                        placeholderCorreoAdic="cuevita@gmail.com"
                        alias = {Constantes.AliasProovedores.PERSONA}
                        funcEnviar = {Requester.crearProveedor}
                        tipo="persona"
                        />
                </Tab.Pane>},
        },
    ]

    render(){
        return <Tab renderActiveOnly activeIndex={this.state.activeIndex} panes={this.panes} onTabChange={(event,data)=>{
            this.setState({activeIndex:data.activeIndex})
            console.log(this.state.activeIndex)
        }}/>
    }
}

export default MostradorProveedores;