import React from 'react'
import {Component} from 'react'
import { Tab, Menu, Label, Icon} from 'semantic-ui-react';
import TabClientes from './TabClientes';
import Requester from '../../common/Services/Requester';
import Constantes from '../../common/Constantes';
import TabTodosClientes from './TabTodos/TabTodosClientes';

const panes = [ 
    {
        menuItem: (
            <Menu.Item key='Todos'>
                Todos 
            </Menu.Item>
        ),
        render: () => {
            return <Tab.Pane>
                <TabTodosClientes/>
            </Tab.Pane>},
    },
    {
        menuItem: (
            <Menu.Item key='clienteDirecto'>
                <Icon name="user"/>Cliente Directo
            </Menu.Item>
        ),
        render: () => {
            return <Tab.Pane>
                
                <TabClientes sust="Cliente directo" 
                    sustPlural="Clientes directos"
                    placeholderNombre="Juan" 
                    placeholderCorreo="Juan@gmail.com" 
                    placeholderCorreoAdic="juan.agencia@gmail.com"
                    alias = {Constantes.AliasClientes.CLIENTE_DIRECTO}
                    funcEnviar = {Requester.crearCliente}
                    tipo="directo"

                    />
            </Tab.Pane>},
    },
    {
        menuItem: (
            <Menu.Item key='OpMinorista'>
                <Icon name="box"/>Operador minorista
            </Menu.Item>
        ),
        render: () => {
            return <Tab.Pane>
                <div></div>
                <TabClientes sust="Operador minorista" 
                    sustPlural="Minoristas"
                    placeholderNombre="NTS" 
                    placeholderCorreo="mariana@nts.com.gt" 
                    placeholderCorreoAdic="-"
                    alias = {Constantes.AliasClientes.OPERADOR_MINORISTA}
                    funcEnviar = {Requester.crearCliente}
                    tipo="minorista"
                    />
            </Tab.Pane>},
    },
    {
        menuItem: (
            <Menu.Item key='opMayorista'>
                <Icon name="boxes"/>Operador mayorista 
            </Menu.Item>
        ),
        render: () => {
            return <Tab.Pane>
                <div></div><div></div>
                <TabClientes sust="Operador mayorista" 
                    sustPlural="Mayoristas"
                    placeholderNombre="Eurolatina" 
                    placeholderCorreo="acaiminagua@eurolatina.com.ec" 
                    placeholderCorreoAdic="achala@eurolatina.com.ec"
                    alias = {Constantes.AliasClientes.OPERADOR_MAYORISTA}
                    funcEnviar = {Requester.crearCliente}
                    tipo="mayorista"
                    />
            </Tab.Pane>},
    }
  ]

class VerClientes extends Component{

    render(){
        return <Tab panes={panes} />
    }
}
export default VerClientes