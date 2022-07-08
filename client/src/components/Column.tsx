import { createElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  IBoard,
  ICard,
  IColumn,
  RootStore,
  TypedDispatch
} from '../utils/types'

import { BiPlus } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import { createColumn } from '../redux/actions/columnAction'
import Modal from './Modal'
import { createCard } from '../redux/actions/cardAction'

interface IProps {
  column: IColumn
}

const Column = ({ column }: IProps) => {
  const { cards, auth } = useSelector((state: RootStore) => state)
  const { id } = useParams()
  const dispatch = useDispatch<TypedDispatch>()
  const [toggleColumn, settoggleColumn] = useState(true)
  const [card, setCard] = useState<ICard>()

  const NewColumnDefault = () => {
    return (
      <div onClick={addColumn} className="cursor-pointer">
        <BiPlus className="inline-block text-xl" />
        Add a column
      </div>
    )
  }

  const addCard = (body: IBoard, token?: string) => {
    dispatch(createCard(body))
  }

  const addColumn = () => {
    settoggleColumn(false)
    if (!auth.access_token || !id) return

    // dispatch(createColumn('new column', id, auth.access_token))
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
        {/* {column?.cards?.map((item) => (
          <Card card={item} key={item._id} />
        ))} */}
      </div>
      {!column.title && toggleColumn ? (
        <NewColumnDefault />
      ) : (
        // <h2>eh</h2>
        <Modal content="Add a card" callback={addCard} />
      )}
    </div>
  )
}

export default Column
