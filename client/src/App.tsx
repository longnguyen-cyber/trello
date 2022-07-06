import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Active from './components/Active'
import { Alert } from './components/altert/Alert'
import Board from './components/Board'
import Boards from './components/Boards'
import Home from './components/Home'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Settings from './components/Settings'
import SignUp from './components/SignUp'
import Templates from './components/Templates'
import { refreshToken } from './redux/actions/authAction'
import { TypedDispatch } from './utils/types'
function App() {
  const dispatch = useDispatch<TypedDispatch>()
  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])
  return (
    <Router>
      <Alert />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<HomePage />} />
          <Route path="board" element={<Boards />} />
          <Route path="templates" element={<Templates />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/board/:id" element={<Board />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="active/:id" element={<Active />} />
      </Routes>
    </Router>
  )
}

export default App
