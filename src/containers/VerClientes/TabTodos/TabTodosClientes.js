import React from 'react'
import {Component} from 'react'
import { Header } from 'semantic-ui-react';
import Requester from '../../../common/Services/Requester';
import TablaBuscador from '../../TablaBuscador/TablaBuscador';
import ClientModel from './../../../common/Models/Apis/ClientModel';

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
        let cls = [];
        Requester.getClientes( {"clase":"directo"},(rpta)=>{
            //console.log("RPTA > ",rpta)
            var clientes=rpta.cont.map((e,i)=>{
                //console.log("obj: ",new ClientModel(e));
                return {
                     ...new ClientModel(e),
                     tipo : "Clientes directos"
                };
            });
            cls = [...cls,...clientes]
                    //console.log("asd1",cls);
        },()=>{},
        ()=>{
            Requester.getClientesOpMin( (rpta) => {
                var clientes=rpta.cont.map((e,i)=>{
                    return { ...new ClientModel(e),tipo : "Operadores minoristas" };
                }); 
                cls = [...cls,...clientes]
                    //console.log("asd2",cls);
            },()=>{},()=>{
                Requester.getClientesOpMay( (rpta)=> {
                    var clientes=rpta.cont.map((e,i)=>{
                        return { ...new ClientModel(e),tipo : "Operadores mayoristas" };
                    });
                    cls = [...cls,...clientes];
                },()=>{},()=>{
                    //console.log("asd",cls);
                    this.setState({clientes:cls});
                });
            });
        });

        console.log("clientes",this.state.clientes)
    }

    componentDidMount = () => {
        this.cargarTodos();
    }
    
}

export default TabTodosClientes
