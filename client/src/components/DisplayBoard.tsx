import React from 'react'
import { useSelector } from 'react-redux'
import { IBoard, IColumn, RootStore } from '../utils/types'
import Column from './Column'
import Navbar from './Navbar'
import _ from 'lodash'
interface IProps {
  columns: IColumn[]
  board: IBoard
}
const DisplayBoard = ({ columns, board }: IProps) => {
  const { auth } = useSelector((state: RootStore) => state)
  const columnDefault = {
    _id: 'default',
    board: 'default'
  }
  return (
    <div
      className="h-screen object-fit bg-no-repeat bg-cover w-full"
      style={{ backgroundImage: `url(${board.thumbnail})` }}
    >
      <Navbar token={auth.access_token} />
      <div className="text-white text-center text-4xl py-2 relative">
        {board.title}
      </div>
      <div className="flex overflow-x-auto space-x-4 boards mx-8">
        {_.isEmpty(columns) ? (
          <div className="bg-white rounded py-2 column max-w-default mb-4">
            <Column column={columnDefault} />
          </div>
        ) : (
          columns?.map((column) => (
            <div
              className="bg-white rounded py-2 column max-w-default mb-4"
              key={column._id}
            >
              <Column column={column} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default DisplayBoard
