const { Model, DataTypes } = require("sequelize");

class Role extends Model {
  static initModel(sequelize) {
    Role.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        role: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "role",
        timestamps: false,
      },
    );

    return Role;
  }
}

module.exports = Role;
