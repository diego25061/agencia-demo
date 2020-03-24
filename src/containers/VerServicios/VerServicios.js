import React from 'react';
import {Component} from 'react';
import {Link} from 'react-router-dom'
import { Label, Button, Container, Header, Segment, Message, Icon} from 'semantic-ui-react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import TablaBuscador from '../TablaBuscador/TablaBuscador';
import ModalCrearServicio from './ModalCrearServicio';
import CONSTANTES_GLOBALES from '../../common/Constantes';
import Requester from '../../common/Services/Requester';
import moment from 'moment'
import momentTz from 'moment-timezone'
import ServicioModel from './../../common/Models/Apis/ServicioModel';
import NotificationStateHolder from '../../common/StateHolders/NotificationStateHolder';
import NotificacionApi from '../NotificacionApi/NotificacionApi';

class VerServicios extends Component{

    state={

        modalServicio:{
            abierto:false,
            transaccionEnviada:false,
            responseRecibida:false,
            rptaTransaccion:null,
            tipo:CONSTANTES_GLOBALES.TiposServicios[0].value,

            campos:{
                fecha:"",
                ciudad:"",
                nombre:'',
                file:"",
                hotel:"",
                pasajeros:"",
                nombrePasajero:"",
                alm:"",
                observaciones:"",
                proveedor:"",
                tren:"",
                horaRecojo:"",
                horaSalida:"",
                transporte:"",

            }
        },

        serviciosServ:[
            /*
            {
                idServicio=1,
                nombre: "City tour",
                file: "02-495",
                fecha:"02-04-2017", 
                ciudad:"lima",
                hotel:"melia" ,
                cantPasajeros: "2", 
                pasajero: "Ctm",
            }*/
        ] ,
        
        serviciosTransp:[
            /*
            {
                nombre: "City tour",
                file: "02-495",
                fecha:"02-04-2017", 
                ciudad:"lima", 
                horaRecojo:"11:40", 
                horaSalida:"11:40:01", 
                cantPasajeros: "3", 
                pasajero: "Ctm",
                transportista: "Javi" 
            }*/
        ],
        serviciosHospedajes:[
        ],
         queryForzadoServs:"",
         queryForzadoTransps:"",
         queryForzadoHospedajes:"",
         
        serviciosTranspCargando:false,
        serviciosSerCargando:false,
        serviciosHospCargando:false,
        
        notificacion_leerServsSer : new NotificationStateHolder(),
        notificacion_leerServsTransp : new NotificationStateHolder(),
        notificacion_leerServsHosp : new NotificationStateHolder()

     }


    render(){
       
        
        const cols = [
        {
            Header: 'Nombre', accessor: 'nombre' , Cell: props => props.value ? props.value:"-" 
        },
        {
            Header: 'File', Cell: props => { 
                if(props.original.file)
                    if(props.original.file.codigo)
                        return props.original.file.codigo
                return "-";
            } 
        },
        {
            Header: 'Fecha', accessor: 'fechaEjecucion', Cell: props => props.value ? props.value:"-" 
        }, 
        {
            Header: 'Ciudad', accessor: 'ciudad', Cell: props => props.value ? props.value:"-" 
        }, 
        {
            Header: 'Hora Inicio', accessor: 'horaInicio', Cell: props => props.value ? props.value:"-" 
        },
        {
            Header: 'Cant. pasajeros', accessor: 'cantPasajeros', Cell: props => props.value ? props.value:"-" 
        }, 
        {
            Header: 'Pasajero', accessor: 'nombrePasajero', Cell: props => props.value ? props.value:"-" 
        }, 
        {
            Header: 'Proveedor', Cell: props => {
                if(props.original.proveedor)
                    if(props.original.proveedor.nombre)
                        return props.original.proveedor.nombre + " ("+props.original.proveedor.clase+")"
                return "-";
            }
        }, 
        {
            Header: 'Accion',
            Cell: props => { 
                console.log("props > " ,props.original);
                let fileId = null;
                if(props.original && props.original.file && props.original.file.id)
                    fileId = props.original.file.id;
                return <Container textAlign="center">
                    {fileId?
                    <Link to={"/file/ver/"+fileId/*+"#"+props.original.idServicio*/}>
                        <Button circular icon="eye"/>
                    </Link>
                    :<></>}
                {/*<Button circular color="yellow" icon="pencil"></Button>
                <Button circular color="red" icon="trash"></Button>*/}
                </Container>
            }
        }, 
    ]
    
        return(<div>
                <Header size="large">Lista de servicios</Header> 
                {/*
                <Button primary onClick={ ()=>{
                    var obj = {...this.state.modalServicio};
                    obj.abierto=true;
                    this.setState({modalServicio:obj});
                } }>Nuevo Servicio</Button>
            */}
            <Header size="small">Servicios al día de...</Header>
            <Button onClick={()=>{
                    let fecha = moment().tz('America/Lima').format('Y-MM-DD')
                    this.setState({queryForzadoServs:fecha,queryForzadoTransps:fecha,queryForzadoHospedajes:fecha})
                }}>Hoy</Button>
            <Button onClick={()=>{
                    let fecha = moment().tz('America/Lima').add(1,'days').format('Y-MM-DD')
                    this.setState({queryForzadoServs:fecha,queryForzadoTransps:fecha,queryForzadoHospedajes:fecha})
                }}>Mañana</Button>
            <Button onClick={()=>{
                    this.setState({queryForzadoServs:"",queryForzadoTransps:"",queryForzadoHospedajes:""})
                }}   secondary>Todos</Button>
                <Header size="medium">Servicios generales programados</Header> 
                <Segment>
                    <TablaBuscador 
                        queryForzado={this.state.queryForzadoServs} 
                        vaciarQueryForzado={this.vaciarQueryForzadoServs}
                        data={this.state.serviciosServ} 
                        columns={cols}
                        loading={this.state.serviciosSerCargando} />
                </Segment>
                <NotificacionApi
                    disabled={!this.state.notificacion_leerServsSer.mostrarNotificacion}
                    loading={this.state.notificacion_leerServsSer.enviando}
                    color={this.state.notificacion_leerServsSer.notif_color}
                    content={this.state.notificacion_leerServsSer.contenidoRespuesta} 
                    title={this.state.notificacion_leerServsSer.tituloRespuesta}
                    icon={this.state.notificacion_leerServsSer.notif_icono}>
                </NotificacionApi>


                <Header size="medium">Servicios de transporte programados</Header> 
                <Segment>
                    <TablaBuscador 
                        queryForzado={this.state.queryForzadoTransps} 
                        vaciarQueryForzado={this.vaciarQueryForzadoTransps}
                        data={this.state.serviciosTransp} columns={cols}
                        loading={this.state.serviciosTranspCargando} />
                </Segment>
                <NotificacionApi
                    disabled={!this.state.notificacion_leerServsTransp.mostrarNotificacion}
                    loading={this.state.notificacion_leerServsTransp.enviando}
                    color={this.state.notificacion_leerServsTransp.notif_color}
                    content={this.state.notificacion_leerServsTransp.contenidoRespuesta} 
                    title={this.state.notificacion_leerServsTransp.tituloRespuesta}
                    icon={this.state.notificacion_leerServsTransp.notif_icono}>
                </NotificacionApi>
                

                <Header size="medium">Hospedajes programados</Header> 
                <Segment>
                    <TablaBuscador 
                        queryForzado={this.state.queryForzadoHospedajes} 
                        vaciarQueryForzado={this.vaciarQueryForzadoHospedajes}
                        data={this.state.serviciosHospedajes} columns={cols} 
                        loading={this.state.serviciosHospCargando}/>
                </Segment>
                <NotificacionApi
                    disabled={!this.state.notificacion_leerServsHosp.mostrarNotificacion}
                    loading={this.state.notificacion_leerServsHosp.enviando}
                    color={this.state.notificacion_leerServsHosp.notif_color}
                    content={this.state.notificacion_leerServsHosp.contenidoRespuesta} 
                    title={this.state.notificacion_leerServsHosp.tituloRespuesta}
                    icon={this.state.notificacion_leerServsHosp.notif_icono}>
                </NotificacionApi>
                {/*
                <Message error icon >
                    <Icon name="cancel"></Icon>
                    <Message.Header>
                        Error al cargar hospedajes
                    </Message.Header>
                </Message>*/}
                {/*<ModalCrearServicio parentComp={this}/>*/}
            </div>
        )
    }

    vaciarQueryForzadoServs = () =>{
        this.setState({queryForzadoServs:''})
    }
    vaciarQueryForzadoTransps = () =>{
        this.setState({queryForzadoTransps:''})
    }
    vaciarQueryForzadoHospedajes = () =>{
        this.setState({queryForzadoHospedajes:''})
    }

    enviarServicio = () => {
        /*
        Requester.postServicio(
            //this.state.modalServicio.campos.proveedor
        )*/
    }

    componentDidMount= () =>{
        this.cargarServsGenerales();
        this.cargarServsTransportes();
        this.cargarHospedajes();
    }

    cargarServsGenerales = () => {
        let n = this.state.notificacion_leerServsSer;
        this.setState({serviciosSerCargando:true});
        Requester.getServicios({clase:"general"},(rpta)=>{
            var servs = rpta.cont.map((e,i)=>{
                return new ServicioModel(e);
            });
            n.setHidden();
            this.setState({serviciosServ:servs, notificacion_leerServsSer:n, serviciosSerCargando:false});
        },(rptaError)=>{
            console.log("error!");
            n.setRecibidoError("Error al cargar servicios generales",rptaError.cont.message,rptaError.cont.statusCode);
            n.mostrarNotificacion=true;
            this.setState({notificacion_leerServsSer:n, serviciosSerCargando:false});
        });
    }

    cargarServsTransportes = () => {
        
        /*

                nombre: "City tour",
                file: "02-495",
                fecha:"02-04-2017", 
                ciudad:"lima", 
                horaRecojo:"11:40", 
                horaSalida:"11:40:01", 
                cantPasajeros: "3", 
                pasajero: "Ctm",
                transportista: "Javi" 
        */
        let n = this.state.notificacion_leerServsTransp;
        this.setState({serviciosTranspCargando:true});
        Requester.getServicios({clase:"transporte"},(rpta)=>{
            console.log("rpta! transportes: ",rpta)
            var servs = rpta.cont.map((e,i)=>{
                
                return new ServicioModel(e);
            });
            n.setHidden();
            this.setState({serviciosTransp:servs, serviciosTranspCargando:false,notificacion_leerServsTransp:n});
        },(rptaError)=>{
            //console.log("error!");
            n.setRecibidoError("Error al cargar transportes",rptaError.cont.message,rptaError.cont.statusCode);
            n.mostrarNotificacion=true;
            this.setState({notificacion_leerServsTransp:n ,serviciosTranspCargando:false});
        });
    }

    
    cargarHospedajes = () => {
        let n = this.state.notificacion_leerServsHosp;
        this.setState({ serviciosHospCargando:true});
        Requester.getServicios({clase:"hospedaje"},(rpta)=>{
            console.log("rpta! hospedajes: ",rpta)
            var servs = rpta.cont.map((e,i)=>{
                return new ServicioModel(e);
                
            });
            n.setHidden();
            this.setState({serviciosHospedajes:servs, serviciosHospCargando:false,notificacion_leerServsHosp:n});
        },(rptaError)=>{
            console.log("error!");
            n.setRecibidoError("Error al cargar hospedajes",rptaError.cont.message,rptaError.cont.statusCode);
            n.mostrarNotificacion=true;
            this.setState({serviciosHospCargando:false,notificacion_leerServsHosp:n});
        });
    }
 }

export default VerServicios;