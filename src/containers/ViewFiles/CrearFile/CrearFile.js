import React from 'react'
import {Component} from 'react'
import {Dropdown, Input, TextArea, Form, Grid, Segment, Button, Icon, Label, Table, Menu, Popup, Header, Modal} from 'semantic-ui-react'

import ElementoForm from '../../../components/ElementoForm/ElementoForm';
import Constantes from '../../../common/Constantes';
import CamposCrearCliente from '../../VerClientes/CamposCrearCliente/CamposCrearCliente';

//date pickers
import {
    DateInput,
    TimeInput,
    DateTimeInput,
    DatesRangeInput
  } from 'semantic-ui-calendar-react';

class CrearFile extends Component{

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
        //datos de modals
        modalBibliasAbierto:false,
        modalClientesAbierto:false,

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
        opcionesBiblia: [{value:1, text:'mayo, 2019'}],
        opcionesCliente: [{value:1, text:'juancito'}]
    }
    
    
    render(){
        const countryOptions = [
            {  value: 'af', text: 'Afghanistan' },
            {  value: 'ax', text: 'Aland Islands' },
            {  value: 'al', text: 'Albania' },
            {  value: 'dz', text: 'Algeria' },
            {  value: 'as', text: 'American Samoa' },
            {  value: 'ad', text: 'Andorra' },
            {  value: 'ao', text: 'Angola' },
            {  value: 'ai', text: 'Anguilla' },
            {  value: 'ag', text: 'Antigua' },
          ]

          
        return <div>
        <Header size="large">Formulario de creacion: nuevo file</Header>
            <Grid columns={2} >
                <Grid.Row>
                    <Grid.Column width={8}>
                        <ElementoForm titulo="Codigo">
                            <Input placeholder="002-134" ></Input>
                        </ElementoForm>

                        <ElementoForm titulo="Descripcion">
                            <Form>
                                {/*style={{ minHeight: 100 }}*/}
                                <TextArea placeholder='Descripcion del file' rows={1}  />
                            </Form>
                        </ElementoForm>

                    </Grid.Column>
                    
                    <Grid.Column width={8}>
                        <ElementoForm titulo="Biblia">
                            {/*<Input  type="text" fluid placeholder="2019, Mayo"></Input>*/}
                            <Dropdown
                                placeholder='Mes, año'
                                search
                                selection
                                options={this.state.opcionesBiblia}
                            />
                            <Button attached="right" icon onClick={
                                () => {this.setState({modalBibliasAbierto:true})}
                            }>
                                <Icon name='plus' />
                            </Button>
                        </ElementoForm>
                        <ElementoForm titulo="Cliente">
                            {/*<Input  type="text" fluid placeholder="Javi"></Input>*/}
                            <Dropdown
                                placeholder='Christian'
                                search
                                selection
                                options={this.state.opcionesCliente}
                            />
                            <Button attached="right" icon onClick={
                                () => {this.setState({modalClientesAbierto:true})}
                            }>
                                <Icon name='plus' />
                            </Button>
                        </ElementoForm>
                    </Grid.Column>
                    <Grid.Column textAlign="right" width={6}>
                    {/*
                        <Label fluid as='a' color='red' tag>
                            File no guardado
                    </Label>*/}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <ElementoForm titulo="Servicios">
                            <Segment>
                                <Grid textAlign="justified" >
                                    <Grid.Row  columns={11}>
                                        <ColumnaTablaIns textAlign="center">#</ColumnaTablaIns>
                                        <ColumnaTablaIns textAlign="center">Fecha</ColumnaTablaIns>
                                        <ColumnaTablaIns textAlign="center">Ciudad</ColumnaTablaIns>
                                        <ColumnaTablaIns textAlign="center">Servicio</ColumnaTablaIns>
                                        <ColumnaTablaIns textAlign="center">Hotel</ColumnaTablaIns>
                                        <ColumnaTablaIns textAlign="center">Pasajeros</ColumnaTablaIns>
                                        <ColumnaTablaIns textAlign="center">Nombre pax</ColumnaTablaIns>
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
                            </Segment>
                        </ElementoForm>
                        <Button content='Agregar servicio' icon='plus' labelPosition='left' onClick={()=>{
                            var servs = this.state.servicios.slice();
                            servs.push(this.servicioDefault());
                            this.setState({servicios:servs});
                        }}/>
                    </Grid.Column>
                </Grid.Row>
                
                <Grid.Row>
                    <Grid.Column width={16}>
                        <ElementoForm titulo="Transportes">
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
                                        <ColumnaTablaIns textAlign="center">Nombre Pax</ColumnaTablaIns>
                                        <ColumnaTablaIns textAlign="center">V/R</ColumnaTablaIns>
                                        <ColumnaTablaIns textAlign="center">TC</ColumnaTablaIns>
                                        <ColumnaTablaIns textAlign="center">Transp.</ColumnaTablaIns>
                                        <ColumnaTablaIns textAlign="center">OBS</ColumnaTablaIns>
                                        <ColumnaTablaIns textAlign="center"></ColumnaTablaIns>
                                    </Grid.Row>
                                    {this.state.transportes.map((elem,index)=>{
                                        return this.filaTransporte(index);
                                    })}
                                </Grid>
                                <br></br>
                            </Segment>
                        </ElementoForm>
                        <Button content='Agregar transporte' icon='plus' labelPosition='left' onClick={()=>{
                                var transps = this.state.transportes.slice();
                                transps.push(this.transporteDefault());
                                this.setState({transportes:transps});
                            }} />
                        </Grid.Column>
                </Grid.Row>
                
                        
            </Grid>
            <br></br>
            <hr></hr>
            <Button>Guardar file</Button>
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
                        <Input fluid placeholder="Lima" 
                        value={this.state.servicios[index].ciudad} 
                        onChange={(event)=>{
                            //var servs = {...this.state.servicios};
                            var servs = this.state.servicios.slice();
                            servs[index].ciudad = event.target.value;
                            this.setState({servicios:servs});
                        }}>
                        </Input>
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
                        <Input fluid placeholder="Hotel" value={this.state.servicios[index].hotel} 
                        onChange={(event)=>{
                            var servs = this.state.servicios.slice();
                            servs[index].hotel = event.target.value;
                            this.setState({servicios:servs});
                        }}></Input>
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
                        <Input fluid placeholder="Nombre pax" value={this.state.servicios[index].nombrePasajero} 
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
                        <Input fluid placeholder="Nombre pax"
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
                        <Input fluid placeholder="Transp."
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

    ModalCrearBiblia = () => {
        return (
        <Modal size="tiny" open ={this.state.modalBibliasAbierto} centered={false} onClose={() => {this.setState({modalBibliasAbierto:false})}}>
            <Modal.Header>Nueva biblia</Modal.Header>
            <Modal.Content>
                <ElementoForm titulo="Mes">
                    <Dropdown placeholder="Junio" fluid search selection options={Constantes.ListaMeses}/>
                </ElementoForm>
                <ElementoForm titulo="Año">
                    <Input fluid placeholder="Año"></Input>
                </ElementoForm>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={() => {this.setState({modalBibliasAbierto:false})}}>
                    Cancelar
                </Button>
                <Button positive icon='checkmark' labelPosition='right' content='Crear' />
            </Modal.Actions>
        </Modal>)    
    }
    
    ModalCrearCliente = () => {
        return (
        <Modal size="tiny" open ={this.state.modalClientesAbierto} centered={false} onClose={() => {this.setState({modalClientesAbierto:false})}}>
            <Modal.Header>Nuevo cliente</Modal.Header>
            <Modal.Content>
                <CamposCrearCliente/>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={() => {this.setState({modalClientesAbierto:false})}}>
                    Cancelar
                </Button>
                <Button positive icon='checkmark' labelPosition='right' content='Crear' />
            </Modal.Actions>
        </Modal>)    
    }
}

const FilaTablaIns=(props)=>{
    return (
        <Grid.Row columns={props.columns} style={{padding:"3px 0px"}}>{props.children}</Grid.Row>
    );
}

const ColumnaTablaIns=(props)=>{
    return <Grid.Column verticalAlign="middle" textAlign="center" style={{padding:"0px 4px"}}>{props.children}</Grid.Column>
}


  
export default CrearFile;