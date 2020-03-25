import React from 'react'
import { Component } from 'react'
import { Dropdown, Input, TextArea, Form, Grid, Segment, Button, Icon, Label, Table, Message, Popup, Header, Modal, Container, Confirm, Dimmer, Loader } from 'semantic-ui-react'

import ElementoForm from '../../../components/ElementoForm/ElementoForm';
import Constantes, { RptaTrx, ListaMeses } from '../../../common/Constantes';
import { Configuracion } from '../../../common/Constantes';
import CamposCrearCliente from '../../VerClientes/CamposCrearCliente/CamposCrearCliente';

//date pickers
import { DateInput, TimeInput, DateTimeInput, DatesRangeInput } from 'semantic-ui-calendar-react';
import axios from 'axios';
import ModalTrxSimple from '../../ModalTrxSimple/ModalTrxSimple';
import Requester from '../../../common/Services/Requester';
import ModalCrearEditarProveedor from '../../MostradorProovedores/ModalCrearEditarProveedor';
import MensajeTransaccion from '../../../components/MensajeTransaccion/MensajeTransaccion';

import '../CrearFile/CrearFile.css'
import InputSearchableDataButton from '../../../components/InputSearchableData/InputSearchableData';
import ModalCrearBiblia from '../../../components/ModalCrearBiblia/ModalCrearBiblia';
import FileModel from './../../../common/Models/Apis/FileModel';
import { fileURLToPath } from 'url';
import NotificacionApi from './../../NotificacionApi/NotificacionApi';
import ServiceRow from '../../ServiceRow/ServiceRow';
import { mode_view as service_mode_view, mode_added as service_mode_added, mode_edit as service_mode_edit } from '../../ServiceRow/ServiceRow';
import ServicioModel from './../../../common/Models/Apis/ServicioModel';
import moment from 'moment';
import cogoToast from 'cogo-toast';

const CampoServicio = (props) => {
    return <Segment style={{ padding: "7px" }}><Header style={{ margin: "-2px 0px 4px 0px" }} as="h4">{props.titulo}</Header>{props.componente}</Segment>
}

const mode_create = "create"
const mode_edit = "edit"
const mode_view = "view"

class CrearFile extends Component {

    /*
        servicio = (tipoServicio, fecha, ciudad, horaInicio, nombre, pasajeros, nombrePasajero, tren, alm, observaciones, idProveedor) => {
            return {tipoServicio,  fecha, ciudad, horaInicio, nombre, pasajeros, nombrePasajero, tren, alm, observaciones, idProveedor };
        }
        transporte = (tipoServicio, fecha, ciudad, horaInicio, horaFin, vuelo, nombre, pasajeros, nombrePasajero, vr, tc, idProveedor, observaciones) => {
            return {tipoServicio,  fecha, ciudad, horaInicio, horaFin, vuelo, nombre, pasajeros, nombrePasajero, vr, tc, idProveedor, observaciones };
        }
        hospedaje = (tipoServicio, fecha, fechaOut, horaInicio, horaFin,  nombre, pasajeros, nombrePasajero, idProveedor, observaciones) => {
            return { tipoServicio, fecha, fechaOut,  horaInicio, horaFin,  nombre, pasajeros, nombrePasajero, idProveedor, observaciones };
        }
    */
    serv = (tipoServicio, nombre, fecha, fechaOut, ciudad, pasajeros, nombrePasajero, horaInicio, horaFin, tren, alm, vuelo, vr, tc, observaciones, proveedor) => {
        return { tipoServicio, nombre, fecha, fechaOut, ciudad, pasajeros, nombrePasajero, horaInicio, horaFin, tren, alm, vuelo, vr, tc, observaciones, proveedor };
    }
    /*
        servicioDefault = () => {
            return this.servicio(Constantes.AliasServicios.SERVICIO, '', '', '', '', 0, '', '', '', '')
        }*/
    /*
    transporteDefault = () => {
        return this.transporte(Constantes.AliasServicios.TRANSPORTE, '', '', '', '', '', '', 0, '', '', '', '', '')
    }
    
    hospedajeDefault = () => {
        return this.hospedaje(Constantes.AliasServicios.HOSPEDAJE, '', '', '', '', '', 0, '', '', '')
    }*/

    servDefault = () => {
        return this.serv("general", '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '');
    }


    state = {
        //datos de modal biblia
        modalCliente: {
            //abierto:false,
            transaccionEnviada: false,
            responseRecibida: false,
            rptaTransaccion: null
        },


        //datos de file
        idFile: undefined,
        codigo: '',
        anho: moment().format("YYYY"),
        mes: moment().format("M"),
        descripcion: '',
        idBiblia: undefined,
        nombreBiblia: '',
        idCliente: undefined,


        servicios: [
            //this.servicioDefault()
        ],
        transportes: [],
        hospedajes: [],

        //---------------------------------
        //servicios del file
        servs: [],
        //modificandoDatos:false,
        //fileAbierto:false,
        modoFile: mode_view,
        agregandoServicio: false,
        mostrarCargadoCreacion: false,

        //apertura de file
        aperturaFile_mostrarNotificacion: false,
        aperturaFile_enviando: false,
        aperturaFile_respuestaRecibida: false,
        aperturaFile_tituloRespuesta: "-",
        aperturaFile_contenidoRespuesta: "-",
        aperturaFile_notif_color: "",
        aperturaFile_notif_icono: "-",

        //actualizacion de file
        /*
        actualizacionFile_mostrarNotificacion: false,
        actualizacionFile_enviando: false,
        actualizacionFile_respuestaRecibida: false,
        actualizacionFile_tituloRespuesta: "-",
        actualizacionFile_contenidoRespuesta: "-",
        actualizacionFile_notif_color: "",
        actualizacionFile_notif_icono: "-",*/

        //cargando file inicial
        cargaFileInicial_mostrarNotificacion: false,
        cargaFileInicial_enviando: false,
        cargaFileInicial_respuestaRecibida: false,
        cargaFileInicial_tituloRespuesta: "-",
        cargaFileInicial_contenidoRespuesta: "-",
        cargaFileInicial_notif_color: "red",
        cargaFileInicial_notif_icono: "cancel",

        //borrado file
        borradoFile_mostrarNotificacion: false,
        borradoFile_enviando: false,
        borradoFile_respuestaRecibida: false,
        borradoFile_tituloRespuesta: "-",
        borradoFile_contenidoRespuesta: "-",
        borradoFile_notif_color: "red",
        borradoFile_notif_icono: "cancel",

        borradoFile_confirmAbierto: false,
        mostrarBotonAperturarFile:true,


        //opciones a elegir
        bibliasCargaron: false,
        //bibliasCargaronExito: true,

        clientesCargaron: false,
        //clientesCargaronExito: true,

        hotelesCargaron: false,
        //hotelesCargaronExito: true,

        opcionesBiblia: [/*{value:1, text:'mayo, 2019'}*/],
        opcionesCliente: [/*{value:1, text:''}*/],
        opcionesProveedores: [/*{value:1, text:'juancito'}*/],
        opcionesTransportes: [/*{value:1, text:'juancito'}*/],
        opcionesHoteles: [],

        opcionesCiudades: [],
        opcionesPaises: [],


        modalCrearEditarProveedor: {
            //creacion o edicion
            modo: "creacion",
            abierto: false,

            mensaje: {
                enviado: false,
                recibido: false,
                respuesta: null
            },

            campos: {
                id: '',
                nombre: '',
                correo: '',
                correoAdic: '',
                num: '',
                numAdic: '',
                ciudad: '',
                tipo: ''
            }
        },

        modalCrearProveedorTransporte: {
            modo: "creacion",
            abierto: false,

            mensaje: {
                enviado: false,
                recibido: false,
                respuesta: null
            },

            campos: {
                id: '',
                nombre: '',
                correo: '',
                correoAdic: '',
                num: '',
                numAdic: '',
                ciudad: '',
                tipo: ''
            }
        },

        transaccionEnviadaCrearFile: false,
        responseRecibidaCrearFile: false,
        rptaTransaccionCrearFile: null,

        mensajeCreacionFile: "",
        creacionFileExitosa: false
    }


    contenedorCamposModalCliente = {
        //ff:()=>{console.log(this.contCliente)},
        //funcCrearCliente:()=>{}
    }


    modoVer = () => {
        return this.state.modoFile === mode_view && this.props.modoPagina !== mode_create;
        //return this.props.modoPagina === "ver";
    }

    modoEditar = () => {
        return this.state.modoFile === "edit";
    }

    componentDidMount() {
        //this.setState({mode:this.props.modoPagina});
        console.log("PROPS", this.props);
        //Requester.getListadoFiles(this.filesRecibidos,this.filesError);
        /*
                this.cargarClientes();
                this.cargarFileBase();
                //this.cargarProveedoresNoTransp();
                //this.cargarTransportes();
                //this.cargarHoteles();
                this.cargarProveedores();
                this.cargarBiblias();
                this.cargarCiudades();
        */
        let modo = this.props.modoPagina;

        if (modo === mode_create) {
            this.cargarClientes();

        } else if (modo === mode_view || modo === mode_edit) {
            this.cargarClientes();
            this.cargarFileBase();
            this.cargarProveedores();
            this.cargarBiblias();
            this.cargarCiudades();
        }

        /*
                if (this.state.mode === mode_view || this.state.mode === mode_edit) {
                    this.cargarFileBase();
                    this.cargarProveedoresNoTransp();
                    this.cargarTransportes();
                    this.cargarHoteles();
                }
                if ( this.state.mode ===mode_create || this.state.mode === mode_edit) {
                    this.cargarClientes();
                    this.cargarBiblias();
                    this.cargarProveedoresNoTransp();
                    this.cargarTransportes();
                    this.cargarCiudades();
                    this.cargarHoteles();
                    //this.cargarPaises();
                }*/

/*
        var transps = this.state.servs.slice();
        transps.push(this.servDefault());
        this.setState({ servs: transps });*/
    }

    render = () => {

        let fieldStyle = { margin: "6px 0 4px 0" };
        let titulo = "Nuevo File";
        if (this.props.modoPagina === "ver")
            titulo = "Ver File";
        else if (this.props.modoPagina === "editar")
            titulo = "Modificar File";

        let estiloTextArea = {};
        if (this.modoVer()) {
            estiloTextArea = { borderStyle: "none", color: "black" };
        }

        let eleccionBiblia = {};

        let controlBiblia = <InputSearchableDataButton
            loading={!this.state.hotelesCargaron}
            disabled={this.modoVer()}
            placeholder={this.modoVer() ? "" : 'Elegir Biblia'}
            datalist={this.state.opcionesBiblia}
            value={this.state.idBiblia}
            onChange={(event, data) => {
                console.log("event", event);
                console.log("data", data);
                this.setState({ idBiblia: data.value })
            }}
        />

        if (this.modoVer()) {
            controlBiblia = <Input disabled transparent fluid value={this.state.nombreBiblia ? this.state.nombreBiblia : ""} ></Input>
        }

        let controlCliente = <Dropdown fluid
            placeholder='Christian'
            search
            loading={!this.state.clientesCargaron}
            selection
            value={this.state.idCliente}
            options={this.state.opcionesCliente}
            onChange={(event, data) => {
                this.setState({ idCliente: data.value });
            }}
        />

        if (this.modoVer()) {
            controlCliente = <Input disabled transparent fluid value={this.state.nombreCliente ? this.state.nombreCliente : ""} ></Input>
        }


        let controlDescripcion = <TextArea disabled={this.modoVer()} style={{ ...estiloTextArea, minHeight: 100 }} placeholder='Descripcion del file' rows={1} value={this.state.descripcion ? this.state.descripcion : ""} onChange={(event) => {
            this.setState({ descripcion: event.target.value });
        }} />

        let mes = this.state.mes;
        let found = ListaMeses.filter(x => x.value === this.state.mes)[0];
        if (found)
            mes = found.text
        let controlMes = <Input fluid value={mes} ></Input>
        controlMes = <Input disabled={this.modoVer()} transparent={this.modoVer()} fluid placeholder="2020" value={mes}></Input>

        if (!this.modoVer()) {
            controlMes = <Dropdown
                placeholder='Seleccionar mes'
                fluid
                search
                selection
                options={ListaMeses}
                value={this.state.mes}
                onChange={(event, data) => {
                    this.setState({ mes: data.value });
                }}
            />
        }

        let buttons = <></>
        if(this.props.modoPagina !== mode_create){
            if (this.state.modoFile === mode_view) {
                buttons = <>
                    <Button floated="right" icon color="red" onClick={() => {
                        this.AbrirCuadroConfirmacionBorradoFile();
                    }}>
                        <Icon name="trash alternate outline"></Icon>
                    </Button>
                    <Button floated="right" icon color="yellow" onClick={() => {
                        this.setState({ modoFile: mode_edit });
                    }}>
                        <Icon name="pencil"></Icon>
                    </Button>
                </>
            } else if (this.state.modoFile === mode_create) {
                buttons = <></>
            } if (this.state.modoFile === mode_edit) {
                buttons = <>
                    <Button floated="right" icon color="red" onClick={() => { this.setState({ modoFile: mode_view }) }}>
                        <Icon name="cancel"></Icon>
                    </Button>
                    <Button floated="right" icon color="green" onClick={() => {
                        this.EnviarActualizarFile();
                    }}>
                        <Icon name="save"></Icon>
                    </Button>
                </>
            }
        }

        let anchoPrimeraCol = 6;
        if(this.props.modoPagina===mode_create)
            anchoPrimeraCol=8;

        return <div>
            {/*<Button onClick={() => { console.log("state", this.state) }} wee></Button>*/}
            <Header size="large">{titulo}</Header>
            <Segment>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Header >Datos</Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment raised attached>
                                <Grid divided centered>
                                    <Grid.Row stretched>
                                        <Grid.Column width={anchoPrimeraCol}>
                                            <Grid>
                                                <Grid.Row stretched>
                                                    <Grid.Column width={8}>
                                                        <ElementoForm titulo="Codigo *">
                                                            <Input disabled={this.modoVer()} transparent={this.modoVer()} fluid placeholder="08-020" value={this.state.codigo ? this.state.codigo : ""} onChange={(event) => {
                                                                this.setState({ codigo: event.target.value });
                                                            }} ></Input>
                                                        </ElementoForm>
                                                    </Grid.Column>

                                                    <Grid.Column width={8}>
                                                        <ElementoForm titulo="Cliente *">
                                                            {controlCliente}
                                                        </ElementoForm>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row verticalAlign="bottom">
                                                    <Grid.Column width={8}>
                                                        <ElementoForm titulo="Año *">
                                                            <Input disabled={this.modoVer()} transparent={this.modoVer()} fluid placeholder="2020" value={this.state.anho ? this.state.anho : ""} onChange={(event) => {
                                                                this.setState({ anho: event.target.value });
                                                            }} ></Input>
                                                        </ElementoForm>
                                                    </Grid.Column>
                                                    <Grid.Column width={8}>
                                                        <ElementoForm titulo="Mes *">
                                                            {controlMes}
                                                        </ElementoForm>
                                                    </Grid.Column>

                                                </Grid.Row>
                                            </Grid>
                                        </Grid.Column>
                                        <Grid.Column width={8}>
                                            <Grid >
                                                <Grid.Row stretched>
                                                    <Grid.Column width={16}>
                                                        <ElementoForm titulo="Descripcion">
                                                            <Form>
                                                                {/*style={{ minHeight: 100 }}*/}
                                                                {controlDescripcion}
                                                            </Form>
                                                        </ElementoForm>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </Grid.Column>

                                        <Grid.Column width={2}>
                                            <Grid >
                                                <Grid.Row stretched verticalAlign="top">
                                                    <Grid.Column>
                                                        <div>
                                                            {buttons}
                                                        </div>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>

                            {this.props.modoPagina === mode_create && this.state.mostrarBotonAperturarFile ?
                                <Button attached="bottom" primary textAlign="left" onClick={this.EnviarAperturarFile}>Aperturar file</Button>
                                : <></>}
                            <NotificacionApi
                                disabled={!this.state.aperturaFile_mostrarNotificacion}
                                loading={this.state.aperturaFile_enviando}
                                color={this.state.aperturaFile_notif_color}
                                content={this.state.aperturaFile_contenidoRespuesta}
                                title={this.state.aperturaFile_tituloRespuesta}
                                icon={this.state.aperturaFile_notif_icono}>
                            </NotificacionApi>
                            {/*
                            <NotificacionApi
                                disabled={!this.state.actualizacionFile_mostrarNotificacion}
                                loading={this.state.actualizacionFile_enviando}
                                color={this.state.actualizacionFile_notif_color}
                                content={this.state.actualizacionFile_contenidoRespuesta}
                                title={this.state.actualizacionFile_tituloRespuesta}
                                icon={this.state.actualizacionFile_notif_icono}>
                            </NotificacionApi>
*/}
                            <NotificacionApi
                                disabled={!this.state.cargaFileInicial_mostrarNotificacion}
                                loading={false}
                                color={this.state.cargaFileInicial_notif_color}
                                content={this.state.cargaFileInicial_contenidoRespuesta}
                                title={this.state.cargaFileInicial_tituloRespuesta}
                                icon={this.state.cargaFileInicial_notif_icono}>
                            </NotificacionApi>

                            <NotificacionApi
                                disabled={!this.state.borradoFile_mostrarNotificacion}
                                loading={false}
                                color={this.state.borradoFile_notif_color}
                                content={this.state.borradoFile_contenidoRespuesta}
                                title={this.state.borradoFile_tituloRespuesta}
                                icon={this.state.borradoFile_notif_icono}>
                            </NotificacionApi>

                            {this.state.mostrarCargadoCreacion ? <Segment basic style={{padding:"150px"}}>
                                <Dimmer active inverted><Loader size='huge'>Redireccionando...</Loader></Dimmer>
                            </Segment> : <></>}

                            <Modal dimmer='blurring' size={"mini"} open={this.state.modalAvisoAgregandoServicioAbierto} onClose={this.cerrarAvisoModalCreacionServicio}>
                                <Modal.Header>Ya se está creando un servicio nuevo</Modal.Header>
                                <Modal.Content>
                                    <p>No se puede creando un servicio nuevo mientras ya estás creando otro. Es necesario culminar con el primero</p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color="orange" onClick={this.cerrarAvisoModalCreacionServicio}>
                                        Aceptar
                                    </Button>
                                </Modal.Actions>
                            </Modal>

                            <Confirm content={"Seguro que deseas eliminar el file '" + this.state.codigo + "' ?"}
                                open={this.state.borradoFile_confirmAbierto}
                                onCancel={() => { this.setState({ borradoFile_confirmAbierto: false }) }}
                                onConfirm={() => { this.EnviarBorradoFile(); }} />

                                
                            <Confirm content={"Seguro que deseas eliminar el servicio '" + this.state.nombreServicioABorrar + "' ?"}
                                open={this.state.borradoServicio_confirmAbierto}
                                onCancel={() => { this.setState({ borradoServicio_confirmAbierto: false }) }}
                                onConfirm={() => { this.EnviarBorradoServicio(this.state.idServicioABorrar); }} />
                        </Grid.Column>
                    </Grid.Row>

                    {/*<Button positive onClick={() => { console.log(this.state) }}>weeee</Button>*/}
                    {this.props.modoPagina!==mode_create ?
                    <>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Header >Servicios</Header>
                                {this.state.servs.length === 0 ? <Segment secondary textAlign="center">No hay servs en este file</Segment> : ''}
                                {this.state.servs.map((elem, index) => {
                                    //return this.filaServicio(index);
                                    let key = 0;
                                    let mode = service_mode_view;
                                    if (this.state.servs[index]) {
                                        key = this.state.servs[index].idServicio;
                                        mode = this.state.servs[index].mode;
                                    }

                                    //return this.Serv({ index: index, key : key });
                                    //                                console.log("servicio =>>>>>>>",elem);
                                    //console.log(moment("14:03",'HH:mm').format('HH:mm:ss.SSS'));
                                    return <ServiceRow orden={index} idFile={this.state.idFile} mode={mode} service={elem}
                                        opcionesHoteles={this.state.opcionesHoteles}
                                        opcionesProveedores={this.state.opcionesProveedores}
                                        opcionesTransportes={this.state.opcionesTransportes}
                                        proovedoresCargaron={this.state.hotelesCargaron}

                                        onNewServiceSave={() => {

                                            let serv = this.state.servs[index];
                                            serv.file = this.state.idFile;
                                            let obj = ServicioModel.toApiObj(serv);
                                            delete obj._id;
                                            obj.proveedor = null;

                                            console.log("grabando serv nuevo > ", obj);
                                            Requester.postServicio(obj, (rpta) => {
                                                this.setState({
                                                    agregandoServicio: false
                                                });
                                                cogoToast.success("Servicio nuevo agregado",{position:"bottom-center"});
                                                this.cargarFileBase();
                                            }, (rpta) => {
                                                this.setState({
                                                    agregandoServicio: false
                                                });
                                                cogoToast.error("Error al agregar servicio nuevo : "+rpta.cont.message,{position:"bottom-center"});
                                                this.cargarFileBase();
                                            });
                                        }}

                                        onNewServiceCancel={() => {
                                            this.setState({
                                                agregandoServicio: false
                                            });
                                            this.cargarFileBase();
                                        }}

                                        onEditSave={() => {
                                            let serv = this.state.servs[index];
                                            serv.idFile = this.state.idFile;
                                            //console.log("actualizando serv : ",serv);
                                            let obj = ServicioModel.toApiObj(serv);
                                            //console.log("actualizando serv transformado : ",obj);
                                            Requester.actualizarServicio(elem.idServicio, obj, (rpta) => {
                                                console.log("servicio actualizado con exito : ", rpta.cont);
                                                cogoToast.success("Servicio actualizado",{position:"bottom-center"});
                                                this.cargarFileBase();
                                            }, (rpta) => {
                                                console.error("error al actualizar servicio : ", rpta.cont.message);
                                                cogoToast.error("Error al actualizar servicio : "+rpta.cont.message,{position:"bottom-center"});
                                                //TODO mostrar mensaje error en UI
                                            });
                                        }}

                                        onEditCancel={() => {
                                            this.cargarFileBase();
                                        }}

                                        onDelete={() => { 
                                            this.setState({
                                                nombreServicioABorrar: elem.nombre,
                                                borradoServicio_confirmAbierto: true,
                                                idServicioABorrar: elem.idServicio
                                            });
                                        }}

                                        onUpdateValues={(keyPair) => {
                                            /*
                                            let servs = this.state.servs.slice();
                                            let s = this.state["serv_"+index]
                                            let result = { ...s , ...keyPair };
                                            //servs[index] = result;

                                            //console.log("result > ",result);
                                            //servs[index].mode = service_mode_view;
                                            this.setState({
                                                ["serv_"+index] : result,
                                            });

    */
                                            console.log("actualizando: ", keyPair);

                                            //console.log("actualizando: ",keyPair);
                                            let servs = this.state.servs.slice();
                                            let result = { ...servs[index], ...keyPair };
                                            servs[index] = result;
                                            //console.log("result > ",result);
                                            //servs[index].mode = service_mode_view;
                                            this.setState({
                                                servs: servs,
                                            });

                                        }}

                                    />
                                })}
                                {this.modoVer() ? <div></div> :
                                    <Button content='Agregar servicio' icon='plus' floated="left" labelPosition='right' onClick={() => {
                                        var servs = this.state.servicios.slice();
                                        let newServ = this.servicioDefault();
                                        servs.push(this.servicioDefault());
                                        this.setState({ servs: servs });
                                    }} />
                                }
                            </Grid.Column>
                        </Grid.Row>    
                        <Grid.Row>
                        <Grid.Column>
                            <Button icon labelPosition='left' onClick={() => { this.onClickAgregarServicio("general") }}>
                                <Icon name="settings"></Icon>
                                Agregar servicio general
                            </Button>

                            <Button icon labelPosition="left" onClick={() => { this.onClickAgregarServicio("transporte") }}>
                                <Icon name="car"></Icon>
                                Agregar servicio de transporte
                            </Button>

                            <Button icon labelPosition="left" onClick={() => { this.onClickAgregarServicio("hospedaje") }}>
                                <Icon name="building"></Icon>
                                Agregar servicio de hospedaje
                            </Button>

                        </Grid.Column>
                    </Grid.Row>
                    </>:<></>}
                </Grid>
            </Segment>
            {/*
            {!this.state.bibliasCargaronExito ? <Message error>Error de conexion: Las biblias no se pueden cargar.</Message> : null}
            {!this.state.clientesCargaronExito ? <Message error>Error de conexion: Los clientes no se pueden cargar.</Message> : null}
            {!this.state.hotelesCargaronExito ? <Message error>Error de conexion: Los hoteles no se pueden cargar.</Message> : null}
            */}


            <Container fluid textAlign="right">
            </Container>



            <ModalCrearEditarProveedor
                parent={this}
                pack="modalCrearEditarProveedor"
                sustantivoTitulo="Proveedor Nuevo"
                elegirTipo
                placeholderNombre="Melia"
                placeholderCorreo="ventas@hotelmelia.com"
                placeholderCorreoAdic="contacto.melia@gmail.com"
                enEnviar={this.enEnviarProovedor}
                enCerrar={this.enCerrarModalProveedor} />


            <ModalCrearEditarProveedor
                parent={this}
                pack="modalCrearProveedorTransporte"
                sustantivoTitulo="Transportista Nuevo"
                placeholderNombre="Transportista"
                placeholderCorreo="carlos@gmail.com"
                placeholderCorreoAdic="contacto@transportescarlos.com"
                enEnviar={this.enEnviarProveedorTransporte}
                enCerrar={this.enCerrarModalProveedorTransportes} />


            {/*this.ModalCrearBiblia()*/}
            {/*this.ModalCrearCliente()*/}
        </div>

    }

    // ------------------------------------------------------------------------- Cargas iniciales

    cargarFileBase = () => {
        //console.log("id:",this.props)
        Requester.getFile(this.props.idFile, {},
            rpta => {

                console.log("file recibido", rpta.cont)
                let fm = new FileModel(rpta.cont);
                console.log("file transformado", fm)

                fm.servicios.map((e, i) => {
                    e.mode = service_mode_view
                });

                this.setState({
                    idFile: fm.idFile,
                    codigo: fm.codigo,
                    mes: fm.mes,
                    anho: fm.anho,
                    descripcion: fm.descripcion,
                    idBiblia: fm.biblia.id,
                    nombreBiblia: fm.biblia.mes + ' - ' + fm.biblia.anho,
                    idCliente: fm.cliente.idCliente,
                    nombreCliente: fm.cliente.nombre + ' ( ' + fm.cliente.clase + ' )',
                    servs: fm.servicios,
                    //transportes: fm.servicios.filter(x=>x.clase==="transporte"),
                    //hospedajes: fm.servicios.filter(x=>x.clase==="hospedaje")

                    /*
                    idFile: fm.idFile,
                    codigo: fm.codigo,
                    descripcion: fm.descripcion,
                    idBiblia: fm.biblia.id,
                    idCliente: rpta.cont.idCliente,
                    nombreBiblia: rpta.cont.nombreBiblia,
                    nombreCliente: rpta.cont.nombreCliente,
                    servicios: servis,
                    transportes: transportes,
                    hospedajes : hospedajes*/
                    agregandoServicio:false
                });
            },
            rpta => {
                this.setState({
                    cargaFileInicial_respuestaRecibida: true,
                    cargaFileInicial_tituloRespuesta: rpta.cont.error,
                    cargaFileInicial_mostrarNotificacion: true,
                    cargaFileInicial_contenidoRespuesta: rpta.cont.message + " (" + rpta.cont.statusCode + ")",
                    agregandoServicio:false
                });

            });
    }

    cargarClientes = () => {
        Requester.getClientes({}, rpta => {
            //console.log(rpta);
            var listaOpsCliente = rpta.cont.map(element => { return { value: element._id, text: element.nombre } });
            this.setState({
                clientesCargaronExito: true,
                clientesCargaron: true,
                opcionesCliente: listaOpsCliente
            })
        }, (rptaError) => {
            this.setState({
                clientesCargaronExito: false,
                clientesCargaron: true
            });
        });
    }

    cargarBiblias = () => {
        Requester.getBiblias({}, (rpta) => {
            var listaBiblias = rpta.cont.map(element => { return { value: element._id, text: element.mes + ' ' + element.anho } });
            //console.log("lista biblias : ",listaBiblias);
            this.setState({
                opcionesBiblia: listaBiblias,
                bibliasCargaronExito: false,
                bibliasCargaron: true
            });
        },
            (rptaError) => {
                //console.log(rptaError);
                this.setState({
                    bibliasCargaronExito: false,
                    bibliasCargaron: true,
                });
            })
    }

    cargarCiudades = () => {
        /*
        Requester.getCiudades((rpta) => {
            this.setState({ opcionesCiudades: rpta.cont });
        },
        (rptaError) => {
            console.error("Ciudades no cargadas");
        })*/
    }

    cargarPaises = () => {
        /*
        Requester.getPaises((rpta) => {
            this.setState({ opcionesPaises: rpta.cont });
        },
        (rptaError) => {
            console.error("Paises no cargadas");
        })*/
    }

    cargarProveedores = () => {
        Requester.getProveedores(
            {},
            (rpta) => {
                //console.log("todos los proveedores > " ,rpta);
                var proovs = rpta.cont.map(element => { return { value: element.id, text: element.nombre } });
                let hoteles = rpta.cont.filter(x => x.clase === "hotel").map(element => { return { value: element.id, text: element.nombre } });
                let transportes = rpta.cont.filter(x => x.clase === "transporte").map(element => { return { value: element.id, text: element.nombre } });

                this.setState({
                    opcionesProveedores: proovs,
                    opcionesHoteles: hoteles,
                    opcionesTransportes: transportes,
                    hotelesCargaronExito: true,
                    hotelesCargaron: true
                });
            }, (rptaError) => {
                //console.log(rptaError);
                this.setState({
                    hotelesCargaronExito: false,
                    hotelesCargaron: true
                });
            });
    }

    cargarProveedoresNoTransp = () => {
        Requester.getProveedores(
            { raw: "clase=hotel&clase=restaurante&clase=guia&clase=operador&clase=empresa&clase=persona" },
            (rpta) => {
                console.log("proveedores > ", rpta);
                var listaProovs = rpta.cont.map(element => { return { value: element.id, text: element.nombre } });
                this.setState({
                    opcionesProveedores: listaProovs,
                    hotelesCargaronExito: true,
                    hotelesCargaron: true
                });
            }, (rptaError) => {
                //console.log(rptaError);
                this.setState({
                    hotelesCargaronExito: false,
                    hotelesCargaron: true
                });
            });
    }

    cargarHoteles = () => {
        Requester.getProveedores(
            { "clase": "hotel" },
            (rpta) => {
                var listaProovs = rpta.cont.map(element => { return { value: element.id, text: element.nombre } });
                //console.log("recibidooooooooooo: ",listaProovs);
                this.setState({
                    opcionesHoteles: listaProovs
                });
            }, (rptaError) => {
            });
    }

    cargarTransportes = () => {

        Requester.getProveedores(
            { "clase": "transporte" }, (rpta) => {
                var listaProovs = rpta.cont.map(element => { return { value: element.id, text: element.nombre } });
                this.setState({
                    opcionesTransportes: listaProovs
                });
            }, (rptaError) => {
            });
    }

    CuerpoServicio = (props) => {

        let estiloInputs = {}
        if (this.modoVer())
            estiloInputs = { color: "black" };

        let controlProveedor =
            <InputSearchableDataButton
                loading={!this.state.hotelesCargaron}
                disabled={this.modoVer()}
                placeholder={this.modoVer() ? "" : 'Sheraton'}
                datalist={this.state.opcionesProveedores}
                value={this.state.servicios[props.index].idProveedor}
                sideButton={
                    <Button style={{ padding: "3px 11px", backgroundColor: "#00000000" }} icon onClick={() => {
                        let modal = { ...this.state.modalCrearEditarProveedor, abierto: true };
                        this.setState({ modalCrearEditarProveedor: modal });
                    }}>
                        <Icon name='plus' />
                    </Button>
                }
                onChange={(event, data) => {
                    var servs = this.state.servicios.slice();
                    servs[props.index].idProveedor = data.value;
                    this.setState({ servicios: servs });
                }}
            />

        if (this.modoVer()) {
            //console.log("cuerpo: ", this.state.servicios[props.index]);
            let nombreProovedor = '';
            if (this.state.opcionesProveedores) {
                //console.log("lista: ",this.state.opcionesProveedores);
                let filtrado = this.state.opcionesProveedores.filter(x => x.value === this.state.servicios[props.index].idProveedor);
                //console.log("filtrado: ",filtrado);
                if (filtrado && filtrado.length > 0) {
                    nombreProovedor = filtrado[0].text;
                }

            }
            controlProveedor = <Input disabled transparent fluid value={nombreProovedor} />
        }


        return <Segment.Group key={props.key}>
            <Segment.Group horizontal>
                <Segment style={{ backgroundColor: "#fff5e6" }}>
                    <Grid columns="equal">
                        <Grid.Row style={{ padding: "4px 0px" }}>
                            <Grid.Column verticalAlign="middle">
                                <Header as="h3">Servicio {props.index + 1}</Header>
                            </Grid.Column>
                            <Grid.Column style={{ padding: "0px 8px" }}>

                                {this.modoVer() ? <div></div> :
                                    <Button style={{ padding: "8px 14px", margin: "4px 0px" }} floated="right" color="red" onClick={() => {
                                        var lista = this.state.servicios.slice();
                                        lista.splice(props.index, 1);
                                        this.setState({ servicios: lista });
                                        //console.log(this.state.servicios)
                                    }}>Borrar</Button>
                                }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Segment.Group>
            <Segment.Group horizontal style={{ backgroundColor: "#fffbf6" }}>
                <CampoServicio titulo="Nombre *" componente={
                    <Input disabled={this.modoVer()} transparent fluid placeholder={this.modoVer() ? "" : "In + city"}
                        value={this.state.servicios[props.index].nombre ? this.state.servicios[props.index].nombre : ""}
                        onChange={(event) => {
                            var servs = this.state.servicios.slice();
                            servs[props.index].nombre = event.target.value;
                            this.setState({ servicios: servs });
                        }} />
                } />
                <CampoServicio titulo="Ciudad de destino" componente={
                    <div>
                        <Input disabled={this.modoVer()} transparent list={'ciudades' + props.index} placeholder={this.modoVer() ? "" : 'Lima'} fluid

                            value={this.state.servicios[props.index].ciudad ? this.state.servicios[props.index].ciudad : ""}
                            onChange={(event) => {
                                var servs = this.state.servicios.slice();
                                servs[props.index].ciudad = event.target.value;
                                this.setState({ servicios: servs });
                            }} />
                        <datalist id={'ciudades' + props.index}>
                            {this.state.opcionesCiudades.map(e => <option value={e} />)}
                        </datalist>
                    </div>
                } />
                <CampoServicio titulo="Fecha ejecución *" componente={
                    <DateInput
                        disabled={this.modoVer()}
                        transparent
                        closable
                        fluid
                        dateFormat="YYYY-MM-DD"
                        name="fecha"
                        placeholder={this.modoVer() ? "-" : 'aaaa-mm-dd'}
                        value={this.state.servicios[props.index].fechaEjecucion ? this.state.servicios[props.index].fechaEjecucion : ""}
                        iconPosition="left"
                        onChange={(event, { name, value }) => {
                            if (name === "fecha") {
                                var servs = this.state.servicios.slice();
                                servs[props.index].fechaEjecucion = value;
                                this.setState({ servicios: servs });
                                console.log(this.state);
                            }
                        }}
                    />} />



                <CampoServicio titulo="Fecha final " componente={
                    <DateInput
                        disabled={this.modoVer()}
                        transparent
                        closable
                        fluid
                        dateFormat="YYYY-MM-DD"
                        name="fecha"
                        placeholder={this.modoVer() ? "-" : 'aaaa-mm-dd'}
                        value={this.state.servicios[props.index].fechaOut ? this.state.servicios[props.index].fechaOut : ""}
                        iconPosition="left"
                        onChange={(event, { name, value }) => {
                            if (name === "fecha") {
                                var servs = this.state.servicios.slice();
                                servs[props.index].fechaOut = value;
                                this.setState({ servicios: servs });
                                console.log(this.state);
                            }
                        }}
                    />} />

                <CampoServicio titulo="Nombre pasajero" componente={
                    <Input transparent disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'Lewis Hamilton'} fluid
                        value={this.state.servicios[props.index].nombrePasajero ? this.state.servicios[props.index].nombrePasajero : ""}
                        onChange={(event) => {
                            var servs = this.state.servicios.slice();
                            servs[props.index].nombrePasajero = event.target.value;
                            this.setState({ servicios: servs });
                        }}></Input>} />
                <CampoServicio titulo="Cant. pasajeros *" componente={
                    <Input type="number" transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : '4'}
                        value={this.state.servicios[props.index].cantPasajeros ? this.state.servicios[props.index].cantPasajeros : 0}
                        onChange={(event) => {
                            var servs = this.state.servicios.slice();
                            servs[props.index].cantPasajeros = event.target.value;
                            this.setState({ servicios: servs });
                        }}></Input>} />
            </Segment.Group>
            <Segment.Group horizontal style={{ backgroundColor: "#fffbf6" }}>

                <CampoServicio titulo="Proveedor" componente={controlProveedor} />

                <CampoServicio titulo="Hora" componente={
                    <TimeInput
                        transparent
                        fluid
                        name="horaInicio"
                        disabled={this.modoVer()} placeholder={this.modoVer() ? "" : '0:00'}
                        value={this.state.servicios[props.index].horaInicio ? this.state.servicios[props.index].horaInicio : ""}
                        iconPosition="left"
                        onChange={(event, { name, value }) => {
                            if (name === "horaInicio") {
                                var servss = this.state.servicios.slice();
                                servss[props.index].horaInicio = value;
                                this.setState({ servicios: servss });
                                console.log(this.state);
                            }
                        }}
                    />
                } />

                <CampoServicio titulo="Tren" componente={
                    <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'Tren'}
                        value={this.state.servicios[props.index].tren ? this.state.servicios[props.index].tren : ""}
                        onChange={(event) => {
                            var servs = this.state.servicios.slice();
                            servs[props.index].tren = event.target.value;
                            this.setState({ servicios: servs });
                        }}></Input>} />

                <CampoServicio titulo="ALM" componente={

                    <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'ALM'}
                        value={this.state.servicios[props.index].alm ? this.state.servicios[props.index].alm : ""}
                        onChange={(event) => {
                            var servs = this.state.servicios.slice();
                            servs[props.index].alm = event.target.value;
                            this.setState({ servicios: servs });
                        }}></Input>} />

                <CampoServicio titulo="Descripcion" componente={
                    <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'Descripcion'}
                        value={this.state.servicios[props.index].descripcion ? this.state.servicios[props.index].descripcion : ""}
                        onChange={(event) => {
                            var servs = this.state.servicios.slice();
                            servs[props.index].descripcion = event.target.value;
                            this.setState({ servicios: servs });
                        }}></Input>
                } />
            </Segment.Group>
        </Segment.Group>
    }














    Serv = (props) => {


    }














































    CuerpoHospedaje = (props) => {

        let estiloInputs = {}
        if (this.modoVer())
            estiloInputs = { color: "black" };

        let controlProveedor =
            <InputSearchableDataButton
                loading={!this.state.hotelesCargaron}
                disabled={this.modoVer()}
                placeholder={this.modoVer() ? "" : 'Sheraton'}
                datalist={this.state.opcionesHoteles}
                value={this.state.hospedajes[props.index].idProveedor}
                sideButton={
                    <Button style={{ padding: "3px 11px", backgroundColor: "#00000000" }} icon onClick={() => {
                        let modal = { ...this.state.modalCrearEditarProveedor, abierto: true };
                        this.setState({ modalCrearEditarProveedor: modal });
                    }}>
                        <Icon name='plus' />
                    </Button>
                }
                onChange={(event, data) => {
                    var servs = this.state.hospedajes.slice();
                    servs[props.index].idProveedor = data.value;
                    this.setState({ hospedajes: servs });
                }}
            />

        if (this.modoVer()) {
            let nombreProovedor = '-';
            if (this.state.opcionesHoteles) {
                let filtrado = this.state.opcionesHoteles.filter(x => x.value === this.state.hospedajes[props.index].idProveedor);
                //console.log("filtrado: ",filtrado);
                if (filtrado && filtrado.length > 0) {
                    nombreProovedor = filtrado[0].text;
                }

            }
            controlProveedor = <Input disabled transparent fluid value={nombreProovedor} />

        }


        return <Segment.Group key={props.key}>
            <Segment.Group horizontal>
                <Segment style={{ backgroundColor: "#b5dec7" }}>
                    <Grid columns="equal">
                        <Grid.Row style={{ padding: "4px 0px" }}>
                            <Grid.Column verticalAlign="middle">
                                <Header as="h3">Hospedaje {props.index + 1}</Header>
                            </Grid.Column>
                            <Grid.Column style={{ padding: "0px 8px" }}>

                                {this.modoVer() ? <div></div> :
                                    <Button style={{ padding: "8px 14px", margin: "4px 0px" }} floated="right" color="red" onClick={() => {
                                        var lista = this.state.hospedajes.slice();
                                        lista.splice(props.index, 1);
                                        this.setState({ hospedajes: lista });
                                        //console.log(this.state.servicios)
                                    }}>Borrar</Button>
                                }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Segment.Group>
            <Segment.Group horizontal style={{ backgroundColor: "#def0e6" }}>
                <CampoServicio titulo="Nombre *" componente={
                    <Input disabled={this.modoVer()} transparent fluid placeholder={this.modoVer() ? "" : "In + city"}
                        value={this.state.hospedajes[props.index].nombre ? this.state.hospedajes[props.index].nombre : ""}
                        onChange={(event) => {
                            var servs = this.state.hospedajes.slice();
                            servs[props.index].nombre = event.target.value;
                            this.setState({ hospedajes: servs });
                        }} />
                } />

                <CampoServicio titulo="Fecha In *" componente={
                    <DateInput
                        disabled={this.modoVer()}
                        transparent
                        closable
                        fluid
                        dateFormat="YYYY-MM-DD"
                        name="fecha"
                        placeholder={this.modoVer() ? "-" : 'aaaa-mm-dd'}
                        value={this.state.hospedajes[props.index].fechaEjecucion ? this.state.hospedajes[props.index].fechaEjecucion : ""}
                        iconPosition="left"
                        onChange={(event, { name, value }) => {
                            if (name === "fecha") {
                                var servs = this.state.hospedajes.slice();
                                servs[props.index].fechaEjecucion = value;
                                this.setState({ hospedajes: servs });
                                console.log(this.state);
                            }
                        }}
                    />} />



                <CampoServicio titulo="Fecha Out *" componente={
                    <DateInput
                        disabled={this.modoVer()}
                        transparent
                        closable
                        fluid
                        dateFormat="YYYY-MM-DD"
                        name="fecha"
                        placeholder={this.modoVer() ? "-" : 'aaaa-mm-dd'}
                        value={this.state.hospedajes[props.index].fechaOut ? this.state.hospedajes[props.index].fechaOut : ""}
                        iconPosition="left"
                        onChange={(event, { name, value }) => {
                            if (name === "fecha") {
                                var servs = this.state.hospedajes.slice();
                                servs[props.index].fechaOut = value;
                                this.setState({ hospedajes: servs });
                                console.log(this.state);
                            }
                        }}
                    />} />

                <CampoServicio titulo="Nombre pasajero" componente={
                    <Input transparent disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'Lewis Hamilton'} fluid
                        value={this.state.hospedajes[props.index].nombrePasajero ? this.state.hospedajes[props.index].nombrePasajero : ""}
                        onChange={(event) => {
                            var servs = this.state.hospedajes.slice();
                            servs[props.index].nombrePasajero = event.target.value;
                            this.setState({ hospedajes: servs });
                        }}></Input>} />
                <CampoServicio titulo="Cant. pasajeros *" componente={
                    <Input type="number" transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : '4'}
                        value={this.state.hospedajes[props.index].cantPasajeros ? this.state.hospedajes[props.index].cantPasajeros : 0}
                        onChange={(event) => {
                            var servs = this.state.hospedajes.slice();
                            servs[props.index].cantPasajeros = event.target.value;
                            this.setState({ hospedajes: servs });
                        }}></Input>} />
            </Segment.Group>
            <Segment.Group horizontal style={{ backgroundColor: "#def0e6" }}>

                <CampoServicio titulo="Hotel" componente={controlProveedor} />

                <CampoServicio titulo="Hora entrada" componente={
                    <TimeInput
                        transparent
                        fluid
                        name="horaInicio"
                        disabled={this.modoVer()} placeholder={this.modoVer() ? "" : '0:00'}
                        value={this.state.hospedajes[props.index].horaInicio ? this.state.hospedajes[props.index].horaInicio : ""}
                        iconPosition="left"
                        onChange={(event, { name, value }) => {
                            if (name === "horaInicio") {
                                var servss = this.state.hospedajes.slice();
                                servss[props.index].horaInicio = value;
                                this.setState({ hospedajes: servss });
                                console.log(this.state);
                            }
                        }}
                    />
                } />


                <CampoServicio titulo="Hora salida" componente={
                    <TimeInput
                        transparent
                        fluid
                        name="horaFinal"
                        disabled={this.modoVer()} placeholder={this.modoVer() ? "" : '0:00'}
                        value={this.state.hospedajes[props.index].horaFinal ? this.state.hospedajes[props.index].horaFinal : ""}
                        iconPosition="left"
                        onChange={(event, { name, value }) => {
                            if (name === "horaFinal") {
                                var servss = this.state.hospedajes.slice();
                                servss[props.index].horaFinal = value;
                                this.setState({ hospedajes: servss });
                                console.log(this.state);
                            }
                        }}
                    />
                } />

                <CampoServicio titulo="Descripcion" componente={
                    <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'OBS'}
                        value={this.state.hospedajes[props.index].descripcion ? this.state.hospedajes[props.index].descripcion : ""}
                        onChange={(event) => {
                            var servs = this.state.hospedajes.slice();
                            servs[props.index].descripcion = event.target.value;
                            this.setState({ hospedajes: servs });
                        }}></Input>
                } />
            </Segment.Group>
        </Segment.Group>
    }



    CuerpoTransporte = (props) => {

        let controlProveedorTransporte =
            <InputSearchableDataButton
                //loading={!this.state.hotelesCargaron}
                disabled={this.modoVer()}
                placeholder={this.modoVer() ? "" : 'Transp. Manuel'}
                datalist={this.state.opcionesTransportes}
                value={this.state.transportes[props.index].idProveedor}
                sideButton={
                    <Button style={{ padding: "3px 11px", backgroundColor: "#00000000" }} icon onClick={() => {
                        let modal = { ...this.state.modalCrearProveedorTransporte, abierto: true };
                        this.setState({ modalCrearProveedorTransporte: modal });
                    }}>
                        <Icon name='plus' />
                    </Button>
                }
                onChange={(event, data) => {
                    var transps = this.state.transportes.slice();
                    transps[props.index].idProveedor = data.value;
                    this.setState({ transportes: transps });
                }}
            />

        if (this.modoVer()) {
            let nombreProovedor = '-';
            if (this.state.opcionesTransportes) {
                let filtrado = this.state.opcionesTransportes.filter(x => x.value === this.state.transportes[props.index].idProveedor);
                //console.log("filtrado: ",filtrado);
                if (filtrado && filtrado.length > 0) {
                    nombreProovedor = filtrado[0].text;
                }

            }
            controlProveedorTransporte = <Input disabled transparent fluid value={nombreProovedor} />

        }


        return <Segment.Group key={props.key}>
            <Segment.Group horizontal>
                <Segment style={{ backgroundColor: "#ccebff" }}>
                    <Grid columns="equal">
                        <Grid.Row style={{ padding: "4px 0px" }}>
                            <Grid.Column verticalAlign="middle">
                                <Header as="h3">Transporte {props.index + 1}</Header>
                            </Grid.Column>
                            <Grid.Column style={{ padding: "0px 8px" }}>
                                {this.modoVer() ? <div></div> :
                                    <Button style={{ padding: "8px 14px", margin: "4px 0px" }} floated="right" color="red" onClick={() => {
                                        var lista = this.state.transportes.slice();
                                        lista.splice(props.index, 1);
                                        this.setState({ transportes: lista });
                                    }}>Borrar</Button>
                                }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Segment.Group>
            <Segment.Group horizontal style={{ backgroundColor: "#e6f5ff" }}>
                <CampoServicio titulo="Nombre *" componente={
                    <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'APTO / Four points'}
                        value={this.state.transportes[props.index].nombre ? this.state.transportes[props.index].nombre : ""}
                        onChange={(event) => {
                            var trans = this.state.transportes.slice();
                            trans[props.index].nombre = event.target.value;
                            this.setState({ transportes: trans });
                        }}></Input>
                } />
                <CampoServicio titulo="Ciudad de destino" componente={
                    <div>
                        <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'Ciudad'}
                            value={this.state.transportes[props.index].ciudad ? this.state.transportes[props.index].ciudad : ""}
                            onChange={(event) => {
                                var trans = this.state.transportes.slice();
                                trans[props.index].ciudad = event.target.value;
                                this.setState({ transportes: trans });
                            }}></Input>
                    </div>
                } />
                <CampoServicio titulo="Fecha ejecucion *" componente={
                    <DateInput
                        transparent
                        fluid
                        closable
                        name="fecha"
                        dateFormat="YYYY-MM-DD"
                        disabled={this.modoVer()}
                        placeholder={this.modoVer() ? "" : 'aaaa-mm-dd'}
                        value={this.state.transportes[props.index].fechaEjecucion ? this.state.transportes[props.index].fechaEjecucion : ""}
                        iconPosition="left"
                        onChange={(event, { name, value }) => {
                            if (name === "fecha") {
                                var transs = this.state.transportes.slice();
                                transs[props.index].fechaEjecucion = value;
                                this.setState({ transportes: transs });
                                console.log(this.state);
                            }
                        }}
                    />} />

                <CampoServicio titulo="Nombre pasajero" componente={

                    <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'Steven Gerard'}
                        value={this.state.transportes[props.index].nombrePasajero ? this.state.transportes[props.index].nombrePasajero : ""}
                        onChange={(event) => {
                            var trans = this.state.transportes.slice();
                            trans[props.index].nombrePasajero = event.target.value;
                            this.setState({ transportes: trans });
                        }}></Input>
                } />
                <CampoServicio titulo="Cant. pasajeros *" componente={
                    <Input type="number" transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : '4'}
                        value={this.state.transportes[props.index].cantPasajeros ? this.state.transportes[props.index].cantPasajeros : 0}
                        onChange={(event) => {
                            var trans = this.state.transportes.slice();
                            trans[props.index].cantPasajeros = event.target.value;
                            this.setState({ transportes: trans });
                        }}></Input>} />
            </Segment.Group>
            <Segment.Group horizontal style={{ backgroundColor: "#e6f5ff" }}>
                <CampoServicio titulo="Proveedor de Transporte" componente={controlProveedorTransporte

                    /*
                    <div>
                        <Input icon="lightning" iconPosition="left" list={'transportes' + props.index} transparent fluid
                            disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'Transportista'}
                            value={this.state.transportes[props.index].proveedor}
                            onChange={(event) => {
                                var trans = this.state.transportes.slice();
                                trans[props.index].proveedor = event.target.value;
                                this.setState({ transportes: trans });
                            }}></Input>
                        <datalist id={'transportes' + props.index}>
                            {this.state.opcionesTransportes.map(e => <option value={e.text} />)}
                        </datalist>
                    </div>



                        */} />
                <CampoServicio titulo="Hora recojo" componente={
                    <TimeInput
                        transparent
                        fluid
                        name="hora"
                        disabled={this.modoVer()} placeholder={this.modoVer() ? "" : '0:00'}
                        value={this.state.transportes[props.index].horaInicio ? this.state.transportes[props.index].horaInicio : ""}
                        iconPosition="left"
                        onChange={(event, { name, value }) => {
                            if (name === "hora") {
                                var transs = this.state.transportes.slice();
                                transs[props.index].horaInicio = value;
                                this.setState({ transportes: transs });
                                console.log(this.state);
                            }
                        }}
                    />
                } />
                <CampoServicio titulo="Hora salida" componente={
                    <TimeInput
                        transparent
                        fluid
                        name="hora"
                        disabled={this.modoVer()} placeholder={this.modoVer() ? "" : '0:00'}
                        value={this.state.transportes[props.index].horaFinal ? this.state.transportes[props.index].horaFinal : ""}
                        iconPosition="left"
                        onChange={(event, { name, value }) => {
                            if (name === "hora") {
                                var transs = this.state.transportes.slice();
                                transs[props.index].horaFinal = value;
                                this.setState({ transportes: transs });
                                console.log(this.state);
                            }
                        }}
                    />
                } />
                <CampoServicio titulo="Vuelo" componente={
                    <Input transparent fluid
                        value={this.state.transportes[props.index].vuelo ? this.state.transportes[props.index].vuelo : ""}
                        disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'Vuelo'}
                        onChange={(event) => {
                            var trans = this.state.transportes.slice();
                            trans[props.index].vuelo = event.target.value;
                            this.setState({ transportes: trans });
                        }}></Input>
                } />
                <CampoServicio titulo="V/R" componente={

                    <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'V/R'}
                        value={this.state.transportes[props.index].vr ? this.state.transportes[props.index].vr : ""}
                        onChange={(event) => {
                            var trans = this.state.transportes.slice();
                            trans[props.index].vr = event.target.value;
                            this.setState({ transportes: trans });
                        }}></Input>
                } />
                <CampoServicio titulo="TC" componente={
                    <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'TC'}
                        value={this.state.transportes[props.index].tc ? this.state.transportes[props.index].tc : ""}
                        onChange={(event) => {
                            var trans = this.state.transportes.slice();
                            trans[props.index].tc = event.target.value;
                            this.setState({ transportes: trans });
                        }}></Input>
                } />
                <CampoServicio titulo="Descripcion" componente={
                    <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'OBS'}
                        value={this.state.transportes[props.index].descripcion ? this.state.transportes[props.index].descripcion : ""}
                        onChange={(event) => {
                            var trans = this.state.transportes.slice();
                            trans[props.index].descripcion = event.target.value;
                            this.setState({ transportes: trans });
                        }}></Input>
                } />
            </Segment.Group>
        </Segment.Group>
    }

    AbrirCuadroConfirmacionBorradoFile = () => {
        this.setState({ borradoFile_confirmAbierto: true });
    }

    EnviarBorradoFile = () => {
        //console.log("props >",this.props);


        this.setState({
            borradoFile_confirmAbierto: false,
            borradoFile_enviando: true,
            borradoFile_notif_color: "",
            //borradoFile_mostrarNotificacion:true
        });

        Requester.borrarFile(this.state.idFile,
            (rpta) => {
                this.props.history.push("/files");
            }, (rpta) => {
                //error
                //console.log("Rpta de error", rpta);
                this.setState({
                    borradoFile_mostrarNotificacion: true,
                    borradoFile_enviando: false,
                    borradoFile_tituloRespuesta: "Error al borrar file",
                    borradoFile_contenidoRespuesta: rpta.cont.message + " (" + rpta.cont.statusCode + ")",
                    borradoFile_notif_color: "red",
                    borradoFile_notif_icono: "warning"
                });
            }, (rpta) => {
            });
    }

    EnviarBorradoServicio = (idServicio) => {
        //console.log("props >",this.props);


        Requester.borrarServicio(idServicio,
            (rpta) => {
                cogoToast.success("Servicio eliminado", { position : "bottom-center" });
                this.setState({borradoServicio_confirmAbierto:false});
                this.cargarFileBase();
            }, (rpta) => {
                //error
                //console.log("Rpta de error", rpta);
                /*
                this.setState({
                    borradoFile_mostrarNotificacion: true,
                    borradoFile_enviando: false,
                    borradoFile_tituloRespuesta: "Error al borrar file",
                    borradoFile_contenidoRespuesta: rpta.cont.message + " (" + rpta.cont.statusCode + ")",
                    borradoFile_notif_color: "red",
                    borradoFile_notif_icono: "warning"
                });*/
                this.setState({borradoServicio_confirmAbierto:false});
                this.cargarFileBase();
                cogoToast.error("Error al eliminar servicio", { position : "bottom-center" });
            }, (rpta) => {
            });
    }


    EnviarActualizarFile = () => {

        let obj = {
            idBiblia: this.state.idBiblia,
            idCliente: this.state.idCliente,
            codigo: this.state.codigo,
            descripcion: this.state.descripcion,
            mes: this.state.mes,
            anho: this.state.anho
        };
        console.log("actualizando con obj_> ", obj);

        let model = FileModel.toApiObj(obj);

        model.biblia = model.biblia._id;
        model.cliente = model.cliente._id;
        model.servicios = this.state.servs.map((serv, i) => { return serv.idServicio })


        console.log("actualizando con transformado > ", model);

        this.setState({
            /*
            actualizacionFile_enviando: true,
            actualizacionFile_notif_color: "",
            actualizacionFile_mostrarNotificacion: true,*/
            modoFile: mode_view
        });

        Requester.actualizarFile(
            this.state.idFile,
            model,

            (rpta) => {
                //console.log("exitooo")
                this.setState({/*
                    actualizacionFile_enviando: false,
                    actualizacionFile_tituloRespuesta: "File actualizado",
                    actualizacionFile_contenidoRespuesta: "File actualizado: '" + rpta.cont.codigo + "'",
                    actualizacionFile_notif_color: "green",
                    actualizacionFile_notif_icono: "check",
                    //fileAbierto:true*/
                    modoFile: mode_view
                });
                
                cogoToast.success("File actualizado",{position:"bottom-center"});
            },
            (rpta) => {
                console.log("Rpta de error", rpta);
                /*
                this.setState({
                    actualizacionFile_enviando: false,
                    actualizacionFile_tituloRespuesta: "Error al actualizar file",
                    actualizacionFile_contenidoRespuesta: rpta.cont.message + " (" + rpta.cont.statusCode + ")",
                    actualizacionFile_notif_color: "red",
                    actualizacionFile_notif_icono: "warning"
                });*/
                cogoToast.error(<><b>Error</b> al actualizar file : {rpta.cont.message + " (" + rpta.cont.statusCode + ")"}</>,{position:"bottom-center"});
            },
            () => {
                this.cargarFileBase();
            }
        )
    }

    EnviarAperturarFile = () => {

        let func = Requester.postFile;

        let obj = {
            idCliente: this.state.idCliente,
            codigo: this.state.codigo,
            descripcion: this.state.descripcion,
            mes: this.state.mes,
            anho: this.state.anho
        };

        let model = FileModel.toApiObj(obj);
        /*
                if (this.modoEditar())
                    func = Requester.postEditarFile;
        */
        this.setState({
            aperturaFile_enviando: true,
            aperturaFile_notif_color: "",
            aperturaFile_mostrarNotificacion: true
        });

        func(
            model,

            (rpta) => {
                //console.log("exitooo")
                this.setState({
                    aperturaFile_enviando: false,
                    aperturaFile_tituloRespuesta: "File nuevo registrado. Redireccionando...",
                    aperturaFile_contenidoRespuesta: "File creado: '" + rpta.cont.codigo + "'",
                    aperturaFile_notif_color: "green",
                    aperturaFile_notif_icono: "check",
                    //fileAbierto:true
                    mode: mode_view,
                    mostrarCargadoCreacion:true,
                    mostrarBotonAperturarFile:false
                });
                let id = rpta.cont._id;
                setTimeout(()=>{ 
                    this.props.history.push("/file/ver/"+id);
                }, 2000);
            },
            (rpta) => {
                console.log("Rpta de error", rpta);
                
                this.setState({
                    aperturaFile_enviando: false,
                    aperturaFile_tituloRespuesta: "Error al registrar file nuevo",
                    aperturaFile_contenidoRespuesta: rpta.cont.message + " (" + rpta.cont.statusCode + ")",
                    aperturaFile_notif_color: "red",
                    aperturaFile_notif_icono: "warning"
                });
            }
        )
    }

    EnviarPostFile = () => {

        let listaTotal = [];
        listaTotal.push(...this.state.servicios);
        listaTotal.push(...this.state.transportes);
        listaTotal.push(...this.state.hospedajes);

        let obj = {
            //id: this.state.idFile,
            idBiblia: this.state.idBiblia,
            idCliente: this.state.idCliente,
            codigo: this.state.codigo,
            descripcion: this.state.descripcion,
            servicios: listaTotal
            //servicios: this.state.servicios,
            //transportes: this.state.transportes
        };

        let model = FileModel.toApiObj(obj);

        this.setState({ transaccionEnviadaCrearFile: true, responseRecibidaCrearFile: false });
        console.log("file a enviar: ", model)
        //console.log("TRANSPORTESSS: ", obj.transportes)
        let func = Requester.postFile;

        if (this.modoEditar())
            func = Requester.postEditarFile;

        func(
            model,

            (rpta) => {
                //console.log("exitooo")
                this.setState({
                    responseRecibidaCrearFile: true,
                    rptaTransaccionCrearFile: rpta,
                    transaccionEnviadaCrearFile: false
                });
            },
            (rpta) => {
                console.log("RPTA de error!", rpta);
                this.setState({
                    responseRecibidaCrearFile: true,
                    rptaTransaccionCrearFile: rpta,
                    transaccionEnviadaCrearFile: false
                });
            }
        )
    }


    EnviarPostCliente = (camposModalCliente) => {

        var newState = { ...this.state.modalCliente };
        newState.transaccionEnviada = true;
        this.setState({ modalCliente: newState });

        Requester.postCliente(this.state.camposModalCliente, (rpta) => {
            var newState = { ...this.state.modalCliente };
            newState.responseRecibida = true;
            newState.rptaTransaccion = rpta;
            this.cargarClientes();
            this.setState({ modalCliente: newState });
        }, (rptaError) => {
            var newState = { ...this.state.modalCliente };
            newState.responseRecibida = true;
            newState.rptaTransaccion = rptaError;
            this.setState({ modalCliente: newState });
        });

    }


    // ------------------------------------------------------------------------- Modal proveedores todos


    abrirModalProveedor = () => {
        var obj = { ...this.state.modalCrearEditarProveedor };
        obj.modo = "creacion";
        obj.abierto = true;
        this.setState({ modalCrearEditarProveedor: obj });
    }


    enEnviarProovedor = () => {
        var obj = { ...this.state.modalCrearEditarProveedor };
        obj.mensaje.enviado = true;
        obj.mensaje.recibido = false;
        this.setState({ modalCrearEditarProveedor: obj });

        Requester.postProveedor(
            this.state.modalCrearEditarProveedor.campos.tipo,
            this.state.modalCrearEditarProveedor.campos.nombre,
            this.state.modalCrearEditarProveedor.campos.correo,
            this.state.modalCrearEditarProveedor.campos.num,
            this.state.modalCrearEditarProveedor.campos.numAdic,
            this.state.modalCrearEditarProveedor.campos.correoAdic,
            this.state.modalCrearEditarProveedor.campos.ciudad,
            (rpta) => {
                var obj = { ...this.state.modalCrearEditarProveedor };
                obj.mensaje.recibido = true;
                obj.mensaje.respuesta = rpta;
                this.setState({ modalCrearEditarProveedor: obj });
                this.cargarProveedoresNoTransp();
                //this.cargarProovs();
            },
            (rptaError) => {
                console.log("err!");
                var obj = { ...this.state.modalCrearEditarProveedor };
                obj.mensaje.recibido = true;
                obj.mensaje.respuesta = rptaError;
                this.setState({ modalCrearEditarProveedor: obj });
            })
    }


    enCerrarModalProveedor = () => {
        var obj = { ...this.state.modalCrearEditarProveedor };
        obj.abierto = false;
        obj.mensaje.recibido = false;
        obj.mensaje.enviado = false;
        obj.mensaje.respuesta = null;

        obj.campos.id = '';
        obj.campos.nombre = '';
        obj.campos.correo = '';
        obj.campos.correoAdic = '';
        obj.campos.num = '';
        obj.campos.numAdic = '';
        obj.campos.ciudad = '';
        obj.campos.tipo = '';

        this.setState({ modalCrearEditarProveedor: obj });

        /*
                if (this.state.modalCrearEditarProveedor.modo === "edicion") {
                    var obj = { ...this.state.modalCrearEditarProveedor };
                    obj.campos.tipo = '';
                    obj.campos.id = '';
                    obj.campos.nombre = '';
                    obj.campos.correo = '';
                    obj.campos.correoAdic = '';
                    obj.campos.num = '';
                    obj.campos.numAdic = '';
                    obj.campos.ciudad = '';
                    this.setState({ modalCrearEditar: obj });
                }*/
        //this.resetearCamposModalProveedor();
    }
    /*
    resetearCamposModalProveedor =() => {
        var obj = { ...this.state.modalCrearEditarProveedor };
        obj.campos.id = '';
        obj.campos.nombre = '';
        obj.campos.correo = '';
        obj.campos.correoAdic = '';
        obj.campos.num = '';
        obj.campos.numAdic = '';
        obj.campos.ciudad = '';
        obj.campos.tipo ='';
        this.setState({ modalCrearEditarProveedor: obj });
    }*/

    // ------------------------------------------------------------------------- Modal proveedores transportes

    abrirModalProveedorTransporte = () => {
        var obj = { ...this.state.modalCrearProveedorTransporte };
        obj.modo = "creacion";
        obj.abierto = true;
        this.setState({ modalCrearProveedorTransporte: obj });
    }

    enEnviarProveedorTransporte = () => {

        var obj = { ...this.state.modalCrearProveedorTransporte };
        obj.mensaje.enviado = true;
        obj.mensaje.recibido = false;
        this.setState({ modalCrearProveedorTransporte: obj });

        Requester.postProvTransporte(
            this.state.modalCrearProveedorTransporte.campos.nombre,
            this.state.modalCrearProveedorTransporte.campos.correo,
            this.state.modalCrearProveedorTransporte.campos.num,
            this.state.modalCrearProveedorTransporte.campos.numAdic,
            this.state.modalCrearProveedorTransporte.campos.correoAdic,
            this.state.modalCrearProveedorTransporte.campos.ciudad,
            (rpta) => {
                console.log(this.state.modalCrearProveedorTransporte.campos);
                console.log("success!");
                console.log(rpta);
                var obj = { ...this.state.modalCrearProveedorTransporte };
                obj.mensaje.recibido = true;
                obj.mensaje.respuesta = rpta;
                this.setState({ modalCrearProveedorTransporte: obj });
                //this.resetearCamposModalProveedorTransportes();
                this.cargarTransportes();
            },
            (rptaError) => {
                console.log("err!");
                var obj = { ...this.state.modalCrearProveedorTransporte };
                obj.mensaje.recibido = true;
                obj.mensaje.respuesta = rptaError;
                this.setState({ modalCrearProveedorTransporte: obj });
            })
    }


    resetearCamposModalProveedorTransportes = () => {
        var obj = { ...this.state.modalCrearProveedorTransporte };
        obj.campos.id = '';
        obj.campos.nombre = '';
        obj.campos.correo = '';
        obj.campos.correoAdic = '';
        obj.campos.num = '';
        obj.campos.numAdic = '';
        obj.campos.ciudad = '';
        this.setState({ modalCrearProveedorTransporte: obj });
    }

    enCerrarModalProveedorTransportes = () => {
        var obj = { ...this.state.modalCrearProveedorTransporte };
        obj.mensaje.recibido = false;
        obj.abierto = false;
        obj.mensaje.enviado = false;
        obj.mensaje.respuesta = null;

        obj.campos.id = '';
        obj.campos.nombre = '';
        obj.campos.correo = '';
        obj.campos.correoAdic = '';
        obj.campos.num = '';
        obj.campos.numAdic = '';
        obj.campos.ciudad = '';

        this.setState({ modalCrearProveedorTransporte: obj });
        //if (this.state.modalCrearProveedorTransporte.modo === "edicion") {
        //this.resetearCamposModalProveedorTransportes();
        /*
        var obj = { ...this.state.modalCrearProveedorTransporte };
        obj.campos.id = '';
        obj.campos.nombre = '';
        obj.campos.correo = '';
        obj.campos.correoAdic = '';
        obj.campos.num = '';
        obj.campos.numAdic = '';
        obj.campos.ciudad = '';
        this.setState({ modalCrearProveedorTransporte: obj });*/
        //}
    }

    abrirAvisoModalCreacionServicio = () => {
        this.setState({ modalAvisoAgregandoServicioAbierto: true });
    }

    cerrarAvisoModalCreacionServicio = () => {
        this.setState({ modalAvisoAgregandoServicioAbierto: false });
    }

    onClickAgregarServicio = (clase, event) => {
        //console.log("moment > " ,moment().format('YYYY-MM-DD'));
        if (!this.state.agregandoServicio) {
            var servs = this.state.servs.slice();
            let newServ = {
                ...new ServicioModel({}),
                mode: service_mode_added,
                clase: clase,
                nombre: "Nuevo",
                cantPasajeros: 1,
                horaInicio: "00:00",
                horaFinal: "00:00",
                fechaEjecucion: moment().format('YYYY-MM-DD'),
                fechaOut: moment().add(1, 'days').format('YYYY-MM-DD')
            }

            servs.push(newServ);
            this.setState({ servs: servs, agregandoServicio: true });
        } else {
            this.abrirAvisoModalCreacionServicio();
        }
    }
}

export default CrearFile;