module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    date: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    provider_id: DataTypes.INTEGER
  })

  Appointment.associate = models => {
    Appointment.belongsTo(models.User, { foreingKey: 'user_id' })
    Appointment.belongsTo(models.User, { foreingKey: 'provider_id' })
  }

  return Appointment
}
