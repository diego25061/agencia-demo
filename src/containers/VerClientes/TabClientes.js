import React from 'react'
import {Component} from 'react'
import { Button, Container, Header, Menu, Modal, Confirm, Segment } from 'semantic-ui-react';
import Requester from '../../common/Services/Requester';
import TablaBuscador from '../TablaBuscador/TablaBuscador';
import ModalCrearEditarCliente from './ModalCrearEditarCliente';
import Constantes from '../../common/Constantes';
import ClientModel from './../../common/Models/Apis/ClientModel';
import ModalClientes from './ModalClientes';
import NotificationStateHolder from '../../common/StateHolders/NotificationStateHolder';
import NotificacionApi from './../NotificacionApi/NotificacionApi';


class TabClientes extends Component{

    
    state = {
        clientesDirs:[
        ],
        
        confirmacionEliminarAbierta:false,
        idEliminar:null,
        
        modalCrearEditar:{
            //creacion o edicion
            modo:"creacion",
            abierto:false,
            //transaccionEnviada:false,
            //responseRecibida:false,
            //rptaTransaccion:null,
            campos:{
            }  
        },
        notificacion_crearEditar_cliente: new NotificationStateHolder(),
        notificacion_cargar_clientes: new NotificationStateHolder(),
        cargandoTabla:false
    }
    
    columnasTabla = [ 
        { Header: 'Nombre', accessor: 'nombre', Cell: props => props.value ? props.value:""},
        { Header: 'Correo', accessor: 'correoContacto', Cell: props => props.value ? props.value:""},
        { Header: 'Correo Adic.',accessor: 'correoAdicional', Cell: props => props.value ? props.value:"" }, 
        { Header: 'Numero contacto',accessor: 'numeroContacto', Cell: props => props.value ? props.value:"" }, 
        { Header: 'Numero contacto adicional', accessor: 'numeroContactoAdicional', Cell: props => props.value ? props.value:"" },
        { Header: 'Ciudad', accessor: 'ciudad', Cell: props => props.value ? props.value:"" },
        { Header: 'Pais', accessor: 'pais', Cell: props => props.value ? props.value:"" },
        { Header: 'Accion', Cell: props => {
            //console.log(props);
            return <Container textAlign="center">
                <Button circular color="yellow" icon="pencil" 
                onClick={()=>{
                    this.abrirModalEdicion(this.state.clientesDirs.find(element=>element.idCliente==props.original.idCliente))
                    }}></Button>
                <Button circular color="red" icon="trash" 
                onClick={()=>{
                    this.intentarEliminar(this.state.clientesDirs.find(element=>element.idCliente==props.original.idCliente))
                    }}></Button>
            </Container>
        }} 
    ]

    render(){

        return <div /*style={{backgroundColor:"#f9f9f9"}}*/>
            <Header size="medium">{this.props.sustPlural}</Header> 
            <Button primary onClick={ this.abrirModal }>Nuevo {this.props.sust}</Button>
            <Header size="small">Lista</Header>
            <TablaBuscador data={this.state.clientesDirs} columns={this.columnasTabla} loading={this.state.cargandoTabla}/>
            {/*this.ModalCrear()*/}

            
            <ModalClientes
                modo={this.state.modalCrearEditar.modo}
                abierto={this.state.modalCrearEditar.abierto}
                parent={this} 
                campos = {this.state.modalCrearEditar.campos}
                
                onUpdateFields={(keyPair)=>{
                    let campos = this.state.modalCrearEditar.campos;
                    let newCampos = {...campos,...keyPair};
                    //console.log("new campos > ",newCampos);
                    let obj = {...this.state.modalCrearEditar};
                    obj.campos = newCampos;
                    let newObj = obj;
                    this.setState({modalCrearEditar:newObj});
                }}

                crearEditarCliente_mostrarNotificacion = {this.state.notificacion_crearEditar_cliente.mostrarNotificacion}
                crearEditarCliente_enviando = {this.state.notificacion_crearEditar_cliente.enviando}
                crearEditarCliente_notif_color = {this.state.notificacion_crearEditar_cliente.notif_color}
                crearEditarCliente_contenidoRespuesta = {this.state.notificacion_crearEditar_cliente.contenidoRespuesta}
                crearEditarCliente_tituloRespuesta = {this.state.notificacion_crearEditar_cliente.tituloRespuesta}
                crearEditarCliente_notif_icono = {this.state.notificacion_crearEditar_cliente.notif_icono} 

                sustantivoTitulo={this.props.sust}
                placeholderNombre={this.props.placeholderNombre}
                placeholderCorreo={this.props.placeholderCorreo}
                placeholderCorreoAdic={this.props.placeholderCorreoAdic}

                enEnviar={this.enviarCliente}
                enEditar={this.editarCliente}
                enCerrar = {this.enCerrarModal}
                enCancelar = {this.enCancelarModal}
            />
            <Confirm
                open={this.state.confirmacionEliminarAbierta}
                cancelButton="Cancelar"
                confirmButton="Eliminar"
                content={'Seguro que deseas eliminar el '+this.props.sust+" '" + (this.state.idEliminar ? this.state.clientesDirs.find(element => element.idCliente == this.state.idEliminar).nombre+"'"
                    :"<NULO>") + '?'}
                onCancel={this.cerrarConfirmacionEliminar}
                onConfirm={()=>{this.confirmarEliminar(this.state.clientesDirs.find(element => element.idCliente == this.state.idEliminar))}}
            />
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
    
    intentarEliminar=(cliente)=>{
        //console.log(cliente);
        
        if(cliente){
            this.setState({
                idEliminar:cliente.idCliente,
                confirmacionEliminarAbierta:true
            })
        }
    }

    confirmarEliminar = (cliente) =>{
        console.log("Eliminando cliente ", cliente)

        if(cliente){
            Requester.eliminarCliente(cliente.idCliente,
                (rpta)=>{ 
                },
                (rptaError)=>{
                },
                ()=>{ 
                    this.cargarClientes();
                }
            );
        }
        
        this.setState({
            confirmacionEliminarAbierta:false,
            idEliminar:null
        })
    }

    cerrarConfirmacionEliminar = () =>{
        this.setState({
            confirmacionEliminarAbierta:false,
            idEliminar:null
        })
    }

    abrirModalEdicion= (cliente)=>{
        console.log("Abriendo modal:" , cliente);
        if(cliente){
            var obj = {...this.state.modalCrearEditar};
            obj.modo="edicion";
            obj.abierto=true;
            obj.campos = {...cliente};
            console.log(obj);
            this.setState({modalCrearEditar:obj});
        }
    }

    abrirModal = () =>{
        var obj = {...this.state.modalCrearEditar};
        obj.modo="creacion";
        obj.abierto = true;
        obj.campos = {};
        this.setState({modalCrearEditar:obj});
    }

    enviarCliente = () => { 
        console.log("Enviando nuevo cliente!");
        let notif = this.state.notificacion_crearEditar_cliente;
        notif.setAsEnviando();
        this.setState({notificacion_crearEditar_cliente:notif});
        var enviar = ClientModel.toApiObj(this.state.modalCrearEditar.campos);
        enviar.clase = this.props.tipo;
        
        this.props.funcEnviar(
            enviar,
            (rpta)=>{
                //console.log("rptaa>",rpta);
                let notif = this.state.notificacion_crearEditar_cliente;
                notif.setRecibidoSuccess("Cliente creado","Cliente "+rpta.cont.clase+ " creado: '"+rpta.cont.nombre+"'");
                this.setState({notificacion_crearEditar_cliente:notif});
                this.cargarClientes();
            },
            (rptaError)=>{
                console.log("rptaa>",rptaError);
                let notif = this.state.notificacion_crearEditar_cliente;
                notif.setRecibidoError("Error al crear cliente",rptaError.cont.message, rptaError.cont.statusCode, rptaError.cont.data);
                this.setState({notificacion_crearEditar_cliente:notif});
            })
    }


    editarCliente = () => { 
        console.log("Editando cliente!");

        let notif = this.state.notificacion_crearEditar_cliente;
        notif.setAsEnviando();

        this.setState({notificacion_crearEditar_cliente:notif});

        Requester.editarCliente(this.state.modalCrearEditar.campos.idCliente,
            ClientModel.toApiObj(this.state.modalCrearEditar.campos),
            (rpta)=>{
                let notif = this.state.notificacion_crearEditar_cliente;
                notif.setRecibidoSuccess("Cliente actualizado","Cliente '"+rpta.cont.nombre+"' actualizado")
                this.setState({notificacion_crearEditar_cliente:notif});

                this.cargarClientes();
            },
            (rptaError)=>{
                let notif = this.state.notificacion_crearEditar_cliente;
                notif.setRecibidoError("Error al actualizar cliente",rptaError.cont.message, rptaError.cont.statusCode, rptaError.cont.data);
                this.setState({notificacion_crearEditar_cliente:notif});
            }
        );
    }

    cargarClientes= () =>{
        this.setState({cargandoTabla:true});

        let fError = (rptaError) =>{
            let notif = this.state.notificacion_cargar_clientes;
            notif.setRecibidoError("Error al leer clientes",rptaError.cont.message, rptaError.cont.statusCode, rptaError.cont.data);
            notif.mostrarNotificacion=true;
            this.setState({notificacion_cargar_clientes:notif, cargandoTabla:false});
        }
        if(this.props.tipo==="directo"){
            Requester.getClientes(
                {"clase":"directo"},
                (rpta)=>{
                    var clientesDirs=rpta.cont.map((e,i)=>{ return new ClientModel(e);});
                    let notif = this.state.notificacion_cargar_clientes;
                    notif.setHidden();
                    this.setState({clientesDirs:clientesDirs,notificacion_cargar_clientes:notif , cargandoTabla:false});
            },fError);
        }else if ( this.props.tipo==="minorista"){
            Requester.getClientes(
                {"clase":"minorista"},
                (rpta)=>{
                var clientesDirs=rpta.cont.map((e,i)=>{ return new ClientModel(e);});
                let notif = this.state.notificacion_cargar_clientes;
                    notif.setHidden();
                    this.setState({clientesDirs:clientesDirs,notificacion_cargar_clientes:notif, cargandoTabla:false});
            },fError);
        }else if ( this.props.tipo==="mayorista"){
            Requester.getClientes(
                {"clase":"mayorista"},
                (rpta)=>{
                var clientesDirs=rpta.cont.map((e,i)=>{ return new ClientModel(e);});
                let notif = this.state.notificacion_cargar_clientes;
                    notif.setHidden();
                    this.setState({clientesDirs:clientesDirs,notificacion_cargar_clientes:notif, cargandoTabla:false});
            },fError);
        }
    }

    componentDidMount = () => {
        this.cargarClientes();
    }

    enCerrarModal = () =>{
        console.log("Cerrando modal");
        let notif = this.state.notificacion_crearEditar_cliente;
        notif.setHidden();
        var obj = {...this.state.modalCrearEditar};
        obj.abierto = false;
        this.setState({
            notificacion_crearEditar_cliente:notif,
            modalCrearEditar:obj
            });
    }

    enCancelarModal = () =>{
        console.log("Cancelando modal");
        let notif = this.state.notificacion_crearEditar_cliente;
        notif.setHidden();

        var obj = {...this.state.modalCrearEditar};
        obj.abierto = false;
        obj.campos = {};
        this.setState({
            notificacion_crearEditar_cliente:notif,
            modalCrearEditar:obj
            });
    }
    
}

export default TabClientes