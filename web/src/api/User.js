// @flow
import { murmur } from '../util'
import CONFIG from '../config'

export type RawUser = {
  id : ?string,
  email : string,
  username : string,
  hashedPassword : string,
  firstName : string,
  lastName : string,
  createdAt : ?number,
}

class User {

  id : string
  email : string
  username : string
  hashedPassword : string
  firstName : string
  lastName : string
  createdAt : number

  constructor(userData : RawUser) {
    this.id = userData.id || ''
    this.email = userData.email
    this.username = userData.username
    this.hashedPassword = userData.hashedPassword
    this.firstName = userData.firstName
    this.lastName = userData.lastName
    this.createdAt = userData.createdAt || 0
    if (!this.id)
      throw Error('No ID')
  }

  matchesPasswords(rawPassword : string) {
    return this.hashedPassword === User.hashPassword(rawPassword)
  }

  static hashPassword(password : string) {
    return murmur(password, CONFIG.seed)
  }

  static fromRaw(userData : RawUser) {
    return new User(userData)
  }

  static createNewUser(userData : {
    username : string,
    email : string,
    rawPassword : string,
    firstName : string,
    lastName : string,
  }) {
    const hashedPassword = this.hashPassword(userData.rawPassword),
      id = murmur(userData.username, Date.now()),
      createdAt = Date.now()

    return new User({
      ...userData,
      hashedPassword,
      id,
      createdAt,
    })
  }
}

export default User
