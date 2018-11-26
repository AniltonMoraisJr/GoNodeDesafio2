const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class AppointmentController {
  async index (req, res) {
    const { date: dateQuery } = req.query
    const { id } = req.session.user
    let appointments = null
    if (!dateQuery) {
      appointments = await Appointment.findAll({
        include: [
          {
            model: User,
            required: true
          }
        ],
        where: {
          provider_id: id,
          date: {
            [Op.between]: [
              moment()
                .startOf('day')
                .format(),
              moment()
                .endOf('day')
                .format()
            ]
          }
        },
        order: [['date', 'ASC']]
      })
    } else {
      appointments = await Appointment.findAll({
        include: [
          {
            model: User,
            required: true
          }
        ],
        where: {
          provider_id: id,
          date: {
            [Op.between]: [
              moment(parseInt(dateQuery))
                .startOf('day')
                .format(),
              moment(parseInt(dateQuery))
                .endOf('day')
                .format()
            ]
          }
        },
        order: [['date', 'ASC']]
      })
    }
    return res.render('appointments/index', { appointments })
  }
  async create (req, res) {
    const provider = await User.findByPk(req.params.provider)
    return res.render('appointments/create', { provider })
  }

  async store (req, res) {
    const { id } = req.session.user
    const { provider } = req.params
    const { date } = req.body

    await Appointment.create({
      user_id: id,
      provider_id: provider,
      date
    })

    return res.redirect('/app/dashboard')
  }
}

module.exports = new AppointmentController()
