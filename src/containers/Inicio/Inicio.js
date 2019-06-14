import React from 'react';
import {Component} from 'react';
import LogoYllari from '../../assets/logo_yllari.png'

import Huascaran from '../../assets/vistas/huascaran.png'
import Machupichu from '../../assets/vistas/machupichu.png'
import Costaverde from '../../assets/vistas/costaverdehd.png'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class Inicio extends Component{

    componentDidMount(){
        
        console.log(this.props)
    }
    
    render(){
        //return <div><h3>Pagina web en desarrollo :3</h3></div>
        
        return <div>
            <br/>
            <br/>
            <Carousel showThumbs={false} showArrows={true} 
            autoPlay
            stopOnHover
            infiniteLoop
            interval={8000}
            emulateTouch={true}>
            <div>
                <img src={Huascaran} />
            </div>
            <div>
                <img src={Machupichu} />
            </div>
            <div>
                <img src={Costaverde} />
            </div>
        </Carousel><br/><br/>
        </div>
    }
}

export default Inicio;