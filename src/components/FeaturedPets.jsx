import { Link } from "react-router-dom";
import PetCard from "./PetCard";

function FeaturedPets({ pets, viewAllHref = "/pets", showHeader = true }) {
  return (
    <section className="bg-gray-50 py-20">

      <div className="max-w-7xl mx-auto px-6">

        {showHeader && (
          <div className="flex justify-between items-center mb-10">

            <h2 className="text-3xl font-bold">
              Pets Looking for a Home
            </h2>

            <Link to={viewAllHref} className="text-orange-500 font-semibold hover:underline">
              View All →
            </Link>

          </div>
        )}

        {pets.length === 0 && (
          <p className="text-center text-gray-400 py-10">
            No pets to show right now — check back soon!
          </p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {pets.map((pet) => (
            <div
              key={pet.id}
              className="transition-all duration-300 hover:-translate-y-3"
            >
              <PetCard pet={pet} />
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default FeaturedPets;
