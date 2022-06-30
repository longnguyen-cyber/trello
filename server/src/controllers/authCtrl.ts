import { generateActiveToken } from './../middlewares/generateToken'
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

      const active_token = generateActiveToken(newUser)

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
  }
}
export default authCtrl
