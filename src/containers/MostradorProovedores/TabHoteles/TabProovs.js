import React from 'react'
import {Component} from 'react'
import { Button, Container, Header, Confirm, Modal } from 'semantic-ui-react';
import TablaBuscador from '../../TablaBuscador/TablaBuscador';
import Requester from '../../../common/Services/Requester';
import Constantes from '../../../common/Constantes';
import ModalCrearEditarProveedor from '../ModalCrearEditarProveedor';
import ProveedorModel from './../../../common/Models/Apis/ProovedorModel';


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
                correoContacto:'',
                correoAdicional:'',
                numeroContacto:'',
                numeroContactoAdicional:'',
                ciudad:'',
                clase:''
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
            <ModalCrearEditarProveedor pack="modalCrearEditar" parent={this} sustantivoTitulo={this.props.sust}
                placeholderNombre={this.props.placeholderNombre}
                placeholderCorreo={this.props.placeholderCorreo}
                placeholderCorreoAdic={this.props.placeholderCorreoAdic}
                enEnviar={this.enviarProov}
                enEditar={this.editarProov}
                enCerrar={this.enCerrarModal}/>
            <Confirm
                open={this.state.confirmacionEliminarAbierta}
                cancelButton="Cancelar"
                confirmButton="Eliminar"
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
        this.setState({modalCrearEditar:obj});
    }

    enviarProov = () => { 
        console.log("enviando!");
        
        var obj = {...this.state.modalCrearEditar};
        obj.mensaje.enviado=true;
        this.setState({modalCrearEditar:obj});

        let enviar =this.state.modalCrearEditar.campos;
        enviar.tipo=this.props.tipo;

        this.props.funcEnviar( 
            ProveedorModel.toApiObj(enviar),
            (rpta)=>{
                console.log(enviar);
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
        //console.log("editando!");
        var obj = {...this.state.modalCrearEditar};
        obj.mensaje.enviado=true;
        this.setState({modalCrearEditar:obj});
        //console.log(": "+this.state.modalCrearEditar.campos.id);
        Requester.editarProveedor(
            this.state.modalCrearEditar.campos.idProveedor,
            ProveedorModel.toApiObj(this.state.modalCrearEditar.campos),
            (rpta)=>{
                //console.log(this.state.modalCrearEditar.campos);
                //console.log("edicion success!");
                //console.log(rpta);
                var obj = {...this.state.modalCrearEditar};
                obj.mensaje.recibido=true;
                obj.mensaje.respuesta = rpta;
                this.setState({modalCrearEditar:obj});
            },
            (rptaError)=>{
                //console.log("edicion error!");
                var obj = {...this.state.modalCrearEditar};
                obj.mensaje.recibido=true;
                obj.mensaje.respuesta = rptaError;
                this.setState({modalCrearEditar:obj});
            },
            () => {
                this.cargarProovs();
            });
    }

    cargarProovs= () =>{
        //console.log(this.props.tipo);
        Requester.getProveedores({clase:this.props.tipo}, (rpta)=>{
            var proovs=rpta.cont.map((e,i)=>{
                return new ProveedorModel(e);
            });
            this.setState({proovs:proovs});
        });
    }

    componentDidMount = () => {
        this.cargarProovs();
    }

    enCerrarModal = () =>{
        console.log("cerrandooooo");
        var obj = {...this.state.modalCrearEditar};
        
        obj.mensaje.recibido=false;
        obj.mensaje.enviado=false;
        obj.mensaje.respuesta=null;

        if(this.state.modalCrearEditar.modo==="edicion"){
            var obj = {...this.state.modalCrearEditar};
            for(var key in obj.campos){
                obj.campos[key]='';
            }
            /*
            obj.campos.id='';
            obj.campos.nombre='';
            obj.campos.correo='';
            obj.campos.correoAdic='';
            obj.campos.num='';
            obj.campos.numAdic='';
            obj.campos.ciudad='';*/
            this.setState({modalCrearEditar:obj});
        }
    }
    
}

export default TabProovs