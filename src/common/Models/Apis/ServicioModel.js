
export default class ServicioModel {

    constructor(e) {

        this.idServicio = e.hasOwnProperty("_id") ? e._id : "";
        this.nombre = e.hasOwnProperty("nombre") ? e.nombre : "-";
        this.ciudad = e.hasOwnProperty("ciudad") ? e.ciudad : "-";
        this.fechaEjecucion = e.hasOwnProperty("fechaEjecucion") ? e.fechaEjecucion : "-";
        this.fechaOut = e.hasOwnProperty("fechaOut") ? e.fechaOut : "-";
        this.nombrePasajero = e.hasOwnProperty("nombrePasajero") ? e.nombrePasajero : "-";
        this.cantPasajeros = e.hasOwnProperty("cantPasajeros") ? e.cantPasajeros : "-";
        this.horaInicio = e.hasOwnProperty("horaInicio") ? e.horaInicio : "-";
        this.horaFinal = e.hasOwnProperty("horaFinal") ? e.horaFinal : "-";
        this.descripcion = e.hasOwnProperty("descripcion") ? e.descripcion : "-";
        this.tren = e.hasOwnProperty("tren") ? e.tren : "-";
        this.alm = e.hasOwnProperty("alm") ? e.alm : "-";
        this.vuelo = e.hasOwnProperty("vuelo") ? e.vuelo : "-";
        this.vr = e.hasOwnProperty("vr") ? e.vr : "-";
        this.tc = e.hasOwnProperty("tc") ? e.tc : "-";
        this.idProveedor = e.hasOwnProperty("proveedor")? e.proveedor : "-";
        this.clase = e.hasOwnProperty("clase")? e.clase : "-";

    }

    static toApiObj(obj){
        let o = {
            _id:obj.idServicio,
            nombre:obj.nombre,
            ciudad:obj.ciudad,
            fechaEjecucion:obj.fechaEjecucion,
            fechaOut:obj.fechaOut,
            nombrePasajero:obj.nombrePasajero,
            cantPasajeros:obj.cantPasajeros,
            horaInicio:obj.horaInicio,
            horaFinal:obj.horaFinal,
            descripcion:obj.descripcion,
            tren:obj.tren,
            alm:obj.alm,
            vuelo:obj.vuelo,
            vr:obj.vr,
            tc:obj.tc,
            proveedor:obj.idProveedor,
            clase:obj.clase
        }
        return o;
    }

}