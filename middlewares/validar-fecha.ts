import { Request, Response } from "express";


const validarFecha = (req: Request, res:Response, next:any) => {


    const { fechaInicio, fechaFinal } = req.body;

    const fechaActual = new Date();
    const fecha1 = new Date(fechaInicio);
    const fecha2 = new Date(fechaFinal);

    
    // emparejando dias
    fecha1.setDate(fecha1.getDate() + 1);
    fecha2.setDate(fecha2.getDate() + 1);

    console.log('\n:', fecha1.toLocaleDateString(), fecha2.toLocaleDateString(), fechaActual.toLocaleDateString());

    if (fecha1.toLocaleDateString() >= fecha2.toLocaleDateString()) {
        return res.status(400).json({
            msg: `inconsistencia en fechas --fechaInicio > fechaFinal`
        });
    }
    
    if( fecha1.toLocaleDateString() < fechaActual.toLocaleDateString()){
        return res.status(400).json({
            msg : `inconsistencia en fechas --fecha inicio < fechaActual`
        });
    }


    next();
}

export default validarFecha;