import jwt from 'jsonwebtoken'
import config from 'config'

export default (user) => {
  const payload = {
    ...user,
    password: ''
  }
  return jwt.sign(payload, config.jwtSecret)
}
