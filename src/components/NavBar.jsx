import { Link } from "react-router-dom";
import {
  FaPaw,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import logo from "../assets/logo.jpg";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

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

            <Link
              to="/contact"
              className="hover:text-orange-500 transition"
            >
              Contact
            </Link>

          </div>

          {/* Right Side */}

          <div className="hidden md:flex items-center gap-4">

            <button className="flex items-center gap-2 border border-orange-500 text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition">

              <FaPaw />

              Adopt Now

            </button>

            <FaUserCircle
              size={32}
              className="text-gray-600 cursor-pointer hover:text-orange-500"
            />

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

            <Link to="/">Home</Link>

            <Link to="/pets">Pets</Link>

            <Link to="/adopt">Adopt</Link>

            <Link to="/about">About</Link>

            <Link to="/contact">Contact</Link>

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