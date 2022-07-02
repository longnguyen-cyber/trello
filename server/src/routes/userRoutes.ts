import express from 'express'
import userCtrl from '../controllers/userCtrl'
const router = express.Router()

router.get('/user/:id', userCtrl.getUser)

export default router
