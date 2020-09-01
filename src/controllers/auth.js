const express = require('express');
const bcrypt = require('bcrypt');
const { Conta } = require('../models');
const { contaLogin, contaCadastro } = require('../validators/conta');
const { getMessage } = require('../helpers/validator');
const { generateJwt, generateRefreshJwt, verifyRefreshJwt, getTokenFromHeaders } = require('../helpers/jwt');

const router = express.Router();

const saltRounds = 10;

router.post('/login', contaLogin, async (req, res) => {
    const { email, senha } = req.body;
    const conta = await Conta.findOne({ where: { email } });

    const match = conta ? bcrypt.compareSync(senha, conta.senha) : null;
    if (!match) return res.jsonBadRequest(null, getMessage('conta.login.invalido'));

    const token = generateJwt({ id: conta.id });
    const refreshToken = generateRefreshJwt({ id: conta.id, version: conta.jwtVersion });

    return res.jsonOK(conta, getMessage('conta.login.sucesso'), { token, refreshToken });
});

router.post('/cadastro', contaCadastro, async (req, res) => {
    const { nome, email, senha } = req.body;

    const conta = await Conta.findOne({ where: { email } });

    if (conta) return res.jsonBadRequest(null, getMessage('conta.cadastro.email_exists'));

    const hash = bcrypt.hashSync(senha, saltRounds);
    const newConta = await Conta.create({ nome, email, senha: hash });

    const token = generateJwt({ id: newConta.id });
    const refreshToken = generateRefreshJwt({ id: newConta.id, version: newConta.jwtVersion });

    return res.jsonOK(newConta, getMessage('conta.cadastro.sucesso'), { token, refreshToken });
});

router.post('/refresh', async (req, res) => {
    const token = getTokenFromHeaders(req.headers);
    if (!token) {
        return res.jsonUnauthorized(null, 'Token inválido');
    };

    try {
        const decoded = verifyRefreshJwt(token);
        const conta = await Conta.findByPk(decoded.id);
        if (!conta) return res.jsonUnauthorized(null, 'Token inválido');
        if (decoded.version !== conta.jwtVersion) {
            return res.jsonUnauthorized(null, 'Token inválido');
        };

        const meta = {
            token: generateJwt({ id: conta.id })
        };
        return res.jsonOK(null, null, meta);

    } catch (error) {
        return res.jsonUnauthorized(null, 'Token inválido');
    }

});

module.exports = router;