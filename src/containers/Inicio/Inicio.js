import React from 'react';
import {Component} from 'react';

class Inicio extends Component{

    componentDidMount(){
        
        console.log(this.props)
    }
    
    render(){
        return <div><h3>Pagina web en desarrollo :3</h3></div>
    }
}

export default Inicio;