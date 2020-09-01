const Joi = require('@hapi/joi');
const { getValidatorError } = require('../helpers/validator');

const rules = {
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    senha: Joi.string().pattern(new RegExp('^[a-zA-Z-0-9]{3,30}$')),
    confirmacao_senha: Joi.string().valid(Joi.ref('senha')).required()
};

const options = { abortEarly: false };

const contaLogin = (req, res, next) => {
    const { email, senha } = req.body;

    const schema = Joi.object({
        email: rules.email,
        senha: rules.senha
    })

    const { error } = schema.validate({ email, senha }, options);
    if (error) {
        const messages = getValidatorError(error, 'conta login');
        return res.jsonBadRequest(null, null, { error: messages });
    };
    next();
};

const contaCadastro = (req, res, next) => {
    const { nome, email, senha, confirmacao_senha } = req.body;

    const schema = Joi.object({
        nome: rules.nome,
        email: rules.email,
        senha: rules.senha,
        confirmacao_senha: rules.confirmacao_senha
    });

    const { error } = schema.validate({ nome, email, senha, confirmacao_senha }, options);
    if (error) {
        const messages = getValidatorError(error, 'conta.cadastro');

        return res.jsonBadRequest(null, null, { error: messages })
    }

    next();
};

module.exports = { contaLogin, contaCadastro };