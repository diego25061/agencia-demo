import ClientModel from './ClientModel';
import BibliaModel from './BibliaModel';
import ServicioModel from './ServicioModel';

export default class FileModel {

    constructor(e) {
        this.idFile = e.hasOwnProperty("_id") ? e._id : "";
        this.codigo = e.hasOwnProperty("codigo") ? e.codigo : "-";
        //this.nombre = e.hasOwnProperty("nombre") ? e.nombre : "-";
        this.descripcion = e.hasOwnProperty("descripcion") ? e.descripcion : "-";

        this.biblia = e.hasOwnProperty("biblia") ? new BibliaModel(e.biblia) : {};
        this.cliente = e.hasOwnProperty("cliente") ? new ClientModel(e.cliente) : {};
        this.createdAt = e.hasOwnProperty("createdAt") ? e.createdAt : '';

        if (e.hasOwnProperty("servicios")) {
            let servicios = [];
            servicios = e.servicios.map((a, i) => {
                return new ServicioModel(a);
            });
            this.servicios = servicios;
        }        
        
    }

    static toApiObj(obj) {
        console.log("from object > ",obj);

        let servs =[];
        if(obj.servicios){
            servs= obj.servicios.map(element => {
                return ServicioModel.toApiObj(element);
            });
        }
        let o = {
            _id: obj.idFile,
            codigo: obj.codigo,
            descripcion: obj.descripcion,
            cliente: {
                _id: obj.idCliente
                },
            biblia: {
                _id:obj.idBiblia
            },
            servicios:servs
        }
        console.log("to object > ",o);
        
        return o;
    }

}