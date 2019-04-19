import React from 'react';
import {Component} from 'react';
import { Form, Dropdown, Grid, Input } from 'semantic-ui-react';
import Constantes, { RptaTrx } from '../../../common/Constantes';
import ElementoForm from '../../../components/ElementoForm/ElementoForm';
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';

class CrearServicio extends Component{
    state={
        tipo: Constantes.TiposServicios[0].value,
        fecha:"",
        ciudad:"",
        nombre:null,
        file:null,
        hotel:null,
        pasajeros:null,
        nombrePasajero:null,
        alm:null,
        observaciones:null,
        proveedor:null,
        tren:null,
        horaRecojo:null,
        horaSalida:null,
        transporte:null
    }

    render(){
        if(this.state.tipo==Constantes.TiposServicios[0].value)
            return this.camposServ();
        else 
            return this.camposTransp();
    }

    camposTransp=()=>{
        return <div>
            <Form>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width="8">
                            <ElementoForm titulo="Tipo de servicio">
                                <Dropdown
                                    placeholder='Tipo'
                                    fluid
                                    search
                                    selection
                                    value={this.state.tipo}
                                    options={Constantes.TiposServicios}
                                    onChange = {(event,data)=>{
                                        this.setState({tipo:data.value});
                                        }}
                                />
                            </ElementoForm>
                        </Grid.Column>
                        <Grid.Column width="8">
                            <ElementoForm titulo="File">
                                <Dropdown
                                    placeholder='File'
                                    fluid
                                    search
                                    selection
                                />
                            </ElementoForm>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width="8">
                            <ElementoForm titulo="Fecha">
                                <DateInput
                                    fluid
                                    name="fecha"
                                    placeholder="10-02-2019"
                                    value={this.state.fecha}
                                    iconPosition="left"
                                    onChange = { (event, {name, value} )=>{
                                            if(name==="fecha"){
                                                this.setState({fecha:value});
                                        }
                                    }}
                                />
                            </ElementoForm>
                        </Grid.Column>
                        <Grid.Column width="8">
                            <ElementoForm titulo="Ciudad">
                                <Input 
                                    fluid
                                    placeholder="Ciudad"
                                    value={this.state.ciudad} 
                                    onChange={(event)=>{this.setState({ciudad:event.target.value})}}/>
                            </ElementoForm>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width="8">
                            <ElementoForm titulo="Nombre">
                                <Input 
                                    fluid
                                    placeholder="City tour"
                                    value={this.state.ciudad} 
                                    onChange={(event)=>{this.setState({ciudad:event.target.value})}}/>
                            </ElementoForm>
                        </Grid.Column>
                        <Grid.Column width="8">
                            <ElementoForm titulo="Observaciones">
                                <Input 
                                    fluid
                                    value={this.state.ciudad} 
                                    placeholder="Observaciones y detalles sobre el servicio"
                                    onChange={(event)=>{this.setState({ciudad:event.target.value})}}/>
                            </ElementoForm>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width="5">
                            <ElementoForm titulo="Hora recojo">
                            <TimeInput
                                    fluid
                                    name="horaRecojo"
                                    placeholder="16:30"
                                    value={this.state.horaRecojo}
                                    iconPosition="left"
                                    onChange = { (event, {name, value} )=>{
                                            if(name==="horaRecojo"){
                                                this.setState({horaRecojo:value});
                                        }
                                    }}
                                />
                            </ElementoForm>
                        </Grid.Column>
                        <Grid.Column width="5">
                            <ElementoForm titulo="Hora salida">
                                <TimeInput
                                    fluid
                                    name="horaSalida"
                                    placeholder="17:30"
                                    value={this.state.horaSalida}
                                    iconPosition="left"
                                    onChange = { (event, {name, value} )=>{
                                            if(name==="horaSalida"){
                                                this.setState({horaSalida:value});
                                        }
                                    }}
                                />
                            </ElementoForm>
                        </Grid.Column>
                        <Grid.Column width="6">
                            <ElementoForm titulo="Nombre pasajero">
                                <Input 
                                    fluid
                                    value={this.state.nombrePasajero} 
                                    placeholder="Christian Cueva"
                                    onChange={(event)=>{this.setState({nombrePasajero:event.target.value})}}/>
                            </ElementoForm>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width="5">
                            <ElementoForm titulo="Vuelo">
                                <Input 
                                    fluid
                                    placeholder="Vuelo"
                                    value={this.state.ciudad} 
                                    onChange={(event)=>{this.setState({ciudad:event.target.value})}}/>  
                            </ElementoForm>
                        </Grid.Column>
                        <Grid.Column width="5">
                            <ElementoForm titulo="Cantidad pasajeros">
                                <Input
                                    fluid
                                    placeholder={0}
                                    type="number"
                                    value={this.state.pasajeros} 
                                    onChange={(event)=>{this.setState({pasajeros:event.target.value})}}/>
                            </ElementoForm>
                        </Grid.Column>
                        <Grid.Column width="6">
                            <ElementoForm titulo="V/R">
                                <Input 
                                    fluid
                                    placeholder="V/R"
                                    value={this.state.ciudad} 
                                    onChange={(event)=>{this.setState({ciudad:event.target.value})}}/>
                            </ElementoForm>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width="5">
                            <ElementoForm titulo="TC">
                                <Input 
                                    placeholder="Tc"
                                    fluid
                                    value={this.state.ciudad} 
                                    onChange={(event)=>{this.setState({ciudad:event.target.value})}}/>
                            </ElementoForm>
                        </Grid.Column>
                        <Grid.Column width="5">
                            <ElementoForm titulo="Transporte">
                                <Input 
                                    icon='lightning'    
                                    iconPosition='left'
                                    fluid
                                    placeholder="Carlos"
                                    list="transportes"
                                    value={this.state.transporte} 
                                    onChange={(event)=>{this.setState({transporte:event.target.value})}}/>
                                <datalist id='transportes'>
                                    <option value='Transportes Juan' />
                                    <option value='Matias' />
                                </datalist>
                            </ElementoForm>
                        </Grid.Column>
                        {/*
                        <Grid.Column width="6">
                            <ElementoForm titulo="Proveedor">
                                <Input 
                                    fluid
                                    value={this.state.ciudad} 
                                    onChange={(event)=>{this.setState({ciudad:event.target.value})}}/>
                            </ElementoForm>
                        </Grid.Column>*/}
                    </Grid.Row>
                </Grid>
            </Form>
        </div>
    }

    camposServ = () => {
        return <div>
            <Form>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width="8">
                            <ElementoForm titulo="Tipo de servicio">
                                <Dropdown
                                    placeholder='Tipo'
                                    fluid
                                    search
                                    selection
                                    options={Constantes.TiposServicios}
                                    onChange = {(event,data)=>{
                                        this.setState({tipo:data.value});
                                        }}
                                />
                            </ElementoForm>
                        </Grid.Column>
                        <Grid.Column width="8">
                            <ElementoForm titulo="File">
                                <Dropdown
                                    placeholder='File'
                                    fluid
                                    search
                                    selection
                                />
                            </ElementoForm>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width="8">
                            <ElementoForm titulo="Fecha">
                                <DateInput
                                    fluid
                                    name="fecha"
                                    placeholder="10-02-2019"
                                    value={this.state.fecha}
                                    iconPosition="left"
                                    onChange = { (event, {name, value} )=>{
                                            if(name==="fecha"){
                                                this.setState({fecha:value});
                                        }
                                    }}
                                />
                            </ElementoForm>
                        </Grid.Column>
                        <Grid.Column width="8">
                            <ElementoForm titulo="Ciudad">
                                <Input 
                                    fluid
                                    placeholder="Ciudad"
                                    value={this.state.ciudad} 
                                    onChange={(event)=>{this.setState({ciudad:event.target.value})}}/>
                            </ElementoForm>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width="8">
                            <ElementoForm titulo="Nombre">
                                <Input 
                                    fluid
                                    placeholder="City tour"
                                    value={this.state.ciudad} 
                                    onChange={(event)=>{this.setState({ciudad:event.target.value})}}/>
                            </ElementoForm>
                        </Grid.Column>
                        <Grid.Column width="8">
                            <ElementoForm titulo="Observaciones">
                                <Input 
                                    fluid
                                    placeholder="Observaciones y detalles sobre el servicio"
                                    value={this.state.ciudad} 
                                    onChange={(event)=>{this.setState({ciudad:event.target.value})}}/>
                            </ElementoForm>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width="5">
                            <ElementoForm titulo="Hotel">
                                <Input 
                                    icon='lightning'    
                                    iconPosition='left'
                                    list="hoteles"
                                    fluid
                                    placeholder="Hotel Sheraton"
                                    value={this.state.hotel} 
                                    onChange={(event)=>{this.setState({hotel:event.target.value})}}/>
                                <datalist id='hoteles'>
                                    <option value='Sheraton' />
                                    <option value='Hotel melia' />
                                    <option value='Swissotel' />
                                </datalist>
                            </ElementoForm>
                        </Grid.Column>
                        <Grid.Column width="5">
                            <ElementoForm titulo="Cantidad pasajeros">
                                <Input 
                                    fluid
                                    placeholder={0}
                                    type="number"
                                    value={this.state.pasajeros} 
                                    onChange={(event)=>{this.setState({pasajeros:event.target.value})}}/>
                            </ElementoForm>
                        </Grid.Column>
                        <Grid.Column width="6">
                            <ElementoForm titulo="Nombre pasajero">
                                <Input 
                                    fluid
                                    value={this.state.nombrePasajero} 
                                    placeholder="Christian Cueva"
                                    onChange={(event)=>{this.setState({nombrePasajero:event.target.value})}}/>
                            </ElementoForm>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width="5">
                            <ElementoForm titulo="Tren">
                                <Input 
                                    fluid
                                    placeholder="Tren"
                                    value={this.state.tren} 
                                    onChange={(event)=>{this.setState({tren:event.target.value})}}/>  
                            </ElementoForm>
                        </Grid.Column>
                        <Grid.Column width="5">
                            <ElementoForm titulo="ALM">
                                <Input 
                                    fluid
                                    value={this.state.alm} 
                                    placeholder="ALM"
                                    onChange={(event)=>{this.setState({alm:event.target.value})}}/>
                            </ElementoForm>
                        </Grid.Column>
                        <Grid.Column width="6">
                            <ElementoForm titulo="Proveedor">
                                <Input 
                                    icon='lightning'    
                                    iconPosition='left'
                                    fluid
                                    placeholder="Umbro"
                                    list="proveedores"
                                    value={this.state.proveedor} 
                                    onChange={(event)=>{this.setState({proveedor:event.target.value})}}/>
                                <datalist id='proveedores'>
                                    <option value='Transportes Juan' />
                                    <option value='Matias' />
                                </datalist>
                            </ElementoForm>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        </div>
    }
}

export default CrearServicio;