import { useState } from "react";
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

function PetDetails() {
  const pet = {
    name: "Bruno",
    breed: "Golden Retriever",
    species: "Dog",
    age: "2 Years",
    gender: "Male",
    weight: "28 kg",
    color: "Golden",
    city: "Pune",
    vaccinated: true,
    sterilized: true,
    description:
      "Bruno is a playful, friendly and energetic Golden Retriever. He loves children, enjoys outdoor walks and is fully house-trained. Looking for a loving forever home.",
    images: [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=1000",
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1000",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1000",
    ],
    owner: {
      name: "Rahul Sharma",
      phone: "+91 9876543210",
      email: "rahul@gmail.com",
    },
  };

  const [selectedImage, setSelectedImage] = useState(pet.images[0]);

  return (
    <>
    <NavBar/>
    <div className="min-h-screen bg-gray-100 py-10 px-5">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* Left Side */}

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">

          <img
            src={selectedImage}
            alt={pet.name}
            className="w-full h-[450px] object-cover rounded-xl"
          />

          <div className="grid grid-cols-3 gap-3 mt-4">

            {pet.images.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`h-28 w-full object-cover rounded-lg cursor-pointer border-4 ${
                  selectedImage === img
                    ? "border-orange-500"
                    : "border-transparent"
                }`}
              />
            ))}

          </div>

          <div className="mt-8">

            <h2 className="text-3xl font-bold">
              {pet.name}
            </h2>

            <p className="text-gray-500 text-lg">
              {pet.breed}
            </p>

            <div className="grid md:grid-cols-2 gap-5 mt-6">

              <div className="flex items-center gap-3">
                <FaBirthdayCake className="text-orange-500" />
                {pet.age}
              </div>

              <div className="flex items-center gap-3">
                <FaVenusMars className="text-orange-500" />
                {pet.gender}
              </div>

              <div className="flex items-center gap-3">
                <FaWeight className="text-orange-500" />
                {pet.weight}
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-orange-500" />
                {pet.city}
              </div>

            </div>

            <div className="flex gap-8 mt-6">

              <div className="flex items-center gap-2 text-green-600">
                <FaCheckCircle />
                Vaccinated
              </div>

              <div className="flex items-center gap-2 text-green-600">
                <FaCheckCircle />
                Sterilized
              </div>

            </div>

            <h3 className="text-2xl font-bold mt-10 mb-4">
              About {pet.name}
            </h3>

            <p className="text-gray-600 leading-8">
              {pet.description}
            </p>

          </div>

        </div>

        {/* Right Side */}

        <div>

          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">

            <h2 className="text-2xl font-bold mb-6">
              Adoption Information
            </h2>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold text-lg">
              <div className="flex justify-center items-center gap-2">
                <FaHeart />
                Adopt Now
              </div>
            </button>

            <hr className="my-6" />

            <h3 className="text-xl font-semibold mb-5">
              Owner Details
            </h3>

            <div className="space-y-4">

              <div>
                <p className="text-gray-500 text-sm">
                  Name
                </p>

                <p className="font-semibold">
                  {pet.owner.name}
                </p>
              </div>

              <div className="flex items-center gap-3">

                <FaPhone className="text-orange-500" />

                {pet.owner.phone}

              </div>

              <div className="flex items-center gap-3">

                <FaEnvelope className="text-orange-500" />

                {pet.owner.email}

              </div>

            </div>

            <button className="mt-8 w-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-3 rounded-xl transition">
              Contact Owner
            </button>

          </div>

        </div>

      </div>

    </div>
    <Footer/>
    </>
  );
}

export default PetDetails;