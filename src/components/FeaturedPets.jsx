import PetCard from "./PetCard";

function FeaturedPets({pets}) {
  return (
    <section className="bg-gray-50 py-20">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between mb-10">

          <h2 className="text-3xl font-bold">
            Pets Looking for a Home
          </h2>

          <button className="text-orange-500 font-semibold">
            View All →
          </button>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {pets.map((pet) => (
            <div className="bg-white rounded-xl shadow-md transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl cursor-pointer">
            <PetCard
              key={pet.name}
              pet={pet}
            />
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default FeaturedPets;