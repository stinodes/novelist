import config from 'config'
import crypto from 'crypto'

export const cryptPass = (password) => crypto.createHmac('sha256', config.passSecret)
  .update(password)
  .digest('hex')

export const passEquals = (password, user) => user.password === cryptPass(password)

