"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validarFecha = (req, res, next) => {
    const { fechaInicio, fechaFinal } = req.body;
    const fechaActual = new Date();
    const fecha1 = new Date(fechaInicio);
    const fecha2 = new Date(fechaFinal);
    // emparejando dias
    fecha1.setDate(fecha1.getDate() + 1);
    fecha2.setDate(fecha2.getDate() + 1);
    console.log(fecha1, fecha2, fechaActual);
    console.log('\n:', fecha1.toLocaleDateString(), fecha2.toLocaleDateString(), fechaActual.toLocaleDateString());
    if (fecha1.toLocaleDateString() >= fecha2.toLocaleDateString()) {
        return res.status(400).json({
            msg: `inconsistencia en fechas --fechaInicio > fechaFinal`
        });
    }
    if (fecha1.toLocaleDateString() < fechaActual.toLocaleDateString()) {
        return res.status(400).json({
            msg: `inconsistencia en fechas --fecha inicio < fechaActual`
        });
    }
    next();
};
exports.default = validarFecha;
//# sourceMappingURL=validar-fecha.js.map