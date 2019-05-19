import React from 'react'
import { Component } from 'react'
import { Button } from 'semantic-ui-react';
import ContainedComponent from '../../components/ContainedComponent';

class ModalPrueba1 extends ContainedComponent {
    
    render = () => {

        return <div>
            <p>1:</p>
            <Button onClick={() => {
                console.log("obj:", this.props.parent.state[this.props.pack]);


                var c = this.getParentContainer();
                c.valor1+="3";
                this.UpdateParentContainer({...this.getParentContainer(),valor1:"ctmre!"});
/*
                var obj = { ...this.props.parent.state[this.props.pack] };
                obj.valor1 += "2";
                obj.valor2 += "b2";

                console.log("OBJ: ", obj);
                this.props.parent.setState({ [this.props.pack]: obj })*/

                console.log("obj cambiado:", this.props.parent.state);
                console.log("obj cambiado:", this.props.parent);
            }}>
                Cambiar estado!
            </Button>
        </div>
    }


}

export default ModalPrueba1;