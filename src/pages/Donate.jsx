import { useState } from "react";
import { HeartHandshake, Upload, ArrowLeft, ArrowRight } from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Donate() {
  const [step, setStep] = useState(1);

  const [petData, setPetData] = useState({
    petName: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    color: "",
    vaccinated: false,
    sterilized: false,
    description: "",
    reason: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setPetData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImages = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(petData);
    console.log(images);

    // TODO:
    // Upload images to Cloudinary
    // Send petData + image URLs to Spring Boot
  };

  return (
    <>
    <NavBar/>

    <div className="min-h-screen bg-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Header */}

        <div className="bg-orange-500 text-white p-8 text-center">

          <HeartHandshake size={55} className="mx-auto mb-3" />

          <h1 className="text-4xl font-bold">
            List Your Pet for Adoption
          </h1>

          <p className="mt-2 text-orange-100">
            Help your pet find a loving forever home ❤️
          </p>

        </div>

        {/* Progress */}

        <div className="px-8 pt-8">

          <div className="flex justify-between mb-3 text-sm font-medium">

            <span className={step === 1 ? "text-orange-500" : "text-gray-400"}>
              Pet Details
            </span>

            <span className={step === 2 ? "text-orange-500" : "text-gray-400"}>
              Owner Details
            </span>

          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full">

            <div
              className={`h-3 rounded-full bg-orange-500 transition-all duration-500 ${
                step === 1 ? "w-1/2" : "w-full"
              }`}
            ></div>

          </div>

        </div>

        <form onSubmit={handleSubmit} className="p-8">

          {/* STEP 1 */}

          {step === 1 && (
            <div className="space-y-6">

              <div className="grid md:grid-cols-2 gap-5">

                <input
                  type="text"
                  name="petName"
                  placeholder="Pet Name"
                  value={petData.petName}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

                <select
                  name="species"
                  value={petData.species}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                >
                  <option value="">Species</option>
                  <option>Dog</option>
                  <option>Cat</option>
                  <option>Rabbit</option>
                  <option>Bird</option>
                  <option>Other</option>
                </select>

                <input
                  type="text"
                  name="breed"
                  placeholder="Breed"
                  value={petData.breed}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={petData.age}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

                <select
                  name="gender"
                  value={petData.gender}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                >
                  <option value="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>

                <input
                  type="text"
                  name="color"
                  placeholder="Color"
                  value={petData.color}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

              </div>

              <div className="flex gap-8">

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="vaccinated"
                    checked={petData.vaccinated}
                    onChange={handleChange}
                  />
                  Vaccinated
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="sterilized"
                    checked={petData.sterilized}
                    onChange={handleChange}
                  />
                  Sterilized
                </label>

              </div>

              <textarea
                rows="4"
                name="description"
                placeholder="Describe your pet..."
                value={petData.description}
                onChange={handleChange}
                className="border rounded-lg p-3 w-full"
              />

              <textarea
                rows="3"
                name="reason"
                placeholder="Reason for giving your pet for adoption..."
                value={petData.reason}
                onChange={handleChange}
                className="border rounded-lg p-3 w-full"
              />

              {/* Images */}

              <div className="border-2 border-dashed border-orange-300 rounded-xl p-6">

                <label className="flex flex-col items-center cursor-pointer">

                  <Upload size={45} className="text-orange-500" />

                  <p className="mt-3 font-semibold">
                    Upload Pet Photos
                  </p>

                  <p className="text-gray-500 text-sm">
                    JPG, PNG (Multiple Images)
                  </p>

                  <input
                    type="file"
                    multiple
                    hidden
                    onChange={handleImages}
                  />

                </label>

                {images.length > 0 && (

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

                    {images.map((image, index) => (

                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt=""
                        className="rounded-lg h-28 w-full object-cover"
                      />

                    ))}

                  </div>

                )}

              </div>

              <div className="flex justify-end">

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
                >
                  Next
                  <ArrowRight size={18} />
                </button>

              </div>

            </div>
          )}

          {/* STEP 2 */}

          {step === 2 && (

            <div className="space-y-6">

              <div className="grid md:grid-cols-2 gap-5">

                <input
                  type="text"
                  name="ownerName"
                  placeholder="Owner Name"
                  value={petData.ownerName}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={petData.email}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={petData.phone}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={petData.city}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={petData.state}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={petData.pincode}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

              </div>

              <textarea
                rows="3"
                name="address"
                placeholder="Full Address"
                value={petData.address}
                onChange={handleChange}
                className="border rounded-lg p-3 w-full"
              />

              <div className="flex justify-between">

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 border border-orange-500 text-orange-500 px-6 py-3 rounded-lg hover:bg-orange-50"
                >
                  <ArrowLeft size={18} />
                  Back
                </button>

                <button
                  type="submit"
                  className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600"
                >
                  Submit Pet
                </button>

              </div>

            </div>

          )}

        </form>

      </div>
    </div>

    <Footer/>
    </>
  );
}

export default Donate;