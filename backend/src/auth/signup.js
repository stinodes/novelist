import { cryptPass } from './pwutil'
import db from '../domain'
import jwt from './jwt'

export default async (ctx) => {

  const body = ctx.request.body || {},
    {
      username,
      password,
      email,
      dateOfBirth,
    } = body

  if (!username || !password || !email || !dateOfBirth) {
    ctx.status = 400
    ctx.body = { message: 'Not all required fields are filled in.' }
  }
  else if ( await db.User.findOne({ username, }) ) {
    ctx.status = 400
    ctx.body = { message: 'Username already taken.' }
  }
  else if ( await db.User.findOne({ email, }) ) {
    ctx.status = 400
    ctx.body = { message: 'Email already takeb.' }
  }
  else {
    const userBody = {
        ...body,
        password: cryptPass(password),
        roles: undefined,
      },
      user = await new db.User(userBody).save(),
      token = jwt(user)
    ctx.status = 201
    ctx.body = { token }
  }



}