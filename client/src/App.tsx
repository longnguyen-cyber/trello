import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Active from './components/Active'
import { Alert } from './components/altert/Alert'
import Board from './components/Board'
import Boards from './components/Boards'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Settings from './components/Settings'
import SignUp from './components/SignUp'
import Templates from './components/Templates'
import { refreshToken } from './redux/actions/authAction'
import { getBoards } from './redux/actions/boardAction'
import { RootStore, TypedDispatch } from './utils/types'
function App() {
  const dispatch = useDispatch<TypedDispatch>()
  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])
  const { auth } = useSelector((state: RootStore) => state)
  useEffect(() => {
    if (!auth.access_token) return
    dispatch(getBoards(auth.access_token))
  }, [auth.access_token, dispatch])

  return (
    <Router>
      <Alert />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<HomePage />} />
          <Route path="board" element={<Boards />} />
          <Route path="templates" element={<Templates />} />
          <Route path="settings" element={<Settings />} />
          <Route path="dashboards" element={<Dashboard />} />
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
