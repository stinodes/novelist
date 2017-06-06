/**
 * @flow
 */
import store from 'store2'
import CONFIG from '../config'
import CustomError from './CustomError'
import User from './User'
import type { RawUser } from './User'
class API {

  static local = store.namespace(CONFIG.namespace)

  static currentUserId : string

  static isLoggedIn() {
    return !!this.currentUserId
  }

  static async register(user : User) : Promise<User> {
    if (this.getUser(user.id))
      throw new CustomError(
        'UserError',
        'This user has already been created',
        'UserAlreadyExists',
      )

    this.local(
      'users',
      (arr = []) => {
        const newArr = arr
        newArr.push(user)
        return newArr
      }
    )

    return this.getUser(user.id)
  }

  static async logIn(username : string, password : string) {
    const userToLogIn = await this.getUserForUsername(username)

    if (!userToLogIn.matchesPasswords(password))
      throw new CustomError(
        'UserError',
        'Wrong Password',
        'WrongCredentials',
      )

    this.setLoggedIn(userToLogIn.id)
    return this.me()
  }
  static async logout() {
    this.setLoggedOut()
  }

  static setLoggedIn(userId : string) {
    this.local('currentUser', userId)
  }
  static setLoggedOut() {
    this.local('currentUser', null)
  }
  static async me() {
    return this.getUser(this.local('currentUser'))
  }

  static async getUser(id : string) : Promise<User> {
    return User.fromRaw(
      this.local('users')
        .find( (user : RawUser) => user.id === id )
    )
  }
  static async getUserForUsername(username : string) : Promise<User> {
    return User.fromRaw(
      this.local('users')
        .find( (user : RawUser) => user.username === username )
    )
  }
}

export default API
