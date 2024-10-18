import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Docent from './pages/docent'
import Student from './pages/student'

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/docent" element={<Docent />} />
        <Route index element={<Student />} />
      </Routes>
    </Router>
  )
}
