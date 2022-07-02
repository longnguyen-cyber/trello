import { Response } from 'express'
import { IReqAuth } from '../config/interface'
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
  },
  deleteCard: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: 'Invalid Authentication' })
    try {
      const card = await Card.findOneAndDelete({
        _id: req.params.id
      })

      if (!card)
        return res.status(400).json({
          msg: 'card does not exist.'
        })

      await Column.findOneAndUpdate(
        {
          _id: card.column
        },
        {
          $pull: { cardOrder: card._id }
        }
      )
      return res.status(200).json({ msg: 'Delete successfully' })
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  updateCard: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: 'Invalid Authentication' })
    try {
      const card = await Card.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      )

      if (!card) return res.status(400).json({ msg: 'Invalid Authentication' })

      res.json({ msg: 'Update success', card })

      return res.status(200).json({ msg: 'Update successfully' })
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

export default cardCtrl
