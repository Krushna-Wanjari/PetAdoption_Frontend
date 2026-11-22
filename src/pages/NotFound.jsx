import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function NotFound() {
  return (
    <>
      <NavBar />
      <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-7xl font-extrabold text-orange-500">404</h1>
        <p className="text-2xl font-bold mt-4">Page not found</p>
        <p className="text-gray-500 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-8 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          <FaHome />
          Back to Home
        </Link>
      </main>
      <Footer />
    </>
  );
}

export default NotFound;
