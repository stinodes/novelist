// @flow
export type ErrorType =
  'StoreError' |
  'UserError'

export type ErrorCode = 'NoUser' | 'UserAlreadyExists' | 'WrongCredentials'

export const ErrorCodes = {
  'UserAlreadyExists': 400,
  'WrongCredentials': 401,
  'NoUser': 401,
}

class CustomError extends Error {

  data : Object
  code : number
  toString : () => string

  constructor(
    name : ErrorType,
    message : ?string,
    code : ErrorCode|number,
    data : Object = {}
  ) {

    let codeNumber : number = typeof code === 'number' ? code : ErrorCodes[code]

    super(`[${code}]"${message || ''}"`)

    this.name = name
    this.code = codeNumber
    this.data = data
    this.toString = this.toString.bind(this)
  }

  toString() : string {
    const codePrefix = this.code ? `[${this.code}]` : ''
    return `${codePrefix}${this.name}:"${this.message}"`
  }

  getData(key : string) : any {
    return this.data[key]
  }
}

export default CustomError
