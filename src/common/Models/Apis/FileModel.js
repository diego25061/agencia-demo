import ClientModel from './ClientModel';
import BibliaModel from './BibliaModel';
import ServicioModel from './ServicioModel';

export default class FileModel {

    constructor(e) {
        if (e) {

            this.idFile = e.hasOwnProperty("_id") ? e._id : "";
            this.codigo = e.hasOwnProperty("codigo") ? e.codigo : "-";
            this.mes = e.hasOwnProperty("mes") ? e.mes : "-";
            this.anho = e.hasOwnProperty("anho") ? e.anho : "-";
            //this.nombre = e.hasOwnProperty("nombre") ? e.nombre : "-";
            this.descripcion = e.hasOwnProperty("descripcion") ? e.descripcion : "-";
            this.biblia = e.hasOwnProperty("biblia") ? new BibliaModel(e.biblia) : {};
            this.cliente = e.hasOwnProperty("cliente") ? new ClientModel(e.cliente) : {};
            this.createdAt = e.hasOwnProperty("createdAt") ? e.createdAt : '';
            if (e.servicios) {
                let servicios = [];
                servicios = e.servicios.map((a, i) => {
                    return new ServicioModel(a);
                });
                this.servicios = servicios;
            }
        } else
            return {}

    }

    static toApiObj(obj) {
        //console.log("from object > ",obj);
        let o = {};

        if (obj) {
            let servs = [];
            if (obj.servicios) {
                servs = obj.servicios.map(element => {
                    return ServicioModel.toApiObj(element);
                });
            }
            o = {
                _id: obj.idFile,
                codigo: obj.codigo,
                descripcion: obj.descripcion,
                mes: obj.mes,
                anho: obj.anho,
                cliente: {
                    _id: obj.idCliente
                },
                biblia: {
                    _id: obj.idBiblia
                },
                servicios: servs
            }
        }
        //console.log("to object > ",o);

        return o;
    }

}