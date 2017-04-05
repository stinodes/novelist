import mongoose, { Schema } from 'mongoose'

const Roles = {
    USER: 'USER',
    ADMIN: 'ADMIN',
  },
  userSchema = new Schema({
    username: { type: String, unique: true, isRequired: true, },
    password: { type: String, isRequired: true, },
    email: { type: String, unique: true, isRequired: true, },
    dateOfBirth: { type: Date, isRequired: true, },
    firstName: String,
    lastName: String,
    avatar: String,

    created: { type: Number, default: Date.now() },
    updated: { type: Number, default: Date.now() },
    lastLogin: Number,
    roles: {type: [ String ], default: [ Roles.USER ] },
  })

export default mongoose.model('User', userSchema)
export { Roles }
