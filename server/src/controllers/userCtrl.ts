import { Request, Response } from 'express'
import User from '../models/User'

const CLIENT_BASE_URL = `${process.env.BASE_URL}`

const userCtrl = {
  getUser: async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const user = await User.findById(id).select('-password')
      res.status(200).json({ user })
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

export default userCtrl
