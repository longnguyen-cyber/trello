import express from 'express'
import columnCtrl from '../controllers/columnCtrl'
import auth from '../middlewares/auth'
const router = express.Router()

router.post('/board/:id', auth, columnCtrl.creatColumn)

export default router
