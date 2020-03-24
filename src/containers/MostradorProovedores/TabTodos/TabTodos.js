import React from 'react'
import {Component} from 'react'
import { Button, Container, Header } from 'semantic-ui-react';
import TablaBuscador from '../../TablaBuscador/TablaBuscador';
import Requester from '../../../common/Services/Requester';
import Constantes from '../../../common/Constantes';
import ModalCrearEditarProveedor from '../ModalCrearEditarProveedor';
import ProveedorModel from './../../../common/Models/Apis/ProovedorModel';
import NotificacionApi from './../../NotificacionApi/NotificacionApi';
import NotificationStateHolder from '../../../common/StateHolders/NotificationStateHolder';


class TabTodos extends Component{

    state = {
        proveedores:[
        ],
        notificacion_cargar_proveedores: new NotificationStateHolder(),
        cargandoTabla:false
    }

    columnasTabla = [ 
        { Header: 'Nombre', accessor: 'nombre' },
        { Header: 'Correo', accessor: 'correoContacto' },
        { Header: 'Correo Adic.',accessor: 'correoAdicional' }, 
        { Header: 'Numero contacto',accessor: 'numeroContacto' }, 
        { Header: 'Numero contacto adicional', accessor: 'numeroContactoAdicional' },
        { Header: 'Ciudad', accessor: 'ciudad' },
        { Header: 'Tipo', accessor: 'clase'  }
    ]

    render = () => {
        return <div>
            <Header size="medium">Todos los proveedores</Header> 
            {/*<Header size="small">Lista</Header>*/}
            <TablaBuscador data={this.state.proveedores} columns={this.columnasTabla} loading={this.state.cargandoTabla} />
            
            <NotificacionApi
                disabled={!this.state.notificacion_cargar_proveedores.mostrarNotificacion}
                loading={this.state.notificacion_cargar_proveedores.enviando}
                color={this.state.notificacion_cargar_proveedores.notif_color}
                content={this.state.notificacion_cargar_proveedores.contenidoRespuesta} 
                title={this.state.notificacion_cargar_proveedores.tituloRespuesta}
                icon={this.state.notificacion_cargar_proveedores.notif_icono}>
            </NotificacionApi>
        </div>
    }

    cargarTodos = () =>{
        this.setState({cargandoTabla:true});
        Requester.getProveedores( {}, (rpta)=>{
            var proovs=rpta.cont.map((e,i)=>{
                return new ProveedorModel(e);
            });
            let notif = this.state.notificacion_cargar_proveedores;
            notif.setHidden();
            this.setState({proveedores:proovs,notificacion_cargar_proveedores:notif , cargandoTabla:false});
        },(rptaError)=>{
            let notif = this.state.notificacion_cargar_proveedores;
            notif.setRecibidoError("Error al leer proveedores",rptaError.cont.message, rptaError.cont.statusCode, rptaError.cont.data);
            notif.mostrarNotificacion=true;
            this.setState({notificacion_cargar_proveedores:notif, cargandoTabla:false});
        });
    }

    componentDidMount = () => {
        this.cargarTodos();
    }
    
}

export default TabTodos