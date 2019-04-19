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



const panes = [ 
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
                <TabHoteles/>
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
                <TabRestaurantes/>
            </Tab.Pane>},
    },
    {
        menuItem: (
            <Menu.Item key='Transportes'>
                <Icon name="truck"/>Transportes
            </Menu.Item>
        ),
        render: () => {
            return <Tab.Pane>
                <TabTransportes/>
            </Tab.Pane>},
    },
    {
        menuItem: (
            <Menu.Item key='Guias'>
                <Icon name="user"/>Guias
            </Menu.Item>
        ),
        render: () => {
            return <Tab.Pane>
                <TabGuias/>
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
                <TabOperadores/>
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
                <TabEmpresas/>
            </Tab.Pane>},
    },
    {
        menuItem: (
            <Menu.Item key='Personas'>
                <Icon name="id card"/>Personas
            </Menu.Item>
        ),
        render: () => {
            return <Tab.Pane>
                <TabPersonas/>
            </Tab.Pane>},
    },
  ]

class MostradorProveedores extends Component{

    render(){
        return <Tab panes={panes} />
    }
}

export default MostradorProveedores;