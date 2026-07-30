import { Link, useNavigate } from "react-router-dom";
import {
  FaPaw,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaHeart
} from "react-icons/fa";
import { useState } from "react";
import logo from "../assets/logo.jpg";
import useAuth from "../hooks/useAuth";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    setUserMenuOpen(false);
    setMenuOpen(false);
    navigate("/");
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center h-20">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <img
              src={logo}
              alt="PetAdopt Logo"
              className="w-12 h-12 rounded-xl object-cover"
            />

            <div>
              <h1 className="text-2xl font-bold text-orange-500">
                PetAdopt
              </h1>

              <p className="text-xs text-gray-500">
                Adopt • Love • Care
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}

          <div className="hidden md:flex items-center gap-8 font-medium">

            <Link
              to="/"
              className="hover:text-orange-500 transition"
            >
              Home
            </Link>

            <Link
              to="/pets"
              className="hover:text-orange-500 transition"
            >
              Pets
            </Link>

            <Link
              to="/mypets"
              className="hover:text-orange-500 transition"
            >
              My Pets
            </Link>

            <Link
              to="/adopt"
              className="hover:text-orange-500 transition"
            >
              Adopt
            </Link>

            <Link
              to="/about"
              className="hover:text-orange-500 transition"
            >
              About
            </Link>

          </div>

          {/* Right Side */}
          

          <div className="hidden md:flex items-center gap-4">

            <div>
            <Link
                to="/donate"
                className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition rounded-lg"
            >
               <FaHeart />
               Donate
            </Link>
          </div>

            <button className="flex items-center gap-2 border border-orange-500 text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition">

              <FaPaw />

              Adopt Now

            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 text-gray-600 hover:text-orange-500"
                >
                  <FaUserCircle size={32} />
                  <span className="font-medium">
                    {user?.name?.split(" ")[0]}
                  </span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border py-2 z-50">
                    <Link
                      to="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-orange-50"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-orange-50 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-medium"
              >
                <FaUserCircle size={28} />
                Login
              </Link>
            )}

          </div>

          {/* Mobile Menu Button */}

          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (

        <div className="md:hidden bg-white shadow-lg">

          <div className="flex flex-col p-5 space-y-5">

            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

            <Link to="/pets" onClick={() => setMenuOpen(false)}>Pets</Link>

            <Link to="/adopt" onClick={() => setMenuOpen(false)}>Adopt</Link>

            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>

            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setMenuOpen(false)}>My Profile</Link>
                <button onClick={handleLogout} className="text-left text-red-500">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
              </>
            )}

            <button className="bg-orange-500 text-white py-3 rounded-lg">
              Adopt Now
            </button>

          </div>

        </div>

      )}

    </nav>
  );
}

export default NavBar;
