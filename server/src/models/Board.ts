import mongoose from 'mongoose'

const boardSchema = new mongoose.Schema(
  {
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
export default mongoose.model('board', boardSchema)
