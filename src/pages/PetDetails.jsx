import { useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaVenusMars,
  FaWeight,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaHeart,
} from "react-icons/fa";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";
import { usePet } from "../hooks/usePets";

function PetDetails() {
  const { id } = useParams();
  const { pet, loading, notFound } = usePet(id);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedImage, setSelectedImage] = useState(null);
  const [adoptionRequested, setAdoptionRequested] = useState(false);

  const image = selectedImage ?? pet?.images?.[0] ?? null;

  function handleAdoptClick() {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
      return;
    }
    // TODO: wire this up to your adoption-request endpoint once it's
    // ready (e.g. POST /api/pets/{id}/adopt). For now this just gives
    // the visitor feedback that their interest was noted.
    setAdoptionRequested(true);
  }

  if (loading) {
    return (
      <>
        <NavBar/>
        <div className="min-h-screen flex items-center justify-center text-gray-400">
          Loading pet details…
        </div>
        <Footer/>
      </>
    );
  }

  if (notFound || !pet) {
    return (
      <>
        <NavBar/>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-3xl font-bold">Pet not found</h1>
          <p className="text-gray-500 mt-3">
            This listing may have been adopted already or removed.
          </p>
          <Link
            to="/pets"
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Browse other pets
          </Link>
        </div>
        <Footer/>
      </>
    );
  }

  return (
    <>
    <NavBar/>
    <div className="min-h-screen bg-gray-100 py-10 px-5">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* Left Side */}

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">

          {image ? (
            <img
              src={image}
              alt={pet.name}
              className="w-full h-[450px] object-cover rounded-xl"
            />
          ) : (
            <div className="w-full h-[450px] rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
              No photo available
            </div>
          )}

          {pet.images.length > 1 && (
            <div className="grid grid-cols-3 gap-3 mt-4">

              {pet.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${pet.name} ${index + 1}`}
                  onClick={() => setSelectedImage(img)}
                  className={`h-28 w-full object-cover rounded-lg cursor-pointer border-4 ${
                    image === img
                      ? "border-orange-500"
                      : "border-transparent"
                  }`}
                />
              ))}

            </div>
          )}

          <div className="mt-8">

            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">
                {pet.name}
              </h2>
              <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                {pet.status}
              </span>
            </div>

            <p className="text-gray-500 text-lg">
              {pet.breed}
            </p>

            <div className="grid md:grid-cols-2 gap-5 mt-6">

              {pet.age && (
                <div className="flex items-center gap-3">
                  <FaBirthdayCake className="text-orange-500" />
                  {pet.age}
                </div>
              )}

              {pet.gender && (
                <div className="flex items-center gap-3">
                  <FaVenusMars className="text-orange-500" />
                  {pet.gender}
                </div>
              )}

              {pet.weight && (
                <div className="flex items-center gap-3">
                  <FaWeight className="text-orange-500" />
                  {pet.weight}
                </div>
              )}

              {pet.city && (
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-orange-500" />
                  {pet.city}
                </div>
              )}

            </div>

            <div className="flex gap-8 mt-6">

              {pet.vaccinated && (
                <div className="flex items-center gap-2 text-green-600">
                  <FaCheckCircle />
                  Vaccinated
                </div>
              )}

              {pet.sterilized && (
                <div className="flex items-center gap-2 text-green-600">
                  <FaCheckCircle />
                  Sterilized
                </div>
              )}

            </div>

            {pet.description && (
              <>
                <h3 className="text-2xl font-bold mt-10 mb-4">
                  About {pet.name}
                </h3>

                <p className="text-gray-600 leading-8">
                  {pet.description}
                </p>
              </>
            )}

          </div>

        </div>

        {/* Right Side */}

        <div>

          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">

            <h2 className="text-2xl font-bold mb-6">
              Adoption Information
            </h2>

            <button
              onClick={handleAdoptClick}
              disabled={adoptionRequested}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg transition"
            >
              <div className="flex justify-center items-center gap-2">
                <FaHeart />
                {adoptionRequested ? "Request Sent ✓" : "Adopt Now"}
              </div>
            </button>

            {adoptionRequested && (
              <p className="text-sm text-green-600 text-center mt-3">
                Thanks! The owner will be notified of your interest.
              </p>
            )}

            {(pet.owner.name || pet.owner.phone || pet.owner.email) && (
              <>
                <hr className="my-6" />

                <h3 className="text-xl font-semibold mb-5">
                  Owner Details
                </h3>

                <div className="space-y-4">

                  {pet.owner.name && (
                    <div>
                      <p className="text-gray-500 text-sm">
                        Name
                      </p>

                      <p className="font-semibold">
                        {pet.owner.name}
                      </p>
                    </div>
                  )}

                  {pet.owner.phone && (
                    <div className="flex items-center gap-3">
                      <FaPhone className="text-orange-500" />
                      {pet.owner.phone}
                    </div>
                  )}

                  {pet.owner.email && (
                    <div className="flex items-center gap-3">
                      <FaEnvelope className="text-orange-500" />
                      {pet.owner.email}
                    </div>
                  )}

                </div>

                {pet.owner.email && (
                  <a
                    href={`mailto:${pet.owner.email}`}
                    className="mt-8 block text-center w-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-3 rounded-xl transition"
                  >
                    Contact Owner
                  </a>
                )}
              </>
            )}

          </div>

        </div>

      </div>

    </div>
    <Footer/>
    </>
  );
}

export default PetDetails;
