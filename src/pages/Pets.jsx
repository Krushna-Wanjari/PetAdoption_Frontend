import FeaturedPets from "../components/FeaturedPets";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { usePets } from "../hooks/usePets";

function Pets() {
  const { pets, loading, isFallback } = usePets();

  return (
    <>
      <NavBar/>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        <h1 className="text-4xl font-bold">Browse Pets</h1>
        <p className="text-gray-500 mt-2">
          {pets.length} pet{pets.length === 1 ? "" : "s"} looking for a home right now.
        </p>

        {isFallback && (
          <p className="mt-4 text-sm text-orange-600 bg-orange-50 border border-orange-200 rounded-xl py-3 px-4">
            Showing sample pets — connect the backend API to see live listings.
          </p>
        )}
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-400">Loading pets…</div>
      ) : (
        <FeaturedPets pets={pets} showHeader={false}/>
      )}

      <Footer/>
    </>
  );
}

export default Pets;
