import React from 'react'
import { ICard } from '../utils/types'
interface IProps {
  card: ICard
}
const Card = ({ card }: IProps) => {
  return (
    <div className="bg-gray-200 rounded-md cursor-pointer hover:bg-gray-400 my-4 last:mt-4 last:mb-0">
      <h3 className="py-2">{card.title}</h3>
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
