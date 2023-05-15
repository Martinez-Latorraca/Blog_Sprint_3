const { Model, DataTypes } = require("sequelize");

class Permission extends Model {
  static initModel(sequelize) {
    Permission.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        permission: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "permission",
        timestamps: false,
      },
    );

    return Permission;
  }
}

module.exports = Permission;
