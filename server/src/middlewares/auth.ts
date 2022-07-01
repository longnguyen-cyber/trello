import { IDecodedToken } from '../config/interface'
import { Response, NextFunction } from 'express'
import { IReqAuth } from '../config/interface'
import jwt from 'jsonwebtoken'
import User from '../models/User'

const auth = async (req: IReqAuth, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')
    if (!token)
      return res.status(400).json({ msg: 'No token, authentication denied' })

    const decoded = <IDecodedToken>(
      jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
    )

    if (!decoded) return res.status(400).json({ msg: 'Invalid token' })
    const user = await User.findById(decoded.id)
    if (!user) return res.status(400).json({ msg: 'User does not exists.' })

    req.user = user
    next()
  } catch (error: any) {
    return res.status(500).json({ msg: error.response.data.msg })
  }
}
export default auth
