
const CONSTANTES_GLOBALES={
    ListaMeses: [
        { key: 1 , text: 'Enero', value: 'enero' },
        { key: 2 , text: 'Febrero', value: 'febrero' },
        { key: 3 , text: 'Marzo', value: 'marzo' },
        { key: 4 , text: 'Abril', value: 'abril' },
        { key: 5 , text: 'Mayo', value: 'mayo' },
        { key: 6 , text: 'Junio', value: 'junio' },
        { key: 7 , text: 'Julio', value: 'julio' },
        { key: 8 , text: 'Agosto', value: 'agosto' },
        { key: 9 , text: 'Septiembre', value: 'septiembre' },
        { key: 10, text: 'Octubre', value: 'octubre' },
        { key: 11, text: 'Noviembre', value: 'noviembre'},
        { key: 12, text: 'Diciembre', value: 'diciembre' },
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
    
    TiposClientes:[
        { key: 1, text: 'Cliente directo', value: "CLDIR" },
        { key: 2, text: 'Operador mayorista', value: "OPMAY" },
        { key: 3, text: 'Operador minorista', value: "OPMIN" }
    ],

    TiposServicios:[
        { key: 1, text: 'Servicio general', value: 1 },
        { key: 2, text: 'Transporte', value: 2 },
        { key: 1, text: 'Hospedaje', value: 1 },
    ],
    TiposProveedores:[
        { key: 1, text: 'Persona', value: "PERSO"},
        { key: 2, text: 'Empresa', value: "EMPRE"},
        { key: 3, text: 'Hotel', value: "HOTEL"},
        { key: 4, text: 'Restaurant', value: "RESTA"},
        { key: 5, text: 'Transporte', value: "TRANS" },
        { key: 6, text: 'Guia', value: "GUIAA"},
        { key: 7, text: 'Operador', value: "OPERA" }
    ],

    aliasATextoProovedores : (alias) => {
        console.log("a");
        if(alias){
            if (alias===CONSTANTES_GLOBALES.AliasProovedores.PERSONA)
                return "Persona"
            if (alias===CONSTANTES_GLOBALES.AliasProovedores.EMPRESA)
                return "Empresa"
            if (alias===CONSTANTES_GLOBALES.AliasProovedores.HOTEL)
                return "Hotel"
            if (alias===CONSTANTES_GLOBALES.AliasProovedores.RESTAURANTE)
                return "Restaurante"
            if (alias===CONSTANTES_GLOBALES.AliasProovedores.GUIA)
                return "Guia"
            if (alias===CONSTANTES_GLOBALES.AliasProovedores.OPERADOR)
                return "Operador"
        }else
            return "ERROR";
    },

    aliasATextoClientes : (alias) => {
        console.log("a",alias);
        if(alias){
            if (alias===CONSTANTES_GLOBALES.AliasClientes.CLIENTE_DIRECTO)
                return "Cliente directo"
            if (alias===CONSTANTES_GLOBALES.AliasClientes.OPERADOR_MAYORISTA)
                return "Operador mayorista"
            if (alias===CONSTANTES_GLOBALES.AliasClientes.OPERADOR_MINORISTA)
                return "Operador minorista"
        }else
            return "ERROR";
    },

    AliasServicios:{
        TRANSPORTE:"TRANS",
        SERVICIO:"SERVI",
        HOSPEDAJE:"HOSPE"
    }

    
}


const Rol_Admin="Admin";
const Rol_Gerente="Gerente";
const Rol_Operador="Operador";
const Rol_Observador = "Observador";

const Configuracion={
    //ServerUrl:"http://localhost:65212",
    ServerUrl:"http://192.168.1.8:1337",
    EnlacesNavBar:[
        {nombre:"Inicio", valor:"/inicio" },
        {nombre:"Files", valor:"/files"},
        {nombre:"Servicios", valor:"/servicios"},
        {nombre:"Biblias", valor:"/biblias"},
        {nombre:"Proveedores", valor:"/proveedores"},
        {nombre:"Clientes", valor:"/clientes"},
        {nombre:"Calendario", valor:"/calendario"},
    ]
}

const CodigoMesATexto = (codigoMes) => {
    if(codigoMes){
        var obj = CONSTANTES_GLOBALES.ListaMeses.find(x=> x.key === codigoMes );
        console.log(obj);
        if(obj){
            return obj.text;
        }else{
            return "error";
        }
    }
}

const MesANumero=(mes)=>{
    switch(mes.toLowerCase()){
        case "enero": return 1; break;
        case "febrero": return 2; break;
        case "marzo": return 3; break;
        case "abril": return 4; break;
        case "mayo": return 5; break;
        case "junio": return 6; break;
        case "julio": return 7; break;
        case "agosto": return 8; break;
        case "septiembre": return 9; break;
        case "octubre": return 10; break;
        case "noviembre": return 11; break;
        case "diciembre": return 12; break;
        default:return 0;
    }
}


class RptaTrx{
    cont;
    msj;
    trace;
    cod;
    constructor(response){
        if(response){
            this.cont = {};
            this.msj = response.message;
            this.trace = response.error;
            this.cod = response.statusCode;

            if(!this.cont || !this.cod)
                this.cod=0;

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

export {Configuracion, RptaTrx, CodigoMesATexto, MesANumero};
export default CONSTANTES_GLOBALES;