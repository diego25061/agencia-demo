import React from 'react'
import {Component} from 'react'
import { Button, Container, Header, Confirm, Modal } from 'semantic-ui-react';
import TablaBuscador from '../../TablaBuscador/TablaBuscador';
import Requester from '../../../common/Services/Requester';
import Constantes from '../../../common/Constantes';
import ModalTest from '../ModalTest';


class TabHoteles extends Component{

    state = {
        hoteles:[
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
                id:null,
                nombre:null,
                correo:null,
                correoAdic:null,
                num:null,
                numAdic:null,
                ciudad:null
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
                <Button circular color="yellow" icon="pencil" onClick={()=>{this.abrirModalEdicion(this.state.hoteles.find(element=>element.idProveedor==props.original.idProveedor))}}></Button>
                <Button circular color="red" icon="trash" onClick={()=>{this.intentarEliminar(this.state.hoteles.find(element=>element.idProveedor==props.original.idProveedor))}}></Button>
            </Container>
        }} 
    ]
    
    render = () => {
        return <div>
            <Header size="medium">Hoteles</Header> 
            <Button primary onClick={ this.abrirModal }>Nuevo Hotel</Button>
            <Header size="small">Lista</Header>
            <TablaBuscador data={this.state.hoteles} columns={this.columnasTabla} />
            {/*this.ModalCrear()*/}
            <ModalTest parent={this} sustantivoTitulo="Hotel" 
                placeholderNombre="Arawi" 
                placeholderCorreo="correo@arawi.com" 
                placeholderCorreoAdic="arawi.ventas@gmail.com"
                enEnviar={this.enviarHotel}
                enEditar={this.editarHotel}
                enCerrar={this.enCerrarModal}/>
            <Confirm
                open={this.state.confirmacionEliminarAbierta}
                cancelButton="Cancelar"
                confirmButton="Elminar"
                content={'Seguro que deseas eliminar el hotel ' + (this.state.idEliminar ? this.state.hoteles.find(element => element.idProveedor == this.state.idEliminar).nombre
                    :"<NULO>") + '?'}
                onCancel={this.cerrarConfirmacionEliminar}
                onConfirm={()=>{this.confirmarEliminar(this.state.hoteles.find(element => element.idProveedor == this.state.idEliminar))}}
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

    enviarHotel = () => { 
        console.log("enviando!");
        
        var obj = {...this.state.modalCrearEditar};
        obj.mensaje.enviado=true;
        this.setState({modalCrearEditar:obj});

        Requester.postProvHotel( 
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
                this.cargarHoteles();
            },
            (rptaError)=>{
                console.log("err!");
                var obj = {...this.state.modalCrearEditar};
                obj.mensaje.recibido=true;
                obj.mensaje.respuesta = rptaError;
                this.setState({modalCrearEditar:obj});
            })
    }
    
    editarHotel = () => { 
        console.log("editando!");
        
        var obj = {...this.state.modalCrearEditar};
        obj.mensaje.enviado=true;
        this.setState({modalCrearEditar:obj});
        console.log(": "+this.state.modalCrearEditar.campos.id);
        Requester.postEditarProvHotel( 
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
                this.cargarHoteles();
            },
            (rptaError)=>{
                console.log("edicion error!");
                var obj = {...this.state.modalCrearEditar};
                obj.mensaje.recibido=true;
                obj.mensaje.respuesta = rptaError;
                this.setState({modalCrearEditar:obj});
            })
    }

    cargarHoteles= () =>{
        Requester.getProveedores(Constantes.AliasProovedores.HOTEL, (rpta)=>{
            var hoteles=rpta.cont.map((e,i)=>{
                var h = {
                    idProveedor:e.idProveedor,
                    nombre:e.nombre,
                    correo:e.correo,//?e.correo:"-",
                    correoAdic:e.correoAdicional,//?e.correoAdicional:"-",
                    numeroContacto:e.numeroContacto,//?e.numeroContacto:"-",
                    numeroContactoAdicional:e.numeroContactoAdicional,//?e.numeroContactoAdicional:"-",
                    ciudad:e.ciudad//?e.ciudad:"-"
                }
                return h;
            });
            this.setState({hoteles:hoteles});
        });
    }

    componentDidMount = () => {
        this.cargarHoteles();
    }

    enCerrarModal = () =>{
        if(this.state.modalCrearEditar.modo==="edicion"){
            var obj = {...this.state.modalCrearEditar};
            obj.campos.id=null;
            obj.campos.nombre=null;
            obj.campos.correo=null;
            obj.campos.correoAdic=null;
            obj.campos.num=null;
            obj.campos.numAdic=null;
            obj.campos.ciudad=null;
            this.setState({modalCrearEditar:obj});
        }
    }
    
}

export default TabHoteles