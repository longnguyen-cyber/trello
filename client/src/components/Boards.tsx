import { Outlet, useNavigate } from 'react-router-dom'

const Boards = () => {
  let navigate = useNavigate()
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
  return (
    <div className="mt-12 ml-12">
      <h2 className="text-2xl font-semibold mb-4">ALl Board</h2>
      <div className="grid grid-cols-4 space-x-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="relative board cursor-pointer"
            onClick={() => {
              navigate(`${item.id}`)
            }}
          >
            <img
              src={item.thumbnail}
              alt=""
              className="w-full object-fill h-40"
            />
            <div
              className="absolute top-2/4 left-2/4 text-white font-semibold text-2xl"
              style={{ transform: 'translate(-50%,-50%)' }}
            >
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
        <Outlet />
      </div>
    </div>
  )
}

export default Boards
