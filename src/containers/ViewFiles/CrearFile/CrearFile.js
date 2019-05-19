import React from 'react'
import { Component } from 'react'
import { Dropdown, Input, TextArea, Form, Grid, Segment, Button, Icon, Label, Table, Message, Popup, Header, Modal, Container } from 'semantic-ui-react'

import ElementoForm from '../../../components/ElementoForm/ElementoForm';
import Constantes, { RptaTrx } from '../../../common/Constantes';
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

const CampoServicio = (props) => {
    return <Segment style={{ padding: "7px" }}><Header style={{ margin: "-2px 0px 4px 0px" }} as="h4">{props.titulo}</Header>{props.componente}</Segment>
}


class CrearFile extends Component {

    constructor(props) {
        super(props);
        //this.modalClientesRef = React.createRef();
    }

    servicio = (fecha, ciudad, nombre, pasajeros, nombrePasajero, tren, alm, observaciones, idProveedor) => {
        return { fecha, ciudad, nombre, pasajeros, nombrePasajero, tren, alm, observaciones, idProveedor };
    }
    transporte = (fecha, ciudad, horaRecojo, horaSalida, vuelo, nombre, pasajeros, nombrePasajero, vr, tc, idProveedor, observaciones) => {
        return { fecha, ciudad, horaRecojo, horaSalida, vuelo, nombre, pasajeros, nombrePasajero, vr, tc, idProveedor, observaciones };
    }

    servicioDefault = () => {
        return this.servicio('', '', '', 0, '', '', '', '')
    }
    transporteDefault = () => {
        return this.transporte('', '', '', '', '', '', 0, '', '', '', '', '')
    }

    state = {
        //datos de modal biblia
        modalCliente: {
            //abierto:false,
            transaccionEnviada: false,
            responseRecibida: false,
            rptaTransaccion: null
        },

        modalBiblia: {
            abierto: false,
            transaccionEnviada: false,
            responseRecibida: false,
            rptaTransaccion: null,

            campos: {
                mes: null,
                anho: null
            }
        },

        //datos de file
        idFile: undefined,
        codigo: '',
        descripcion: '',
        idBiblia: undefined,
        idCliente: undefined,

        servicios: [
            //this.servicioDefault()
        ],
        transportes: [],

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
        return this.props.modo === "ver";
    }

    modoEditar = () => {
        return this.props.modo === "editar";
    }

    componentDidMount() {
        console.log("PROPS", this.props);
        //Requester.getListadoFiles(this.filesRecibidos,this.filesError);


        if (this.props.modo === "ver" || this.props.modo === "editar") {
            this.cargarFileBase();
        }
        if (this.props.modo === "crear" || this.props.modo === "editar") {
            this.cargarClientes();
            this.cargarBiblias();
            this.cargarProveedoresNoTransp();
            this.cargarTransportes();
            this.cargarCiudades();
            //this.cargarPaises();
        }
    }

    render = () => {

        let fieldStyle = { margin: "6px 0 4px 0" };
        let titulo = "Nuevo File";
        if (this.props.modo === "ver")
            titulo = "Ver File";
        else if (this.props.modo === "editar")
            titulo = "Modificar File";

        let estiloTextArea = {};
        if (this.modoVer()) {
            estiloTextArea = { borderStyle: "none", color: "gray" };
        }

        let eleccionBiblia = {};

        let controlBiblia = <InputSearchableDataButton
            loading={!this.state.hotelesCargaron}
            disabled={this.modoVer()}
            placeholder={this.modoVer() ? "" : 'Elegir Biblia'}
            datalist={this.state.opcionesBiblia}
            value={this.state.idBiblia}
            sideButton={
                <Button icon primary onClick={() => {
                    var obj = { ...this.state.modalBiblia };
                    obj.abierto = true;
                    this.setState({ modalBiblia: obj });
                }}>
                    <Icon name='plus' />
                </Button>
            }
            onChange={(event, data) => {
                console.log("event", event);
                console.log("data", data);
                this.setState({ idBiblia: data.value })
            }}
        />

        if (this.modoVer()) {
            controlBiblia = <Input disabled transparent fluid value={this.state.nombreBiblia} ></Input>
        }

        let controlCliente = <Dropdown fluid
            placeholder='Christian'
            search
            loading={!this.state.bibliasCargaron}
            selection
            value={this.state.idCliente}
            options={this.state.opcionesCliente}
            onChange={(event, data) => {
                this.setState({ idCliente: data.value });
            }}
        />

        if (this.modoVer()) {
            controlCliente = <Input disabled transparent fluid value={this.state.nombreCliente} ></Input>
        }


        let controlDescripcion = <TextArea disabled={this.modoVer()} style={estiloTextArea} placeholder='Descripcion del file' rows={1} value={this.state.descripcion} onChange={(event) => {
            this.setState({ descripcion: event.target.value });
        }} />

        if (this.modoVer()) {
            controlDescripcion = <Input disabled transparent fluid value={this.state.descripcion} />
        }



        return <div>
            {/*<Button onClick={() => { console.log("state", this.state) }} wee></Button>*/}
            <Header size="large">{titulo}</Header>
            <Segment>
                <Grid columns={2} >
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <ElementoForm titulo="Codigo">
                                <Input disabled={this.modoVer()} transparent={this.modoVer()} fluid placeholder="08-020" value={this.state.codigo} onChange={(event) => {
                                    this.setState({ codigo: event.target.value });
                                }} ></Input>
                            </ElementoForm>

                        </Grid.Column>
                        <Grid.Column width={8}>
                            <ElementoForm titulo="Descripcion">
                                <Form>
                                    {/*style={{ minHeight: 100 }}*/}
                                    {controlDescripcion}

                                </Form>
                            </ElementoForm>
                        </Grid.Column>

                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <ElementoForm titulo="Biblia">
                                <Grid>
                                    <Grid.Row columns='equal'>

                                        <Grid.Column width={16}>
                                            {controlBiblia}
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>

                            </ElementoForm>
                        </Grid.Column>

                        <Grid.Column width={8}>
                            <ElementoForm titulo="Cliente">
                                {controlCliente}
                            </ElementoForm>
                        </Grid.Column>
                    </Grid.Row>
                    {/*<Button positive onClick={() => { console.log(this.state) }}>weeee</Button>*/}
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Header size="tiny">Servicios</Header>
                            {this.state.servicios.map((elem, index) => {
                                //return this.filaServicio(index);
                                return this.CuerpoServicio({ index: index });
                            })}
                            {this.modoVer() ? <div></div> :
                                <Button content='Agregar servicio' icon='plus' floated="left" labelPosition='right' onClick={() => {
                                    var servs = this.state.servicios.slice();
                                    servs.push(this.servicioDefault());
                                    this.setState({ servicios: servs });
                                }} />
                            }
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Header size="tiny">Transportes</Header>

                            {this.state.transportes.map((elem, index) => {
                                return this.CuerpoTransporte({ index: index });
                            })}
                            {this.modoVer() ? <div></div> :
                                <Button content='Agregar transporte' icon='plus' labelPosition='right' onClick={() => {
                                    var transps = this.state.transportes.slice();
                                    transps.push(this.transporteDefault());
                                    this.setState({ transportes: transps });
                                }} />
                            }
                            <MensajeTransaccion
                                transaccionEnviada={this.state.transaccionEnviadaCrearFile}
                                responseRecibida={this.state.responseRecibidaCrearFile}
                                rptaTransaccion={this.state.rptaTransaccionCrearFile}
                            //textoExito = "Puede usar la nueva biblia"
                            />

                        </Grid.Column>
                    </Grid.Row>

                </Grid>
                {this.modoVer() ? <div></div> :
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Button positive onClick={() => { this.EnviarPostFile() }}>Guardar file</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                }

            </Segment>
            {/*
            {!this.state.bibliasCargaronExito ? <Message error>Error de conexion: Las biblias no se pueden cargar.</Message> : null}
            {!this.state.clientesCargaronExito ? <Message error>Error de conexion: Los clientes no se pueden cargar.</Message> : null}
            {!this.state.hotelesCargaronExito ? <Message error>Error de conexion: Los hoteles no se pueden cargar.</Message> : null}
            */}


            <Container fluid textAlign="right">
            </Container>


            <ModalCrearBiblia parentComponent={this} />

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


            <ModalCrearEditarProveedor parent={this} pack="modalCrearProveedorTransporte" sustantivoTitulo="Transportista Nuevo"
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
        Requester.getFile(this.props.idFile,
            rpta => {
                //console.log("recibido",rpta)
                this.setState({
                    idFile: rpta.cont.id,
                    codigo: rpta.cont.codigo,
                    descripcion: rpta.cont.descripcion,
                    idBiblia: rpta.cont.idBiblia,
                    idCliente: rpta.cont.idCliente,
                    nombreBiblia: rpta.cont.nombreBiblia,
                    nombreCliente: rpta.cont.nombreCliente,
                    servicios: rpta.cont.servicios,
                    transportes: rpta.cont.transportes
                });
            },
            rpta => {

            });
    }

    cargarClientes = () => {
        Requester.getClientesListaDropdown(rpta => {
            console.log(rpta);
            var listaOpsCliente = rpta.cont.map(element => { return { value: element.value, text: element.text } });
            this.setState({
                clientesCargaronExito: false,
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
        Requester.getBibliasDropdownCompleto((rpta) => {
            var listaBiblias = rpta.cont.map(element => { return { value: element.value, text: element.text } });
            this.setState({ opcionesBiblia: listaBiblias });
            this.setState({
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
        Requester.getCiudades((rpta) => {
            this.setState({ opcionesCiudades: rpta.cont });
        },
            (rptaError) => {
                console.error("Ciudades no cargadas");
            })
    }

    cargarPaises = () => {
        Requester.getPaises((rpta) => {
            this.setState({ opcionesPaises: rpta.cont });
        },
            (rptaError) => {
                console.error("Paises no cargadas");
            })
    }

    cargarProveedoresNoTransp = () => {
        Requester.getProveedoresMenosTransportes((rpta) => {
            var listaProovs = rpta.cont.map(element => { return { value: element.idProveedor, text: element.nombre } });
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


    cargarTransportes = () => {
        Requester.getProveedoresTransportes((rpta) => {
            var listaProovs = rpta.cont.map(element => { return { value: element.idProveedor, text: element.nombre } });
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
            console.log("cuerpo: ", this.state.servicios[props.index]);
            controlProveedor = <Input disabled transparent fluid value={this.state.servicios[props.index].proovedor} />
        }


        return <Segment.Group>
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
                <CampoServicio titulo="Nombre" componente={
                    <Input disabled={this.modoVer()} transparent fluid placeholder={this.modoVer() ? "" : "In + city"}
                        value={this.state.servicios[props.index].nombre}
                        onChange={(event) => {
                            var servs = this.state.servicios.slice();
                            servs[props.index].nombre = event.target.value;
                            this.setState({ servicios: servs });
                        }} />
                } />
                <CampoServicio titulo="Ciudad de destino" componente={
                    <div>
                        <Input disabled={this.modoVer()} transparent list={'ciudades' + props.index} placeholder={this.modoVer() ? "" : 'Lima'} fluid
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
                <CampoServicio titulo="Fecha" componente={
                    <DateInput
                        disabled={this.modoVer()}
                        transparent
                        fluid
                        dateFormat="YYYY-MM-DD"
                        name="fecha"
                        placeholder={this.modoVer() ? "-" : 'Año-mes-dia'}
                        value={this.state.servicios[props.index].fecha}
                        iconPosition="left"
                        onChange={(event, { name, value }) => {
                            if (name === "fecha") {
                                var servs = this.state.servicios.slice();
                                servs[props.index].fecha = value;
                                this.setState({ servicios: servs });
                                console.log(this.state);
                            }
                        }}
                    />} />
                <CampoServicio titulo="Nombre pasajero" componente={
                    <Input transparent disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'Lewis Hamilton'} fluid value={this.state.servicios[props.index].nombrePasajero}
                        onChange={(event) => {
                            var servs = this.state.servicios.slice();
                            servs[props.index].nombrePasajero = event.target.value;
                            this.setState({ servicios: servs });
                        }}></Input>} />
                <CampoServicio titulo="Cant. pasajeros" componente={
                    <Input type="number" transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : '4'} value={this.state.servicios[props.index].pasajeros}
                        onChange={(event) => {
                            var servs = this.state.servicios.slice();
                            servs[props.index].pasajeros = event.target.value;
                            this.setState({ servicios: servs });
                        }}></Input>} />
            </Segment.Group>
            <Segment.Group horizontal style={{ backgroundColor: "#fffbf6" }}>

                <CampoServicio titulo="Proveedor" componente={controlProveedor} />

                <CampoServicio titulo="Tren" componente={
                    <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'Tren'} value={this.state.servicios[props.index].tren}
                        onChange={(event) => {
                            var servs = this.state.servicios.slice();
                            servs[props.index].tren = event.target.value;
                            this.setState({ servicios: servs });
                        }}></Input>} />
                <CampoServicio titulo="ALM" componente={

                    <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'ALM'} value={this.state.servicios[props.index].alm}
                        onChange={(event) => {
                            var servs = this.state.servicios.slice();
                            servs[props.index].alm = event.target.value;
                            this.setState({ servicios: servs });
                        }}></Input>} />
                <CampoServicio titulo="Obs" componente={
                    <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'OBS'} value={this.state.servicios[props.index].observaciones}
                        onChange={(event) => {
                            var servs = this.state.servicios.slice();
                            servs[props.index].observaciones = event.target.value;
                            this.setState({ servicios: servs });
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
            controlProveedorTransporte = <Input disabled transparent fluid value={this.state.transportes[props.index].proovedor} />
        }


        return <Segment.Group>
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
                <CampoServicio titulo="Nombre" componente={
                    <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'APTO / Four points'}
                        value={this.state.transportes[props.index].nombre}
                        onChange={(event) => {
                            var trans = this.state.transportes.slice();
                            trans[props.index].nombre = event.target.value;
                            this.setState({ transportes: trans });
                        }}></Input>
                } />
                <CampoServicio titulo="Ciudad de destino" componente={
                    <div>
                        <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'Ciudad'}
                            value={this.state.transportes[props.index].ciudad}
                            onChange={(event) => {
                                var trans = this.state.transportes.slice();
                                trans[props.index].ciudad = event.target.value;
                                this.setState({ transportes: trans });
                            }}></Input>
                    </div>
                } />
                <CampoServicio titulo="Fecha ejecucion" componente={
                    <DateInput
                        transparent
                        fluid
                        name="fecha"
                        dateFormat="YYYY-MM-DD"
                        disabled={this.modoVer()}
                        placeholder={this.modoVer() ? "" : 'Año-mes-dia'}
                        value={this.state.transportes[props.index].fecha}
                        iconPosition="left"
                        onChange={(event, { name, value }) => {
                            if (name === "fecha") {
                                var transs = this.state.transportes.slice();
                                transs[props.index].fecha = value;
                                this.setState({ transportes: transs });
                                console.log(this.state);
                            }
                        }}
                    />} />
                <CampoServicio titulo="Nombre pasajero" componente={

                    <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'Steven Gerard'}
                        value={this.state.transportes[props.index].nombrePasajero}
                        onChange={(event) => {
                            var trans = this.state.transportes.slice();
                            trans[props.index].nombrePasajero = event.target.value;
                            this.setState({ transportes: trans });
                        }}></Input>
                } />
                <CampoServicio titulo="Cant. pasajeros" componente={
                    <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : '4'}
                        value={this.state.transportes[props.index].pasajeros}
                        onChange={(event) => {
                            var trans = this.state.transportes.slice();
                            trans[props.index].pasajeros = event.target.value;
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
                        value={this.state.transportes[props.index].horaRecojo}
                        iconPosition="left"
                        onChange={(event, { name, value }) => {
                            if (name === "hora") {
                                var transs = this.state.transportes.slice();
                                transs[props.index].horaRecojo = value;
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
                        value={this.state.transportes[props.index].horaSalida}
                        iconPosition="left"
                        onChange={(event, { name, value }) => {
                            if (name === "hora") {
                                var transs = this.state.transportes.slice();
                                transs[props.index].horaSalida = value;
                                this.setState({ transportes: transs });
                                console.log(this.state);
                            }
                        }}
                    />
                } />
                <CampoServicio titulo="Vuelo" componente={
                    <Input transparent fluid
                        value={this.state.transportes[props.index].vuelo}
                        disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'Vuelo'}
                        onChange={(event) => {
                            var trans = this.state.transportes.slice();
                            trans[props.index].vuelo = event.target.value;
                            this.setState({ transportes: trans });
                        }}></Input>
                } />
                <CampoServicio titulo="V/R" componente={

                    <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'V/R'}
                        value={this.state.transportes[props.index].vr}
                        onChange={(event) => {
                            var trans = this.state.transportes.slice();
                            trans[props.index].vr = event.target.value;
                            this.setState({ transportes: trans });
                        }}></Input>
                } />
                <CampoServicio titulo="TC" componente={
                    <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'TC'}
                        value={this.state.transportes[props.index].tc}
                        onChange={(event) => {
                            var trans = this.state.transportes.slice();
                            trans[props.index].tc = event.target.value;
                            this.setState({ transportes: trans });
                        }}></Input>
                } />
                <CampoServicio titulo="Obs" componente={
                    <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'OBS'}
                        value={this.state.transportes[props.index].observaciones}
                        onChange={(event) => {
                            var trans = this.state.transportes.slice();
                            trans[props.index].observaciones = event.target.value;
                            this.setState({ transportes: trans });
                        }}></Input>
                } />
            </Segment.Group>
        </Segment.Group>
    }

    EnviarPostFile = () => {

        let obj = {
            id: this.state.idFile,
            idBiblia: this.state.idBiblia,
            idCliente: this.state.idCliente,
            codigo: this.state.codigo,
            descripcion: this.state.descripcion,
            servicios: this.state.servicios,
            transportes: this.state.transportes
        };

        this.setState({ transaccionEnviadaCrearFile: true });
        console.log("file a enviar: ", obj)
        console.log("TRANSPORTESSS: ", obj.transportes)
        let func = Requester.postFile;

        if (this.modoEditar())
            func = Requester.postEditarFile;

        func(
            obj,
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

    // ------------------------------------------------------------------------- Modal clientes
    /*
        EnviarPostBiblia = () => {
    
            var newStateModalBiblia = { ...this.state.modalBiblia };
            newStateModalBiblia.transaccionEnviada = true;
            this.setState({ modalBiblias: newStateModalBiblia });
            console.log(this.state.camposModalBiblia);
    
            Requester.postBiblia(this.state.camposModalBiblia, (rpta) => {
                var newState = { ...this.state.modalBiblia };
                newState.responseRecibida = true;
                newState.rptaTransaccion = rpta;
                this.cargarBiblias();
                this.setState({ modalBiblia: newState });
            }, (rptaError) => {
                console.log("error!")
                console.log(rptaError)
                console.log(this.state.modalBiblia);
                var newState = { ...this.state.modalBiblia };
                newState.responseRecibida = true;
                newState.rptaTransaccion = rptaError;
                console.log(this.state.modalBiblia);
                this.setState({ modalBiblia: newState });
            });
        }
    */


    EnviarPostBiblia = () => {

        var newStateModalBiblia = { ...this.state.modalBiblia };
        newStateModalBiblia.transaccionEnviada = true;
        this.setState({ modalBiblia: newStateModalBiblia });

        Requester.postBiblia(this.state.modalBiblia.campos, (rpta) => {
            var newState = { ...this.state.modalBiblia };
            newState.responseRecibida = true;
            newState.rptaTransaccion = rpta;
            this.cargarBiblias();
            this.setState({ modalBiblia: newState });
        }, (rptaError) => {
            var newState = { ...this.state.modalBiblia };
            newState.responseRecibida = true;
            newState.rptaTransaccion = rptaError;
            //console.log(this.state.modalBiblia);
            this.setState({ modalBiblia: newState });
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
        obj.mensaje.recibido = false;
        obj.mensaje.enviado = false;
        obj.mensaje.respuesta = null;

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
        }
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


    enCerrarModalProveedorTransportes = () => {
        var obj = { ...this.state.modalCrearProveedorTransporte };
        obj.mensaje.recibido = false;
        obj.mensaje.enviado = false;
        obj.mensaje.respuesta = null;

        if (this.state.modalCrearProveedorTransporte.modo === "edicion") {
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
    }

}

export default CrearFile;