import React from 'react'
import { Component } from 'react'
import { Header } from 'semantic-ui-react';
import Requester from '../../../common/Services/Requester';
import TablaBuscador from '../../TablaBuscador/TablaBuscador';
import ClientModel from './../../../common/Models/Apis/ClientModel';
import NotificationStateHolder from '../../../common/StateHolders/NotificationStateHolder';
import NotificacionApi from './../../NotificacionApi/NotificacionApi';

class TabTodosClientes extends Component {

    state = {
        clientes: [
        ],
        notificacion_cargar_clientes: new NotificationStateHolder(),
        cargandoTabla:false
    }

    columnasTabla = [
        { Header: 'Nombre', accessor: 'nombre' },
        { Header: 'Correo', accessor: 'correoContacto' },
        { Header: 'Correo Adic.', accessor: 'correoAdicional' },
        { Header: 'Numero contacto', accessor: 'numeroContacto' },
        { Header: 'Numero contacto adicional', accessor: 'numeroContactoAdicional' },
        { Header: 'Ciudad', accessor: 'ciudad' },
        { Header: 'Tipo', accessor: 'clase' }
    ]

    render = () => {
        return <div>
            <Header size="medium">Todos los clientes</Header>
            {/*<Header size="small">Lista</Header>*/}
            <TablaBuscador data={this.state.clientes} columns={this.columnasTabla} loading={this.state.cargandoTabla}/>
            <NotificacionApi
                disabled={!this.state.notificacion_cargar_clientes.mostrarNotificacion}
                loading={this.state.notificacion_cargar_clientes.enviando}
                color={this.state.notificacion_cargar_clientes.notif_color}
                content={this.state.notificacion_cargar_clientes.contenidoRespuesta}
                title={this.state.notificacion_cargar_clientes.tituloRespuesta}
                icon={this.state.notificacion_cargar_clientes.notif_icono}>
            </NotificacionApi>
        </div>
    }

    cargarTodos = () => {
        this.setState({cargandoTabla:true});
        Requester.getClientes({}, (rpta) => {
            var clientes = rpta.cont.map((e, i) => {
                return new ClientModel(e);
            });
            let notif = this.state.notificacion_cargar_clientes;
        console.log("clientes", clientes)
            notif.setHidden();
            this.setState({ clientes: clientes, notificacion_cargar_clientes: notif , cargandoTabla:false});
        }, (rptaError) => {
            let notif = this.state.notificacion_cargar_clientes;
            notif.setRecibidoError("Error al leer clientes", rptaError.cont.message, rptaError.cont.statusCode, rptaError.cont.data);
            notif.mostrarNotificacion = true;
            this.setState({ notificacion_cargar_clientes: notif, cargandoTabla:false });
        });

        console.log("clientes", this.state.clientes)
    }

    componentDidMount = () => {
        this.cargarTodos();
    }

}

export default TabTodosClientes
