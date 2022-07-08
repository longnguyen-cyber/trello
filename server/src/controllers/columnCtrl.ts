import { Response, Request } from 'express'
import mongoose from 'mongoose'
import { IReqAuth } from '../config/interface'
import Board from '../models/Board'
import Card from '../models/Card'
import Column from '../models/Column'

const columnCtrl = {
  creatColumn: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: 'Invalid Authentication' })
    const { boardID } = req.params
    try {
      const { title } = req.body
      const newColumn = new Column({
        board: boardID,
        title
      })

      await Board.findByIdAndUpdate(
        {
          _id: boardID
        },
        {
          $push: {
            columnOrder: newColumn._id
          }
        }
      )

      await newColumn.save()

      res.status(200).json(newColumn)
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  deleteColumn: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: 'Invalid Authentication' })
    try {
      const column = await Column.findOneAndDelete({
        _id: req.params.id,
        board: req.params.boardID
      })

      if (!column)
        return res.status(400).json({
          msg: 'Column does not exist.'
        })

      await Board.findOneAndUpdate(
        {
          _id: column.board
        },
        {
          $pull: { columnOrder: column._id }
        }
      )

      await Card.deleteMany({
        column: new mongoose.Types.ObjectId(column._id)
      })

      return res.status(200).json({ msg: 'Delete successfully' })
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  updateColumn: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: 'Invalid Authentication' })
    try {
      const column = await Column.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      )

      if (!column)
        return res.status(400).json({ msg: 'Invalid Authentication' })

      res.json({ msg: 'Update success', column })

      return res.status(200).json({ msg: 'Update successfully' })
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

export default columnCtrl
