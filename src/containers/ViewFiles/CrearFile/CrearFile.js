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

const CampoServicio = (props) => {
    return <Segment style={{ padding: "7px" }}><Header style={{ margin: "-2px 0px 4px 0px" }} as="h4">{props.titulo}</Header>{props.componente}</Segment>
}


class CrearFile extends Component {

    constructor(props) {
        super(props);
        //this.modalClientesRef = React.createRef();
    }

    servicio = (fecha, ciudad, nombre,  pasajeros, nombrePasajero, tren, alm, observaciones, proveedor) => {
        return { fecha, ciudad, nombre,  pasajeros, nombrePasajero, tren, alm, observaciones , proveedor};
    }
    transporte = (fecha, ciudad, horaRecojo, horaSalida, vuelo, nombre, pasajeros, nombrePasajero, vr, tc, proveedor, observaciones) => {
        return { fecha, ciudad, horaRecojo, horaSalida, vuelo, nombre, pasajeros, nombrePasajero, vr, tc, proveedor, observaciones };
    }

    servicioDefault = () => {
        return this.servicio('', '', '',  0, '', '', '', '')
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
            //this.servicioDefault()
        ],
        transportes: [],

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
        },

        transaccionEnviadaCrearFile:false,
        responseRecibidaCrearFile:false,
        rptaTransaccionCrearFile:null,
        
        mensajeCreacionFile:"",
        creacionFileExitosa:false
    }


    contenedorCamposModalCliente = {
        //ff:()=>{console.log(this.contCliente)},
        //funcCrearCliente:()=>{}
    }

    
    
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
            <Header size="large">Formulario de creacion: Nuevo File</Header>
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
                                    onChange={(event,data)=>{
                                        this.setState({idCliente:data.value});
                                    }}
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
                            <Button content='Agregar servicio' icon='plus' floated="left" labelPosition='right' onClick={() => {
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

                            <Button content='Agregar transporte' icon='plus' labelPosition='right' onClick={() => {
                                var transps = this.state.transportes.slice();
                                transps.push(this.transporteDefault());
                                this.setState({ transportes: transps });
                            }} />
                            
                            <MensajeTransaccion
                                transaccionEnviada = {this.state.transaccionEnviadaCrearFile} 
                                responseRecibida = {this.state.responseRecibidaCrearFile}
                                rptaTransaccion = {this.state.rptaTransaccionCrearFile}
                                //textoExito = "Puede usar la nueva biblia"
                            />
                            
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Button positive onClick={()=>{this.EnviarPostFile()}}>Guardar file</Button>
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
            </Container>

            <ModalCrearEditarProveedor parent={this} sustantivoTitulo="Proveedor"
                elegirTipo
                placeholderNombre="Melia"
                placeholderCorreo="ventas@hotelmelia.com"
                placeholderCorreoAdic="contacto.melia@gmail.com"
                enEnviar={this.enEnviarProovedor}
                enCerrar={this.enCerrarModalProveedor} />

            {/*this.ModalCrearBiblia()*/}
            {/*this.ModalCrearCliente()*/}
        </div>

    }

    // ------------------------------------------------------------------------- Cargas iniciales
    
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
                    <Input transparent fluid placeholder="In + city" 
                    value={this.state.servicios[props.index].nombre}
                        onChange={(event) => {
                            var servs = this.state.servicios.slice();
                            servs[props.index].nombre = event.target.value;
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
                <CampoServicio titulo="Fecha" componente={
                    <DateInput
                        transparent
                        fluid
                        dateFormat = "YYYY-MM-DD"
                        name="fecha"
                        placeholder="año-mes-dia"
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
                                        servs[props.index].proveedor = foundVal.text;
                                        this.setState({ servicios: servs });
                                    } else {
                                        var servs = this.state.servicios.slice();
                                        servs[props.index].proveedor = "";
                                        this.setState({ servicios: servs });
                                    }
                                } else {
                                    var servs = this.state.servicios.slice();
                                    servs[props.index].proveedor = "";
                                    this.setState({ servicios: servs });
                                }
                            }}
                            onChange={(event) => {
                                var servs = this.state.servicios.slice();
                                servs[props.index].proveedor = event.target.value;
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
                    <Input transparent fluid placeholder="OBS" value={this.state.servicios[props.index].observaciones}
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
                        value={this.state.transportes[props.index].nombre}
                        onChange={(event) => {
                            var trans = this.state.transportes.slice();
                            trans[props.index].nombre = event.target.value;
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
                        dateFormat = "YYYY-MM-DD"
                        placeholder="año-mes-dia"
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

    EnviarPostFile=()=>{

        let obj = {
            idBiblia:this.state.idBiblia,
            idCliente:this.state.idCliente,
            codigo:this.state.codigo,
            descripcion:this.state.descripcion,
            servicios:this.state.servicios,
            transportes:this.state.transportes
        };

        this.setState({transaccionEnviadaCrearFile:true});
        console.log("file a enviar: ",obj)
        console.log("TRANSPORTESSS: ",obj.transportes)
        Requester.postFile(
            obj,
            (rpta)=>{
                //console.log("exitooo")
                this.setState({
                    responseRecibidaCrearFile:true,
                    rptaTransaccionCrearFile:rpta,
                    transaccionEnviadaCrearFile:false
            });
            },
            (rpta)=>{
                //console.log("RPTA!",rpta);
                this.setState({
                    responseRecibidaCrearFile:true,
                    rptaTransaccionCrearFile:rpta,
                    transaccionEnviadaCrearFile:false
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

    // ------------------------------------------------------------------------- Modal proveedores

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
}

export default CrearFile;