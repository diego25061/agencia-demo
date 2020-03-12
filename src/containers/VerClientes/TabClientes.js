import React from 'react'
import {Component} from 'react'
import { Button, Container, Header, Menu, Modal, Confirm, Segment } from 'semantic-ui-react';
import Requester from '../../common/Services/Requester';



import TablaBuscador from '../TablaBuscador/TablaBuscador';
import ModalCrearEditarCliente from './ModalCrearEditarCliente';
import Constantes from '../../common/Constantes';
import ClientModel from './../../common/Models/Apis/ClientModel';


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
            transaccionEnviada:false,
            responseRecibida:false,
            rptaTransaccion:null,

            campos:{
            }
            
        }

    }
    
    columnasTabla = [ 
        { Header: 'Nombre', accessor: 'nombre', Cell: props => props.value ? props.value:"-" },
        { Header: 'Correo', accessor: 'correoContacto', Cell: props => props.value ? props.value:"-" },
        { Header: 'Correo Adic.',accessor: 'correoAdicional', Cell: props => props.value ? props.value:"-" }, 
        { Header: 'Numero contacto',accessor: 'numeroContacto', Cell: props => props.value ? props.value:"-" }, 
        { Header: 'Numero contacto adicional', accessor: 'numeroContactoAdicional', Cell: props => props.value ? props.value:"-" },
        { Header: 'Ciudad', accessor: 'ciudad', Cell: props => props.value ? props.value:"-" },
        { Header: 'Pais', accessor: 'pais', Cell: props => props.value ? props.value:"-" },
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
            <TablaBuscador data={this.state.clientesDirs} columns={this.columnasTabla} />
            {/*this.ModalCrear()*/}

            <ModalCrearEditarCliente parent={this} sustantivoTitulo={this.props.sust}
                placeholderNombre={this.props.placeholderNombre}
                placeholderCorreo={this.props.placeholderCorreo}
                placeholderCorreoAdic={this.props.placeholderCorreoAdic}
                enEnviar={this.enviarCliente}
                enEditar={this.editarCliente}
                enCerrar={this.enCerrarModal}/>
            <Confirm
                open={this.state.confirmacionEliminarAbierta}
                cancelButton="Cancelar"
                confirmButton="Eliminar"
                content={'Seguro que deseas eliminar el '+this.props.sust+' ' + (this.state.idEliminar ? this.state.clientesDirs.find(element => element.idCliente == this.state.idEliminar).nombre
                    :"<NULO>") + '?'}
                onCancel={this.cerrarConfirmacionEliminar}
                onConfirm={()=>{this.confirmarEliminar(this.state.clientesDirs.find(element => element.idCliente == this.state.idEliminar))}}
            />
            <Modal></Modal>
        </div>
    }
    
    intentarEliminar=(cliente)=>{
        console.log(cliente);
        
        if(cliente){
            this.setState({
                idEliminar:cliente.idCliente,
                confirmacionEliminarAbierta:true
            })
        }
    }

    confirmarEliminar = (cliente) =>{
        console.log("eliminando cliente ", cliente)

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
        console.log("abriendo modal:" , cliente);
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
        this.setState({modalCrearEditar:obj});
    }

    enviarCliente = () => { 
        //console.log("enviando!");
        var obj = {...this.state.modalCrearEditar};
        obj.transaccionEnviada=true;
        this.setState({modalCrearEditar:obj});
        var enviar = ClientModel.toApiObj(this.state.modalCrearEditar.campos);
        enviar.clase = this.props.tipo;
        //Requester.postCliente(
        this.props.funcEnviar(
            enviar,
            (rpta)=>{
                var obj = {...this.state.modalCrearEditar};
                obj.responseRecibida=true;
                obj.rptaTransaccion = rpta;
                this.setState({modalCrearEditar:obj});
                this.cargarClientes();
            },
            (rptaError)=>{
                var obj = {...this.state.modalCrearEditar};
                obj.responseRecibida=true;
                obj.rptaTransaccion = rptaError;
                this.setState({modalCrearEditar:obj});
            })
    }
    
    editarCliente = () => { 
        console.log("editando!");
        
        var obj = {...this.state.modalCrearEditar};
        obj.transaccionEnviada=true;
        this.setState({modalCrearEditar:obj});
        //console.log("::::::::: ",this.state.modalCrearEditar.campos);
        Requester.editarCliente(this.state.modalCrearEditar.campos.idCliente,
            ClientModel.toApiObj(this.state.modalCrearEditar.campos),
            (rpta)=>{
                console.log(this.state.modalCrearEditar.campos);
                console.log("edicion success!");
                console.log(rpta);
                var obj = {...this.state.modalCrearEditar};
                obj.responseRecibida = true;
                obj.rptaTransaccion = rpta;
                this.setState({modalCrearEditar:obj});
                this.cargarClientes();
            },
            (rptaError)=>{
                //console.log("edicion error!");
                var obj = {...this.state.modalCrearEditar};
                obj.responseRecibida = true;
                obj.rptaTransaccion = rptaError;
                this.setState({modalCrearEditar:obj});
            }
        );
    }

    cargarClientes= () =>{
        if(this.props.tipo==="directo"){
            Requester.getClientes(
                {"clase":"directo"},
                (rpta)=>{
                    var clientesDirs=rpta.cont.map((e,i)=>{ return new ClientModel(e);});
                    this.setState({clientesDirs:clientesDirs});
            });
            /*
            Requester.getClientesFullDetallado((rpta)=>{
                var clientesDirs=rpta.cont.map((e,i)=>{ return new ClientModel(e);});
                this.setState({clientesDirs:clientesDirs});
            });*/
        }else if ( this.props.tipo==="minorista"){
            Requester.getClientesOpMin((rpta)=>{
                var clientesDirs=rpta.cont.map((e,i)=>{ return new ClientModel(e);});
                this.setState({clientesDirs:clientesDirs});
            });
        }else if ( this.props.tipo==="mayorista"){
            Requester.getClientesOpMay((rpta)=>{
                var clientesDirs=rpta.cont.map((e,i)=>{ return new ClientModel(e);});
                this.setState({clientesDirs:clientesDirs});
            });
        }
    }

    componentDidMount = () => {
        this.cargarClientes();
    }

    enCerrarModal = () =>{
        var obj = {...this.state.modalCrearEditar};
        obj.responseRecibida=false;
        obj.transaccionEnviada=false;
        obj.rptaTransaccion=null;

        if(this.state.modalCrearEditar.modo === "edicion"){
            var obj = {...this.state.modalCrearEditar};
            for(var key in obj.campos){
                obj.campos[key]='';
            }
            this.setState({modalCrearEditar:obj});
        }
    }
}

export default TabClientes