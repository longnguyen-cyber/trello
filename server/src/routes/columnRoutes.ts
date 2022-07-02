import express from 'express'
import columnCtrl from '../controllers/columnCtrl'
import auth from '../middlewares/auth'
const router = express.Router()

router.post('/board/:boardID', auth, columnCtrl.creatColumn)

router
  .route('/board/:boardID/:id')
  .delete(auth, columnCtrl.deleteColumn)
  .patch(auth, columnCtrl.updateColumn)

export default router
