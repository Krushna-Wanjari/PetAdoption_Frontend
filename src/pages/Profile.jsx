import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";
import {
  getCurrentUser,
  getMyAdoptions,
  getMyPets,
  getReceivedAdoptions,
  approveAdoption,
  rejectAdoption,
  updatePetListing as updatePet,
  deletePetListing as deletePet,
} from "../api/petsApi";
import { getApiErrorMessage } from "../api/apiError";
import {
  FaUserCircle,
  FaEnvelope,
  FaShieldAlt,
  FaHandHoldingHeart,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaPaw,
  FaInbox,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
} from "react-icons/fa";

const REQUEST_STYLES = {
  PENDING: { label: "Pending review", className: "bg-amber-50 text-amber-700 border-amber-200", icon: FaClock },
  APPROVED: { label: "Approved", className: "bg-green-50 text-green-700 border-green-200", icon: FaCheckCircle },
  REJECTED: { label: "Not approved", className: "bg-red-50 text-red-600 border-red-200", icon: FaTimesCircle },
};

const TABS = [
  { id: "profile", label: "Profile", icon: FaUserCircle },
  { id: "listings", label: "My Listings", icon: FaPaw },
  { id: "received", label: "Requests Received", icon: FaInbox },
];

function Profile() {
  const { user, logout } = useAuth();

  const [profile, setProfile] = useState(null);
  const [requests, setRequests] = useState([]);
  const [myPets, setMyPets] = useState([]);
  const [received, setReceived] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [busy, setBusy] = useState(null);

  // Use useEffect to load all profile data once on mount
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [me, mine, pets, rec] = await Promise.allSettled([
          getCurrentUser(),
          getMyAdoptions(),
          getMyPets(),
          getReceivedAdoptions(),
        ]);
        if (cancelled) return;
        if (me.status === "fulfilled") setProfile(me.value);
        if (mine.status === "fulfilled") setRequests(mine.value);
        if (pets.status === "fulfilled") setMyPets(pets.value);
        if (rec.status === "fulfilled") setReceived(rec.value);
        const errs = [me, mine, pets, rec].filter((r) => r.status === "rejected");
        if (errs.length) setError(getApiErrorMessage(errs[0].reason, "Some sections failed to load."));
      } catch (err) {
        if (!cancelled) setError(getApiErrorMessage(err, "Could not load your details."));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const display = profile ?? user;

  function startEdit(pet) {
    setEditingId(pet.id);
    setEditForm({
      name: pet.name || "",
      species: pet.species || "",
      breed: pet.breed || "",
      age: pet.age ?? "",
      gender: pet.gender || "",
      city: pet.city || "",
      weight: pet.weight || "",
      color: pet.color || "",
      vaccinated: !!pet.vaccinated,
      sterilized: !!pet.sterilized,
      description: pet.description || "",
      reasonForRehoming: pet.reasonForRehoming || "",
      ownerName: pet.ownerName || "",
      ownerPhone: pet.ownerPhone || "",
      status: pet.status || "AVAILABLE",
    });
  }

  async function saveEdit(id) {
    setBusy(`save-${id}`);
    try {
      const payload = { ...editForm, age: Number(editForm.age) || 0 };
      const updated = await updatePet(id, payload);
      setMyPets((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
      setEditingId(null);
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to update pet."));
    } finally {
      setBusy(null);
    }
  }

  async function removePet(id) {
    if (!confirm("Delete this listing? This cannot be undone.")) return;
    setBusy(`del-${id}`);
    try {
      await deletePet(id);
      setMyPets((prev) => prev.filter((p) => p.id !== id));
      setReceived((prev) => prev.filter((r) => r.petId !== id));
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to delete pet."));
    } finally {
      setBusy(null);
    }
  }

  async function handleDecision(requestId, action) {
    setBusy(`dec-${requestId}`);
    try {
      if (action === "approve") {
        await approveAdoption(requestId);
      } else {
        await rejectAdoption(requestId);
      }
      setReceived((prev) => prev.map((r) => (r.requestId === requestId ? { ...r, status: action === "approve" ? "APPROVED" : "REJECTED" } : r)));
    } catch (err) {
      setError(getApiErrorMessage(err, `Failed to ${action} request.`));
    } finally {
      setBusy(null);
    }
  }

  return (
    <>
      <NavBar />

      <main className="min-h-screen bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-6">

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="flex flex-wrap gap-2 p-2 border-b">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold transition ${
                      active ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-orange-50"
                    }`}
                  >
                    <Icon />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {error && (
              <div className="m-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl py-3 px-4">
                {error}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="p-8 text-center">
                <FaUserCircle size={72} className="mx-auto text-orange-500" />
                <h1 className="text-3xl font-bold mt-4">{display?.name}</h1>
                <p className="text-gray-500 mt-1">{display?.role}</p>

                <div className="mt-8 space-y-4 text-left max-w-md mx-auto">
                  <div className="flex items-center gap-3 border rounded-xl px-4 py-3">
                    <FaEnvelope className="text-orange-400" />
                    <span>{display?.email}</span>
                  </div>
                  <div className="flex items-center gap-3 border rounded-xl px-4 py-3">
                    <FaShieldAlt className="text-orange-400" />
                    <span>Role: {display?.role}</span>
                  </div>
                </div>

                <div className="mt-6 max-w-md mx-auto space-y-3">
                  <Link
                    to="/donate"
                    className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
                  >
                    <FaHandHoldingHeart />
                    List a New Pet
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}

            {activeTab === "listings" && (
              <div className="p-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">My Listings</h2>
                  <Link to="/donate" className="text-orange-500 font-semibold hover:underline">
                    + Add a pet
                  </Link>
                </div>

                {loading ? (
                  <p className="text-gray-400 mt-4">Loading...</p>
                ) : myPets.length === 0 ? (
                  <p className="text-gray-500 mt-4">You haven't listed any pets yet.</p>
                ) : (
                  <ul className="mt-5 space-y-4">
                    {myPets.map((pet) => (
                      <li key={pet.id} className="border rounded-2xl overflow-hidden">
                        <div className="flex flex-col md:flex-row gap-4 p-4">
                          <Link to={`/pets/${pet.id}`} className="w-full md:w-40 h-40 shrink-0">
                            <img
                              src={pet.imageUrl || pet.imageUrls?.[0] || "/src/assets/pet1.jpg"}
                              alt={pet.name}
                              className="w-full h-full object-cover rounded-xl"
                            />
                          </Link>

                          <div className="flex-1">
                            {editingId === pet.id ? (
                              <div className="grid md:grid-cols-2 gap-3">
                                {["name","species","breed","age","gender","city","weight","color","ownerName","ownerPhone"].map((field) => (
                                  <input
                                    key={field}
                                    value={editForm[field]}
                                    onChange={(e) => setEditForm({ ...editForm, [field]: e.target.value })}
                                    placeholder={field}
                                    className="border rounded-xl px-3 py-2"
                                  />
                                ))}
                                <textarea
                                  value={editForm.description}
                                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                  placeholder="Description"
                                  className="md:col-span-2 border rounded-xl px-3 py-2"
                                />
                                <textarea
                                  value={editForm.reasonForRehoming}
                                  onChange={(e) => setEditForm({ ...editForm, reasonForRehoming: e.target.value })}
                                  placeholder="Reason for rehoming"
                                  className="md:col-span-2 border rounded-xl px-3 py-2"
                                />
                                <label className="flex items-center gap-2 text-sm">
                                  <input type="checkbox" checked={editForm.vaccinated} onChange={(e) => setEditForm({ ...editForm, vaccinated: e.target.checked })} />
                                  Vaccinated
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                  <input type="checkbox" checked={editForm.sterilized} onChange={(e) => setEditForm({ ...editForm, sterilized: e.target.checked })} />
                                  Sterilized
                                </label>
                                <div className="md:col-span-2 flex gap-2">
                                  <button onClick={() => saveEdit(pet.id)} disabled={busy === `save-${pet.id}`} className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl">
                                    <FaSave /> Save
                                  </button>
                                  <button onClick={() => setEditingId(null)} className="flex items-center gap-2 border px-4 py-2 rounded-xl">
                                    <FaTimes /> Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="flex items-start justify-between">
                                  <div>
                                    <Link to={`/pets/${pet.id}`} className="text-xl font-bold hover:text-orange-500">{pet.name}</Link>
                                    <p className="text-gray-500">{pet.breed} • {pet.species} • {pet.age} yrs • {pet.status}</p>
                                    <p className="text-gray-500 mt-1">{pet.city ? `Location: ${pet.city}` : ""}</p>
                                  </div>
                                  <div className="flex gap-2">
                                    <button onClick={() => startEdit(pet)} className="p-2 rounded-full hover:bg-gray-100"><FaEdit /></button>
                                    <button onClick={() => removePet(pet.id)} disabled={busy === `del-${pet.id}`} className="p-2 rounded-full hover:bg-red-50 text-red-500"><FaTrash /></button>
                                  </div>
                                </div>
                                {pet.description && <p className="text-gray-600 mt-2 line-clamp-2">{pet.description}</p>}
                              </>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {activeTab === "received" && (
              <div className="p-8">
                <h2 className="text-2xl font-bold">Requests Received</h2>
                <p className="text-gray-500 mt-1">Adoption requests on pets you've listed</p>

                {loading ? (
                  <p className="text-gray-400 mt-4">Loading...</p>
                ) : received.length === 0 ? (
                  <p className="text-gray-500 mt-4">No requests yet.</p>
                ) : (
                  <ul className="mt-5 space-y-3">
                    {received.map((request) => {
                      const style = REQUEST_STYLES[request.status] ?? REQUEST_STYLES.PENDING;
                      const Icon = style.icon;
                      const pending = request.status === "PENDING";
                      return (
                        <li key={request.requestId} className="flex flex-col md:flex-row md:items-center justify-between gap-4 border rounded-xl px-4 py-4">
                          <div>
                            <p className="font-semibold">
                              {request.userName} wants to adopt <Link to={`/pets/${request.petId}`} className="text-orange-600 hover:underline">{request.petName}</Link>
                            </p>
                            {request.message && <p className="text-gray-500 mt-1">"{request.message}"</p>}
                            <span className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full border mt-2 ${style.className}`}>
                              <Icon />
                              {style.label}
                            </span>
                          </div>
                          {pending && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleDecision(request.requestId, "approve")}
                                disabled={busy === `dec-${request.requestId}`}
                                className="px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleDecision(request.requestId, "reject")}
                                disabled={busy === `dec-${request.requestId}`}
                                className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
          </div>

          {activeTab === "profile" && (
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold">My adoption requests</h2>
              {loading ? (
                <p className="text-gray-400 mt-4">Loading your requests...</p>
              ) : requests.length === 0 ? (
                <div className="mt-4">
                  <p className="text-gray-500">You haven't requested to adopt any pets yet.</p>
                  <Link to="/pets" className="inline-block mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition">
                    Browse pets
                  </Link>
                </div>
              ) : (
                <ul className="mt-5 space-y-3">
                  {requests.map((request) => {
                    const style = REQUEST_STYLES[request.status] ?? REQUEST_STYLES.PENDING;
                    const Icon = style.icon;
                    return (
                      <li key={request.requestId} className="flex items-center justify-between gap-4 border rounded-xl px-4 py-3">
                        <div className="min-w-0">
                          <Link to={`/pets/${request.petId}`} className="font-semibold text-orange-600 hover:underline truncate block">
                            {request.petName}
                          </Link>
                          {request.createdAt && (
                            <p className="text-xs text-gray-400">
                              Requested on {new Date(request.createdAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <span className={`flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full border shrink-0 ${style.className}`}>
                          <Icon />
                          {style.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}

export default Profile;
