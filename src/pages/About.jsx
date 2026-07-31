import { Link } from "react-router-dom";
import { FaHeart, FaShieldAlt, FaUsers, FaHandHoldingHeart } from "react-icons/fa";
import { PawPrint, Search, HeartHandshake, Home as HomeIcon } from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const values = [
  {
    icon: <FaHeart size={26} />,
    title: "Compassion first",
    text: "Every pet on PetAdopt is treated as family, not a listing. Profiles are written with care, not just specs.",
  },
  {
    icon: <FaShieldAlt size={26} />,
    title: "Trust & safety",
    text: "Accounts are verified and every conversation between adopters and owners happens on your terms.",
  },
  {
    icon: <FaUsers size={26} />,
    title: "Community driven",
    text: "Built with shelters, rescuers and everyday pet owners so listings stay honest and up to date.",
  },
  {
    icon: <FaHandHoldingHeart size={26} />,
    title: "No cost to adopt",
    text: "PetAdopt never charges adopters a platform fee — we're here to make good matches, not commissions.",
  },
];

const steps = [
  {
    icon: <Search size={28} />,
    title: "Browse",
    text: "Filter by species, breed, and location to find pets near you who need a home.",
  },
  {
    icon: <HeartHandshake size={28} />,
    title: "Connect",
    text: "Reach out to the owner directly from a pet's profile to ask questions and arrange a meeting.",
  },
  {
    icon: <HomeIcon size={28} />,
    title: "Welcome home",
    text: "Finalize the adoption with the owner and give your new companion a forever home.",
  },
];

function About() {
  return (
    <>
      <NavBar/>

      {/* Header */}
      <section className="bg-orange-50">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <span className="bg-orange-100 text-orange-500 px-4 py-2 rounded-full font-semibold inline-flex items-center gap-2">
            <PawPrint size={16} /> Our story
          </span>

          <h1 className="text-5xl font-extrabold mt-6 leading-tight">
            Every pet deserves a
            <span className="text-orange-500"> second chance</span>
          </h1>

          <p className="text-gray-500 mt-6 text-lg max-w-2xl mx-auto leading-8">
            PetAdopt connects owners who can no longer care for a pet with people
            ready to love one. No shelters lost in paperwork, no pets waiting
            longer than they have to — just a simple, honest way to find a
            good match.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">1200+</h2>
            <p className="text-gray-500 mt-1">Pets Adopted</p>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">300+</h2>
            <p className="text-gray-500 mt-1">Partner Shelters</p>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">4.9★</h2>
            <p className="text-gray-500 mt-1">Average Rating</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-14">How PetAdopt works</h2>

          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center">
                  {step.icon}
                </div>
                <p className="text-sm font-semibold text-orange-400 mt-5">
                  Step {index + 1}
                </p>
                <h3 className="text-xl font-bold mt-1">{step.title}</h3>
                <p className="text-gray-500 mt-3 leading-7">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-14">What we stand for</h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-orange-500">{value.icon}</div>
              <h3 className="text-xl font-bold mt-4">{value.title}</h3>
              <p className="text-gray-500 mt-3 leading-7">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-500">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to meet your new best friend?
          </h2>
          <p className="mt-4 text-orange-100 text-lg">
            Browse pets waiting for a home, or list your own pet for adoption.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link
              to="/pets"
              className="bg-white text-orange-500 px-7 py-4 rounded-xl font-semibold hover:bg-orange-50 transition"
            >
              Browse Pets
            </Link>
            <Link
              to="/donate"
              className="border-2 border-white text-white px-7 py-4 rounded-xl font-semibold hover:bg-orange-600 transition"
            >
              List a Pet
            </Link>
          </div>
        </div>
      </section>

      <Footer/>
    </>
  );
}

export default About;
