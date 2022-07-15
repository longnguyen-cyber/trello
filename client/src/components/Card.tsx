import { useState } from 'react'
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai'
import { MdLabelOutline } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCard, updateCard } from '../redux/actions/cardAction'
import { ICard, IModal, RootStore, TypedDispatch } from '../utils/types'
import Modal from './Modal'
interface IProps {
  card: ICard
}
const Card = ({ card }: IProps) => {
  const dispatch = useDispatch<TypedDispatch>()
  const [cards, setCards] = useState<IModal>(card)
  const { auth } = useSelector((state: RootStore) => state)
  const [showModal, setShowModal] = useState(false)

  const handleUpdateCard = (card: IModal, token: string) => {
    if (!token) return
    dispatch(updateCard(card, token))
  }
  return (
    <div className="bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 my-4 last:mt-4 last:mb-0">
      <div className="py-2 flex justify-between items-center">
        <h3 className="flex justify-between items-center">
          {card.title}
          <MdLabelOutline className="text-xl ml-2" />
        </h3>
        <div className="flex items-center space-x-1">
          <Modal
            content="Add a card"
            callback={handleUpdateCard}
            body={cards}
            setBody={setCards}
            showModal={showModal}
            setShowModal={setShowModal}
            board={card.board}
            column={card.column}
          />

          <AiOutlineEdit
            className="hover:text-yellow-600 text-xl"
            onClick={() => {
              setShowModal(!showModal)
            }}
          />
          <AiFillDelete
            className="hover:text-red-600 text-xl"
            onClick={() => {
              if (!auth.access_token) return
              dispatch(deleteCard(card, auth.access_token))
            }}
          />
        </div>
      </div>
      {typeof card.thumbnail === 'string' && (
        <img
          src={card.thumbnail}
          alt=""
          className="w-full max-h-64 object-cover"
        />
      )}
    </div>
  )
}

export default Card
