import './App.css'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import Home from './pages/Home';
import About from './pages/About';
import Pets from './pages/Pets';
import Login from './pages/Login';
import { Routes, Route } from "react-router-dom";
import Register from './pages/Register';

function App() {
  return (
    <>
       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/pets" element={<Pets/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </>
  )
}

export default App