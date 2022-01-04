const { response } = require('express');

const postDetalleCarrito = async(req, res = response) => {
    const { ...data } = req.body;
    res.json({
        data
    });
}

const deleteDetalleCarrito = async(req, res = response) => {
    res.json({msg : 'delete'});
}

const updateDetalleCarrito = async (req, res = response) => {
    const { ...data } = req.body;
    res.json({
        data
    });
}

module.exports = {
    postDetalleCarrito,
    deleteDetalleCarrito,
    updateDetalleCarrito
}