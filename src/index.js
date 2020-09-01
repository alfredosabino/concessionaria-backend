const express = require('express');
const cors = require('cors');
const db = require('./models');
const response = require('./middlewares/response');
const checkJwt = require('./middlewares/jwt');

const contaController = require('./controllers/auth');
const carroController = require('./controllers/carro');

const app = express();

app.use(cors());
app.use(response);
app.use(checkJwt);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', contaController);
app.use('/carro', carroController);

app.get('/', (req, res) => {
    return res.json("Api Iniciada...");
});

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Escutando na porta 3001');
    });
});