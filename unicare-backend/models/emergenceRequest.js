'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EmergencyRequest extends Model {
    static associate(models) {
      // Define associations here
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      this.belongsTo(models.Hospital, { foreignKey: 'hospitalId', as: 'hospital' }); // Add association to Hospital
    }

    // Custom static method for creating an emergency request
    static async createEmergencyRequest(data) {
      try {
        const request = await this.create(data);
        return request;
      } catch (error) {
        throw new Error('Error creating emergency request: ' + error.message);
      }
    }
  }

  EmergencyRequest.init(
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hospitalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'EmergencyRequest',
      paranoid: true, // Enable soft deletes
    }
  );

  return EmergencyRequest;
};
