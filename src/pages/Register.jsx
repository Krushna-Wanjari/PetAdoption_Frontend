import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AuthCardNew from "../components/AuthCardNew";

function Register() {
  return (
    <>
      <NavBar />

      <main className="min-h-screen bg-gray-50 flex justify-center items-center py-20">
        <AuthCardNew/>
      </main>

      <Footer />
    </>
  );
}

export default Register;