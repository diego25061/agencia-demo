import React from 'react'
import {Component} from 'react'
import { Button, Container, Header, Menu } from 'semantic-ui-react';
import ReactTable from "react-table";
import Requester from '../../../common/Services/Requester';
import Constantes from '../../../common/Constantes';
import TablaBuscador from '../../TablaBuscador/TablaBuscador';


class TabTodosClientes extends Component{

    state = {
        clientes:[
        ]
    }
    

    columnasTabla = [ 
        { Header: 'Nombre', accessor: 'nombre' },
        { Header: 'Correo', accessor: 'correoContacto' },
        { Header: 'Correo Adic.',accessor: 'correoAdicional' }, 
        { Header: 'Numero contacto',accessor: 'numeroContacto' }, 
        { Header: 'Numero contacto adicional', accessor: 'numeroContactoAdicional' },
        { Header: 'Ciudad', accessor: 'ciudad' },
        { Header: 'Tipo', accessor: 'tipo'  }
    ]

    render = () => {
        return <div>
            <Header size="medium">Todos los clientes</Header> 
            {/*<Header size="small">Lista</Header>*/}
            <TablaBuscador data={this.state.clientes} columns={this.columnasTabla} />
        </div>
    }

    cargarTodos = () =>{ 
        Requester.getClientesFullDetallado( "" , (rpta)=>{
            var clientes=rpta.cont.map((e,i)=>{
                var h = {
                    idCliente:e.idCliente,
                    nombre:e.nombre,
                    correo:e.correoContacto?e.correoContacto:"-",
                    correoAdicional:e.correoAdicional?e.correoAdicional:"-",
                    numeroContacto:e.numeroContacto?e.numeroContacto:"-",
                    numeroAdicional:e.numeroAdicional?e.numeroAdicional:"-",
                    ciudad:e.ciudad?e.ciudad:"-",
                    pais:e.pais?e.pais:"-",
                    tipo: e.tipo?Constantes.aliasATextoClientes(e.tipo):'-'
                }
                return h;
            });
            this.setState({clientes:clientes});
        });
        console.log("clientes",this.state.clientes)
    }

    componentDidMount = () => {
        this.cargarTodos();
    }
    
}

export default TabTodosClientes