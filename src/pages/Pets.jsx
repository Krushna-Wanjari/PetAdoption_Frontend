import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import FeaturedPets from "../components/FeaturedPets";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { usePets } from "../hooks/usePets";

// Singular values, matching PetRequest.species on the backend.
const SPECIES_OPTIONS = ["All", "Dog", "Cat", "Bird", "Rabbit", "Other"];

function Pets() {
  const { pets, loading, isFallback } = usePets();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedSpecies = searchParams.get("species") || "all";
  const searchQuery = searchParams.get("q") || "";
  const [queryInput, setQueryInput] = useState(searchQuery);

  const filteredPets = useMemo(() => {
    let result = pets;

    if (selectedSpecies && selectedSpecies !== "all") {
      const target = selectedSpecies.toLowerCase();
      result = result.filter((p) => p.species?.toLowerCase() === target);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) =>
        [p.name, p.breed, p.breedLine, p.city, p.species, p.color].some((field) =>
          field?.toLowerCase().includes(q)
        )
      );
    }

    return result;
  }, [pets, selectedSpecies, searchQuery]);

  function handleSpeciesChange(species) {
    const value = species.toLowerCase();
    const next = new URLSearchParams(searchParams);
    if (value === "all") {
      next.delete("species");
    } else {
      next.set("species", value);
    }
    setSearchParams(next, { replace: true });
  }

  function handleSearch(e) {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (queryInput.trim()) {
      next.set("q", queryInput.trim());
    } else {
      next.delete("q");
    }
    setSearchParams(next, { replace: true });
  }

  return (
    <>
      <NavBar />

      <div className="max-w-7xl mx-auto px-6 pt-10">
        <h1 className="text-4xl font-bold">Browse Pets</h1>
        <p className="text-gray-500 mt-2">
          {filteredPets.length} pet{filteredPets.length === 1 ? "" : "s"} looking for a home right now.
        </p>

        {isFallback && (
          <p className="mt-4 text-sm text-orange-600 bg-orange-50 border border-orange-200 rounded-xl py-3 px-4">
            Showing sample pets — the API could not be reached, so these are not live listings.
          </p>
        )}

        {/* Search & Filter Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          {/* key resets the input when ?q= changes underneath us (e.g. arriving
              from a link to a pre-filled search), so the box can't drift out of
              sync with the results shown below it. */}
          <form key={searchQuery} onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="flex-1 flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-orange-500">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, breed, or city..."
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                className="w-full ml-3 outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Search
            </button>
          </form>
        </div>

        {/* Species Filter Tabs */}
        <div className="mt-4 flex flex-wrap gap-2">
          {SPECIES_OPTIONS.map((species) => {
            const isActive = species.toLowerCase() === selectedSpecies;
            return (
              <button
                key={species}
                onClick={() => handleSpeciesChange(species)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {species}
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-400">Loading pets...</div>
      ) : filteredPets.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <p className="text-lg">No pets found matching your criteria.</p>
          <button
            onClick={() => {
              setQueryInput("");
              setSearchParams({}, { replace: true });
            }}
            className="mt-4 text-orange-500 hover:underline font-semibold"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <FeaturedPets pets={filteredPets} showHeader={false} />
      )}

      <Footer />
    </>
  );
}

export default Pets;
