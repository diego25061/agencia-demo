import {
    AsignarV, AsignarCond
} from "../../Utils";

export default class ClientModel {

    constructor(e) {

        let result = {};
        AsignarV(result, "idCliente", e._id, "");
        AsignarV(result, "nombre", e.nombre, "");
        AsignarV(result, "clase", e.clase, "");
        
        if(e.hasOwnProperty("datos") && e.datos ){
            AsignarV(result, "correoContacto", e.datos.correo, "");
            AsignarV(result, "correoAdicional", e.datos.correo2, "");
            AsignarV(result, "numeroContacto", e.datos.numero, "");
            AsignarV(result, "numeroContactoAdicional", e.datos.numero2, "");
            AsignarV(result, "ciudad", e.datos.ciudad, "");
            AsignarV(result, "pais", e.datos.pais, "");
        }
        
        return result;
        /*
        this.idCliente = e.hasOwnProperty("_id") ? e._id : "";
        this.nombre = e.hasOwnProperty("nombre") ? e.nombre : "";
        this.clase = e.hasOwnProperty("clase") ? e.clase : "";

        if(e.hasOwnProperty("datos") && e.datos ){
            this.correoContacto = e.datos.hasOwnProperty("correo") ? e.datos.correo : "";
            this.correoAdicional = e.datos.hasOwnProperty("correo2") ? e.datos.correo2 : "";
            this.numeroContacto = e.datos.hasOwnProperty("numero") ? e.datos.numero : "";
            this.numeroContactoAdicional = e.datos.hasOwnProperty("numero2") ? e.datos.numero2 : "";
            this.ciudad = e.datos.hasOwnProperty("ciudad") ? e.datos.ciudad : "";
            this.pais = e.datos.hasOwnProperty("pais") ? e.datos.pais : "" ;
        }
        */

    }

    static toApiObj(obj) {
        /*
        let o = {
            _id: obj.idCliente,
            nombre: obj.nombre,
            clase: obj.clase,
            datos: {
                correo: obj.correoContacto,
                correo2: obj.correoAdicional,
                numero: obj.numeroContacto,
                numero2: obj.numeroContactoAdicional,
                ciudad: obj.ciudad,
                pais: obj.pais
            }
        }
        //let s ="";
        //s="_id";if(this.exists(obj,s))o[s]=obj.idCliente;
        //s="nombre";if(this.exists(obj,s))o[s]=obj.idCliente;
        return o;

        */
        let o = {};
        
        AsignarCond(o, "_id", obj.idCliente, null);
        AsignarCond(o, "nombre", obj.nombre, null);
        AsignarCond(o, "clase", obj.clase, null);

        let datos = {};

        AsignarCond(datos, "correo", obj.correoContacto, null);
        AsignarCond(datos, "correo2", obj.correoAdicional, null);
        AsignarCond(datos, "numero", obj.numeroContacto, null);
        AsignarCond(datos, "numero2", obj.numeroContactoAdicional, null);
        AsignarCond(datos, "ciudad", obj.ciudad, null);
        AsignarCond(datos, "pais", obj.pais, null);

        o.datos = datos;

        //let s ="";
        //s="_id";if(this.exists(obj,s))o[s]=obj.idCliente;
        //s="nombre";if(this.exists(obj,s))o[s]=obj.idCliente;
        return o;

    }

/*
    static exists(obj, param) {
        if (obj.hasOwnProperty(param) && obj[param.toString()])
            return true;
        return false;
    }*/

}