import { useDispatch, useSelector } from 'react-redux'
import { IColumn, IModal, RootStore, TypedDispatch } from '../utils/types'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createCard, getCards } from '../redux/actions/cardAction'
import Card from './Card'
import Modal from './Modal'

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

  const { auth, cards } = useSelector((state: RootStore) => state)
  const addCard = (card: IModal, token?: string) => {
    if (!auth.access_token || !id || !column._id || !card.thumbnail) return
    console.log(card)

    dispatch(createCard(card, id, column._id, auth.access_token))
  }

  useEffect(() => {
    if (!id || !auth.access_token) return

    dispatch(getCards(id, auth.access_token))
  }, [dispatch, auth.access_token, id])

  return (
    <div className="text-center pl-1 board-column">
      <h4 className={`${!column.title && 'pb-2'}`}>
        {!column.title ? 'new column' : column.title}
      </h4>
      {cards && (
        <div className="overflow-y-auto max-h-[30rem] card-list">
          {cards
            .filter((card) => card.column === column._id)
            .map((item) => (
              <Card card={item} key={item._id} />
            ))}
        </div>
      )}
      <Modal
        content="Add a card"
        callback={addCard}
        body={card}
        setBody={setCard}
      />
    </div>
  )
}

export default Column
