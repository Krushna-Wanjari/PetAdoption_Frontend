import logo from "../assets/logo.jpg";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo */}
        <div>
          <div className="flex items-center gap-4">

            <img
              src={logo}
              alt="PetAdopt Logo"
              className="w-20 h-20 rounded-2xl object-cover shadow-lg"
            />

            <div>
              <h2 className="text-2xl font-bold text-white">
                PetAdopt
              </h2>

              <p className="text-sm text-gray-400">
                Find your perfect companion.
              </p>
            </div>

          </div>

          <p className="mt-5 leading-7">
            Connecting loving families with pets looking for a forever home.
            Every adoption changes two lives.
          </p>
        </div>

        {/* Quick Links */}
        <div>

          <h3 className="text-xl font-semibold text-white mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3">

            <li>
              <a href="/" className="hover:text-orange-400 duration-300">
                Home
              </a>
            </li>

            <li>
              <a href="/pets" className="hover:text-orange-400 duration-300">
                Adopt Pets
              </a>
            </li>

            <li>
              <a href="/about" className="hover:text-orange-400 duration-300">
                About Us
              </a>
            </li>

            <li>
              <a href="/contact" className="hover:text-orange-400 duration-300">
                Contact
              </a>
            </li>

          </ul>

        </div>

        {/* Contact */}

        <div>

          <h3 className="text-xl font-semibold text-white mb-4">
            Contact
          </h3>

          <div className="space-y-4">

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-orange-400" />
              <span>Pune, Maharashtra</span>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-orange-400" />
              <span>support@petadopt.com</span>
            </div>

            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-orange-400" />
              <span>+91 9876543210</span>
            </div>

          </div>

        </div>

        {/* Social */}

        <div>

          <h3 className="text-xl font-semibold text-white mb-4">
            Follow Us
          </h3>

          <div className="flex gap-4">

            <a
              href="#"
              className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="bg-gray-800 p-3 rounded-full hover:bg-sky-500 transition"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="bg-gray-800 p-3 rounded-full hover:bg-pink-600 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="bg-gray-800 p-3 rounded-full hover:bg-blue-700 transition"
            >
              <FaLinkedinIn />
            </a>

          </div>

          <button className="mt-8 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg text-white font-semibold transition">
            Adopt a Pet
          </button>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-gray-700 py-6">

        <p className="text-center text-sm">

          © {new Date().getFullYear()} PetAdopt • Made with{" "}
          <FaHeart className="inline text-red-500" /> for Animals

        </p>

      </div>

    </footer>
  );
}

export default Footer;