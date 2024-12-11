'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Hospital extends Model {
    static associate(models) {
      // Define associations here
      this.hasMany(models.EmergencyRequest, { foreignKey: 'hospitalId', as: 'emergencyRequests' }); // Add association to EmergencyRequest
    }
  }

  Hospital.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      location: { type: DataTypes.STRING, allowNull: false },
      contactNumber: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      hospitalId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Hospitals',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // Or 'CASCADE' if deletion is intended to cascade.
      },
      
    },
    {
      sequelize,
      modelName: 'Hospital',
    }
  );

  return Hospital;
};
