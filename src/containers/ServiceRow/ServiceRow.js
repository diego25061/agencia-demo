import React from 'react'
import InputSearchableDataButton from '../../components/InputSearchableData/InputSearchableData';
import { Button, Icon, Input, Segment, Header, Grid, IconGroup } from 'semantic-ui-react';
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';
import Requester from './../../common/Services/Requester';
import ServicioModel from './../../common/Models/Apis/ServicioModel';
import { const_colores } from '../../common/Constantes';

export const mode_added = "added";//cuando se esta viendo ya agregado en el file
export const mode_view = "view";//cuando se esta viendo recien agregado
export const mode_edit = "edit";//cuando se esta editando

const clase_general = "general"
const clase_transporte = "transporte"
const clase_hospedaje = "hospedaje"

const Campo = (props) => {
    return <Segment style={{ padding: "7px" }}>
        <Header style={{ margin: "-2px 0px 4px 0px" }} as="h4">
            {props.titulo}
        </Header>
        {props.children}
    </Segment>
}

export default class ServiceRow extends React.Component {


    state = {
        //mode: this.props.service.mode ? this.props.service.mode : mode_view,

        //idServicio: this.props.idServicio,
        nombre: '',
        ciudad: '',
        fechaEjecucion: '',
        fechaOut: '',
        nombrePasajero: '',
        cantPasajeros: '',
        horaInicio: '',
        horaFinal: '',
        descripcion: '',
        tren: '',
        alm: '',
        vuelo: '',
        vr: '',
        tc: '',
        proveedor: '',
        clase: 'general',
        //idFile: this.props.idFile
    }

    static defaultProps = {
        clase: clase_general,
        opcionesHoteles: [],
        hotelesCargaron: false,
        index: 0,
    }

    modoVer = () => {
        return this.props.service.mode === mode_view;
    }

    componentDidMount = () => {

    }

    modoEdicion = () => {
        return this.props.service.mode === mode_edit;
    }



    render = () => {

        let estiloInputs = {}

        if (this.modoVer())
            estiloInputs = { color: "black" };

        let clase = this.props.clase;



        let placeholder = "Proveedor";
        let datalist = this.props.opcionesProveedores;

        if (this.props.service.clase === "hospedaje") {
            placeholder = "Sheraton";
            datalist = this.props.opcionesHoteles;
        } else if (this.props.service.clase === "transporte") {
            placeholder = "Transportista";
            datalist = this.props.opcionesTransportes;
        }

        let controlProveedor = <InputSearchableDataButton
            loading={!this.props.proovedoresCargaron}
            disabled={this.modoVer()}
            placeholder={this.modoVer() ? "" : placeholder}
            datalist={datalist}
            value={this.props.service.proveedor}

            sideButton={<></>
                /*
                <Button style={{ padding: "3px 11px", backgroundColor: "#00000000" }} icon
                    onClick={() => {
                        //let modal = { ...this.state.modalCrearEditarProveedor, abierto: true };
                        //this.setState({ modalCrearEditarProveedor: modal });
                    }}>
                    <Icon name='plus' />
                </Button>*/
            }
            onChange={(event, data) => {
                this.props.onUpdateValues({ proveedor: data.value });
            }}
        />

        if (this.modoVer()) {
            let nombreProovedor = '-';
            if (this.props.opcionesHoteles) {
                let filtrado = this.props.opcionesProveedores.filter(x => x.value === this.props.service.proveedor);
                //console.log("filtrado: ",filtrado);
                if (filtrado && filtrado.length > 0) {
                    nombreProovedor = filtrado[0].text;
                }
            }
            controlProveedor = <Input disabled transparent fluid value={nombreProovedor} />
        }
        
        let tipoProveedor = "Proveedor"

        if (this.props.service.clase === "hospedaje") {
            tipoProveedor="Hotel"
        } else if (this.props.service.clase === "transporte") {
            tipoProveedor = "Transportista"
        }

        let campoProveedor = <Campo titulo={tipoProveedor} >{controlProveedor}</Campo>


        let campoNombre = <Campo titulo="Nombre *" >
            <Input disabled={this.modoVer()} transparent fluid placeholder={this.modoVer() ? "" : "In + city"}
                value={this.props.service.nombre ? this.props.service.nombre : ""}
                onChange={(event) => { this.props.onUpdateValues({ nombre: event.target.value }); }}
            />
        </Campo>

        let campoCiudadDestino = <Campo titulo="Ciudad destino">
            <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'Ciudad'}
                value={this.props.service.ciudad ? this.props.service.ciudad : ""}
                onChange={(event) => { this.props.onUpdateValues({ ciudad: event.target.value }); }}
            />
        </Campo>

        let campoFecha = <Campo titulo="Fecha *">
            <DateInput
                disabled={this.modoVer()}
                transparent
                closable
                fluid
                dateFormat="YYYY-MM-DD"
                name="fecha"
                placeholder={this.modoVer() ? "-" : 'aaaa-mm-dd'}
                value={this.props.service.fechaEjecucion ? this.props.service.fechaEjecucion : ""}
                iconPosition="left"
                onChange={(event, { name, value }) => {
                    if (name === "fecha") {
                        this.props.onUpdateValues({ fechaEjecucion: value });
                    }
                }}
            />
        </Campo>

        let campoFechaOut = <Campo titulo="Fecha out">
            <DateInput
                disabled={this.modoVer()}
                transparent
                closable
                fluid
                dateFormat="YYYY-MM-DD"
                name="fecha"
                placeholder={this.modoVer() ? "-" : 'aaaa-mm-dd'}
                value={this.props.service.fechaOut ? this.props.service.fechaOut : ""}
                iconPosition="left"
                onChange={(event, { name, value }) => {
                    if (name === "fecha") {
                        this.props.onUpdateValues({ fechaOut: value });
                    }
                }}
            />
        </Campo>

        let campoNombrePasajero = <Campo titulo="Nombre Pasajero">
            <Input transparent disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'Lewis Hamilton'} fluid
                value={this.props.service.nombrePasajero ? this.props.service.nombrePasajero : ""}
                onChange={(event) => { this.props.onUpdateValues({ nombrePasajero: event.target.value }); }}
            />
        </Campo>



        let campoCantidadPasajeros = <Campo titulo="Cantidad pasajeros">
            <Input type="number" transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : '4'}
                value={this.props.service.cantPasajeros ? this.props.service.cantPasajeros : 0}
                onChange={(event) => { 
                    let cant = event.target.value;
                    if(cant<0)
                        cant=0;
                    this.props.onUpdateValues({ cantPasajeros: cant }); 
                    }}
            />
        </Campo>




        let campoHoraEntrada = <Campo titulo="Hora de entrada">
            <TimeInput
                transparent
                fluid
                name="horaInicio"
                disabled={this.modoVer()} placeholder={this.modoVer() ? "" : '0:00'}
                value={this.props.service.horaInicio ? this.props.service.horaInicio : ""}
                iconPosition="left"
                onChange={(event, { name, value }) => {
                    if (name === "horaInicio") {
                        this.props.onUpdateValues({ horaInicio: value });
                    }
                }}
            />
        </Campo>

        let campoHoraSalida = <Campo titulo="Hora Salida">
            <TimeInput
                transparent
                fluid
                name="horaFinal"
                disabled={this.modoVer()} placeholder={this.modoVer() ? "" : '0:00'}
                value={this.props.service.horaFinal ? this.props.service.horaFinal : ""}
                iconPosition="left"
                onChange={(event, { name, value }) => {
                    if (name === "horaFinal") {
                        this.props.onUpdateValues({ horaFinal: value });
                    }
                }}
            />
        </Campo>

        let campoDescripcion = <Campo titulo="Descripcion">
            <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'OBS'}
                value={this.props.service.descripcion ? this.props.service.descripcion : ""}
                onChange={(event) => { this.props.onUpdateValues({ descripcion: event.target.value }); }}
            />
        </Campo>

        let campoTren = <Campo titulo="Tren">
            <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'Tren'}
                value={this.props.service.tren ? this.props.service.tren : ""}
                onChange={(event) => { this.props.onUpdateValues({ tren: event.target.value }); }}
            />
        </Campo>

        let campoVuelo = <Campo titulo="Vuelo">
            <Input transparent fluid
                value={this.props.service.vuelo ? this.props.service.vuelo : ""}
                disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'Vuelo'}
                onChange={(event) => { this.props.onUpdateValues({ vuelo: event.target.value }); }}
            />
        </Campo>

        let campoAlm = <Campo titulo="Almuerzo">
            <Input transparent fluid
                value={this.props.service.alm ? this.props.service.alm : ""}
                disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'Almuerzo'}
                onChange={(event) => { this.props.onUpdateValues({ alm: event.target.value }); }}
            />
        </Campo>

        let campoVr = <Campo titulo="V/R">
            <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'V/R'}
                value={this.props.service.vr ? this.props.service.vr : ""}
                onChange={(event) => { this.props.onUpdateValues({ vr: event.target.value }); }}
            />
        </Campo>

        let campoTc = <Campo titulo="TC">
            <Input transparent fluid disabled={this.modoVer()} placeholder={this.modoVer() ? "" : 'TC'}
                value={this.props.service.tc ? this.props.service.tc : ""}
                onChange={(event) => { this.props.onUpdateValues({ tc: event.target.value }); }}
            />
        </Campo>

        let buttons = <></>

        if (this.props.service.mode === mode_view) {
            buttons = <>
                <Button floated="right" icon color="red" onClick={() => { 
                    this.props.onDelete();
                }}>
                    <Icon name="trash alternate outline" />
                </Button>

                <Button floated="right" icon color="yellow"
                    onClick={() => {
                        this.props.onUpdateValues({ mode: mode_edit });
                        //this.setState({ mode: mode_edit });
                    }}>
                    <Icon name="pencil"></Icon>
                </Button>
            </>
        } else if (this.props.service.mode === mode_edit) {
            buttons = <>
                <Button floated="right" icon color="red" onClick={() => {
                    //this.props.onUpdateValues({mode: mode_view});
                    this.props.onEditCancel();
                    //this.setState({ mode: mode_view });
                }}>
                    <Icon name="cancel" />
                </Button>

                <Button floated="right" icon color="green"
                    onClick={() => {
                        //this.props.onUpdateValues({mode: mode_view});
                        this.props.onEditSave();
                        //this.setState({ mode: mode_view });
                    }}>
                    <Icon name="check"></Icon>
                </Button>
            </>
        } else if (this.props.service.mode === mode_added) {
            buttons = <>
                <Button floated="right" icon color="red" onClick={() => {
                    //this.props.onUpdateValues({mode: mode_view});
                    this.props.onNewServiceCancel();
                    //this.setState({ mode: mode_view });
                }}>
                    <Icon name="cancel" />
                </Button>

                <Button floated="right" icon color="green"
                    onClick={() => {
                        //this.setState({ mode: mode_view });
                        this.props.onNewServiceSave();
                    }}>
                    <Icon name="save"></Icon>
                </Button>
            </>
        }


        let primeraFila = <>
            {campoNombre}
            {campoCiudadDestino}
            {campoFecha}
            {campoFechaOut}
            {campoNombrePasajero}
            {campoCantidadPasajeros}
        </>

        let segundaFila = <>
            {campoProveedor}
            {campoHoraEntrada}
            {campoTren}
            {campoAlm}
            {campoDescripcion}
        </>

        let icono = "setting"
        let titulo = "Servicio general"
        let color = const_colores.servicio_general;

        titulo = (this.props.orden + 1) + ". " + this.props.service.nombre;

        if (this.props.service.clase === "hospedaje") {
            icono = "building"
            titulo += " ( hospedaje )"
            color = const_colores.servicio_hospedaje;
            primeraFila = <>
                {campoNombre}
                {campoFecha}
                {campoFechaOut}
                {campoNombrePasajero}
                {campoCantidadPasajeros}
            </>

            segundaFila = <>
                {campoProveedor}
                {campoHoraEntrada}
                {campoHoraSalida}
                {campoDescripcion}
            </>
        } else if (this.props.service.clase === "transporte") {
            icono = "car"
            titulo += " ( transporte )"
            color = const_colores.servicio_transporte;
            primeraFila =<>
                {campoNombre}
                {campoCiudadDestino}
                {campoFecha}
                {campoNombrePasajero}
                {campoCantidadPasajeros}
            </>

            segundaFila = <>
                {campoProveedor}
                {campoHoraEntrada}
                {campoHoraSalida}
                {campoVuelo}
                {campoVr}
                {campoTc}
                {campoDescripcion}
            </>
        } else {
            titulo += " ( servicio general )"
        }

            //colorFondo = "#f4f4f4";
            //colorFondoLight = "#f9f9F9";
        let colorFondo = color;//"#b5dec7";
        let colorFondoLight = "";//"#def0e6";

        if (this.props.service.mode === mode_edit) {
            colorFondo = "#fff643";
            colorFondoLight = "#fff758";
        } else if (this.props.service.mode === mode_added) {
            colorFondo = "#b3ff53";
            colorFondoLight = "#b3ff53";
        }        

        return <Segment.Group key={this.props.service.idServicio} id={this.props.service.idServicio}>
            <Segment.Group horizontal>
                <Segment style={{ backgroundColor: colorFondo }}>
                    <Grid columns="equal">
                        <Grid.Row style={{ padding: "4px 0px" }}>
                            <Grid.Column verticalAlign="middle">
                                <Header as='h3'>
                                    <Icon name={icono} size="big" />
                                    <Header.Content>{titulo}</Header.Content>
                                </Header>
                                {/*
                                <div>
                                    <Icon name={icono} size="big"/>
                                    {titulo}
                                </div>
                            */}
                            </Grid.Column>
                            <Grid.Column style={{ padding: "4px 8px" }}>
                                {buttons}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Segment.Group>

            <Segment.Group horizontal style={{ backgroundColor: colorFondoLight }}>
                {primeraFila}
            </Segment.Group>

            <Segment.Group horizontal style={{ backgroundColor: colorFondoLight }}>
                {segundaFila}
            </Segment.Group>
        </Segment.Group>
    }


    onClickGuardarServicio = () => {

        let obj = {
            ...this.state
        }
        console.log("state service : ", obj);
        obj = ServicioModel.toApiObj(obj);
        console.log("transformed service: ", obj);

        Requester.postServicio(obj, () => {

        }, () => {

        });
    }

}