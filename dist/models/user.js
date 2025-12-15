'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcrypt_1 = require("../lib/bcrypt");
exports.default = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
        static associate(models) {
            // define association here
        }
        async comparePassword(password) {
            return await (0, bcrypt_1.comparePassword)(this.password, password);
        }
    }
    User.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
        hooks: {
            beforeCreate: async (user) => {
                if (!user.password) {
                    throw new Error("Password is required");
                }
                user.password = await (0, bcrypt_1.hashPassword)(user.password);
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    user.password = await (0, bcrypt_1.hashPassword)(user.password);
                }
            },
        }
    });
    return User;
};
