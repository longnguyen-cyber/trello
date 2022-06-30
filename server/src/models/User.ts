import mongoose from 'mongoose'
import { IUser } from '../config/interface'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Please add your name'],
      trim: true,
      maxLength: [20, 'Your name is up to 20 chars long.']
    },
    account: {
      type: String,
      required: [true, 'Please add your type account'],
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Please add your password'],
      trim: true
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
    },
    role: {
      type: String,
      default: 'user'
    },
    type: {
      type: String,
      default: 'normal'
    }
  },
  {
    timestamps: true
  }
)
export default mongoose.model<IUser>('User', userSchema)
