import express from 'express'
import boardCtrl from '../controllers/boardCtrl'
import auth from '../middlewares/auth'
const router = express.Router()

router.post('/board', auth, boardCtrl.createBoard)

export default router
