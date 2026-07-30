import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";
import { FaUserCircle, FaEnvelope, FaShieldAlt } from "react-icons/fa";

function Profile() {
  const { user, logout } = useAuth();

  return (
    <>
      <NavBar />

      <main className="min-h-screen bg-gray-50 py-20 px-6">
        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-10 text-center">
          <FaUserCircle size={72} className="mx-auto text-orange-500" />

          <h1 className="text-3xl font-bold mt-4">{user?.name}</h1>
          <p className="text-gray-500 mt-1">{user?.role}</p>

          <div className="mt-8 space-y-4 text-left">
            <div className="flex items-center gap-3 border rounded-xl px-4 py-3">
              <FaEnvelope className="text-orange-400" />
              <span>{user?.email}</span>
            </div>

            <div className="flex items-center gap-3 border rounded-xl px-4 py-3">
              <FaShieldAlt className="text-orange-400" />
              <span>Role: {user?.role}</span>
            </div>
          </div>

          <button
            onClick={logout}
            className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Logout
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Profile;
