import React from 'react'
import { Component } from 'react'
import { Dropdown, Input, TextArea, Form, Grid, Segment, Button, Icon, Label, Table, Message, Popup, Header, Modal, Container, Confirm, Dimmer, Loader } from 'semantic-ui-react'

import ElementoForm from '../../../components/ElementoForm/ElementoForm';
import Constantes, { RptaTrx, ListaMeses } from '../../../common/Constantes';


//date pickers
import { DateInput, TimeInput, DateTimeInput, DatesRangeInput } from 'semantic-ui-calendar-react';
import Requester from '../../../common/Services/Requester';
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

    serv = (tipoServicio, nombre, fecha, fechaOut, ciudad, pasajeros, nombrePasajero, horaInicio, horaFin, tren, alm, vuelo, vr, tc, observaciones, proveedor) => {
        return { tipoServicio, nombre, fecha, fechaOut, ciudad, pasajeros, nombrePasajero, horaInicio, horaFin, tren, alm, vuelo, vr, tc, observaciones, proveedor };
    }

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
                                {this.state.servs.length === 0 ? <Segment secondary textAlign="center">No hay servicios en este file</Segment> : ''}
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
                                                //console.log("servicio actualizado con exito : ", rpta.cont);
                                                cogoToast.success("Servicio actualizado",{position:"bottom-center"});
                                                this.cargarFileBase();
                                            }, (rpta) => {
                                                //console.error("error al actualizar servicio : ", rpta.cont.message);
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
            

            <Container fluid textAlign="right">
            </Container>


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
        
    }

    cargarPaises = () => {
        
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
                this.setState({
                    modoFile: mode_view
                });
                
                cogoToast.success("File actualizado",{position:"bottom-center"});
            },
            (rpta) => {
                console.log("Rpta de error", rpta);
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


    }
    
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
                nombre: "",
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