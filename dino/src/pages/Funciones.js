import { formatInTimeZone } from "date-fns-tz";
import { addMonths } from "date-fns";

export const convertirHoraArgentina = (fechaISO) => {
    const timeZone = "America/Argentina/Buenos_Aires";
    return formatInTimeZone(fechaISO, timeZone, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
};



export const fechaDesplazar = (fecha, mesesDesplazamiento = 0) => {
    fecha = new Date(fecha);
    if (mesesDesplazamiento !== 0) {
        fecha = addMonths(fecha, mesesDesplazamiento);
    }
    return fecha.toISOString();
};

export const ahora = () => {
    const ahora = new Date().toISOString();
    return ahora
}

/*
export function ahora(mesesDesplazamiento = 0) {
    let ahora = new Date();
    if (mesesDesplazamiento !== 0) {
        ahora = addMonths(ahora, mesesDesplazamiento);
    }
    return ahora.toISOString();
}*/

export function reemplazarComasPorPuntos(cadena) {
    if (typeof cadena !== "string") {
        cadena = String(cadena); // Convierte a cadena si no lo es
    }
    return cadena.replace(/,/g, ".");
}

export function prependZero(number) {
    if (number <= 9) return "0" + number;
    else return number;
}

export function formatoNumero(valor) {
    console.log("formatoNumero");
    console.log(valor);
    // Verificar si el valor contiene punto o coma
    if (/[,]/.test(valor)) {
        console.log("si");
        // Reemplazar comas por puntos
        valor = valor.replace(/,/g, ".");
        console.log(valor);
        // Convertir a número (si es necesario)
        const valorNumerico = parseFloat(valor);
        // Asegurarnos de que tenga dos decimales
        const valorFormateado = valorNumerico.toFixed(2);
        console.log(valorFormateado);
        valorFormateado = prependZero(valorFormateado);
        return valorFormateado;
    } else {
        return valor;
    }
}

export function fechaAlReves(fecha) {
    console.log("fecha al reves");
    console.log(fecha);
    const x = fecha.split("-");
    const fechaAlReves = x[2] + "-" + x[1] + "-" + x[0];
    return fechaAlReves;
}

export function simplificaFecha(x, n) {
    console.log("simplificaFecha");
    console.log("x");
    console.log(x);

    const fecha = new Date(x);
    console.log("fecha");
    console.log(fecha);
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Los meses son 0-indexados
    const año = fecha.getFullYear();

    const fechaFormateada = `${dia}-${mes}-${año}`;
    //console.log(fechaFormateada); // Resultado: 01-10-2024

    if (n === 0) {
        //es español
        return fechaFormateada;
    } else {
        return fechaAlReves(fechaFormateada);
    }
}

export function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);

    // Asegurémonos de que la fecha de nacimiento sea válida
    if (isNaN(fechaNac)) {
        return "Fecha de nacimiento inválida. Por favor, ingresa una fecha válida en formato 'YYYY-MM-DD'.";
    }

    // Calculamos la diferencia en milisegundos entre hoy y la fecha de nacimiento
    const edadMilisegundos = hoy - fechaNac;

    // Convertimos la diferencia a años
    const edadAnios = Math.floor(
        edadMilisegundos / (365.25 * 24 * 60 * 60 * 1000)
    );

    console.log("calcularEdad**** " + edadAnios);

    return edadAnios;
}

export function diferenciaDias(fecha1, fecha2) {
    console.log(
        "////////////////////////////////////////////////////diferencia dias--/////////////////////////////////////-"
    );
    console.log(fecha1);
    console.log(fecha2);
    let f_1 = new Date(fecha1);
    let f_2 = new Date(fecha2);
    //console.log(f_1);
    var diff = f_2.getTime() - f_1.getTime();
    var dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    console.log(dias);
    return dias;
}
