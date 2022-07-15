/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux'
import {
  IColumn,
  IModal,
  InputChange,
  RootStore,
  TypedDispatch
} from '../utils/types'

import { useEffect, useState } from 'react'
import { FiDelete } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import { createCard, getCards } from '../redux/actions/cardAction'
import { deleteColumn, updateColumn } from '../redux/actions/columnAction'
import Card from './Card'
import Modal from './Modal'
import { BiPlus } from 'react-icons/bi'

interface IProps {
  column: IColumn
}

const Column = ({ column }: IProps) => {
  const inititalState = {
    title: '',
    thumbnail: ''
  }
  const dispatch = useDispatch<TypedDispatch>()
  const { id } = useParams()

  const [card, setCard] = useState<IModal>(inititalState)

  const [titleColumn, setTitleColumn] = useState<IColumn>(column)

  const { auth, cards } = useSelector((state: RootStore) => state)
  const addCard = (card: IModal, token?: string) => {
    if (!auth.access_token || !id || !column._id) return
    dispatch(createCard(card, id, column._id, auth.access_token))
  }

  const handleInputChange = (e: InputChange) => {
    const { name, value } = e.target
    setTitleColumn({ ...column, [name]: value })
  }
  useEffect(() => {
    if (!id || !auth.access_token) return
    dispatch(getCards(id, auth.access_token))
  }, [dispatch, auth.access_token, id])

  useEffect(() => {
    setTimeout(() => {
      if (!auth.access_token) return
      dispatch(updateColumn(titleColumn, auth.access_token))
    }, 5000)
  }, [titleColumn])

  const [showModal, setShowModal] = useState(false)

  return (
    <div className="pl-1 board-column">
      <div className="flex justify-between items-center px-2">
        <input
          type="text"
          name="title"
          value={titleColumn.title}
          onChange={handleInputChange}
          className="w-full outline-none focus:outline-none"
        />

        <span
          className="cursor-pointer hover:text-red-600 py-2 px-4"
          onClick={() => {
            if (!auth.access_token) return
            dispatch(deleteColumn(column, auth.access_token))
          }}
        >
          <FiDelete />
        </span>
      </div>
      {cards && (
        <div className="overflow-y-auto max-h-[28rem] card-list h-fit">
          {cards
            .filter((card) => card.column === column._id)
            .map((item) => (
              <Card card={item} key={item._id} />
            ))}
        </div>
      )}
      <button
        className={`${
          !id &&
          'bg-blue-500 active:bg-blue-600 text-white font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg'
        } text-sm outline-none focus:outline-none m-1 ease-linear transition-all duration-150 text-center ${
          id && 'w-full'
        }`}
        type="button"
        onClick={() => setShowModal(true)}
      >
        {id && <BiPlus className="inline-block text-xl" />}
        {id ? 'Add a card' : 'Add board'}
      </button>
      <Modal
        content="Add a card"
        callback={addCard}
        body={card}
        setBody={setCard}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  )
}

export default Column
