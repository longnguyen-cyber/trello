import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { IBoardModal, ICard, TypedDispatch } from '../utils/types'
import Card from './Card'
import Modal from './Modal'
const Column = () => {
  const dispatch = useDispatch<TypedDispatch>()
  const [card, setCard] = useState<ICard>()
  const data = [
    {
      _id: '1',
      title: 'card1',
      thumbnail: 'http://source.unsplash.com/random'
    },
    {
      _id: '2',
      title: 'card2'
    },
    {
      _id: '3',
      title: 'card3',
      thumbnail: 'http://source.unsplash.com/random'
    },
    {
      _id: '4',
      title: 'card4'
    }
  ]
  const addCard = (body: IBoardModal, token?: string) => {}
  return (
    <div className="text-center pl-1">
      <h4>Column Title</h4>
      <div className="overflow-y-auto max-h-[30rem] card-list">
        {data.map((item) => (
          <Card card={item} />
        ))}
      </div>
      <Modal content="Add a Column" callback={addCard} />
    </div>
  )
}

export default Column
