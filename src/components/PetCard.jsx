import pet1 from "../assets/hero/pet1.jpg"

function PetCard({ pet }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl duration-300">

      <div className="relative">

        <img
          src={pet.image}
          className="w-full h-60 object-cover"
          alt={pet.name}
        />

        <span className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full">

          {pet.status}

        </span>

      </div>

      <div className="p-5">

        <div className="flex justify-between">

          <h3 className="font-bold text-lg">
            {pet.name}
          </h3>

          <span className="text-pink-500">
            {pet.gender}
          </span>

        </div>

        <p className="text-gray-500">

          {pet.breed}

        </p>

        <button className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl">

          View Profile

        </button>

      </div>

    </div>
  );
}

export default PetCard;