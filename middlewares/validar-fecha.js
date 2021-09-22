

const validarFecha = (req, res, next) => {


    const { fechaInicio, fechaFinal } = req.body;

    const fechaActual = new Date();
    const fecha1 = new Date(fechaInicio);
    const fecha2 = new Date(fechaFinal);

    //emparejando horas
    fechaActual.setHours(06,00,00,00);
    fecha1.setHours(06,00,00,00);
    fecha2.setHours(06,00,00,00);
    //emparejando dias
    fecha1.setDate(fecha1.getDate() + 1);
    fecha2.setDate(fecha2.getDate() + 1);

    console.log(fecha1, fecha2, fechaActual);

    if (fecha1 >= fecha2) {
        return res.status(400).json({
            msg: `inconsistencia en fechas --fechaInicio > fechaFinal`
        });
    }
    
    if( fecha1 < fechaActual){
        return res.status(400).json({
            msg : `inconsistencia en fechas --fecha inicio < fechaActual`
        });
    }


    next();
}

module.exports = {
    validarFecha
}