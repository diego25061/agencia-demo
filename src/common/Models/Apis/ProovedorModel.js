
export default class ProveedorModel {

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
    }

}