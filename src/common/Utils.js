
export const AsignarV = (objAsignado, nombre, valor, valorDefecto) => {
    if (valor) {
        objAsignado[nombre] = valor
    } else {
        objAsignado[nombre] = valorDefecto;
    }
}