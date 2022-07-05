import { useParams } from 'react-router-dom'

const Board = () => {
  const { id } = useParams()

  return <div>Board {id}</div>
}

export default Board
