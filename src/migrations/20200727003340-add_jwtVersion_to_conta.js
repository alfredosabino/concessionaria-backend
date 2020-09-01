'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Conta', 'jwtVersion', {
            type: Sequelize.INTEGER,
            allowNull: false,
            after: 'senha',
            defaultValue: 0
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Conta', 'jwtVersion');
    }
};