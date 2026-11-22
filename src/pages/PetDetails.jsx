import { useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaVenusMars,
  FaWeight,
  FaPhone,
  FaCheckCircle,
  FaHeart,
  FaPalette,
} from "react-icons/fa";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PetImage from "../components/PetImage";
import useAuth from "../hooks/useAuth";
import { usePet } from "../hooks/usePets";
import { requestAdoption } from "../api/petsApi";
import { getApiErrorMessage } from "../api/apiError";

/** Badge colours per status, so an adopted pet no longer shows a green "available" pill. */
const STATUS_STYLES = {
  AVAILABLE: "bg-green-100 text-green-700",
  PENDING: "bg-amber-100 text-amber-700",
  ADOPTED: "bg-gray-200 text-gray-600",
};

function PetDetails() {
  const { id } = useParams();
  const { pet, loading, notFound } = usePet(id);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState("");
  const [adoptionRequested, setAdoptionRequested] = useState(false);
  const [adopting, setAdopting] = useState(false);
  const [adoptError, setAdoptError] = useState("");

  const image = selectedImage ?? pet?.images?.[0] ?? null;

  async function handleAdoptClick() {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
      return;
    }

    setAdopting(true);
    setAdoptError("");
    try {
      await requestAdoption(id, message.trim());
      setAdoptionRequested(true);
      setMessage("");
    } catch (err) {
      setAdoptError(
        getApiErrorMessage(err, "Could not submit your adoption request. Please try again.")
      );
    } finally {
      setAdopting(false);
    }
  }

  if (loading) {
    return (
      <>
        <NavBar/>
        <div className="min-h-screen flex items-center justify-center text-gray-400">
          Loading pet details...
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

  const statusKey = String(pet.status ?? "AVAILABLE").toUpperCase();
  const statusStyle = STATUS_STYLES[statusKey] ?? "bg-gray-100 text-gray-600";
  const alreadyRequested = adoptionRequested || pet.isPending;

  return (
    <>
    <NavBar/>
    <div className="min-h-screen bg-gray-100 py-10 px-5">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* Left Side */}

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">

          <PetImage
            src={image}
            alt={pet.name}
            className="w-full h-[450px] object-cover rounded-xl"
          />

          {pet.images.length > 1 && (
            <div className="grid grid-cols-3 gap-3 mt-4">

              {pet.images.map((img, index) => (
                <img
                  key={img}
                  src={img}
                  alt={`${pet.name} photo ${index + 1}`}
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

            <div className="flex items-center justify-between gap-4">
              <h2 className="text-3xl font-bold">
                {pet.name}
              </h2>
              <span className={`text-sm font-semibold px-3 py-1 rounded-full shrink-0 ${statusStyle}`}>
                {pet.statusLabel}
              </span>
            </div>

            <p className="text-gray-500 text-lg">
              {pet.breedLine || pet.breed}
            </p>

            <div className="grid md:grid-cols-2 gap-5 mt-6">

              {pet.age !== "" && pet.age != null && (
                <div className="flex items-center gap-3">
                  <FaBirthdayCake className="text-orange-500" />
                  {pet.age} yrs
                </div>
              )}

              {pet.genderLabel && (
                <div className="flex items-center gap-3">
                  <FaVenusMars className="text-orange-500" />
                  {pet.genderLabel}
                </div>
              )}

              {pet.weight && (
                <div className="flex items-center gap-3">
                  <FaWeight className="text-orange-500" />
                  {pet.weight}
                </div>
              )}

              {pet.color && (
                <div className="flex items-center gap-3">
                  <FaPalette className="text-orange-500" />
                  {pet.color}
                </div>
              )}

              {pet.city && (
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-orange-500" />
                  {pet.city}
                </div>
              )}

            </div>

            <div className="flex gap-8 mt-6 flex-wrap">

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

            {pet.reasonForRehoming && (
              <>
                <h3 className="text-xl font-bold mt-10 mb-3">
                  Why {pet.name} needs a new home
                </h3>
                <p className="text-gray-600 leading-8">
                  {pet.reasonForRehoming}
                </p>
              </>
            )}

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

            {adoptError && (
              <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl py-3 px-4">
                {adoptError}
              </p>
            )}

            {pet.isAdopted ? (
              <div className="w-full bg-gray-100 text-gray-500 text-center py-4 rounded-xl font-semibold">
                This pet has already found a home
              </div>
            ) : alreadyRequested ? (
              <div className="w-full bg-amber-50 border border-amber-200 text-amber-700 text-center py-4 rounded-xl font-semibold">
                Your request is under review
              </div>
            ) : (
              <>
                <label
                  htmlFor="adoption-message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Message to the owner (optional)
                </label>
                <textarea
                  id="adoption-message"
                  rows="4"
                  maxLength={1000}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell them about your home and why you'd love to adopt..."
                  className="w-full border rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />
                <p className="text-xs text-gray-400 mt-1 text-right">
                  {message.length}/1000
                </p>

                <button
                  onClick={handleAdoptClick}
                  disabled={adopting}
                  className="mt-4 w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg transition"
                >
                  <div className="flex justify-center items-center gap-2">
                    <FaHeart />
                    {adopting ? "Submitting..." : "Adopt Now"}
                  </div>
                </button>
              </>
            )}

            {alreadyRequested && !pet.isAdopted && (
              <p className="text-sm text-green-600 text-center mt-3">
                Thanks! The owner will be notified of your interest.
              </p>
            )}

            <p className="text-sm text-gray-500 text-center mt-4">
              <Link to="/profile" className="text-orange-500 hover:underline font-semibold">
                View my adoption requests
              </Link>
            </p>

            {pet.owner.name && (
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
                    <a
                      href={`tel:${pet.owner.phone}`}
                      className="flex items-center gap-3 text-orange-500 hover:underline"
                    >
                      <FaPhone />
                      {pet.owner.phone}
                    </a>
                  )}

                </div>
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
