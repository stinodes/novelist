import jwt from 'jsonwebtoken'
import config from 'config'

export default (user) => {
  console.log(user._doc)
  const payload = {
    ...user._doc,
    password: ''
  }
  return jwt.sign(payload, config.jwtSecret)
}
