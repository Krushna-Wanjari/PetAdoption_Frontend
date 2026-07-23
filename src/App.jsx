import './App.css'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import Home from './pages/Home';
import About from './pages/About';
import Pets from './pages/Pets';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/pets" element={<Pets/>} />
      </Routes>
    </>
  )
}

export default App