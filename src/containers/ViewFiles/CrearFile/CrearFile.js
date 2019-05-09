import React from 'react'
import {Component} from 'react'
import {Dropdown, Input, TextArea, Form, Grid, Segment, Button, Icon, Label, Table, Message, Popup, Header, Modal, Container} from 'semantic-ui-react'

import ElementoForm from '../../../components/ElementoForm/ElementoForm';
import Constantes, { RptaTrx } from '../../../common/Constantes';
import {Configuracion} from '../../../common/Constantes';
import CamposCrearCliente from '../../VerClientes/CamposCrearCliente/CamposCrearCliente';

//date pickers
import {DateInput,TimeInput,DateTimeInput,DatesRangeInput} from 'semantic-ui-calendar-react';
import axios from 'axios';
import ModalTrxSimple from '../../ModalTrxSimple/ModalTrxSimple';
import Requester from '../../../common/Services/Requester';

const CampoServicio = (props) =>{
    return <Segment style={{padding:"7px"}}><Header style={{margin:"-2px 0px 4px 0px"}} as="h4">{props.titulo}</Header>{props.componente}</Segment>
}

class CrearFile extends Component{

    constructor(props){
        super(props);
        this.modalClientesRef=React.createRef();
    }

    servicio = (fecha,ciudad,servicio,hotel,pasajeros,nombrePasajero,tren,alm,obs) => {
        return {fecha,ciudad,servicio,hotel,pasajeros,nombrePasajero,tren,alm,obs};
    }

    servicioDefault = () => {
        return this.servicio('','','','',0,'','','','')
    }

    transporte = (fecha,ciudad,horaRecojo,horaSalida,vuelo,servicio,pasajeros,nombrePasajero,vr,tc,transportista,obs) => {
        return {fecha,ciudad,horaRecojo,horaSalida,vuelo,servicio,pasajeros,nombrePasajero,vr,tc,transportista,obs};
    }

    transporteDefault = () =>{
        return this.transporte('','','','','','',0,'','','','','')
    }

    state={
        //datos de modal biblia
        modalCliente:{
            //abierto:false,
            transaccionEnviada:false,
            responseRecibida:false,
            rptaTransaccion:null
        },

        modalBiblia:{
            //abierto:false,
            transaccionEnviada:false,
            responseRecibida:false,
            rptaTransaccion:null
        },

        camposModalBiblia:{
            mes:null,
            anho:null
        },
        
        //datos de file
        codigo:'',
        descripcion:'',
        idBiblia: 0,
        idCliente: 0,
        servicios:[
            this.servicioDefault()
            //this.servicio('231','lima','ser','hotell',2,'johnn','trenn','elm','duhhhh'),
            //this.servicio('231','limaaaa','ser','hotell',2,'johnn','trenn','elm','duh'),
        ],
        transportes:[
            this.transporteDefault()
            //this.transporte('231','lima','02:35','16:28','acj-ctm','servicio','2','johnn','vr','tc','juan','csmmmmmmm')
            /*{fecha:'231',ciudad:'lima',horaRecojo:'02:35',horaSalida:'16:28',vuelo:'acj-ctm',
            servicio:'servicio',pasajeros:'2',nombrePasajero:'johnn',vr:'vr',tc:'tc',transportista:'juan',obs:'csmmmmmmm'}*/
        ],

        //opciones a elegir
        
        bibliasCargaron:false,
        bibliasCargaronExito:true,
        opcionesBiblia: [/*{value:1, text:'mayo, 2019'}*/],

        clientesCargaron:false,
        clientesCargaronExito:true,
        opcionesCliente: [/*{value:1, text:''}*/],

        hotelesCargaron:false,
        hotelesCargaronExito:true,
        opcionesHoteles: [/*{value:1, text:'juancito'}*/],

        opcionesCiudades:[],

        opcionesPaises:[]
    }
    
    
    contenedorCamposModalCliente = {
        //ff:()=>{console.log(this.contCliente)},
        //funcCrearCliente:()=>{}
    }

    cargarClientes(){
        Requester.getClientesListaDropdown(rpta=>{
            console.log(rpta);
            var listaOpsCliente = rpta.cont.map( element => { return { value:element.idCliente, text: element.nombre }});
            this.setState({
                clientesCargaronExito:false,
                clientesCargaron:true,
                opcionesCliente: listaOpsCliente
            }) 
        },(rptaError)=>{
            this.setState({
                clientesCargaronExito:false,
                clientesCargaron:true
            });
        });
    }

    cargarBiblias(){
        Requester.getBibliasDropdownCompleto((rpta)=>{
            var listaBiblias = rpta.cont.map( element => {return {value: element.idBiblia, text: element.nombre}});
            this.setState({opcionesBiblia: listaBiblias});
            this.setState({
                bibliasCargaronExito:false,
                bibliasCargaron:true
            });
        }, 
        (rptaError)=>{
            //console.log(rptaError);
            this.setState({
                bibliasCargaronExito:false,
                bibliasCargaron:true,
            });
        })
    }

    cargarCiudades(){
        Requester.getCiudades((rpta)=>{
            this.setState({opcionesCiudades: rpta.cont});
        }, 
        (rptaError)=>{
            console.error("Ciudades no cargadas");
        })
    }

    cargarPaises(){
        Requester.getPaises((rpta)=>{
            this.setState({opcionesPaises: rpta.cont});
        }, 
        (rptaError)=>{
            console.error("Paises no cargadas");
        })
    }

    cargarProveedoresNoTransp(){
        
    }

    cargarHoteles(){
        Requester.getHotelesListaDropdown(rpta=>{
            var listaOpsCliente = rpta.cont.map( element => { return { value:element.idHotel, text: element.nombre }});
            this.setState({
                opcionesHoteles: listaOpsCliente,
                hotelesCargaronExito: true,
                hotelesCargaron:true
            })
        }, 
        (rptaError)=>{
            //console.log(rptaError);
            this.setState({
                hotelesCargaronExito:false,
                hotelesCargaron:true
            });
        });
        /*
        axios.get(Configuracion.ServerUrl+"/hoteles/dropdown").then( response => { 
            var listaHoteles = response.data.map( element => {return {value: element.nombre, text: element.nombre}});
            this.setState({opcionesHoteles: listaHoteles}) 
            console.log(this.state.opcionesHoteles);
        });*/
    }

    componentDidMount(){
        console.log("wii");
        //Requester.getListadoFiles(this.filesRecibidos,this.filesError);
        
        this.cargarClientes();
        this.cargarBiblias();
        this.cargarHoteles();
        this.cargarCiudades();
        this.cargarPaises();
    }
    
    render(){
          
        let fieldStyle={margin:"6px 0 4px 0"};
        return <div>
        <Header size="large">Formulario de creacion: nuevo file</Header>
            <Grid columns={2} >
                <Grid.Row>
                    <Grid.Column width={5}>
                        <ElementoForm titulo="Codigo">
                            <Input fluid placeholder="002-134" ></Input>
                        </ElementoForm>

                    </Grid.Column>
                    <Grid.Column width={5}>
                        <ElementoForm titulo="Descripcion">
                            <Form>
                                {/*style={{ minHeight: 100 }}*/}
                                <TextArea placeholder='Descripcion del file' rows={1}  />
                            </Form>
                        </ElementoForm>

                    </Grid.Column>
                    
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={5}>
                        <ElementoForm titulo="Biblia">
                            {/*<Input  type="text" fluid placeholder="2019, Mayo"></Input>*/}
                            <Grid>
                            <Grid.Row columns='equal'>
                                <Grid.Column >
                                        <Dropdown fluid placeholder='Mes, año'
                                            search
                                            loading={!this.state.bibliasCargaron}
                                            selection 
                                            options={this.state.opcionesBiblia}
                                        />
                                        
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Button fluid icon onClick={
                                            () => {
                                                
                                                var state = {...this.state};
                                                state.modalBibliasAbierto=true;
                                                state.modalBiblia.responseRecibida=false;
                                                state.modalBiblia.transaccionEnviada=false;
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
                    
                    <Grid.Column width={5}>
                        <ElementoForm titulo="Cliente">
                            {/*<Input  type="text" fluid placeholder="Javi"></Input>*/}
                            <Dropdown fluid
                                placeholder='Christian'
                                search
                                loading ={!this.state.bibliasCargaron}
                                selection
                                options={this.state.opcionesCliente}
                            /> 
                        </ElementoForm>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={16}>
                    <Header size="tiny">Servicios</Header>
                        <Segment>
                            <Grid textAlign="justified" >
                                <Grid.Row  columns={11}>
                                    <ColumnaTablaIns textAlign="center">#</ColumnaTablaIns>
                                    <ColumnaTablaIns textAlign="center">Fecha</ColumnaTablaIns>
                                    <ColumnaTablaIns textAlign="center">Ciudad</ColumnaTablaIns>
                                    <ColumnaTablaIns textAlign="center">Servicio</ColumnaTablaIns>
                                    <ColumnaTablaIns textAlign="center">Proveedor</ColumnaTablaIns>
                                    <ColumnaTablaIns textAlign="center">Pasajeros</ColumnaTablaIns>
                                    <ColumnaTablaIns textAlign="center">Nombre pasajero</ColumnaTablaIns>
                                    <ColumnaTablaIns textAlign="center">Tren</ColumnaTablaIns>
                                    <ColumnaTablaIns textAlign="center">ALM</ColumnaTablaIns>
                                    <ColumnaTablaIns textAlign="center">OBS</ColumnaTablaIns>
                                    <ColumnaTablaIns textAlign="center"></ColumnaTablaIns>
                                </Grid.Row>
                                {this.state.servicios.map((elem,index)=>{
                                    return this.filaServicio(index);
                                })}
                            </Grid>
                            <br/>


                            <Segment.Group>
                                <Segment.Group horizontal>
                                    <Segment style={{backgroundColor:"aliceblue"}}>
                                        <Grid columns="equal">
                                            <Grid.Row style={{padding:"8px 0px"}}>
                                                <Grid.Column verticalAlign="middle">
                                                    <Header as="h3">Servicio 1</Header>
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <Button floated="right" color="red">Borrar</Button>            
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                        
                                    </Segment>
                                </Segment.Group>
                                <Segment.Group horizontal>
                                    <CampoServicio titulo="Nombre" componente={<Input transparent fluid placeholder="4 Pax Lima"/>} />
                                    <CampoServicio titulo="Ciudad de destino" componente={<Input transparent fluid placeholder="Lima"/>} />
                                    <CampoServicio titulo="Fecha ejecucion" componente={<Input transparent fluid placeholder="2/5/19"/>} />
                                    <CampoServicio titulo="Nombre pasajero" componente={<Input transparent fluid placeholder="Mike Morhaime"/>} />
                                </Segment.Group>
                                <Segment.Group horizontal>
                                    <CampoServicio titulo="Cant. pasajeros" componente={<Input transparent fluid placeholder="4"/>} />
                                    <CampoServicio titulo="Proveedor" componente={<Input transparent fluid placeholder="Cosapi"/>} />
                                    <CampoServicio titulo="Tren" componente={<Input transparent fluid placeholder="Tren"/>} />
                                    <CampoServicio titulo="ALM" componente={<Input transparent fluid placeholder="Punto Azul"/>} />
                                    <CampoServicio titulo="Obs" componente={<Input transparent fluid placeholder="Obs"/>} />
                                </Segment.Group>
                            </Segment.Group>

                            <Segment style={{backgroundColor:"aliceblue"}}>
                                <Grid>
                                    <Grid.Row columns="equal" divided>
                                        <Grid.Column > 
                                            <div style={{textAlign:"center"}}>
                                                <Header verticalAlign="top" as='h3'>Servicio #1</Header>                
                                            </div>
                                            <div style={{textAlign:"center", verticalAlign:"text-bottom"}}>
                                                <Button verticalAlign="bottom" textAlign="right" icon color='red'>
                                                    <Icon name='trash'/>
                                                </Button>
                                            </div>
                                            
                                            
                                            
                                        </Grid.Column>
                                        <Grid.Column width={14}>

                                            <Grid columns="equal">
                                                <Grid.Row>
                                                    <Grid.Column>

                                                        
 
                                                        <Header style={{margin:"0px 0px 4px 0px"}} sub>Nombre Servicio</Header>
                                                        
                                                        <Input style={fieldStyle} fluid placeholder="Nombre de servicio"></Input> 
                                                        <Header style={{margin:"0px 0px 4px 0px"}} sub>Ciudad de destino</Header>
                                                        <Input style={fieldStyle} fluid placeholder="Lima"></Input> 
                                                        <Header style={{margin:"0px 0px 4px 0px"}} sub>Fecha de ejecucion</Header>
                                                        <Input style={fieldStyle} fluid placeholder="Servicio"></Input> 
                                                        <Header style={{margin:"0px 0px 4px 0px"}} sub>Observaciones</Header>
                                                        <Input style={fieldStyle} fluid placeholder="Observaciones"></Input> 
                                                    </Grid.Column>
                                                    <Grid.Column> 
                                                        <Header style={{margin:"0px 0px 4px 0px"}} sub>Cantidad pasajeros</Header>
                                                        <Input style={fieldStyle} type="number" fluid placeholder="4"></Input> 
                                                        <Header style={{margin:"0px 0px 4px 0px"}} sub>Nombre pasajero</Header>
                                                        <Input style={fieldStyle} fluid placeholder="Christian Cueva"></Input> 
                                                    </Grid.Column>
                                                    <Grid.Column> 
                                                        <Header style={{margin:"0px 0px 4px 0px"}} sub>Proveedor asignado</Header>
                                                        <Input style={fieldStyle} fluid placeholder="Proveedor"></Input> 
                                                        <Header style={{margin:"0px 0px 4px 0px"}} sub>Tren</Header>
                                                        <Input style={fieldStyle} fluid placeholder="Tren"></Input> 
                                                        <Header style={{margin:"0px 0px 4px 0px"}} sub>Alm</Header>
                                                        <Input style={fieldStyle} fluid placeholder="ALM"></Input> 

                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>

                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </Segment>
                        <Button content='Agregar servicio' icon='plus' labelPosition='left' onClick={()=>{
                            var servs = this.state.servicios.slice();
                            servs.push(this.servicioDefault());
                            this.setState({servicios:servs});
                        }}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}> 
                    <Header size="tiny">Transportes</Header>
                        <Segment>
                            <Grid textAlign="center">
                                <Grid.Row columns={14}>
                                    <ColumnaTablaIns textAlign="center">#</ColumnaTablaIns>
                                    <ColumnaTablaIns textAlign="center">Fecha</ColumnaTablaIns>
                                    <ColumnaTablaIns textAlign="center">Ciudad</ColumnaTablaIns>
                                    <ColumnaTablaIns textAlign="center">Hora recojo</ColumnaTablaIns>
                                    <ColumnaTablaIns textAlign="center">Hora salida</ColumnaTablaIns>
                                    <ColumnaTablaIns textAlign="center">Vuelo</ColumnaTablaIns>
                                    <ColumnaTablaIns textAlign="center">Servicio</ColumnaTablaIns>
                                    <ColumnaTablaIns textAlign="center">Pasajeros</ColumnaTablaIns>
                                    <ColumnaTablaIns textAlign="center">Nombre pasajero</ColumnaTablaIns>
                                    <ColumnaTablaIns textAlign="center">V/R</ColumnaTablaIns>
                                    <ColumnaTablaIns textAlign="center">TC</ColumnaTablaIns>
                                    <ColumnaTablaIns textAlign="center">Proveedor de transporte</ColumnaTablaIns>
                                    <ColumnaTablaIns textAlign="center">OBS</ColumnaTablaIns>
                                    <ColumnaTablaIns textAlign="center"></ColumnaTablaIns>
                                </Grid.Row>
                                {this.state.transportes.map((elem,index)=>{
                                    return this.filaTransporte(index);
                                })}
                            </Grid>
                            <br></br>
                        </Segment>
                        <Button content='Agregar transporte' icon='plus' labelPosition='left' onClick={()=>{
                                var transps = this.state.transportes.slice();
                                transps.push(this.transporteDefault());
                                this.setState({transportes:transps});
                            }} />
                        </Grid.Column>
                </Grid.Row>
                        
            </Grid>
            
            {!this.state.bibliasCargaronExito?<Message error>Error de conexion: Las biblias no se pueden cargar.</Message>:null}            
            {!this.state.clientesCargaronExito?<Message error>Error de conexion: Los clientes no se pueden cargar.</Message>:null}            
            {!this.state.hotelesCargaronExito?<Message error>Error de conexion: Los hoteles no se pueden cargar.</Message>:null}            
            <hr/>
            <Container fluid textAlign="right">
                <Button positive>Guardar file</Button>
            </Container>
            {this.ModalCrearBiblia()}
            {this.ModalCrearCliente()}
        </div>

    }

    
    onDateChange = ( event, {name, value}) => {
        console.log(event );
        console.log(name );
        if(name==="date"){
            var servs = this.state.servicios.slice();
            servs[0].fecha=value;
            this.setState({servicios:servs});
        }
    }


    filaServicio = (index) => {
        return (<FilaTablaIns columns={11}>
                    <ColumnaTablaIns > 
                        <Label>{index+1}</Label>
                    </ColumnaTablaIns>
                    <ColumnaTablaIns> 
                        <DateInput 
                            fluid
                            name="fecha"
                            placeholder="01-02-2019"
                            value={this.state.servicios[index].fecha}
                            iconPosition="left"
                            onChange = { (event, {name, value} )=>{
                                    if(name==="fecha"){
                                        var servs = this.state.servicios.slice();
                                        servs[index].fecha=value;
                                        this.setState({servicios:servs});
                                        console.log(this.state);
                                }
                            }}
                        />
                    </ColumnaTablaIns>
                    
                    <ColumnaTablaIns style={{padding:"1px", margin:"1px"}}>
                    {/*
                        <Input fluid placeholder="Lima" 
                        value={this.state.servicios[index].ciudad} 
                        onChange={(event)=>{
                            //var servs = {...this.state.servicios};
                            var servs = this.state.servicios.slice();
                            servs[index].ciudad = event.target.value;
                            this.setState({servicios:servs});
                        }}>
                        </Input>
                    */}
                        <Input list={'ciudades'+index} placeholder='Lima' fluid
                            onChange={(event)=>{
                                var servs = this.state.servicios.slice();
                                servs[index].ciudad = event.target.value;
                                this.setState({servicios:servs});
                            }}/>
                        <datalist id={'ciudades'+index}>
                            {this.state.opcionesCiudades.map(e=><option value={e}/>)}
                        </datalist>
                    </ColumnaTablaIns>
                    <ColumnaTablaIns>
                        <Input fluid placeholder="Servicio" value={this.state.servicios[index].servicio} 
                        onChange={(event)=>{
                            var servs = this.state.servicios.slice();
                            servs[index].servicio = event.target.value;
                            this.setState({servicios:servs});
                        }}></Input>
                    </ColumnaTablaIns>
                    <ColumnaTablaIns>
                        {/*
                        <Dropdown fluid placeholder='Hotel' search selection 
                            options={this.state.opcionesHoteles}
                            onChange={(event,data)=>{
                                var servs = this.state.servicios.slice();
                                servs[index].hotel = data.value;
                                this.setState({servicios:servs});
                            }}
                        />*/}
                        <Input list={'hoteles'+index} loading={!this.state.hotelesCargaron} placeholder='Sheraton' fluid
                            label={<Dropdown defaultValue='.c' options={[
                                { key: '.c', text: '.c', value: '.c' },
                                { key: '.net', text: '.net', value: '.net' },
                                { key: '.org', text: '.org', value: '.org' },
                              ]} />}
                            labelPosition='right'
                            onChange={(event)=>{
                                var servs = this.state.servicios.slice();
                                servs[index].hotel = event.target.value;
                                this.setState({servicios:servs});
                            }}/>
                        <datalist id={'hoteles'+index}>
                            {this.state.opcionesHoteles.map(e=><option value={e.text}/>)}
                        </datalist>
                    </ColumnaTablaIns>
                    <ColumnaTablaIns>
                        <Input fluid placeholder="Pasajeros" value={this.state.servicios[index].pasajeros} 
                        onChange={(event)=>{
                            var servs = this.state.servicios.slice();
                            servs[index].pasajeros = event.target.value;
                            this.setState({servicios:servs});
                        }}></Input>
                    </ColumnaTablaIns>
                    <ColumnaTablaIns>
                        <Input fluid placeholder="Nombre" value={this.state.servicios[index].nombrePasajero} 
                        onChange={(event)=>{
                            var servs = this.state.servicios.slice();
                            servs[index].nombrePasajero = event.target.value;
                            this.setState({servicios:servs});
                        }}></Input>
                    </ColumnaTablaIns>
                    <ColumnaTablaIns>
                        <Input fluid placeholder="Tren" value={this.state.servicios[index].tren} 
                        onChange={(event)=>{
                            var servs = this.state.servicios.slice();
                            servs[index].tren = event.target.value;
                            this.setState({servicios:servs});
                        }}></Input>
                    </ColumnaTablaIns>
                    <ColumnaTablaIns>
                        <Input fluid placeholder="ALM" value={this.state.servicios[index].alm} 
                        onChange={(event)=>{
                            var servs = this.state.servicios.slice();
                            servs[index].alm = event.target.value;
                            this.setState({servicios:servs});
                        }}></Input>
                    </ColumnaTablaIns>
                    <ColumnaTablaIns>
                        <Input fluid placeholder="OBS" value={this.state.servicios[index].obs} 
                        onChange={(event)=>{
                            var servs = this.state.servicios.slice();
                            servs[index].obs = event.target.value;
                            this.setState({servicios:servs});
                        }}></Input>
                    </ColumnaTablaIns>
                    <ColumnaTablaIns textAlign="center">

                        <Popup
                            trigger={
                                <Button icon color='red' onClick={()=>{
                                    var lista = this.state.servicios.slice();
                                    lista.splice(index,1);
                                    this.setState({servicios:lista});
                                    console.log(this.state.servicios)
                                }}>
                                    <Icon name='trash'/>
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
                        <Label>{index+1}</Label>
                    </ColumnaTablaIns>
                    <ColumnaTablaIns>
                        <DateInput
                            fluid
                            name="fecha"
                            placeholder="10-02-2019"
                            value={this.state.transportes[index].fecha}
                            iconPosition="left"
                            onChange = { (event, {name, value} )=>{
                                    if(name==="fecha"){
                                        var transs = this.state.transportes.slice();
                                        transs[index].fecha=value;
                                        this.setState({transportes:transs});
                                        console.log(this.state);
                                }
                            }}
                        />
                    </ColumnaTablaIns>
                    <ColumnaTablaIns>
                        <Input fluid placeholder="Ciudad"
                        value={this.state.transportes[index].ciudad} 
                        onChange={(event)=>{
                            var trans = this.state.transportes.slice();
                            trans[index].ciudad = event.target.value;
                            this.setState({transportes:trans});
                        }}></Input>
                    </ColumnaTablaIns>
                    <ColumnaTablaIns>
                        <TimeInput
                            fluid
                            name="hora"
                            placeholder="9:00"
                            value={this.state.transportes[index].horaRecojo}
                            iconPosition="left"
                            onChange = { (event, {name, value} )=>{
                                    if(name==="hora"){
                                        var transs = this.state.transportes.slice();
                                        transs[index].horaRecojo=value;
                                        this.setState({transportes:transs});
                                        console.log(this.state);
                                }
                            }}
                        />
                    </ColumnaTablaIns>
                    <ColumnaTablaIns>
                        <TimeInput
                            fluid
                            name="hora"
                            placeholder="13:00"
                            value={this.state.transportes[index].horaSalida}
                            iconPosition="left"
                            onChange = { (event, {name, value} )=>{
                                    if(name==="hora"){
                                        var transs = this.state.transportes.slice();
                                        transs[index].horaSalida=value;
                                        this.setState({transportes:transs});
                                        console.log(this.state);
                                }
                            }}
                        />
                    </ColumnaTablaIns>
                    <ColumnaTablaIns>
                        <Input fluid placeholder="Vuelo"
                        value={this.state.transportes[index].vuelo} 
                        onChange={(event)=>{
                            var trans = this.state.transportes.slice();
                            trans[index].vuelo = event.target.value;
                            this.setState({transportes:trans});
                        }}></Input>
                    </ColumnaTablaIns>
                    <ColumnaTablaIns>
                        <Input fluid placeholder="Servicio"
                        value={this.state.transportes[index].servicio} 
                        onChange={(event)=>{
                            var trans = this.state.transportes.slice();
                            trans[index].ser = event.target.value;
                            this.setState({transportes:trans});
                        }}></Input>
                    </ColumnaTablaIns>
                    <ColumnaTablaIns>
                        <Input fluid placeholder="Pasajeros"
                        value={this.state.transportes[index].pasajeros} 
                        onChange={(event)=>{
                            var trans = this.state.transportes.slice();
                            trans[index].pasajeros = event.target.value;
                            this.setState({transportes:trans});
                        }}></Input>
                    </ColumnaTablaIns>
                    <ColumnaTablaIns>
                        <Input fluid placeholder="Nombre"
                        value={this.state.transportes[index].nombrePasajero} 
                        onChange={(event)=>{
                            var trans = this.state.transportes.slice();
                            trans[index].nombrePasajero = event.target.value;
                            this.setState({transportes:trans});
                        }}></Input>
                    </ColumnaTablaIns>
                    <ColumnaTablaIns>
                        <Input fluid placeholder="V/R"
                        value={this.state.transportes[index].vr} 
                        onChange={(event)=>{
                            var trans = this.state.transportes.slice();
                            trans[index].vr = event.target.value;
                            this.setState({transportes:trans});
                        }}></Input>
                    </ColumnaTablaIns>
                    <ColumnaTablaIns>
                        <Input fluid placeholder="TC"
                        value={this.state.transportes[index].tc} 
                        onChange={(event)=>{
                            var trans = this.state.transportes.slice();
                            trans[index].tc = event.target.value;
                            this.setState({transportes:trans});
                        }}></Input>
                    </ColumnaTablaIns>
                    <ColumnaTablaIns>
                        <Input fluid placeholder="Transportista"
                        value={this.state.transportes[index].transportista} 
                        onChange={(event)=>{
                            var trans = this.state.transportes.slice();
                            trans[index].transportista = event.target.value;
                            this.setState({transportes:trans});
                        }}></Input>
                    </ColumnaTablaIns>
                    <ColumnaTablaIns>
                        <Input fluid placeholder="OBS"
                        value={this.state.transportes[index].obs} 
                        onChange={(event)=>{
                            var trans = this.state.transportes.slice();
                            trans[index].obs = event.target.value;
                            this.setState({transportes:trans});
                        }}></Input>
                    </ColumnaTablaIns>
                    <ColumnaTablaIns textAlign="center">
                        <Button icon color='red' onClick={()=>{
                            var lista = this.state.transportes.slice();
                            lista.splice(index,1);
                            this.setState({transportes:lista});
                        }}>
                            <Icon name='trash' />
                        </Button>
                    </ColumnaTablaIns>
                </FilaTablaIns>)
    }

    EnviarPostBiblia=()=>{

        var newStateModalBiblia={...this.state.modalBiblia};
        newStateModalBiblia.transaccionEnviada=true;
        this.setState({modalBiblias:newStateModalBiblia});
        console.log(this.state.camposModalBiblia);

        Requester.postBiblia(this.state.camposModalBiblia,(rpta)=>{
            var newState = {...this.state.modalBiblia};
            newState.responseRecibida= true;
            newState.rptaTransaccion = rpta;
            this.cargarBiblias();
            this.setState({modalBiblia:newState});
        },(rptaError)=>{
            console.log("error!")
            console.log(rptaError)
            console.log(this.state.modalBiblia);
            var newState = {...this.state.modalBiblia};
            newState.responseRecibida=true;
            newState.rptaTransaccion = rptaError;
            console.log(this.state.modalBiblia);
            this.setState({modalBiblia:newState});
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

    
    EnviarPostCliente=(camposModalCliente)=>{
        //console.log(camposModalCliente);
        
        var newState = {...this.state.modalCliente};
        newState.transaccionEnviada=true;
        this.setState({modalCliente:newState});

        Requester.postCliente(this.state.camposModalCliente,(rpta)=>{
            var newState = {...this.state.modalCliente};
            newState.responseRecibida= true;
            newState.rptaTransaccion = rpta;
            this.cargarClientes();
            this.setState({modalCliente:newState});
        },(rptaError)=>{
            var newState = {...this.state.modalCliente};
            newState.responseRecibida=true;
            newState.rptaTransaccion = rptaError;
            this.setState({modalCliente:newState});
        });

    }

    ModalCrearBiblia = () => {
        
        let msj = <div></div>
        if (this.state.modalBiblia.transaccionEnviada && !this.state.modalBiblia.responseRecibida){
            msj = <Message icon>
                <Icon name='circle notched' loading />
                <Message.Content>
                    <Message.Header>Espere un momento...</Message.Header>
                    Creando biblia
                </Message.Content>
            </Message>
        }else
        if (this.state.modalBiblia.responseRecibida){
            console.log(this.state.modalBiblia)
            if(this.state.modalBiblia.rptaTransaccion.transaccionExitosa()){
                msj = <Message success header='Biblia nueva creada'>
                    <Message.List>
                        <Message.Item>Puede elegir la biblia nuevo desde las opciones</Message.Item>
                        {this.state.modalBiblia.rptaTransaccion.msj?<Message.Item>{this.state.modalBiblia.rptaTransaccion.msj}</Message.Item>:null}
                    </Message.List>
                </Message>
            }else {
                msj = <Message negative>
                    <Message.Header>Error al crear biblia</Message.Header>
                    <Message.List>
                        <Message.Item>{this.state.modalBiblia.rptaTransaccion.msj}</Message.Item>
                        {this.state.modalBiblia.rptaTransaccion.trace?<Message.Item>{this.state.modalBiblia.rptaTransaccion.trace}</Message.Item>:null}
                    </Message.List>
                </Message>
            }
        }

        
        return (
        <Modal size="tiny" open ={this.state.modalBibliasAbierto} centered={false} onClose={() => {this.setState({modalBibliasAbierto:false})}}>
            <Modal.Header>Nueva biblia</Modal.Header>
            <Modal.Content>
                <ElementoForm titulo="Mes">
                    <Dropdown placeholder="Junio" fluid search selection options={Constantes.ListaMeses} 
                        onChange = {(event,data)=>{
                            var newState = {...this.state};
                            newState.camposModalBiblia.mes= data.value;
                            this.setState(newState);
                            }}/>
                </ElementoForm>
                <ElementoForm titulo="Año">
                    <Input fluid placeholder="Año" onChange={(event)=>{
                            var newState = {...this.state};
                            newState.camposModalBiblia.anho=event.target.value;
                            this.setState(newState);
                        }}></Input>
                </ElementoForm>
                {msj}
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={() => {this.setState({modalBibliasAbierto:false})}}>
                    Cancelar
                </Button>
                <Button positive icon='checkmark' labelPosition='right' content='Crear' onClick={this.EnviarPostBiblia} />
            </Modal.Actions>
        </Modal>)    
    }
    

    ModalCrearCliente = () => {
        let msj = <div></div>
        if (this.state.modalCliente.transaccionEnviada && !this.state.modalCliente.responseRecibida){
            msj = <Message icon>
                <Icon name='circle notched' loading />
                <Message.Content>
                    <Message.Header>Espere un momento...</Message.Header>
                    Creando cliente
                </Message.Content>
            </Message>
        }else if (this.state.modalCliente.responseRecibida){
            if(this.state.modalCliente.rptaTransaccion.transaccionExitosa()){
                msj = <Message success header='Cliente nuevo creado'>
                    <Message.List>
                        <Message.Item>Puede elegir al cliente nuevo desde las opciones</Message.Item>
                        {this.state.modalCliente.rptaTransaccion.msj?<Message.Item>{this.state.modalCliente.rptaTransaccion.msj}</Message.Item>:null}
                    </Message.List>
                </Message>
            }else {
                msj = <Message negative>
                    <Message.Header>Error al crear cliente</Message.Header>
                    <Message.List>
                        <Message.Item>{this.state.modalCliente.rptaTransaccion.msj}</Message.Item>
                        {this.state.modalCliente.rptaTransaccion.trace?<Message.Item>{this.state.modalCliente.rptaTransaccion.trace}</Message.Item>:null}
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
            enAceptar={()=>{
                console.log("aceptando!");
                this.EnviarPostCliente(this.contenedorCamposModalCliente);
                }}>
            <CamposCrearCliente contenedor={this.contenedorCamposModalCliente}/>
            {msj}
        </ModalTrxSimple>
        )
    }
}

const FilaTablaIns=(props)=>{
    return (
        <Grid.Row columns={props.columns} style={{padding:"3px 0px"}}>{props.children}</Grid.Row>
    );
}

const ColumnaTablaIns=(props)=>{
    return <Grid.Column verticalAlign="middle" textAlign="center" style={{padding:"0px 1px"}}>{props.children}</Grid.Column>
}

export default CrearFile;