module.exports = function (sequelize, DataTypes) {
  var Status = sequelize.define('Status', {
    content: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        Status.belongsTo(models.Baby, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Status;
};
