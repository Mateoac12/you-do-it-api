const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  displayName: {
    type: String,
    required: [true, 'displayName is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    required: [true, 'role is required'],
    enum: ['SPORTPLAYER', 'TRAINER'],
  },
  code: {
    type: String,
    default: null,
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
  classes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Class',
      },
    ],
  },
  gymPartner: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
})

UserSchema.methods.toJSON = function () {
  const { __v, password, _id: uid, ...restInfo } = this.toObject()
  return {
    ...restInfo,
    uid,
  }
}

module.exports = model('User', UserSchema)
