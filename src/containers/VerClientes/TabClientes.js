import React from 'react'
import {Component} from 'react'
import { Button, Container, Header, Menu, Modal, Confirm, Segment } from 'semantic-ui-react';
import Requester from '../../common/Services/Requester';



import TablaBuscador from '../TablaBuscador/TablaBuscador';
import ModalCrearEditarCliente from './ModalCrearEditarCliente';
import Constantes from '../../common/Constantes';


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
        { Header: 'Correo', accessor: 'correo', Cell: props => props.value ? props.value:"-" },
        { Header: 'Correo Adic.',accessor: 'correoAdicional', Cell: props => props.value ? props.value:"-" }, 
        { Header: 'Numero contacto',accessor: 'numeroContacto', Cell: props => props.value ? props.value:"-" }, 
        { Header: 'Numero contacto adicional', accessor: 'numeroAdicional', Cell: props => props.value ? props.value:"-" },
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
        this.setState({
            confirmacionEliminarAbierta:false,
            idEliminar:null
        })

        if(cliente){
            Requester.postEliminarCliente(cliente.idCliente,
                (rpta)=>{
                    this.cargarClientes();
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

    abrirModalEdicion= (cliente)=>{
        console.log(cliente);
        if(cliente){
            var obj = {...this.state.modalCrearEditar};
            obj.modo="edicion";
            obj.abierto=true;
            obj.campos.idCliente = cliente.idCliente;
            obj.campos.nombre = cliente.nombre;
            obj.campos.correo = cliente.correo;
            obj.campos.correoAdicional = cliente.correoAdicional;
            obj.campos.nummeroContacto = cliente.numeroContacto;
            obj.campos.numeroAdicional = cliente.numeroAdicional;
            obj.campos.ciudad = cliente.ciudad;
            obj.campos.pais = cliente.pais;
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

        //Requester.postCliente(
        this.props.funcEnviar(
            this.props.alias,
            this.state.modalCrearEditar.campos.nombre,
            this.state.modalCrearEditar.campos.correo,
            this.state.modalCrearEditar.campos.numero,
            this.state.modalCrearEditar.campos.numeroAdicional,
            this.state.modalCrearEditar.campos.correoAdicional,
            this.state.modalCrearEditar.campos.ciudad,
            this.state.modalCrearEditar.campos.pais,
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
        Requester.postEditarCliente( 
            this.props.alias,
            this.state.modalCrearEditar.campos.idCliente,
            this.state.modalCrearEditar.campos.nombre,
            this.state.modalCrearEditar.campos.correo,
            this.state.modalCrearEditar.campos.numero,
            this.state.modalCrearEditar.campos.numeroAdicional,
            this.state.modalCrearEditar.campos.correoAdicional,
            this.state.modalCrearEditar.campos.ciudad,
            this.state.modalCrearEditar.campos.pais,
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
            })
    }

    cargarClientes= () =>{
        //console.log("aweeeee");
        Requester.getClientesFullDetallado(this.props.alias, (rpta)=>{
            var clientesDirs=rpta.cont.map((e,i)=>{
                var h = {
                    idCliente:e.idCliente,
                    nombre:e.nombre,
                    correo:e.correoContacto,
                    correoAdicional:e.correoAdicional,
                    numeroContacto:e.numeroContacto,
                    numeroAdicional:e.numeroAdicional,
                    ciudad:e.ciudad,
                    pais:e.pais,
                }
                return h;
            });
            this.setState({clientesDirs:clientesDirs});
        });
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
            obj.campos.id=null;
            obj.campos.nombre=null;
            obj.campos.correo=null;
            obj.campos.correoAdic=null;
            obj.campos.num=null;
            obj.campos.numAdic=null;
            obj.campos.ciudad=null;
            obj.campos.pais=null;
            this.setState({modalCrearEditar:obj});
        }
    }
}

export default TabClientes