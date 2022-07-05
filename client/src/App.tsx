import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Board from './components/Board'
import Boards from './components/Boards'
import Home from './components/Home'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Settings from './components/Settings'
import SignUp from './components/SignUp'
import Templates from './components/Templates'
function App() {
  return (
    <Router>
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
      </Routes>
    </Router>
  )
}

export default App
