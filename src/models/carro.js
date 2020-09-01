module.exports = (sequelize, DataTypes) => {
    const Carro = sequelize.define('Carro', {
        tipo: {
            type: DataTypes.ENUM([
                '0 Km',
                'Novo',
                'Usado'
            ])
        },
        image: {
            type: DataTypes.STRING
        },
        marca: {
            type: DataTypes.STRING,
            allowNull: false,
            reference: {
                model: 'marca'
            }
        },
        modelo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        versao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        portas: {
            type: DataTypes.ENUM([
                '2P',
                '4P',
                '5P',
                '6P'
            ])
        },
        carroceria: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ano: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quilometragem: {
            type: DataTypes.FLOAT
        },
        cambio: {
            type: DataTypes.ENUM([
                'Automático',
                'Automático Sequencial',
                'Automátizada',
                'Automátizada DCT',
                'CVT',
                'Manual',
                'Semi-Automática',
            ])
        },
        placa: {
            type: DataTypes.STRING
        },
        combustivel: {
            type: DataTypes.ENUM([
                'Álcool',
                'Álcool e gás natural',
                'Diesel',
                'Flex',
                'Gás natural',
                'Gasolina',
                'Gasolina e álcool',
                'Gasolina e elétrico',
                'Gasolina e gás natural',
                'Gasolina, álcool, e gás natural',
                'Gasolina, álcool, gás natural, e benzina'
            ])
        },
        cor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        preco: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        conclusao: {
            type: DataTypes.ENUM([
                'A venda',
                'Reservado',
                'Vendido'
            ])
        }
    });

    Carro.associate = (models) => {
        Carro.belongsTo(
            models.Conta, { foreignKey: 'contaId' },
            models.Marca, { foreignKey: 'marca' }
        );
    };

    return Carro;
};