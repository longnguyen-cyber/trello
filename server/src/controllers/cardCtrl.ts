import { Response } from 'express'
import { IReqAuth } from '../config/interface'
import Board from '../models/Board'
import Card from '../models/Card'
import Column from '../models/Column'

const cardCtrl = {
  creatCard: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: 'Invalid Authentication' })
    const { boardID, columnID } = req.params
    try {
      const { content } = req.body
      const newCard = new Card({
        board: boardID,
        column: columnID,
        content
      })
      await Column.findByIdAndUpdate(
        {
          _id: columnID
        },
        {
          $push: {
            cardOrder: newCard._id
          }
        }
      )
      await newCard.save()
      res.status(200).json(newCard)
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

export default cardCtrl
