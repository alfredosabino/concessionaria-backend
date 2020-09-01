module.exports = (sequelize, DataTypes) => {
    const Marca = sequelize.define('Marca', {
        nome: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.BOOLEAN
        }
    });

    return Marca;
};