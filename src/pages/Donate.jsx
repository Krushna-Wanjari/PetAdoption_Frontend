import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HeartHandshake,
  Upload,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { createPetListing, uploadPetImage } from "../api/petsApi";
import { getApiErrorMessage } from "../api/apiError";

function Donate() {
  const [step, setStep] = useState(1);
  const [formError, setFormError] = useState("");
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [uploadWarnings, setUploadWarnings] = useState([]);
  const navigate = useNavigate();

  const [petData, setPetData] = useState({
    petName: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    color: "",
    weight: "",
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
  // Object URLs are derived from the selection and revoked when they change, so
  // previews don't leak for the lifetime of the page.
  const previews = useMemo(() => images.map((file) => URL.createObjectURL(file)), [images]);

  useEffect(() => {
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [previews]);

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

  function validateStep1() {
    if (!petData.petName.trim() || !petData.species || !petData.age || !petData.gender) {
      return "Please fill in the pet's name, species, age and gender.";
    }
    const age = Number(petData.age);
    if (Number.isNaN(age) || age < 0 || age > 50) {
      return "Age must be a number between 0 and 50.";
    }
    if (images.length === 0) {
      return "Please add at least one photo of the pet.";
    }
    return "";
  }

  function validateStep2() {
    if (!petData.ownerName.trim() || !petData.email.trim() || !petData.phone.trim() || !petData.city.trim()) {
      return "Please fill in your name, email, phone and city.";
    }
    if (!/^\S+@\S+\.\S+$/.test(petData.email.trim())) {
      return "Please enter a valid email address.";
    }
    return "";
  }

  function handleNext() {
    const msg = validateStep1();
    if (msg) {
      setFormError(msg);
      return;
    }
    setFormError("");
    setStep(2);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const msg = validateStep2();
    if (msg) {
      setFormError(msg);
      return;
    }

    setFormError("");
    setServerError("");
    setUploadWarnings([]);
    setSubmitting(true);

    try {
      // The backend PetRequest is strict about enums and has no notion of
      // blank strings for optional text, so trim and drop empties here.
      const optional = (value) => {
        const trimmed = value?.trim();
        return trimmed ? trimmed : undefined;
      };

      const petPayload = {
        name: petData.petName.trim(),
        species: petData.species,
        breed: optional(petData.breed),
        age: Number(petData.age),
        gender: petData.gender === "Male" ? "MALE" : "FEMALE",
        description: optional(petData.description),
        city: optional(petData.city),
        weight: optional(petData.weight),
        color: optional(petData.color),
        vaccinated: petData.vaccinated,
        sterilized: petData.sterilized,
        reasonForRehoming: optional(petData.reason),
        ownerName: optional(petData.ownerName),
        ownerPhone: optional(petData.phone),
      };

      const created = await createPetListing(petPayload);

      const failed = [];
      for (const file of images) {
        try {
          await uploadPetImage(created.id, file);
        } catch {
          failed.push(file.name);
        }
      }

      if (failed.length > 0) {
        setUploadWarnings(failed);
      }
      setSubmitted(true);
    } catch (err) {
      setServerError(
        getApiErrorMessage(err, "Could not submit your pet listing. Please try again.")
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <NavBar/>
        <div className="min-h-screen bg-orange-50 py-20 px-4 flex items-center justify-center">
          <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-10 text-center">
            <CheckCircle2 size={64} className="mx-auto text-green-500" />
            <h1 className="text-3xl font-bold mt-6">Listing submitted!</h1>
            <p className="text-gray-500 mt-3">
              Thanks for giving {petData.petName || "your pet"} a chance at a new home.
              We'll review the listing and it'll appear in Browse Pets shortly.
            </p>

            {uploadWarnings.length > 0 && (
              <div className="mt-6 flex items-start gap-3 text-left text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl py-3 px-4">
                <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                <span>
                  The listing was created, but {uploadWarnings.length} photo(s) failed to
                  upload: {uploadWarnings.join(", ")}. Please add them again from the admin
                  pet editor.
                </span>
              </div>
            )}

            <button
              onClick={() => navigate("/pets")}
              className="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
            >
              Browse Pets
            </button>
          </div>
        </div>
        <Footer/>
      </>
    );
  }

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
            Help your pet find a loving forever home
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

          {(formError || serverError) && (
            <p className="mb-6 text-center text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl py-3 px-4">
              {formError || serverError}
            </p>
          )}

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
                  min="0"
                  max="50"
                  placeholder="Age (years)"
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

                <input
                  type="text"
                  name="weight"
                  placeholder="Weight (e.g. 5 kg)"
                  value={petData.weight}
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
                    accept="image/*"
                    multiple
                    hidden
                    onChange={handleImages}
                  />

                </label>

                {previews.length > 0 && (

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

                    {previews.map((src, index) => (

                      <img
                        key={src}
                        src={src}
                        alt={images[index]?.name ?? "Pet photo preview"}
                        className="rounded-lg h-28 w-full object-cover"
                      />

                    ))}

                  </div>

                )}

              </div>

              <div className="flex justify-end">

                <button
                  type="button"
                  onClick={handleNext}
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
                  onClick={() => {
                    setFormError("");
                    setStep(1);
                  }}
                  className="flex items-center gap-2 border border-orange-500 text-orange-500 px-6 py-3 rounded-lg hover:bg-orange-50"
                >
                  <ArrowLeft size={18} />
                  Back
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting..." : "Submit Pet"}
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
