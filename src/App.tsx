import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css'
import Main from "./components/Main"
import Submissions from "./components/Submissions"
import Login from "./components/Login"
const App = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/submission" element={<Submissions/>}/>
            <Route path="/Home" element={<Main/>}/>
        </Routes>
    </Router>
  )
}

export default App