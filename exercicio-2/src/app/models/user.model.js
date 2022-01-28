
import { DataTypes, Model } from "sequelize";
import sequelize from './../../config/database.js';

class UserModel extends Model {}

UserModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false, // opcional
      modelName: "user",
    }
  );
UserModel.sync();
export {UserModel};