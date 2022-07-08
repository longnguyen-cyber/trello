import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCard } from '../redux/actions/cardAction'
import { IBoardModal, ICard, IColumn, TypedDispatch } from '../utils/types'

import _ from 'lodash'

import Card from './Card'
import Modal from './Modal'
import { BiPlus } from 'react-icons/bi'

interface IProps {
  column: IColumn
}

const Column = ({ column }: IProps) => {
  const dispatch = useDispatch<TypedDispatch>()
  const [toggleColumn, settoggleColumn] = useState(true)
  const [card, setCard] = useState<ICard>()
  const addCard = (body: IBoardModal, token?: string) => {
    dispatch(createCard(body))
  }
  const addColumn = () => {
    settoggleColumn(false)
    return <Modal content="Add a card" callback={addCard} />
  }

  useEffect(() => {
    if (column.title) settoggleColumn(false)
  }, [column.title])
  return (
    <div className="text-center pl-1 board-column">
      <h4 className={`${!toggleColumn && !column.title && 'pb-2'}`}>
        {!toggleColumn && !column.title ? 'new column' : column.title}
      </h4>
      <div className="overflow-y-auto max-h-[30rem] card-list">
        {column?.cards?.map((item) => (
          <Card card={item} key={item._id} />
        ))}
      </div>
      {!column.title && toggleColumn ? (
        <div onClick={addColumn} className="cursor-pointer">
          <BiPlus className="inline-block text-xl" />
          Add a column
        </div>
      ) : (
        <Modal content="Add a card" callback={addCard} />
      )}
    </div>
  )
}

export default Column
