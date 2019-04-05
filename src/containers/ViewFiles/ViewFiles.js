import React from 'react';
import {Component} from 'react';
import FileCard from '../../components/FileCard/FileCard';
import {Link} from 'react-router-dom'
import './ViewFiles.css';

class ViewFiles extends Component{

    render(){
        return <div>
                <div className="ContenedorFileCards">
                    <FileCard codigo="1902-019" descripcion="Viaje a Panama!" agencia="Nts" ></FileCard>
                    <FileCard codigo="1902-019" descripcion="Viaje a Panama!" agencia="Nts" ></FileCard>
                </div>
                <hr></hr>
                <Link to="/file/crear">Agregar nuevo file</Link>
            </div>
    }

}
export default ViewFiles;