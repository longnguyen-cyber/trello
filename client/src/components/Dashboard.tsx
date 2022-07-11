import React from 'react'
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { RootStore } from '../utils/types'

const Dashboard = () => {
  const { boards } = useSelector((state: RootStore) => state)
  return (
    <div className="mt-12 ml-12 w-3/4">
      <h3 className="mb-4 text-3xl font-semibold">Dash Board</h3>
      <table className="table-auto bg-red-400 w-full text-left">
        <thead>
          <tr>
            <th>Board</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {boards.map((board) => (
            <tr key={board._id}>
              <td>{board.title}</td>
              <td className="cursor-pointer">
                <AiFillDelete />
              </td>
              <td className="cursor-pointer">
                <AiOutlineEdit />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard
