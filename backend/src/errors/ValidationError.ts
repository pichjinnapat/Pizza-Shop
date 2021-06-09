import { IError } from '../types'

export default class ValidationError extends Error implements IError {
  public statusCode: number

  public error: string

  public message: string

  constructor(message: string) {
    super(message)
    this.statusCode = 400
    this.error = 'Bad Request'
    this.message = message || 'Validation failed'
  }
}
