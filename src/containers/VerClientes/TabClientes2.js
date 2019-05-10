import React from 'react'
import {Component} from 'react'
import { Button, Container, Header, Confirm, Modal } from 'semantic-ui-react';
import TablaBuscador from '../../TablaBuscador/TablaBuscador';
import Requester from '../../../common/Services/Requester';
import Constantes from '../../../common/Constantes';
import ModalCrearEditarProveedor from '../ModalCrearEditarProveedor';


class TabProovs extends Component{

    state = {
        proovs:[
            //{idProveedor:"-1",nombre:"Melia", correo:"asd@asd.com", correoAdic:"asljkdq@as.com", numeroContacto:"(51)65465",numeroContactoAdicional:"123312", ciudad:"city"}
        ],
        
        confirmacionEliminarAbierta:false,
        idEliminar:null,
        
        modalCrearEditar:{
            //creacion o edicion
            modo:"creacion",
            abierto:false,

            mensaje:{
                enviado:false,
                recibido:false,
                respuesta:null
            },

            campos:{
                id:'',
                nombre:'',
                correo:'',
                correoAdic:'',
                num:'',
                numAdic:'',
                ciudad:''
            }
            
        }
    }

    columnasTabla = [ 
        { Header: 'Nombre', accessor: 'nombre', Cell: props => props.value ? props.value:"-" },
        { Header: 'Correo', accessor: 'correo', Cell: props => props.value ? props.value:"-" },
        { Header: 'Correo Adic.',accessor: 'correoAdic', Cell: props => props.value ? props.value:"-" }, 
        { Header: 'Numero contacto',accessor: 'numeroContacto', Cell: props => props.value ? props.value:"-" }, 
        { Header: 'Numero contacto adicional', accessor: 'numeroContactoAdicional', Cell: props => props.value ? props.value:"-" },
        { Header: 'Ciudad', accessor: 'ciudad', Cell: props => props.value ? props.value:"-" },
        { Header: 'Accion', Cell: props => {
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
            <Button primary onClick={ this.abrirModal }>Nuevo {this.props.sust}</Button>
            <Header size="small">Lista</Header>
            <TablaBuscador data={this.state.proovs} columns={this.columnasTabla} />
            {/*this.ModalCrear()*/}
            <ModalCrearEditarProveedor parent={this} sustantivoTitulo={this.props.sust}
                placeholderNombre={this.props.placeholderNombre}
                placeholderCorreo={this.props.placeholderCorreo}
                placeholderCorreoAdic={this.props.placeholderCorreoAdic}
                enEnviar={this.enviarProov}
                enEditar={this.editarProov}
                enCerrar={this.enCerrarModal}/>
            <Confirm
                open={this.state.confirmacionEliminarAbierta}
                cancelButton="Cancelar"
                confirmButton="Elminar"
                content={'Seguro que deseas eliminar el '+this.props.sust+' ' + (this.state.idEliminar ? this.state.proovs.find(element => element.idProveedor == this.state.idEliminar).nombre
                    :"<NULO>") + '?'}
                onCancel={this.cerrarConfirmacionEliminar}
                onConfirm={()=>{this.confirmarEliminar(this.state.proovs.find(element => element.idProveedor == this.state.idEliminar))}}
            />
            <Modal></Modal>
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
            Requester.postEliminarProv(proveedor.idProveedor,
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
            obj.campos.id = proveedor.idProveedor;
            obj.campos.nombre = proveedor.nombre;
            obj.campos.correo = proveedor.correo;
            obj.campos.correoAdic = proveedor.correoAdic;
            obj.campos.num = proveedor.numeroContacto;
            obj.campos.numAdic = proveedor.numeroContactoAdicional;
            obj.campos.ciudad = proveedor.ciudad;
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

    enviarProov = () => { 
        console.log("enviando!");
        
        var obj = {...this.state.modalCrearEditar};
        obj.mensaje.enviado=true;
        this.setState({modalCrearEditar:obj});

        this.props.funcEnviar( 
            this.state.modalCrearEditar.campos.nombre,
            this.state.modalCrearEditar.campos.correo,
            this.state.modalCrearEditar.campos.num,
            this.state.modalCrearEditar.campos.numAdic,
            this.state.modalCrearEditar.campos.correoAdic,
            this.state.modalCrearEditar.campos.ciudad,
            (rpta)=>{
                console.log(this.state.modalCrearEditar.campos);
                console.log("success!");
                console.log(rpta);
                var obj = {...this.state.modalCrearEditar};
                obj.mensaje.recibido=true;
                obj.mensaje.respuesta = rpta;
                this.setState({modalCrearEditar:obj});
                this.cargarProovs();
            },
            (rptaError)=>{
                console.log("err!");
                var obj = {...this.state.modalCrearEditar};
                obj.mensaje.recibido=true;
                obj.mensaje.respuesta = rptaError;
                this.setState({modalCrearEditar:obj});
            })
    }
    
    editarProov = () => { 
        console.log("editando!");
        
        var obj = {...this.state.modalCrearEditar};
        obj.mensaje.enviado=true;
        this.setState({modalCrearEditar:obj});
        console.log(": "+this.state.modalCrearEditar.campos.id);
        Requester.postEditarProv(
            this.props.alias,
            this.state.modalCrearEditar.campos.id,
            this.state.modalCrearEditar.campos.nombre,
            this.state.modalCrearEditar.campos.correo,
            this.state.modalCrearEditar.campos.num,
            this.state.modalCrearEditar.campos.numAdic,
            this.state.modalCrearEditar.campos.correoAdic,
            this.state.modalCrearEditar.campos.ciudad,
            (rpta)=>{
                console.log(this.state.modalCrearEditar.campos);
                console.log("edicion success!");
                console.log(rpta);
                var obj = {...this.state.modalCrearEditar};
                obj.mensaje.recibido=true;
                obj.mensaje.respuesta = rpta;
                this.setState({modalCrearEditar:obj});
                this.cargarProovs();
            },
            (rptaError)=>{
                console.log("edicion error!");
                var obj = {...this.state.modalCrearEditar};
                obj.mensaje.recibido=true;
                obj.mensaje.respuesta = rptaError;
                this.setState({modalCrearEditar:obj});
            })
    }

    cargarProovs= () =>{
        console.log(this.props.alias);
        Requester.getProveedores(this.props.alias, (rpta)=>{
            var proovs=rpta.cont.map((e,i)=>{
                var h = {
                    idProveedor:e.idProveedor?e.idProveedor:0,
                    nombre:e.nombre?e.nombre:'',
                    correo:e.correo?e.correo:"",
                    correoAdic:e.correoAdicional?e.correoAdicional:"",
                    numeroContacto:e.numeroContacto?e.numeroContacto:'',
                    numeroContactoAdicional:e.numeroContactoAdicional?e.numeroContactoAdicional:"",
                    ciudad:e.ciudad?e.ciudad:""
                }
                return h;
            });
            this.setState({proovs:proovs});
        });
    }

    componentDidMount = () => {
        console.log("weeeee");
        this.cargarProovs();
    }

    enCerrarModal = () =>{
        var obj = {...this.state.modalCrearEditar};
        obj.mensaje.recibido=false;
        obj.mensaje.enviado=false;
        obj.mensaje.respuesta=null;

        if(this.state.modalCrearEditar.modo==="edicion"){
            var obj = {...this.state.modalCrearEditar};
            obj.campos.id='';
            obj.campos.nombre='';
            obj.campos.correo='';
            obj.campos.correoAdic='';
            obj.campos.num='';
            obj.campos.numAdic='';
            obj.campos.ciudad='';
            this.setState({modalCrearEditar:obj});
        }
    }
    
}

export default TabProovs