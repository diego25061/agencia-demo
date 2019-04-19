import React from 'react'
import {Component} from 'react';
import ElementoForm from '../../../components/ElementoForm/ElementoForm';
import { Dropdown, Input, Icon, Grid} from 'semantic-ui-react';
import Constantes from '../../../common/Constantes';

class CamposCrearCliente extends Component{
    
    componentDidMount(){
        //this.props.contCliente.campos = {};
    }

    render(){
        return <Grid>
            <Grid.Row>
                <Grid.Column>
                    <ElementoForm titulo="Nombre *">
                        <Input fluid placeholder="Universal" 
                            onChange={(event)=>{ this.props.contenedor.nombre=event.target.value; /*this.props.contenedor.ff();*/ }}>
                        </Input>
                    </ElementoForm>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>

                <ElementoForm titulo="Tipo *">
                    <Dropdown placeholder="Operador" selection fluid search options={Constantes.TiposClientes}
                        onChange = {(event,data)=>{this.props.contenedor.tipo=data.value}}
                    ></Dropdown>
                </ElementoForm>
                </Grid.Column>
            </Grid.Row>
                
            <Grid.Row columns={2}>
                <Grid.Column>

                <ElementoForm titulo="Correo de contacto">
                    <Input placeholder="correo@gmail.com" iconPosition="left" fluid 
                        onChange={(event)=>{this.props.contenedor.correo=event.target.value}}>
                        <Icon name="at"></Icon>
                        <input />
                    </Input>
                </ElementoForm>
                </Grid.Column>
                <Grid.Column>
                <ElementoForm titulo="Correo adicional">
                    <Input placeholder="correo@gmail.com" iconPosition="left" fluid 
                        onChange={(event)=>{this.props.contenedor.correoAdicional=event.target.value}}>
                        <Icon name="at"></Icon>
                        <input />
                    </Input>
                </ElementoForm>
                </Grid.Column>
            </Grid.Row>
                
            <Grid.Row columns={2}>
                <Grid.Column>
                    <ElementoForm titulo="Numero contacto">
                        <Input placeholder="(511)97985020" fluid onChange={(event)=>{this.props.contenedor.numContacto=event.target.value}}></Input>
                    </ElementoForm>
                </Grid.Column>
                <Grid.Column>
                    <ElementoForm titulo="Numero contacto adicional">
                        <Input placeholder="(511)97985020" fluid onChange={(event)=>{this.props.contenedor.numContactoAdic=event.target.value}}></Input>
                    </ElementoForm>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
                <Grid.Column>
                    <ElementoForm titulo="Pais">
                        <Input placeholder="Colombia" fluid onChange={(event)=>{this.props.contenedor.pais=event.target.value}}></Input>
                    </ElementoForm>
                </Grid.Column>
                <Grid.Column>
                    <ElementoForm titulo="Ciudad">
                        <Input placeholder="Bogotá" fluid onChange={(event)=>{this.props.contenedor.ciudad=event.target.value}}></Input>
                    </ElementoForm>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    }
}

export default CamposCrearCliente;