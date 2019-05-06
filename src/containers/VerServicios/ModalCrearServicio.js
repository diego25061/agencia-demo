import React from 'react';
import {Component} from 'react';
import { Modal,Grid,Input,Dropdown, Button, Form } from 'semantic-ui-react';
import ElementoForm from '../../components/ElementoForm/ElementoForm';
import Constantes from '../../common/Constantes';
import MensajeTransaccion from '../../components/MensajeTransaccion/MensajeTransaccion';
import { TimeInput, DateInput } from 'semantic-ui-calendar-react';


const CamposServ = (props) => {
    let cont = props.parentComp.state.modalServicio;
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
                                value={cont.tipo}
                                options={Constantes.TiposServicios}
                                onChange = {(event,data)=>{
                                    let obj = {...cont};
                                    obj.tipo = data.value;
                                    props.parentComp.setState({modalServicio:obj});
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
                                iconPosition="left"
                                value={cont.campos.fecha}
                                onChange = { (event, {name, value} )=>{ 
                                    if(name==="fecha"){
                                        let obj = {...cont};
                                        obj.campos.fecha = value;
                                        props.parentComp.setState({modalServicio:obj});
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
                                value={cont.campos.ciudad} 
                                onChange = {(event)=>{
                                    let obj = {...cont};
                                    obj.campos.ciudad = event.target.value;
                                    props.parentComp.setState({modalServicio:obj});
                                }}/>
                        </ElementoForm>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width="8">
                        <ElementoForm titulo="Nombre">
                            <Input 
                                fluid
                                placeholder="City tour"
                                value={cont.campos.nombre} 
                                onChange = {(event)=>{
                                    let obj = {...cont};
                                    obj.campos.nombre = event.target.value;
                                    props.parentComp.setState({modalServicio:obj});
                                }}/>
                        </ElementoForm>
                    </Grid.Column>
                    <Grid.Column width="8">
                        <ElementoForm titulo="Proveedor">
                            <Input 
                                icon='lightning'    
                                iconPosition='left'
                                fluid
                                placeholder="Umbro"
                                list="proveedores"
                                value={cont.campos.proveedor} 
                                onChange = {(event)=>{
                                    let obj = {...cont};
                                    obj.campos.proveedor = event.target.value;
                                    props.parentComp.setState({modalServicio:obj});
                                }}/>
                            <datalist id='proveedores'>
                                <option value='Transportes Juan' />
                                <option value='Matias' />
                            </datalist>
                        </ElementoForm>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>

{/*
                    <Grid.Column width="8">
                        <ElementoForm titulo="Hotel">
                            <Input 
                                icon='lightning'    
                                iconPosition='left'
                                list="hoteles"
                                fluid
                                placeholder="Hotel Sheraton"
                                value={cont.campos.hotel} 
                                onChange = {(event)=>{
                                    let obj = {...cont};
                                    obj.campos.hotel = event.target.value;
                                    props.parentComp.setState({modalServicio:obj});
                                }}/>
                            <datalist id='hoteles'>
                                <option value='Sheraton' />
                                <option value='Hotel melia' />
                                <option value='Swissotel' />
                            </datalist>
                        </ElementoForm>
                    </Grid.Column>
                            */}

                    <Grid.Column width="8">
                        <ElementoForm titulo="Cantidad pasajeros">
                            <Input 
                                fluid
                                placeholder={0}
                                type="number"
                                value={cont.campos.pasajeros} 
                                onChange = {(event)=>{
                                    let obj = {...cont};
                                    obj.campos.pasajeros = event.target.value;
                                    props.parentComp.setState({modalServicio:obj});
                                }}/>
                        </ElementoForm>
                    </Grid.Column>
                    <Grid.Column width="8">
                        <ElementoForm titulo="Nombre pasajero">
                            <Input 
                                fluid
                                placeholder="Christian Cueva"
                                value={cont.campos.nombrePasajero} 
                                onChange = {(event)=>{
                                    let obj = {...cont};
                                    obj.campos.nombrePasajero = event.target.value;
                                    props.parentComp.setState({modalServicio:obj});
                                }}/>
                        </ElementoForm>
                    </Grid.Column>
                     
                    
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width="8">
                        <ElementoForm titulo="ALM">
                            <Input 
                                fluid
                                placeholder="ALM"
                                value={cont.campos.alm} 
                                onChange = {(event)=>{
                                    let obj = {...cont};
                                    obj.campos.alm = event.target.value;
                                    props.parentComp.setState({modalServicio:obj});
                                }}/>
                        </ElementoForm>
                    </Grid.Column>
                    <Grid.Column width="8">
                        <ElementoForm titulo="Tren">
                            <Input 
                                fluid
                                placeholder="Tren"
                                value={cont.campos.tren} 
                                onChange = {(event)=>{
                                    let obj = {...cont};
                                    obj.campos.tren = event.target.value;
                                    props.parentComp.setState({modalServicio:obj});
                                }}/>
                        </ElementoForm>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    
                    <Grid.Column width="16">
                        <ElementoForm titulo="Observaciones">
                            <Input 
                                fluid
                                placeholder="Observaciones y detalles sobre el servicio"
                                value={cont.campos.observaciones} 
                                onChange = {(event)=>{
                                    let obj = {...cont};
                                    obj.campos.observaciones = event.target.value;
                                    props.parentComp.setState({modalServicio:obj});
                                }}/>
                        </ElementoForm>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Form>
    </div>
}



const CamposTransp = (props) =>{
    let cont = props.parentComp.state.modalServicio;
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
                                value={cont.tipo}
                                options={Constantes.TiposServicios}
                                onChange = {(event,data)=>{
                                    let obj = {...cont};
                                    obj.tipo = data.value;
                                    props.parentComp.setState({modalServicio:obj});
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
                                iconPosition="left"
                                value={cont.campos.fecha}
                                onChange = { (event, {name, value} )=>{
                                        if(name==="fecha"){
                                            let obj = {...cont};
                                            obj.campos.fecha = value;
                                            props.parentComp.setState({modalServicio:obj});
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
                                value={cont.campos.ciudad} 
                                onChange = {(event)=>{
                                    let obj = {...cont};
                                    obj.campos.ciudad = event.target.value;
                                    props.parentComp.setState({modalServicio:obj});
                                }}/>
                        </ElementoForm>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width="8">
                        <ElementoForm titulo="Nombre">
                            <Input 
                                fluid
                                placeholder="City tour"
                                value={cont.campos.nombre} 
                                onChange = {(event)=>{
                                    let obj = {...cont};
                                    obj.campos.nombre = event.target.value;
                                    props.parentComp.setState({modalServicio:obj});
                                }}/>
                        </ElementoForm>
                    </Grid.Column>
                    <Grid.Column width="8">
                    
                    <ElementoForm titulo="Proveedor de Transporte">
                            <Input 
                                icon='lightning'    
                                iconPosition='left'
                                fluid
                                placeholder="Carlos"
                                list="transportes"
                                value={cont.campos.transporte} 
                                onChange = {(event)=>{
                                    let obj = {...cont};
                                    obj.campos.transporte = event.target.value;
                                    props.parentComp.setState({modalServicio:obj});
                                }}/>
                            <datalist id='transportes'>
                                <option value='Transportes Juan' />
                                <option value='Matias' />
                            </datalist>
                        </ElementoForm>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                        
                    <Grid.Column width="8">
                        <ElementoForm titulo="Cantidad pasajeros">
                            <Input
                                fluid
                                placeholder={0}
                                type="number"
                                value={cont.campos.pasajeros} 
                                onChange = {(event)=>{
                                    let obj = {...cont};
                                    obj.campos.pasajeros = event.target.value;
                                    props.parentComp.setState({modalServicio:obj});
                                }}/>
                        </ElementoForm>
                    </Grid.Column>
                    <Grid.Column width="8">

                        <ElementoForm titulo="Nombre pasajero">
                            <Input 
                                fluid
                                placeholder="Christian Cueva"
                                value={cont.campos.nombrePasajero} 
                                onChange = {(event)=>{
                                    let obj = {...cont};
                                    obj.campos.nombrePasajero = event.target.value;
                                    props.parentComp.setState({modalServicio:obj});
                                }}/>
                        </ElementoForm>

                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width="8">
                        <ElementoForm titulo="Hora recojo">
                        <TimeInput
                                fluid
                                name="horaRecojo"
                                placeholder="16:30"
                                iconPosition="left"
                                value={cont.campos.horaRecojo}
                                onChange = { (event, {name, value} )=>{ 
                                        if(name==="horaRecojo"){
                                            let obj = {...cont};
                                            obj.campos.horaRecojo = value;
                                            props.parentComp.setState({modalServicio:obj});
                                    }
                                }}
                            />
                        </ElementoForm>
                    </Grid.Column>
                    <Grid.Column width="8">
                        <ElementoForm titulo="Hora salida">
                            <TimeInput
                                fluid
                                name="horaSalida"
                                placeholder="17:30"
                                iconPosition="left"
                                value={cont.campos.horaSalida}
                                onChange = { (event, {name, value} )=>{ 
                                        if(name==="horaSalida"){
                                            let obj = {...cont};
                                            obj.campos.horaSalida = value;
                                            props.parentComp.setState({modalServicio:obj});
                                    }
                                }}
                            />
                        </ElementoForm>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    
                    <Grid.Column width="8">
                    
                        <ElementoForm titulo="V/R">
                            <Input 
                                fluid
                                placeholder="V/R"
                                value={cont.campos.vr} 
                                onChange = {(event)=>{
                                    let obj = {...cont};
                                    obj.campos.vr = event.target.value;
                                    props.parentComp.setState({modalServicio:obj});
                                }}/>
                        </ElementoForm>


                    </Grid.Column>
                    <Grid.Column width="8">
                        <ElementoForm titulo="Vuelo">
                            <Input 
                                fluid
                                placeholder="Vuelo"
                                value={cont.campos.vuelo} 
                                onChange = {(event)=>{
                                    let obj = {...cont};
                                    obj.campos.vuelo= event.target.value;
                                    props.parentComp.setState({modalServicio:obj});
                                }}/>
                        </ElementoForm>
                    </Grid.Column>
                </Grid.Row> 
                <Grid.Row>
                    <Grid.Column width="8">
                        <ElementoForm titulo="TC">
                            <Input 
                                placeholder="Tc"
                                fluid
                                value={cont.campos.nombrePasajero} 
                                onChange = {(event)=>{
                                    let obj = {...cont};
                                    obj.campos.nombrePasajero = event.target.value;
                                    props.parentComp.setState({modalServicio:obj});
                                }}/>
                        </ElementoForm>
                    </Grid.Column>
                </Grid.Row>
                    
                <Grid.Row>
                    <Grid.Column width="16">
                    
                        <ElementoForm titulo="Observaciones">
                            <Input 
                                fluid
                                placeholder="Observaciones y detalles sobre el servicio"
                                value={cont.campos.observaciones} 
                                onChange = {(event)=>{
                                    let obj = {...cont};
                                    obj.campos.observaciones = event.target.value;
                                    props.parentComp.setState({modalServicio:obj});
                                }}/>
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


const ModalCrearServicio = (props) =>{

    console.log("props:",props);

    var content =null;
    if(props.parentComp.state.modalServicio.tipo==Constantes.TiposServicios[0].value)
        content = <CamposServ parentComp={props.parentComp}/>;
    else 
        content = <CamposTransp parentComp={props.parentComp}/>;
    

    return (
    <Modal size="small" open ={props.parentComp.state.modalServicio.abierto} centered={true} 
        onClose={() => {
            var obj = {...props.parentComp.state.modalServicio};
            obj.abierto=false;
            props.parentComp.setState({modalServicio:obj});}
            }>
        <Modal.Header>Nuevo Servicio</Modal.Header>
        <Modal.Content>
            {content}

        </Modal.Content>
        <Modal.Actions>
            <Button negative onClick={() => {var obj = {...props.parentComp.state.modalServicio};
                obj.abierto=false;
                props.parentComp.setState({modalServicio:obj});}}>
                Cancelar
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content='Crear' onClick={props.parentComp.EnviarPostBiblia} />
        </Modal.Actions>
    </Modal>)  

}


export default ModalCrearServicio;