import {
    AsignarV, AsignarCond
} from "../../Utils";


export default class ProveedorModel {

    constructor(e) {

        let result = {};
        AsignarV(result, "idProveedor", e._id, "");
        AsignarV(result, "nombre", e.nombre, "");
        AsignarV(result, "clase", e.clase, "");
        
        AsignarV(result, "correoContacto", e.correo, "");
        AsignarV(result, "correoAdicional", e.correo2, "");
        AsignarV(result, "numeroContacto", e.numero, "");
        AsignarV(result, "numeroContactoAdicional", e.numero2, "");
        AsignarV(result, "ciudad", e.ciudad, "");
 
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
            _id: obj.idProveedor,
            nombre: obj.nombre,
            clase: obj.clase,
            correo: obj.correoContacto,
            correo2: obj.correoAdicional,
            numero: obj.numeroContacto,
            numero2: obj.numeroContactoAdicional,
            ciudad: obj.ciudad
        }
*/
        let o = {};
        
        AsignarCond(o, "_id", obj.id, null);
        AsignarCond(o, "nombre", obj.nombre, null);
        AsignarCond(o, "clase", obj.clase, null);
        AsignarCond(o, "correo", obj.correoContacto, null);
        AsignarCond(o, "correo2", obj.correoAdicional, null);
        AsignarCond(o, "numero", obj.numeroContacto, null);
        AsignarCond(o, "numero2", obj.numeroContactoAdicional, null);
        AsignarCond(o, "ciudad", obj.ciudad, null);

        //let s ="";
        //s="_id";if(this.exists(obj,s))o[s]=obj.idCliente;
        //s="nombre";if(this.exists(obj,s))o[s]=obj.idCliente;
        return o;
    }
    /*
    constructor(e) {
        this.idProveedor = e.hasOwnProperty("_id") ? e._id : "";

        this.nombre = e.hasOwnProperty("nombre") ? e.nombre : "-";
        this.clase = e.hasOwnProperty("clase") ? e.clase : "-";

        this.correoContacto = e.hasOwnProperty("correo") ? e.correo : "-";
        this.correoAdicional = e.hasOwnProperty("correo2") ? e.correo2 : "-";

        this.numeroContacto = e.hasOwnProperty("numero") ? e.numero : "-";
        this.numeroContactoAdicional = e.hasOwnProperty("numero2") ? e.numero2 : "-";

        this.ciudad = e.hasOwnProperty("ciudad") ? e.ciudad : "-";
        this.tipo =  e.hasOwnProperty("clase") ? e.clase : "-";
    }

    static toApiObj(obj){
        let o = {
            _id:obj.idCliente,
            nombre:obj.nombre,
            clase:obj.tipo,
            correo:obj.correoContacto,
            correo2:obj.correoAdicional,
            numero:obj.numeroContacto,
            numero2:obj.numeroContactoAdicional,
            ciudad:obj.ciudad
        }
        return o;
    }*/

}