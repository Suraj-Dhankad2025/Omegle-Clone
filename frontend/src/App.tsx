
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Landing } from './components/Landing'
import Auth from './components/Auth'
import Home from './components/Home';
function App() {
  return (
    <BrowserRouter>
    <Auth/>
      {/* <Routes>
        <Route path="/Home" element={<Home/>} />
      </Routes> */}
      <Routes>
        {/* <Route path="/" element={<Landing/>} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
