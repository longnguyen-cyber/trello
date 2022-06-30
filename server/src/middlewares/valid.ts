import { Request, Response, NextFunction } from 'express'

export const validRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, account, password } = req.body

  const errors = []

  if (!name) errors.push('Please add your name')
  else if (name.length > 20) errors.push('your name is up to 20 chars long.')

  if (!account) errors.push('Please add your email number.')
  else if (!vallidEmail(account)) errors.push('Email format is incorrect.')

  if (password.length < 6) errors.push('Password must be at least 6 chars.')

  next()
}

export const vallidEmail = (email: string) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(String(email).toLowerCase())
}
