module.exports = function (sequelize, DataTypes) {
  var Subscriber = sequelize.define('Subscriber', {
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        Subscriber.belongsTo(models.Baby, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Subscriber;
};
