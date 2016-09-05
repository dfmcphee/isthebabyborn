module.exports = function (sequelize, DataTypes) {
  var Baby = sequelize.define('Baby', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        Baby.hasMany(models.Status);
        Baby.hasMany(models.Subscriber);
      }
    }
  });

  return Baby;
};
