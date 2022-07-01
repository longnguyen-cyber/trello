import mongoose from 'mongoose'

const columnSchema = new mongoose.Schema(
  {
    boardId: mongoose.Types.ObjectId,
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
export default mongoose.model('column', columnSchema)
