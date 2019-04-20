
const CONSTANTES_GLOBALES={
    ListaMeses: [
        { key: 1, text: 'Enero', value: 1 },
        { key: 2, text: 'Febrero', value: 2 },
        { key: 3, text: 'Marzo', value: 3 },
        { key: 4, text: 'Abril', value: 4 },
        { key: 5, text: 'Mayo', value: 5 },
        { key: 6, text: 'Junio', value: 6 },
        { key: 7, text: 'Julio', value: 7 },
        { key: 8, text: 'Agosto', value: 8 },
        { key: 9, text: 'Septiembre', value: 9 },
        { key: 10, text: 'Octubre', value: 10 },
        { key: 11, text: 'Noviembre', value: 11 },
        { key: 12   , text: 'Diciembre', value: 12 },
    ],
    TiposClientes:[
        { key: 1, text: 'Cliente directo', value: 1 },
        { key: 2, text: 'Operador mayorista', value: 2 },
        { key: 3, text: 'Operador minorista', value: 3 }
    ],
    TiposServicios:[
        { key: 1, text: 'Servicio general', value: 1 },
        { key: 2, text: 'Transporte', value: 2 }
    ],
    
    AliasClientes:{
        CLIENTE_DIRECTO:"CLDIR",
        OPERADOR_MAYORISTA:"OPMAY",
        OPERADOR_MINORISTA:"OPMIN"
    },

    AliasProovedores:{
        PERSONA:"PERSO",
        EMPRESA:"EMPRE",
        HOTEL:"HOTEL",
        RESTAURANTE:"RESTA",
        TRANSPORTE:"TRANS",
        GUIA:"GUIAA",
        OPERADOR:"OPERA"
    },

    AliasServicios:{
        TRANSPORTE:"TRANS",
        SERVICIO:"SERVI"
    }
}

const Configuracion={
    ServerUrl:"http://localhost:65212",
    EnlacesNavBar:[
        {nombre:"Inicio", valor:"/inicio"},
        {nombre:"Files", valor:"/files"},
        {nombre:"Servicios", valor:"/servicios"},
        {nombre:"Biblias", valor:"/biblias"},
        {nombre:"Proveedores", valor:"/proveedores"},
        {nombre:"Clientes", valor:"/clientes"},
        {nombre:"Calendario", valor:"/calendario"},
    ]
}

class RptaTrx{
    cont;
    msj;
    trace;
    cod;
    constructor(response){
        if(response){
            this.cont = response.cont;
            this.msj = response.msj;
            this.trace = response.trace;
            this.cod = response.cod;
        }
    }

    set=(cont,msj,trace,cod)=>{
        this.cont = cont;
        this.msj = msj;
        this.trace = trace;
        this.cod = cod;
    };

    transaccionExitosa=()=>{
        return this.cod!=0
    }
}

export {Configuracion, RptaTrx};
export default CONSTANTES_GLOBALES;