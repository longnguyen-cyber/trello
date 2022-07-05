import { IDecodedToken, IUser } from '../config/interface'
import jwt from 'jsonwebtoken'
import {
  generateAccessToken,
  generateActiveToken,
  generateRefreshToken
} from './../config/generateToken'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import User from '../models/User'
import { vallidEmail } from '../middlewares/valid'
import sendEmail from '../config/sendMail'

const CLIENT_BASE_URL = `${process.env.BASE_URL}`

const authCtrl = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body

      const user = await User.findOne({ account })
      if (user)
        return res
          .status(400)
          .json({ msg: 'Email or phone number already exists.' })

      const passwordHash = await bcrypt.hash(password, 12)

      const newUser = { name, account, password: passwordHash }

      const active_token = generateActiveToken({ newUser })

      const url = `${CLIENT_BASE_URL}/active/${active_token}`

      if (vallidEmail(account)) {
        sendEmail(account, url, 'Active your account')
        return res
          .status(200)
          .json({ msg: 'Success! Please check your e-mail' })
      }
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body
      const decoded = <IDecodedToken>(
        jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)
      )
      const { newUser } = decoded
      if (!decoded.newUser)
        return res.status(400).json({ msg: 'Invalid Authentication' })

      const user = new User(newUser)

      await user.save()

      res.status(200).json({ msg: 'Account has been activated' })
    } catch (err: any) {
      let errMsg

      if (err.code === 11000) {
        errMsg = Object.keys(err.keyValue)[0] + ' already exists.'
      } else {
        let name = Object.keys(err.errors)[0]
        errMsg = err.errors[`${name}`].message
      }

      return res.status(500).json({ msg: errMsg })
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { account, password } = req.body

      const user = await User.findOne({ account })

      if (!user)
        return res.status(400).json({ msg: 'This account does not exists.' })

      loginUser(user, password, res)
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie('refreshtoken', { path: '/api/refresh_token' })

      return res.status(200).json({ msg: 'Logged out!' })
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      const rfToken = req.cookies.refreshtoken

      if (!rfToken) return res.status(400).json({ msg: 'Please login' })

      const decoded = <IDecodedToken>(
        jwt.verify(rfToken, `${process.env.REFRESH_TOKEN_SECRET}`)
      )

      if (!decoded.id) return res.status(400).json({ msg: 'Please login' })

      const user = await User.findById(decoded.id).select('-password')

      if (!user)
        return res.status(400).json({ msg: 'This account does not exists.' })

      const access_token = generateAccessToken({ id: user._id })

      res.json({ access_token })
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

const loginUser = async (user: IUser, password: string, res: Response) => {
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return res.status(400).json({ msg: 'Passwor is incorrect.' })

  const access_token = generateAccessToken({ id: user._id })
  const refresh_token = generateRefreshToken({ id: user._id })
  //set cookie when logged
  res.cookie('refreshtoken', refresh_token, {
    httpOnly: true,
    path: `/api/refresh_token`,
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
  })
  res.json({
    msg: 'Login success',
    access_token,
    user: { ...user._doc, password: '' }
  })
}
export default authCtrl
