import express from 'express'
import boardCtrl from '../controllers/boardCtrl'
import auth from '../middlewares/auth'
const router = express.Router()

router.post('/board', auth, boardCtrl.createBoard)
router.get('/board', auth, boardCtrl.geaAllBoard)
router
  .route('/board/:id')
  .get(boardCtrl.getBoard)
  .delete(auth, boardCtrl.deleteBoard)
  .patch(auth, boardCtrl.updateBoard)

export default router
