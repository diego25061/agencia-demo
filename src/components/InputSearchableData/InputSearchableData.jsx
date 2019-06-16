import React from 'react'
import { Component } from 'react'
import { Input , Dropdown,Button} from 'semantic-ui-react';

//class InputSearchableData extends Component {

/**
 * Input que se comporta como un searchable dropdown y fuerza que haya un valor igual a alguno de la lista.
 * Se le puede poner un boton al lado para facilitar el enlazado de objetos en forms complejos
 * @param {*} datalist
 *La datalist es una lista de objetos {text:"texto",value:"0"}.
 * 
 */
class InputSearchableDataButton extends React.Component {

    render = () => {
        let control = <div>
            <Input /* iconPosition='left'*/ transparent={this.props.transparent} list={this.props.linkId} loading={this.props.loading}
                disabled={this.props.disabled} placeholder={this.props.placeholder}
                fluid={this.props.fluid}
                value={this.props.value}
                onBlur={(event, data) => {/*
                console.log("proovs! ",this.state.opcionesProveedores);
                console.log("event! ",event.target.value);
                console.log("data! ",data);*/
                    if (event.target.value) {
                        let foundVal = this.props.datalist.find((obj) => {
                            /*
                            console.log("vallllllllllllll",obj.text);
                            if(obj.text.includes(event.target.value))
                                console.log(obj.text);*/
                            return obj.text.includes(event.target.value)
                        });
                        if (foundVal) {

                            this.props.setValue(foundVal);
                            /*
                            //console.log("VAL!",foundVal)
                            var servs = this.state.servicios.slice();
                            servs[this.props.index].proveedor = foundVal.text;
                            this.setState({ servicios: servs });*/
                        } else {
                            this.props.setValue({});
                            /*
                            var servs = this.state.servicios.slice();
                            servs[this.props.index].proveedor = "";
                            this.setState({ servicios: servs });*/
                        }
                    } else {
                        this.props.setValue({});
                        /*
                        var servs = this.state.servicios.slice();
                        servs[this.props.index].proveedor = "";
                        this.setState({ servicios: servs });*/
                    }
                }}
                onChange={(event) => {

                    this.props.setValue(event.target.value);
                    /*
                    var servs = this.state.servicios.slice();
                    servs[this.props.index].proveedor = event.target.value;
                    this.setState({ servicios: servs });*/
                }}>
                {/*
            <Icon name='lightning' />*/}
                <input />
                {this.props.sideButton}
            </Input>
            <datalist id={this.props.linkId}>
                {this.props.datalist.map(e => <option key={e.value} value={e.text} />)}
            </datalist>
        </div>

        let control2 = <div>
            <Dropdown
                placeholder={this.placeholder}
                search
                selection
                options={this.props.datalist}
                loading={this.props.loading}
                disabled={this.props.disabled}
                placeholder={this.props.placeholder}
                value={this.props.value}
                onChange={this.props.onChange}
            />
            {this.props.sideButton}
        </div>
        return control2;
    }

}

export default InputSearchableDataButton;