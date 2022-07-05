import { useParams } from 'react-router-dom'
const Board = () => {
  const data = [
    {
      id: 1,
      user: 'data1',
      title: 'title1',
      thumbnail: 'https://source.unsplash.com/random'
    },
    {
      id: 2,
      user: 'data2',
      title: 'title2',
      thumbnail: 'https://source.unsplash.com/random'
    },
    {
      id: 3,
      user: 'data3',
      title: 'title3',
      thumbnail: 'https://source.unsplash.com/random'
    }
  ]
  const { id } = useParams()

  return (
    <div>
      {data
        .filter((item) => item.id.toString() === id)
        .map((board) => (
          <div key={board.id}>{board.title}</div>
        ))}
    </div>
  )
}

export default Board
