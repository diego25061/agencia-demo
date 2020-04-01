import React from 'react'
import {Component} from 'react'
import { Button, Container, Header, Confirm, Modal } from 'semantic-ui-react';
import TablaBuscador from '../../TablaBuscador/TablaBuscador';
import Requester from '../../../common/Services/Requester';
import Constantes from '../../../common/Constantes';
import ModalCrearEditarProveedor from '../ModalCrearEditarProveedor';
import ProveedorModel from './../../../common/Models/Apis/ProovedorModel';
import ModalProveedores from './../ModalProveedores';
import NotificationStateHolder from '../../../common/StateHolders/NotificationStateHolder';
import NotificacionApi from './../../NotificacionApi/NotificacionApi';
import { const_validacion_modificar_campo } from './../../../common/Constantes';


class TabProovs extends Component{

    state = {
        proovs:[
            //{idProveedor:"-1",nombre:"Melia", correo:"asd@asd.com", correoAdic:"asljkdq@as.com", numeroContacto:"(51)65465",numeroContactoAdicional:"123312", ciudad:"city"}
        ],
        
        confirmacionEliminarAbierta:false,
        idEliminar:null,
        cargandoTabla:false,

        modalCrearEditar:{
            //creacion o edicion
            modo:"creacion",
            abierto:false,

            campos:{
                id:'',
                nombre:'',
                correoContacto:'',
                correoAdicional:'',
                numeroContacto:'',
                numeroContactoAdicional:'',
                ciudad:'',
                clase:''
            }
            
        },
        notificacion_crearEditar_proveedor: new NotificationStateHolder(),
        notificacion_cargar_proveedores: new NotificationStateHolder()
    }

    columnasTabla = [ 
        { Header: 'Nombre', accessor: 'nombre', Cell: props => props.value ? props.value:"" },
        { Header: 'Correo', accessor: 'correoContacto', Cell: props => props.value ? props.value:"" },
        { Header: 'Correo Adic.',accessor: 'correoAdicional', Cell: props => props.value ? props.value:"" }, 
        { Header: 'Número contacto',accessor: 'numeroContacto', Cell: props => props.value ? props.value:"" }, 
        { Header: 'Número contacto adicional', accessor: 'numeroContactoAdicional', Cell: props => props.value ? props.value:"" },
        { Header: 'Ciudad', accessor: 'ciudad', Cell: props => props.value ? props.value:"" },
        { Header: 'Acción', Cell: props => {
            //console.log(props);
            return <Container textAlign="center">
                <Button circular color="yellow" icon="pencil" onClick={()=>{this.abrirModalEdicion(this.state.proovs.find(element=>element.idProveedor==props.original.idProveedor))}}></Button>
                <Button circular color="red" icon="trash" onClick={()=>{this.intentarEliminar(this.state.proovs.find(element=>element.idProveedor==props.original.idProveedor))}}></Button>
            </Container>
        }} 
    ]

    render = () => {
        return <div>
            <Header size="medium">{this.props.sustPlural}</Header> 
            
            <Button primary onClick={ this.abrirModal }>{this.props.genero ==="f" ? "Nueva" : "Nuevo"} {this.props.sust}</Button>
            <TablaBuscador data={this.state.proovs} columns={this.columnasTabla} loading={this.state.cargandoTabla} />
            {/*this.ModalCrear()*/}

            
            <ModalProveedores
                modo={this.state.modalCrearEditar.modo}
                abierto={this.state.modalCrearEditar.abierto}
                campos = {this.state.modalCrearEditar.campos}
                
                onUpdateFields={(keyPair)=>{
                    let campos = this.state.modalCrearEditar.campos;
                    
                    for (let [key, value] of Object.entries(keyPair)) {
                        value = const_validacion_modificar_campo(key,value);
                        //console.log(`luego de validar > ${key}: ${value}`);
                        keyPair[key]=value;
                    }
                    
                    let newCampos = {...campos,...keyPair};
                    //console.log("new campos > ",newCampos);
                    let obj = {...this.state.modalCrearEditar};

                    

                    obj.campos = newCampos;
                    let newObj = obj;
                    this.setState({modalCrearEditar:newObj});
                }}

                crearEditarProveedor_mostrarNotificacion = {this.state.notificacion_crearEditar_proveedor.mostrarNotificacion}
                crearEditarProveedor_enviando = {this.state.notificacion_crearEditar_proveedor.enviando}
                crearEditarProveedor_notif_color = {this.state.notificacion_crearEditar_proveedor.notif_color}
                crearEditarProveedor_contenidoRespuesta = {this.state.notificacion_crearEditar_proveedor.contenidoRespuesta}
                crearEditarProveedor_tituloRespuesta = {this.state.notificacion_crearEditar_proveedor.tituloRespuesta}
                crearEditarProveedor_notif_icono = {this.state.notificacion_crearEditar_proveedor.notif_icono} 

                sustantivoTitulo={this.props.sust}
                placeholderNombre={this.props.placeholderNombre}
                placeholderCorreo={this.props.placeholderCorreo}
                placeholderCorreoAdic={this.props.placeholderCorreoAdic}

                enEnviar={this.enviarProov}
                enEditar={this.editarProov}
                enCerrar = {this.enCerrarModal}
                enCancelar = {this.enCancelarModal}
            />
            
            <Confirm
                open={this.state.confirmacionEliminarAbierta}
                cancelButton="Cancelar"
                confirmButton="Eliminar"
                content={'Seguro que deseas eliminar el '+this.props.sust+' ' + (this.state.idEliminar ? this.state.proovs.find(element => element.idProveedor == this.state.idEliminar).nombre
                    :"<NULO>") + '?'}
                onCancel={this.cerrarConfirmacionEliminar}
                onConfirm={()=>{this.confirmarEliminar(this.state.proovs.find(element => element.idProveedor == this.state.idEliminar))}}
            />
            
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

    intentarEliminar=(proveedor)=>{
        console.log(proveedor);
        
        if(proveedor){
            this.setState({
                idEliminar:proveedor.idProveedor,
                confirmacionEliminarAbierta:true
            })
        }
    }

    confirmarEliminar = (proveedor) =>{
        console.log("eliminando proveedor " + proveedor.nombre)
        this.setState({
            confirmacionEliminarAbierta:false,
            idEliminar:null
        })

        if(proveedor){
            Requester.eliminarProveedor(proveedor.idProveedor,
                (rpta)=>{
                    this.cargarProovs();
                },
                (rptaError)=>{
                }
            );
        }
    }

    cerrarConfirmacionEliminar = () =>{
        this.setState({
            confirmacionEliminarAbierta:false,
            idEliminar:null
        })
    }

    abrirModalEdicion= (proveedor)=>{
        console.log(proveedor);
        if(proveedor){
            var obj = {...this.state.modalCrearEditar};
            obj.modo="edicion";
            obj.abierto=true;
            obj.campos = { ...proveedor }
            //console.log(obj);
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

    enviarProov = () => {

        //console.log("Enviando nuevo proveedor!");

        let notif = this.state.notificacion_crearEditar_proveedor;
        notif.setAsEnviando();
        this.setState({notificacion_crearEditar_proveedor:notif});
        var enviar = ProveedorModel.toApiObj(this.state.modalCrearEditar.campos);
        enviar.clase = this.props.tipo;
        
        this.props.funcEnviar(
            enviar,
            (rpta)=>{
                //console.log("rptaa>",rpta);
                let notif = this.state.notificacion_crearEditar_proveedor;
                notif.setRecibidoSuccess("Proveedor creado","Proveedor "+rpta.cont.clase+ " creado: '"+rpta.cont.nombre+"'");
                this.setState({notificacion_crearEditar_proveedor:notif});
                this.cargarProovs();
            },
            (rptaError)=>{
                let notif = this.state.notificacion_crearEditar_proveedor;
                notif.setRecibidoError("Error al crear proveedor",rptaError.cont.message, rptaError.cont.statusCode, rptaError.cont.data);
                this.setState({notificacion_crearEditar_proveedor:notif});
            })

    }
    
    editarProov = () => {
        let notif = this.state.notificacion_crearEditar_proveedor;
        notif.setAsEnviando();

        this.setState({notificacion_crearEditar_proveedor:notif});
        let enviar = ProveedorModel.toApiObj(this.state.modalCrearEditar.campos);

        Requester.editarProveedor(this.state.modalCrearEditar.campos.idProveedor,
            enviar,
            (rpta)=>{
                let notif = this.state.notificacion_crearEditar_proveedor;
                notif.setRecibidoSuccess("Proveedor actualizado","Proveedor '"+rpta.cont.nombre+"' actualizado")
                this.setState({notificacion_crearEditar_proveedor:notif});

                this.cargarProovs();
            },
            (rptaError)=>{
                let notif = this.state.notificacion_crearEditar_proveedor;
                notif.setRecibidoError("Error al actualizar proveedor",rptaError.cont.message, rptaError.cont.statusCode, rptaError.cont.data);
                this.setState({notificacion_crearEditar_proveedor:notif});
            }
        );

    }

    cargarProovs= () =>{
        this.setState({cargandoTabla:true});

        Requester.getProveedores({clase:this.props.tipo}, (rpta)=>{
            var proovs=rpta.cont.map((e,i)=>{
                return new ProveedorModel(e);
            });
            let notif = this.state.notificacion_cargar_proveedores;
            notif.setHidden();
            this.setState({ 
                proovs: proovs,
                notificacion_cargar_proveedores:notif,
                cargandoTabla:false });
        },(rptaError)=>{
            let notif = this.state.notificacion_cargar_proveedores;
            notif.setRecibidoError("Error al leer proveedores",rptaError.cont.message, rptaError.cont.statusCode, rptaError.cont.data);
            notif.mostrarNotificacion=true;
            this.setState({
                notificacion_cargar_proveedores:notif,
                cargandoTabla:false });      
        });
    }

    componentDidMount = () => {
        this.cargarProovs();
    }

    enCerrarModal = () =>{
        let notif = this.state.notificacion_crearEditar_proveedor;
        notif.setHidden();
        var obj = {...this.state.modalCrearEditar};
        obj.abierto = false;
        this.setState({
            notificacion_crearEditar_proveedor:notif,
            modalCrearEditar:obj
            });
    }
    
    enCancelarModal = () =>{
        let notif = this.state.notificacion_crearEditar_proveedor;
        notif.setHidden();

        var obj = {...this.state.modalCrearEditar};
        obj.abierto = false;
        obj.campos = {};
        this.setState({
            notificacion_crearEditar_proveedor:notif,
            modalCrearEditar:obj
            });
    }
    
    
}

export default TabProovs