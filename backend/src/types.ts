export interface IError {
  statusCode: number
  error: string
  message: string
}

export type BaseEntity = {
  id?: number
  created_at?: Date
  updated_at?: Date
}
