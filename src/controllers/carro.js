const express = require('express');

const { Carro } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    const { contaId } = req;
    const carros = await Carro.findAll({ where: { contaId } });
    if (!carros) return res.jsonNotFound();

    return res.jsonOK(carros);
});

router.get('/:id', async (req, res) => {
    const { contaId } = req;
    const { id } = req.params;
    const carro = await Carro.findOne({ where: { id, contaId } });
    if (!carro) return res.jsonNotFound();

    return res.jsonOK(carro);
});

router.post('/', async (req, res) => {
    const { contaId, body } = req;
    const { tipo, marca, modelo, versao, ano, quilometragem, cambio, placa, combustivel, cor, preco, conclusao } = body;
    const carro = await Carro.create({ tipo, marca, modelo, versao, ano, quilometragem, cambio, placa, combustivel, cor, preco, conclusao, contaId });

    return res.jsonOK(carro);
});

router.put('/:id', async (req, res) => {
    const { contaId, body } = req;
    const { id } = req.params;
    const fields = [
        'tipo',
        'marca',
        'modelo',
        'versao',
        'ano',
        'quilometragem',
        'cambio',
        'placa',
        'combustivel',
        'cor',
        'preco',
        'conclusao'
    ];

    const carro = await Carro.findOne({ where: { id, contaId } });
    if (!carro) return res.jsonNotFound();

    fields.map((fieldName) => {
        const newValue = body[fieldName];
        if (newValue) carro[fieldName] = newValue;
    });

    await carro.save();

    return res.jsonOK(carro);
});

router.delete('/:id', async (req, res) => {
    const { contaId } = req;
    const { id } = req.params;
    const carro = await Carro.findOne({ where: { id, contaId } });
    if (!carro) return req.jsonNotFound();

    await carro.destroy();

    return res.jsonOK();
});

module.exports = router;