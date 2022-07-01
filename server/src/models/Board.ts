import mongoose from 'mongoose'
import { IBoard } from '../config/interface'

const boardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'user'
    },
    title: {
      type: String,
      require: [true, 'Please add your title board'],
      trim: true,
      maxLength: 10
    },
    columnOrder: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'column'
      }
    ]
  },
  {
    timestamps: true
  }
)
export default mongoose.model<IBoard>('board', boardSchema)
