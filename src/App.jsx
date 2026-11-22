import Home from './pages/Home';
import About from './pages/About';
import Pets from './pages/Pets';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Donate from './pages/Donate';
import PetDetails from "./pages/PetDetails";
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/pets" element={<Pets/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/pets/:id" element={<PetDetails />} />
      <Route
        path="/donate"
        element={
          <ProtectedRoute>
            <Donate/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
