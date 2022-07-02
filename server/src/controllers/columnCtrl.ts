import { Response } from 'express'
import { IReqAuth } from '../config/interface'
import Board from '../models/Board'
import Column from '../models/Column'

const columnCtrl = {
  creatColumn: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: 'Invalid Authentication' })
    const { id } = req.params
    try {
      const { title } = req.body
      const newColumn = new Column({
        board: id,
        title
      })

      await Board.findByIdAndUpdate(
        {
          _id: id
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
  }
}

export default columnCtrl
