'use strict';

import { UUID } from "crypto";
import { Model, Sequelize } from "sequelize";
import { comparePassword, hashPassword } from "../lib/bcrypt";

interface UserAttributes {
  uuid: UUID,
  name: string,
  email: string,
  password: string
}

export default (sequelize: Sequelize, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {

    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    uuid!: UUID;
    name!: string;
    email!: string;
    password!: string;

    static associate(models: any) {
      // define association here
    }

    async comparePassword(password: string) {
        return await comparePassword(this.password, password);
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
            user.password = await hashPassword(user.password);
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                user.password = await hashPassword(user.password);
            }
        },
    }
  });
  return User;
};