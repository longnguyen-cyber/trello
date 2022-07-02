import mongoose from 'mongoose'
import { IColumn } from '../config/interface'

const columnSchema = new mongoose.Schema(
  {
    board: {
      type: mongoose.Types.ObjectId,
      ref: 'board'
    },
    title: {
      type: String,
      require: [true, 'Please add your title column'],
      trim: true,
      maxLength: 20
    },
    cardOrder: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'card'
      }
    ]
  },
  {
    timestamps: true
  }
)
export default mongoose.model<IColumn>('column', columnSchema)
