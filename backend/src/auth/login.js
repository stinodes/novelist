import { passEquals } from './pwutil'
import jwt from './jwt'
import db from '../domain'

export default async (ctx) => {

  console.log(ctx)

  const body = ctx.request.body || {},
    {
      username,
      password,
    } = body,
    user = username && password ?
      await db.User
        .findOne({ username, })
        .exec() :
      null

  if (!user || !passEquals(password, user)) {
    ctx.status = 401
    ctx.body = { message: 'Wrong username or password.' }
  }
  else {
    const tokenPayload = {
        ...user,
        password: '',
      },
      token = jwt(tokenPayload)
    ctx.status = 200
    ctx.body = { message: 'Login was successful.', token, }
  }

}