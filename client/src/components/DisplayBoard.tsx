import { BiPlus } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createColumn } from '../redux/actions/columnAction'
import { IBoard, IColumn, RootStore, TypedDispatch } from '../utils/types'
import Column from './Column'
import Navbar from './Navbar'
import _ from 'lodash'
interface IProps {
  columns: IColumn[]
  board: IBoard
}
const DisplayBoard = ({ columns, board }: IProps) => {
  const { auth } = useSelector((state: RootStore) => state)
  const { id } = useParams()

  const columnDefault = {
    _id: 'default',
    board: 'default'
  }
  const dispatch = useDispatch<TypedDispatch>()

  const addColumn = () => {
    if (!auth.access_token || !id) return
    dispatch(createColumn('new column', id, auth.access_token))
    return <Column column={columnDefault} />
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
      <div className="flex overflow-x-scroll overflow-y-hidden space-x-4 boards mx-8">
        {columns?.map((column) => (
          <div
            className={`bg-white rounded py-2 column max-w-default ${
              _.isEmpty(column.cardOrder) && 'h-16'
            } `}
            key={column._id}
            style={{
              marginBottom: '1rem'
            }}
          >
            <Column column={column} />
          </div>
        ))}
        <div className="bg-white rounded py-2 column max-w-default mb-4 text-center max-h-10">
          <div className="cursor-pointer" onClick={addColumn}>
            <BiPlus className="inline-block text-xl" />
            Add a column
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisplayBoard
