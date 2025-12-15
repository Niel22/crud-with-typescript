'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
exports.default = {
    async up(queryInterface) {
        await queryInterface.createTable('Users', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: true
            },
            uuid: {
                allowNull: false,
                primaryKey: true,
                type: sequelize_1.DataTypes.UUID
            },
            name: {
                type: sequelize_1.DataTypes.STRING
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                unique: true
            },
            password: {
                type: sequelize_1.DataTypes.STRING
            },
            createdAt: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE
            }
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('Users');
    }
};
