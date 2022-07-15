import express from 'express'
import cardCtrl from '../controllers/cardCtrl'
import auth from '../middlewares/auth'
const router = express.Router()

router.post('/board/:boardID/:columnID', auth, cardCtrl.creatCard)

router.get('/board/:boardID/card', auth, cardCtrl.getCard)

router
  .route('/board/:boardID/:columnID/:id')
  .delete(auth, cardCtrl.deleteCard)
  .patch(auth, cardCtrl.updateCard)

export default router
