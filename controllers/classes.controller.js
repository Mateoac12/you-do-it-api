const { Types } = require('mongoose')
const SportClass = require('../models/sportClass')
const User = require('../models/user')

// for trainers
const createClass = async (req, res) => {
  const data = req.body
  try {
    const newClass = new SportClass(data)
    await newClass.save()
    res.json(newClass)
  } catch (error) {
    console.log(error.message)
  }
}

// for sportplayers
const addSportPlayer = async (req, res) => {
  const { uid, sportClassID } = req.body

  try {
    const [{ id, state }, currentClass] = await Promise.all([
      await User.findById(uid).populate('gymPartner'),
      await SportClass.findById(sportClassID),
    ])

    if (!state) {
      res.status(400).json({
        error: 'User not found',
      })
    }

    if (!currentClass.state) {
      res.status(400).json({
        error: 'Class was deleted',
      })
    }

    // out information of class
    const { quotas, limitQuotas, isCompleted } = currentClass

    // if the limit is a less value, will put completed class
    let newCompleteState = quotas.length === limitQuotas - 1
    let newQuotas = [...quotas, id]

    const existUserInQuotas = quotas.includes(Types.ObjectId(uid))

    if (isCompleted && !existUserInQuotas) {
      return res.status(400).json({
        message: 'Quotas completed',
      })
    }

    if (existUserInQuotas) {
      newCompleteState = false
      newQuotas = quotas.filter(
        (quote) =>
          Types.ObjectId(quote).toString() !== Types.ObjectId(uid).toString()
      )
    }

    const uploadClass = await SportClass.findByIdAndUpdate(
      sportClassID,
      {
        quotas: newQuotas,
        isCompleted: newCompleteState,
      },
      { new: true }
    )

    res.json({
      uploadClass,
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createClass,
  addSportPlayer,
}
