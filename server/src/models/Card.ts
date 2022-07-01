import mongoose from 'mongoose'

const cardSchema = new mongoose.Schema(
  {
    boardId: mongoose.Types.ObjectId,
    columnId: mongoose.Types.ObjectId,
    content: {
      type: String,
      require: [true, 'Please add your content card'],
      trim: true,
      minLength: 10,
      maxLength: 20
    },
    thumbnail: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true
  }
)
export default mongoose.model('card', cardSchema)
