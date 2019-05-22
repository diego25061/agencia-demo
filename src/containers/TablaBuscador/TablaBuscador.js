import React from 'react'
import {Component} from 'react'
import { Container , Input} from 'semantic-ui-react';
import ReactTable from "react-table";
import 'react-table/react-table.css'


class TablaBuscador extends Component{

    
    state={
        queryBusqueda:""
    }


    columnasDefault=[
        {
            Header: 'Columna 1',
            accessor: 'col1'
        },
        {
            Header: 'Columna 2',
            accessor: 'col2',
            Cell: props => <span className='number'>{props.value}</span>
        },
        {
            Header: 'Columna 3!',
            accessor: 'col3',
        }
    ]

    render(){

        //filtrando data
        console.log("reupdate!")
        let dataFiltrada = this.props.data;

        let query = this.state.queryBusqueda;

        if(this.props.queryForzado)
            query=this.props.queryForzado;

		if (query) 
            if(dataFiltrada)
                dataFiltrada = dataFiltrada.filter(objetoFila => {
                    for (var property in objetoFila) {
                        if (objetoFila.hasOwnProperty(property)) {
                            let val = objetoFila[property];
                            if(val){
                                if(String(val).toLowerCase().includes(query.toLowerCase()))
                                    return true;
                            }
                        }
                    }
                    return false;
                })
        

        //mostrando data
        return <Container fluid>
                Buscar registros:{"      "}
                <Input style={{padding:"0px 0px 12px 0px"}}
                    placeholder="Buscar..."
                    value={query}
                    onChange={e => {
                        if(this.props.queryForzado)
                            this.props.vaciarQueryForzado(); 
                        this.setState({queryBusqueda: e.target.value})
                    }}/>
                <br/>
                <ReactTable
                    data={dataFiltrada}
                    columns={this.props.columns ? this.props.columns : this.columnasDefault} 
                    defaultPageSize={5}
                    minRows={5}
                    className="-highlight"
                />
            </Container>
    }
}

export default TablaBuscador;