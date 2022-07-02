import express from 'express'
import cardCtrl from '../controllers/cardCtrl'
import auth from '../middlewares/auth'
const router = express.Router()

router.post('/board/:boardID/:columnID', auth, cardCtrl.creatCard)

export default router
