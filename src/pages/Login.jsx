import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AuthCard from "../components/AuthCard";

function Login() {
  return (
    <>
      <NavBar />

      <main className="min-h-screen bg-gray-50 flex justify-center items-center py-20">
        <AuthCard />
      </main>

      <Footer />
    </>
  );
}

export default Login;