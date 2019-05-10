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

const CampoServicio = (props) => {
    return <Segment style={{ padding: "7px" }}><Header style={{ margin: "-2px 0px 4px 0px" }} as="h4">{props.titulo}</Header>{props.componente}</Segment>
}


class CrearFile extends Component {

    constructor(props) {
        super(props);
        this.modalClientesRef = React.createRef();
    }

    servicio = (fecha, ciudad, servicio, hotel, pasajeros, nombrePasajero, tren, alm, obs) => {
        return { fecha, ciudad, servicio, hotel, pasajeros, nombrePasajero, tren, alm, obs };
    }

    servicioDefault = () => {
        return this.servicio('', '', '', '', 0, '', '', '', '')
    }

    transporte = (fecha, ciudad, horaRecojo, horaSalida, vuelo, servicio, pasajeros, nombrePasajero, vr, tc, transportista, obs) => {
        return { fecha, ciudad, horaRecojo, horaSalida, vuelo, servicio, pasajeros, nombrePasajero, vr, tc, transportista, obs };
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
            //abierto:false,
            transaccionEnviada: false,
            responseRecibida: false,
            rptaTransaccion: null
        },

        camposModalBiblia: {
            mes: null,
            anho: null
        },

        //datos de file
        codigo: '',
        descripcion: '',
        idBiblia: 0,
        idCliente: 0,
        servicios: [
            this.servicioDefault()
            //this.servicio('231','lima','ser','hotell',2,'johnn','trenn','elm','duhhhh'),
            //this.servicio('231','limaaaa','ser','hotell',2,'johnn','trenn','elm','duh'),
        ],
        transportes: [
            this.transporteDefault()
            //this.transporte('231','lima','02:35','16:28','acj-ctm','servicio','2','johnn','vr','tc','juan','csmmmmmmm')
            /*{fecha:'231',ciudad:'lima',horaRecojo:'02:35',horaSalida:'16:28',vuelo:'acj-ctm',
            servicio:'servicio',pasajeros:'2',nombrePasajero:'johnn',vr:'vr',tc:'tc',transportista:'juan',obs:'csmmmmmmm'}*/
        ],

        //opciones a elegir

        bibliasCargaron: false,
        //bibliasCargaronExito: true,
        opcionesBiblia: [/*{value:1, text:'mayo, 2019'}*/],

        clientesCargaron: false,
        //clientesCargaronExito: true,
        opcionesCliente: [/*{value:1, text:''}*/],

        hotelesCargaron: false,
        //hotelesCargaronExito: true,
        opcionesProveedores: [/*{value:1, text:'juancito'}*/],
        opcionesTransportes: [/*{value:1, text:'juancito'}*/],

        opcionesCiudades: [],

        opcionesPaises: [],

        modalCrearEditar: {
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
        }

    }


    contenedorCamposModalCliente = {
        //ff:()=>{console.log(this.contCliente)},
        //funcCrearCliente:()=>{}
    }

    cargarClientes() {
        Requester.getClientesListaDropdown(rpta => {
            console.log(rpta);
            var listaOpsCliente = rpta.cont.map(element => { return { value: element.idCliente, text: element.nombre } });
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

    cargarBiblias() {
        Requester.getBibliasDropdownCompleto((rpta) => {
            var listaBiblias = rpta.cont.map(element => { return { value: element.idBiblia, text: element.nombre } });
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

    cargarCiudades() {
        Requester.getCiudades((rpta) => {
            this.setState({ opcionesCiudades: rpta.cont });
        },
            (rptaError) => {
                console.error("Ciudades no cargadas");
            })
    }

    cargarPaises() {
        Requester.getPaises((rpta) => {
            this.setState({ opcionesPaises: rpta.cont });
        },
            (rptaError) => {
                console.error("Paises no cargadas");
            })
    }

    cargarProveedoresNoTransp() {
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


    cargarTransportes() {
        Requester.getProveedoresTransportes((rpta) => {
            var listaProovs = rpta.cont.map(element => { return { value: element.idProveedor, text: element.nombre } });
            this.setState({
                opcionesTransportes: listaProovs
            });
        }, (rptaError) => {
        });
    }
    /*
        cargarHoteles() {
            Requester.getHotelesListaDropdown(rpta => {
                var listaOpsCliente = rpta.cont.map(element => { return { value: element.idHotel, text: element.nombre } });
                this.setState({
                    opcionesProveedores: listaOpsCliente,
                    hotelesCargaronExito: true,
                    hotelesCargaron: true
                })
            },
                (rptaError) => {
                    //console.log(rptaError);
                    this.setState({
                        hotelesCargaronExito: false,
                        hotelesCargaron: true
                    });
                });
            /*
        }
    */
    componentDidMount() {
        console.log("wii");
        //Requester.getListadoFiles(this.filesRecibidos,this.filesError);

        this.cargarClientes();
        this.cargarBiblias();
        this.cargarProveedoresNoTransp();
        this.cargarTransportes();
        this.cargarCiudades();
        //this.cargarPaises();
    }

    render = () => {

        let fieldStyle = { margin: "6px 0 4px 0" };
        return <div>
            <Header size="large">Formulario de creacion: nuevo file</Header>
            <Segment>
                <Grid columns={2} >
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <ElementoForm titulo="Codigo">
                                <Input fluid placeholder="08-020" value={this.state.codigo} onChange={(event) => {
                                    this.setState({ codigo: event.target.value });
                                }} ></Input>
                            </ElementoForm>

                        </Grid.Column>
                        <Grid.Column width={8}>
                            <ElementoForm titulo="Descripcion">
                                <Form>
                                    {/*style={{ minHeight: 100 }}*/}
                                    <TextArea placeholder='Descripcion del file' rows={1} value={this.state.descripcion} onChange={(event) => {
                                        this.setState({ descripcion: event.target.value });
                                    }} />
                                </Form>
                            </ElementoForm>
                        </Grid.Column>

                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <ElementoForm titulo="Biblia">
                                <Grid>
                                    <Grid.Row columns='equal'>
                                        <Grid.Column >
                                            <Dropdown fluid placeholder='Elegir Biblia'
                                                search
                                                loading={!this.state.bibliasCargaron}
                                                selection
                                                options={this.state.opcionesBiblia}
                                                onChange={(event, data) => {
                                                    this.setState({ idBiblia: data.value });
                                                }}
                                            >
                                            </Dropdown>

                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                            <Button fluid icon onClick={
                                                () => {

                                                    var state = { ...this.state };
                                                    state.modalBibliasAbierto = true;
                                                    state.modalBiblia.responseRecibida = false;
                                                    state.modalBiblia.transaccionEnviada = false;
                                                    this.setState(state);
                                                }
                                            }>
                                                <Icon name='plus' />
                                            </Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>

                            </ElementoForm>
                        </Grid.Column>

                        <Grid.Column width={8}>
                            <ElementoForm titulo="Cliente">
                                {/*<Input  type="text" fluid placeholder="Javi"></Input>*/}
                                <Dropdown fluid
                                    placeholder='Christian'
                                    search
                                    loading={!this.state.bibliasCargaron}
                                    selection
                                    options={this.state.opcionesCliente}
                                />
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
                            <Button content='Agregar servicio' icon='plus' floated="right" labelPosition='left' onClick={() => {
                                var servs = this.state.servicios.slice();
                                servs.push(this.servicioDefault());
                                this.setState({ servicios: servs });
                            }} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Header size="tiny">Transportes</Header>

                            {this.state.transportes.map((elem, index) => {
                                return this.CuerpoTransporte({ index: index });
                            })}

                            <Button content='Agregar transporte' icon='plus' labelPosition='left' onClick={() => {
                                var transps = this.state.transportes.slice();
                                transps.push(this.transporteDefault());
                                this.setState({ transportes: transps });
                            }} />
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
            </Segment>
            {/*
            {!this.state.bibliasCargaronExito ? <Message error>Error de conexion: Las biblias no se pueden cargar.</Message> : null}
            {!this.state.clientesCargaronExito ? <Message error>Error de conexion: Los clientes no se pueden cargar.</Message> : null}
            {!this.state.hotelesCargaronExito ? <Message error>Error de conexion: Los hoteles no se pueden cargar.</Message> : null}
            */}
            <hr />

            <Container fluid textAlign="right">
                <Button positive>Guardar file</Button>
            </Container>

            <ModalCrearEditarProveedor parent={this} sustantivoTitulo="Proveedor"
                elegirTipo
                placeholderNombre="Melia"
                placeholderCorreo="ventas@hotelmelia.com"
                placeholderCorreoAdic="contacto.melia@gmail.com"
                enEnviar={this.enEnviarProovedor}
                enCerrar={this.enCerrarModalProveedor} />

            {this.ModalCrearBiblia()}
            {this.ModalCrearCliente()}
        </div>

    }


    onDateChange = (event, { name, value }) => {
        console.log(event);
        console.log(name);
        if (name === "date") {
            var servs = this.state.servicios.slice();
            servs[0].fecha = value;
            this.setState({ servicios: servs });
        }
    }

    CuerpoServicio = (props) => {
        return <Segment.Group>
            <Segment.Group horizontal>
                <Segment style={{ backgroundColor: "#fff5e6" }}>
                    <Grid columns="equal">
                        <Grid.Row style={{ padding: "4px 0px" }}>
                            <Grid.Column verticalAlign="middle">
                                <Header as="h3">Servicio {props.index + 1}</Header>
                            </Grid.Column>
                            <Grid.Column style={{ padding: "0px 8px" }}>
                                <Button style={{ padding: "8px 14px", margin: "4px 0px" }} floated="right" color="red" onClick={() => {
                                    var lista = this.state.servicios.slice();
                                    lista.splice(props.index, 1);
                                    this.setState({ servicios: lista });
                                    console.log(this.state.servicios)
                                }}
                                >Borrar</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Segment.Group>
            <Segment.Group horizontal style={{ backgroundColor: "#fffbf6" }}>
                <CampoServicio titulo="Nombre" componente={
                    <Input transparent fluid placeholder="In + city" value={this.state.servicios[props.index].servicio}
                        onChange={(event) => {
                            var servs = this.state.servicios.slice();
                            servs[props.index].servicio = event.target.value;
                            this.setState({ servicios: servs });
                        }} />
                } />
                <CampoServicio titulo="Ciudad de destino" componente={
                    <div>
                        <Input transparent list={'ciudades' + props.index} placeholder='Lima' fluid
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
                <CampoServicio titulo="Fecha ejecucion" componente={
                    <DateInput
                        transparent
                        fluid
                        name="fecha"
                        placeholder="01-02-2019"
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
                    <Input transparent fluid placeholder="Lewis Hamilton" value={this.state.servicios[props.index].nombrePasajero}
                        onChange={(event) => {
                            var servs = this.state.servicios.slice();
                            servs[props.index].nombrePasajero = event.target.value;
                            this.setState({ servicios: servs });
                        }}></Input>} />
                <CampoServicio titulo="Cant. pasajeros" componente={
                    <Input type="number" transparent fluid placeholder="4" value={this.state.servicios[props.index].pasajeros}
                        onChange={(event) => {
                            var servs = this.state.servicios.slice();
                            servs[props.index].pasajeros = event.target.value;
                            this.setState({ servicios: servs });
                        }}></Input>} />
            </Segment.Group>
            <Segment.Group horizontal style={{ backgroundColor: "#fffbf6" }}>

                <CampoServicio titulo="Proveedor" componente={
                    <div>
                        <Input /* iconPosition='left'*/ transparent list={'hoteles' + props.index} loading={!this.state.hotelesCargaron} placeholder='Sheraton' fluid
                            value={this.state.servicios[props.index].hotel}
                            onBlur={(event, data) => {
                                /*console.log("event! ",event.target.value);
                                console.log("data! ",data);*/
                                if (event.target.value) {
                                    let found = false;
                                    let foundVal = this.state.opcionesProveedores.find((val) => {
                                        /*console.log("vallllllllllllll",val.text);
                                        if(val.text.includes(event.target.value))
                                            console.log(val.text);*/
                                        return val.text.includes(event.target.value)
                                    });
                                    if (foundVal) {
                                        var servs = this.state.servicios.slice();
                                        servs[props.index].hotel = foundVal.text;
                                        this.setState({ servicios: servs });
                                    } else {
                                        var servs = this.state.servicios.slice();
                                        servs[props.index].hotel = "";
                                        this.setState({ servicios: servs });
                                    }
                                } else {
                                    var servs = this.state.servicios.slice();
                                    servs[props.index].hotel = "";
                                    this.setState({ servicios: servs });
                                }
                            }}
                            onChange={(event) => {
                                var servs = this.state.servicios.slice();
                                servs[props.index].hotel = event.target.value;
                                this.setState({ servicios: servs });
                            }}>
                            {/*
                            <Icon name='lightning' />*/}
                            <input />
                            <Button style={{ padding: "3px 11px" }} icon onClick={() => {
                                let modal = { ...this.state.modalCrearEditar, abierto: true };
                                this.setState({ modalCrearEditar: modal });
                            }}>
                                <Icon name='plus' />
                            </Button>
                        </Input>
                        <datalist id={'hoteles' + props.index}>
                            {this.state.opcionesProveedores.map(e => <option value={e.text} />)}
                        </datalist>
                    </div>
                } />
                <CampoServicio titulo="Tren" componente={
                    <Input transparent fluid placeholder="Tren" value={this.state.servicios[props.index].tren}
                        onChange={(event) => {
                            var servs = this.state.servicios.slice();
                            servs[props.index].tren = event.target.value;
                            this.setState({ servicios: servs });
                        }}></Input>} />
                <CampoServicio titulo="ALM" componente={

                    <Input transparent fluid placeholder="ALM" value={this.state.servicios[props.index].alm}
                        onChange={(event) => {
                            var servs = this.state.servicios.slice();
                            servs[props.index].alm = event.target.value;
                            this.setState({ servicios: servs });
                        }}></Input>} />
                <CampoServicio titulo="Obs" componente={
                    <Input transparent fluid placeholder="OBS" value={this.state.servicios[props.index].obs}
                        onChange={(event) => {
                            var servs = this.state.servicios.slice();
                            servs[props.index].obs = event.target.value;
                            this.setState({ servicios: servs });
                        }}></Input>
                } />
            </Segment.Group>
        </Segment.Group>
    }


    CuerpoTransporte = (props) => {
        return <Segment.Group>
            <Segment.Group horizontal>
                <Segment style={{ backgroundColor: "#ccebff" }}>
                    <Grid columns="equal">
                        <Grid.Row style={{ padding: "4px 0px" }}>
                            <Grid.Column verticalAlign="middle">
                                <Header as="h3">Transporte {props.index + 1}</Header>
                            </Grid.Column>
                            <Grid.Column style={{ padding: "0px 8px" }}>
                                <Button style={{ padding: "8px 14px", margin: "4px 0px" }} floated="right" color="red" onClick={() => {
                                    var lista = this.state.transportes.slice();
                                    lista.splice(props.index, 1);
                                    this.setState({ transportes: lista });
                                }}
                                >Borrar</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Segment.Group>
            <Segment.Group horizontal style={{ backgroundColor: "#e6f5ff" }}>
                <CampoServicio titulo="Nombre" componente={
                    <Input transparent fluid placeholder="APTO / Four points"
                        value={this.state.transportes[props.index].servicio}
                        onChange={(event) => {
                            var trans = this.state.transportes.slice();
                            trans[props.index].ser = event.target.value;
                            this.setState({ transportes: trans });
                        }}></Input>
                } />
                <CampoServicio titulo="Ciudad de destino" componente={
                    <div>
                        <Input transparent fluid placeholder="Ciudad"
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
                        placeholder="10-02-2019"
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

                    <Input transparent fluid placeholder="Steven Gerrard"
                        value={this.state.transportes[props.index].nombrePasajero}
                        onChange={(event) => {
                            var trans = this.state.transportes.slice();
                            trans[props.index].nombrePasajero = event.target.value;
                            this.setState({ transportes: trans });
                        }}></Input>
                } />
                <CampoServicio titulo="Cant. pasajeros" componente={
                    <Input transparent fluid placeholder="4"
                        value={this.state.transportes[props.index].pasajeros}
                        onChange={(event) => {
                            var trans = this.state.transportes.slice();
                            trans[props.index].pasajeros = event.target.value;
                            this.setState({ transportes: trans });
                        }}></Input>} />
            </Segment.Group>
            <Segment.Group horizontal style={{ backgroundColor: "#e6f5ff" }}>
                <CampoServicio titulo="Proveedor de Transporte" componente={
                    <div>
                        <Input icon="lightning" iconPosition="left" list={'transportes' + props.index} transparent fluid placeholder="Transportista"
                            value={this.state.transportes[props.index].transportista}
                            onChange={(event) => {
                                var trans = this.state.transportes.slice();
                                trans[props.index].transportista = event.target.value;
                                this.setState({ transportes: trans });
                            }}></Input>
                        <datalist id={'transportes' + props.index}>
                            {this.state.opcionesTransportes.map(e => <option value={e.text} />)}
                        </datalist>
                    </div>



                } />
                <CampoServicio titulo="Hora recojo" componente={
                    <TimeInput
                        transparent
                        fluid
                        name="hora"
                        placeholder="0:00"
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
                        placeholder="0:00"
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
                    <Input transparent fluid placeholder="Vuelo"
                        value={this.state.transportes[props.index].vuelo}
                        onChange={(event) => {
                            var trans = this.state.transportes.slice();
                            trans[props.index].vuelo = event.target.value;
                            this.setState({ transportes: trans });
                        }}></Input>
                } />
                <CampoServicio titulo="V/R" componente={

                    <Input transparent fluid placeholder="V/R"
                        value={this.state.transportes[props.index].vr}
                        onChange={(event) => {
                            var trans = this.state.transportes.slice();
                            trans[props.index].vr = event.target.value;
                            this.setState({ transportes: trans });
                        }}></Input>
                } />
                <CampoServicio titulo="TC" componente={
                    <Input transparent fluid placeholder="TC"
                        value={this.state.transportes[props.index].tc}
                        onChange={(event) => {
                            var trans = this.state.transportes.slice();
                            trans[props.index].tc = event.target.value;
                            this.setState({ transportes: trans });
                        }}></Input>
                } />
                <CampoServicio titulo="Obs" componente={
                    <Input transparent fluid placeholder="OBS"
                        value={this.state.transportes[props.index].obs}
                        onChange={(event) => {
                            var trans = this.state.transportes.slice();
                            trans[props.index].obs = event.target.value;
                            this.setState({ transportes: trans });
                        }}></Input>
                } />
            </Segment.Group>
        </Segment.Group>
    }

    filaServicio = (index) => {
        return (<FilaTablaIns columns={11}>
            <ColumnaTablaIns >
                <Label>{index + 1}</Label>
            </ColumnaTablaIns>
            <ColumnaTablaIns>
                <DateInput
                    fluid
                    name="fecha"
                    placeholder="01-02-2019"
                    value={this.state.servicios[index].fecha}
                    iconPosition="left"
                    onChange={(event, { name, value }) => {
                        if (name === "fecha") {
                            var servs = this.state.servicios.slice();
                            servs[index].fecha = value;
                            this.setState({ servicios: servs });
                            console.log(this.state);
                        }
                    }}
                />
            </ColumnaTablaIns>

            <ColumnaTablaIns style={{ padding: "1px", margin: "1px" }}>

            </ColumnaTablaIns>
            <ColumnaTablaIns>

            </ColumnaTablaIns>
            <ColumnaTablaIns>
                {/*
                        <Dropdown fluid placeholder='Hotel' search selection 
                            options={this.state.opcionesProveedores}
                            onChange={(event,data)=>{
                                var servs = this.state.servicios.slice();
                                servs[index].hotel = data.value;
                                this.setState({servicios:servs});
                            }}
                        />*/}

            </ColumnaTablaIns>
            <ColumnaTablaIns>

            </ColumnaTablaIns>
            <ColumnaTablaIns>

            </ColumnaTablaIns>
            <ColumnaTablaIns>
            </ColumnaTablaIns>
            <ColumnaTablaIns>
            </ColumnaTablaIns>
            <ColumnaTablaIns>

            </ColumnaTablaIns>
            <ColumnaTablaIns textAlign="center">

                <Popup
                    trigger={
                        <Button icon color='red' onClick={() => {
                            var lista = this.state.servicios.slice();
                            lista.splice(index, 1);
                            this.setState({ servicios: lista });
                            console.log(this.state.servicios)
                        }}>
                            <Icon name='trash' />
                        </Button>
                    }
                    content="Eliminar servicio"
                    position="top center"
                />

            </ColumnaTablaIns>
        </FilaTablaIns>)
    }

    filaTransporte = (index) => {
        return (<FilaTablaIns columns={14}>
            <ColumnaTablaIns textAlign="center" >
                <Label>{index + 1}</Label>
            </ColumnaTablaIns>
            <ColumnaTablaIns>

            </ColumnaTablaIns>
            <ColumnaTablaIns>

            </ColumnaTablaIns>
            <ColumnaTablaIns>

            </ColumnaTablaIns>
            <ColumnaTablaIns>

            </ColumnaTablaIns>
            <ColumnaTablaIns>

            </ColumnaTablaIns>
            <ColumnaTablaIns>

            </ColumnaTablaIns>
            <ColumnaTablaIns>

            </ColumnaTablaIns>
            <ColumnaTablaIns>
            </ColumnaTablaIns>
            <ColumnaTablaIns>
            </ColumnaTablaIns>
            <ColumnaTablaIns>

            </ColumnaTablaIns>
            <ColumnaTablaIns>

            </ColumnaTablaIns>
            <ColumnaTablaIns>

            </ColumnaTablaIns>
            <ColumnaTablaIns textAlign="center">
                <Button icon color='red' onClick={() => {
                    var lista = this.state.transportes.slice();
                    lista.splice(index, 1);
                    this.setState({ transportes: lista });
                }}>
                    <Icon name='trash' />
                </Button>
            </ColumnaTablaIns>
        </FilaTablaIns>)
    }

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

        /*
                axios.post(Configuracion.ServerUrl+"/biblias", this.state.camposModalBiblia).then((response)=>{
                    var newState = {...this.state.modalBiblia};
                    newState.responseRecibida=true;
                    newState.rptaTransaccion = new RptaTrx(response.data);
                    this.cargarBiblias();
                    this.setState({modalBiblia:newState});
                }).catch(error=>{
                    //console.log(error.response);
                    //si hay error manejado por server
                    if(error.response.data){
                        var newState = {...this.state.modalBiblia};
                        newState.responseRecibida=true;
                        newState.rptaTransaccion = new RptaTrx(error.response.data);
                        //console.log(newState.rptaTransaccion);
                        this.setState({modalBiblia:newState});
                    }else{
                    //si hay un error donde el server ni responde
                        var newState = {...this.state.modalBiblia};
                        newState.responseRecibida=true;
                        newState.rptaTransaccion= new RptaTrx().set(null,"Servidor inaccesible",null,0);
                        this.setState({modalBiblia: newState});
                    }
                })*/
    }


    EnviarPostCliente = (camposModalCliente) => {
        //console.log(camposModalCliente);

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

    enEnviarProovedor = () => {

        var obj = { ...this.state.modalCrearEditar };
        obj.mensaje.enviado = true;
        this.setState({ modalCrearEditar: obj });

        Requester.postProveedor(
            this.state.modalCrearEditar.campos.tipo,
            this.state.modalCrearEditar.campos.nombre,
            this.state.modalCrearEditar.campos.correo,
            this.state.modalCrearEditar.campos.num,
            this.state.modalCrearEditar.campos.numAdic,
            this.state.modalCrearEditar.campos.correoAdic,
            this.state.modalCrearEditar.campos.ciudad,
            (rpta) => {
                var obj = { ...this.state.modalCrearEditar };
                obj.mensaje.recibido = true;
                obj.mensaje.respuesta = rpta;
                this.setState({ modalCrearEditar: obj });
                this.cargarProveedoresNoTransp();
                //this.cargarProovs();
            },
            (rptaError) => {
                console.log("err!");
                var obj = { ...this.state.modalCrearEditar };
                obj.mensaje.recibido = true;
                obj.mensaje.respuesta = rptaError;
                this.setState({ modalCrearEditar: obj });
            })
    }


    enCerrarModalProveedor = () => {
        var obj = { ...this.state.modalCrearEditar };
        obj.mensaje.recibido = false;
        obj.mensaje.enviado = false;
        obj.mensaje.respuesta = null;

        if (this.state.modalCrearEditar.modo === "edicion") {
            var obj = { ...this.state.modalCrearEditar };
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


    ModalCrearBiblia = () => {

        let msj = <div></div>
        if (this.state.modalBiblia.transaccionEnviada && !this.state.modalBiblia.responseRecibida) {
            msj = <Message icon>
                <Icon name='circle notched' loading />
                <Message.Content>
                    <Message.Header>Espere un momento...</Message.Header>
                    Creando biblia
                </Message.Content>
            </Message>
        } else
            if (this.state.modalBiblia.responseRecibida) {
                console.log(this.state.modalBiblia)
                if (this.state.modalBiblia.rptaTransaccion.transaccionExitosa()) {
                    msj = <Message success header='Biblia nueva creada'>
                        <Message.List>
                            <Message.Item>Puede elegir la biblia nuevo desde las opciones</Message.Item>
                            {this.state.modalBiblia.rptaTransaccion.msj ? <Message.Item>{this.state.modalBiblia.rptaTransaccion.msj}</Message.Item> : null}
                        </Message.List>
                    </Message>
                } else {
                    msj = <Message negative>
                        <Message.Header>Error al crear biblia</Message.Header>
                        <Message.List>
                            <Message.Item>{this.state.modalBiblia.rptaTransaccion.msj}</Message.Item>
                            {this.state.modalBiblia.rptaTransaccion.trace ? <Message.Item>{this.state.modalBiblia.rptaTransaccion.trace}</Message.Item> : null}
                        </Message.List>
                    </Message>
                }
            }


        return (
            <Modal size="tiny" open={this.state.modalBibliasAbierto} centered={false} onClose={() => { this.setState({ modalBibliasAbierto: false }) }}>
                <Modal.Header>Nueva biblia</Modal.Header>
                <Modal.Content>
                    <ElementoForm titulo="Mes">
                        <Dropdown placeholder="Junio" fluid search selection options={Constantes.ListaMeses}
                            onChange={(event, data) => {
                                var newState = { ...this.state };
                                newState.camposModalBiblia.mes = data.value;
                                this.setState(newState);
                            }} />
                    </ElementoForm>
                    <ElementoForm titulo="Año">
                        <Input fluid placeholder="Año" onChange={(event) => {
                            var newState = { ...this.state };
                            newState.camposModalBiblia.anho = event.target.value;
                            this.setState(newState);
                        }}></Input>
                    </ElementoForm>
                    {msj}
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => { this.setState({ modalBibliasAbierto: false }) }}>
                        Cancelar
                </Button>
                    <Button positive icon='checkmark' labelPosition='right' content='Crear' onClick={this.EnviarPostBiblia} />
                </Modal.Actions>
            </Modal>)
    }


    ModalCrearCliente = () => {
        let msj = <div></div>
        if (this.state.modalCliente.transaccionEnviada && !this.state.modalCliente.responseRecibida) {
            msj = <Message icon>
                <Icon name='circle notched' loading />
                <Message.Content>
                    <Message.Header>Espere un momento...</Message.Header>
                    Creando cliente
                </Message.Content>
            </Message>
        } else if (this.state.modalCliente.responseRecibida) {
            if (this.state.modalCliente.rptaTransaccion.transaccionExitosa()) {
                msj = <Message success header='Cliente nuevo creado'>
                    <Message.List>
                        <Message.Item>Puede elegir al cliente nuevo desde las opciones</Message.Item>
                        {this.state.modalCliente.rptaTransaccion.msj ? <Message.Item>{this.state.modalCliente.rptaTransaccion.msj}</Message.Item> : null}
                    </Message.List>
                </Message>
            } else {
                msj = <Message negative>
                    <Message.Header>Error al crear cliente</Message.Header>
                    <Message.List>
                        <Message.Item>{this.state.modalCliente.rptaTransaccion.msj}</Message.Item>
                        {this.state.modalCliente.rptaTransaccion.trace ? <Message.Item>{this.state.modalCliente.rptaTransaccion.trace}</Message.Item> : null}
                    </Message.List>
                </Message>
            }
        }

        return (
            <ModalTrxSimple
                ref={this.modalClientesRef}
                titulo="Crear nuevo cliente"
                size="tiny"
                textoAceptar="Crear"
                textoCancelar="Cancelar"
                enAceptar={() => {
                    console.log("aceptando!");
                    this.EnviarPostCliente(this.contenedorCamposModalCliente);
                }}>
                <CamposCrearCliente contenedor={this.contenedorCamposModalCliente} />
                {msj}
            </ModalTrxSimple>
        )
    }
}

const FilaTablaIns = (props) => {
    return (
        <Grid.Row columns={props.columns} style={{ padding: "3px 0px" }}>{props.children}</Grid.Row>
    );
}

const ColumnaTablaIns = (props) => {
    return <Grid.Column verticalAlign="middle" textAlign="center" style={{ padding: "0px 1px" }}>{props.children}</Grid.Column>
}

export default CrearFile;