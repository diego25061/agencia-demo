import React from 'react'
import {Component} from 'react'
import { Tab, Menu, Label, Icon} from 'semantic-ui-react';
import TabClientesDirs from './TabClientesDirs/TabClientesDirs';
import TabMinoristas from './TabMinoristas/TabMinoristas';
import TabMayoristas from './TabMayoristas/TabMayoristas';
import TabTodos from './TabTodos/TabTodos';

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
            <Menu.Item key='clienteDirecto'>
                <Icon name="user"/>Cliente Directo
            </Menu.Item>
        ),
        render: () => {
            return <Tab.Pane>
                <TabClientesDirs/>
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
                <TabMinoristas/>
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
                <TabMayoristas/>
            </Tab.Pane>},
    }
  ]

class VerClientes extends Component{

    render(){
        return <Tab panes={panes} />
    }
}
export default VerClientes