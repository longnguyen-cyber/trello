import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { IReqAuth } from '../config/interface'
import Board from '../models/Board'
import Card from '../models/Card'
import Column from '../models/Column'

const boardCtrl = {
  createBoard: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: 'Invalid Authentication' })
    try {
      const { user } = req.body
      const newBoard = new Board({ ...req.body, user: req.user._id })

      if (!newBoard)
        return res.status(400).json({ msg: 'Board already exists' })

      await newBoard.save()

      res.json(newBoard)
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  geaAllBoard: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: 'Invalid Authentication' })
    try {
      const boards = await Board.find()

      if (!boards) return res.status(400).json({ msg: 'Board does not exists' })

      res.json(boards)
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  getBoard: async (req: Request, res: Response) => {
    try {
      const boardDefault = await Board.findOne({ _id: req.params.id })
      const board = await Board.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(req.params.id)
          }
        },
        {
          $lookup: {
            from: 'columns',
            localField: '_id',
            foreignField: 'board',
            as: 'column'
          }
        },
        {
          $unwind: '$column'
        },
        {
          $lookup: {
            from: 'cards',
            localField: 'column._id',
            foreignField: 'column',
            as: 'column.card'
          }
        }
      ])
      if (board.length > 0) return res.json(board)
      else return res.json(boardDefault)
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  deleteBoard: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: 'Invalid Authentication' })
    try {
      const board = await Board.findByIdAndDelete({
        _id: req.params.id,
        user: req.user._id
      })

      if (!board)
        return res.status(400).json({
          msg: 'Board does not exist.'
        })

      await Board.deleteMany({ _id: { $in: board.columnOrder } })

      await Column.deleteMany({ board: new mongoose.Types.ObjectId(board._id) })

      await Card.deleteMany({
        board: new mongoose.Types.ObjectId(board._id)
      })

      return res.status(200).json({ msg: 'Delete successfully' })
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  updateBoard: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: 'Invalid Authentication' })
    try {
      const board = await Board.findByIdAndUpdate(
        { _id: req.params.id, user: req.user._id },
        req.body
      )

      if (!board) return res.status(400).json({ msg: 'Invalid Authentication' })

      res.json({ msg: 'Update success', board })

      return res.status(200).json({ msg: 'Update successfully' })
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

export default boardCtrl
