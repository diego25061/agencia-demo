import React from 'react';
import {Component} from 'react';
import './FileCard.css';

class FileCard extends Component{

    render(){
        console.log(this.props);
        return (
        <div className="FileCard">
            <b>{this.props.codigo}</b>
            <hr/>
            <p><em>{this.props.descripcion}</em></p>
            <p>Agencia {this.props.agencia}</p>
        </div>
        );
    }
}

export default FileCard;