import { Request, Response } from 'express'
import { IReqAuth } from '../config/interface'
import Board from '../models/Board'

const boardCtrl = {
  createBoard: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: 'Invalid Authentication' })
    try {
      const { title, user } = req.body
      const newBoard = new Board({ title, user: req.user._id })

      if (!newBoard)
        return res.status(400).json({ msg: 'Board already exists' })

      await newBoard.save()

      res.json(newBoard)
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

export default boardCtrl
