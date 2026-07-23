import PetCard from "./PetCard";

import pet1 from "../assets/hero/pet1.jpg";
import pet2 from "../assets/hero/pet4.jpg";
import pet3 from "../assets/hero/pet5.jpg";

const pets = [
  {
    name: "Bruno",
    breed: "Golden Retriever • 2 yrs",
    gender: "Male",
    status: "Available",
    image: pet1,
  },
  {
    name: "Luna",
    breed: "Persian Cat • 1 yr",
    gender: "Female",
    status: "Available",
    image: pet2,
  },
  {
    name: "Max",
    breed: "Labrador • 3 yrs",
    gender: "Male",
    status: "Pending",
    image: pet3,
  },
];

function FeaturedPets() {
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
            <PetCard
              key={pet.name}
              pet={pet}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default FeaturedPets;