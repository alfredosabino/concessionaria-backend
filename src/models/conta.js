module.exports = (sequelize, DataTypes) => {

    const Conta = sequelize.define('Conta', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        jwtVersion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });

    Conta.associate = (models) => {
        Conta.hasMany(
            models.Carro, { foreignKey: 'contaId' }
        )
    }

    Conta.prototype.toJSON = function () {
        const values = { ...this.get() };
        delete values.senha;
        return values;
    };

    return Conta;
};