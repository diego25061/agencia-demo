import React from 'react'
import { Component } from 'react'
import { Button, Container, Message, Icon, Input, Modal, Grid, Dropdown } from 'semantic-ui-react';
import ElementoForm from '../../components/ElementoForm/ElementoForm';
import Constantes from '../../common/Constantes';
import ContainedComponent from '../../components/ContainedComponent';
import MensajeTransaccion from '../../components/MensajeTransaccion/MensajeTransaccion';

class ModalCrearEditarProveedor extends ContainedComponent {

    componentDidMount=()=>{
        //console.log("Contenedor: ",this.getParentContainer());
    }

    render() {
        var CompElegir = ''
        if (this.props.elegirTipo) {
            CompElegir = <Grid.Row>
                <Grid.Column>
                    <ElementoForm grid titulo="Tipo de proveedor *">

                        <Dropdown fluid placeholder='Elegir Tipo'
                            search
                            selection
                            options={Constantes.TiposProveedores}
                            onChange={(event, data) => {
                                let obj = this.getParentContainer();
                                obj.campos.tipo = data.value;
                                this.UpdateParentContainer(obj);
                                /*
                                var obj = {...this.props.parent.state.modalCrearEditar};
                                obj.campos.tipo = data.value;
                                this.props.parent.setState({modalCrearEditar:obj});*/
                            }} />
                    </ElementoForm>
                </Grid.Column>
            </Grid.Row>
        }

        var msjSuccess = "Objeto creado";
        if (/*this.props.parent.state.modalCrearEditar.modo === "edicion"*/this.getParentContainer().modo==="edicion")
            msjSuccess = "Objeto editado exitosamente";

        var msjComp = <div></div>
        //console.log("weee");
        //console.log(this.props.parent.state.modalCrearEditar);
        let asd = 
        <MensajeTransaccion
            transaccionEnviada = {this.getParentContainer().mensaje.enviado} 
            responseRecibida = {this.getParentContainer().mensaje.recibido}
            rptaTransaccion = {this.getParentContainer().mensaje.respuesta}
            //textoExito = "Puede usar la nueva biblia"
        />

        /*{
        if (this.getParentContainer() && this.getParentContainer().mensaje ) {
            var mensaje = this.getParentContainer().mensaje;
            if (mensaje.enviado && !mensaje.recibido) {
                msjComp = <Message icon>
                    <Icon name='circle notched' loading />
                    <Message.Content>
                        <Message.Header>Espere un momento...</Message.Header>
                        Completando la transacción
                    </Message.Content>
                </Message>
            } else
                if (mensaje.recibido) {
                    if (mensaje.respuesta.transaccionExitosa()) {
                        msjComp = <Message success >
                            <Message.Header>Transaccion exitosa</Message.Header>
                            <Message.List>
                                <Message.Item>{msjSuccess}</Message.Item>
                                {mensaje.respuesta.msj ? <Message.Item> {mensaje.respuesta.msj} </Message.Item> : null}
                            </Message.List>
                        </Message>
                    } else {
                        msjComp = <Message negative>
                            <Message.Header>Error en transaccion</Message.Header>
                            <Message.List>
                                <Message.Item>{mensaje.respuesta.msj}</Message.Item>
                                {mensaje.respuesta.trace ? <Message.Item>{mensaje.respuesta.trace}</Message.Item> : null}
                            </Message.List>
                        </Message>
                    }
                }
    }*/

        return <Modal size="tiny" open={this.getParentContainer().abierto /* this.props.parent.state.modalCrearEditar.abierto*/} centered={true} onClose={() => {
            this.UpdateParentContainer({ ...this.getParentContainer(), abierto:false });
            this.props.enCerrar();

            /*var obj= {...this.props.parent.state.modalCrearEditar};
            obj.abierto=false;
            this.props.enCerrar();
            this.props.parent.setState({modalCrearEditar:obj});
            */
        }}>

            <Modal.Header>{/*this.props.parent.state.modalCrearEditar.modo==='creacion'*/ this.getParentContainer().modo ? 'Crear ' + this.props.sustantivoTitulo : 'Modificar ' + this.props.sustantivoTitulo}</Modal.Header>

            <Modal.Content>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <ElementoForm grid titulo="Nombre *">
                                <Input fluid placeholder={this.props.placeholderNombre} value={this.getParentContainer().campos.nombre/*this.props.parent.state.modalCrearEditar.campos.nombre*/} onChange={(event) => {
                                    /*var obj = {...this.props.parent.state.modalCrearEditar};
                                    obj.campos.nombre = event.target.value;
                                    this.props.parent.setState({modalCrearEditar:obj});*/
                                    let obj = this.getParentContainer();
                                    obj.campos.nombre = event.target.value;
                                    this.UpdateParentContainer(obj);
                                }} />
                            </ElementoForm>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <ElementoForm grid titulo="Correo electrónico">
                                <Input
                                    fluid
                                    iconPosition="left" placeholder={this.props.placeholderCorreo} value={this.getParentContainer().campos.correo/*this.props.parent.state.modalCrearEditar.campos.correo*/} onChange={(event) => {
                                        /*var obj = {...this.props.parent.state.modalCrearEditar};
                                        obj.campos.correo = event.target.value;
                                        this.props.parent.setState({modalCrearEditar:obj});*/
                                        let obj = this.getParentContainer();
                                        obj.campos.correo = event.target.value;
                                        this.UpdateParentContainer(obj);
                                    }}>
                                    <Icon name="at"></Icon>
                                    <input />
                                </Input>
                            </ElementoForm>
                        </Grid.Column>
                        <Grid.Column>
                            <ElementoForm grid titulo="Correo electrónico adicional">
                                <Input
                                    fluid
                                    iconPosition="left" placeholder={this.props.placeholderCorreoAdic} value={this.getParentContainer().campos.correoAdic/*this.props.parent.state.modalCrearEditar.campos.correoAdic*/} onChange={(event) => {
                                        /*var obj = {...this.props.parent.state.modalCrearEditar};
                                        obj.campos.correoAdic = event.target.value;
                                        this.props.parent.setState({modalCrearEditar:obj});*/
                                        let obj = this.getParentContainer();
                                        obj.campos.correoAdic = event.target.value;
                                        this.UpdateParentContainer(obj);
                                    }}>
                                    <Icon name="at"></Icon>
                                    <input />
                                </Input>
                            </ElementoForm>
                        </Grid.Column>
                    </Grid.Row>


                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <ElementoForm grid titulo="Numero contacto">
                                <Input
                                    fluid
                                    placeholder="98957845"
                                    iconPosition="left"
                                    value={this.getParentContainer().campos.num/*this.props.parent.state.modalCrearEditar.campos.num*/} onChange={(event) => {
                                        /*var obj = {...this.props.parent.state.modalCrearEditar};
                                        obj.campos.num = event.target.value;
                                        this.props.parent.setState({modalCrearEditar:obj});*/
                                        let obj = this.getParentContainer();
                                        obj.campos.num = event.target.value;
                                        this.UpdateParentContainer(obj);
                                    }}>
                                    <Icon name="phone"></Icon>
                                    <input />
                                </Input>
                            </ElementoForm>
                        </Grid.Column>
                        <Grid.Column>
                            <ElementoForm grid titulo="Numero contacto adicional">
                                <Input
                                    fluid
                                    placeholder="564-8790"
                                    iconPosition="left"
                                    value={this.getParentContainer().campos.numAdic/*this.props.parent.state.modalCrearEditar.campos.numAdic*/} onChange={(event) => {
                                        /*
                                        var obj = {...this.props.parent.state.modalCrearEditar};
                                        obj.campos.numAdic = event.target.value;
                                        this.props.parent.setState({modalCrearEditar:obj});*/
                                        let obj = this.getParentContainer();
                                        obj.campos.numAdic = event.target.value;
                                        this.UpdateParentContainer(obj);
                                    }}>
                                    <Icon name="phone"></Icon>
                                    <input />
                                </Input>
                            </ElementoForm>
                        </Grid.Column>
                    </Grid.Row>


                    <Grid.Row>
                        <Grid.Column>
                            <ElementoForm grid titulo="Ciudad">
                                <Input fluid placeholder="Cusco"
                                    value={this.getParentContainer().campos.ciudad/*this.props.parent.state.modalCrearEditar.campos.ciudad*/} onChange={(event) => {
                                        /*
                                        var obj = {...this.props.parent.state.modalCrearEditar};
                                        obj.campos.ciudad = event.target.value;
                                        this.props.parent.setState({modalCrearEditar:obj});*/
                                        let obj = this.getParentContainer();
                                        obj.campos.ciudad = event.target.value;
                                        this.UpdateParentContainer(obj);
                                    }} />
                            </ElementoForm>
                        </Grid.Column>
                    </Grid.Row>
                    {CompElegir}
                </Grid>
                {asd}
            </Modal.Content>

            <Modal.Actions>
                <Button negative onClick={() => {
                    /*
                    var obj= {...this.props.parent.state.modalCrearEditar};
                    obj.abierto=false;
                    this.props.enCerrar();
                    this.props.parent.setState({modalCrearEditar:obj});*/
                    let obj = this.getParentContainer();
                    obj.abierto = false;
                    this.UpdateParentContainer(obj);
                    this.props.enCerrar();
                }}>
                    Cancelar
                </Button>
                {
                    this.getParentContainer().modo /*this.props.parent.state.modalCrearEditar.modo*/ === 'creacion' ?
                        <Button positive icon='checkmark' labelPosition='right' content='Crear' onClick={this.props.enEnviar} /> :
                        <Button color="yellow" icon='checkmark' labelPosition='right' content='Modificar' onClick={this.props.enEditar} />
                }
            </Modal.Actions>

        </Modal>

    }
}
export default ModalCrearEditarProveedor;