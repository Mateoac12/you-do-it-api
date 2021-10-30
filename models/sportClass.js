const { Schema, model } = require('mongoose')

const SportClassSchema = Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A user must create this class'],
  },
  activity: {
    type: String,
    required: [true, 'Activity is required'],
  },
  limitQuotas: {
    type: Number,
    required: [true, 'Is required have a limit quotas'],
  },
  quotas: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    default: [],
  },
  date: {
    type: Number,
    required: [true, 'Date is required'],
  },
  state: {
    type: Boolean,
    default: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
})

SportClassSchema.methods.toJSON = function () {
  const { __v, _id: id, ...restInfo } = this.toObject()
  return {
    ...restInfo,
    id,
  }
}

module.exports = model('Class', SportClassSchema)
