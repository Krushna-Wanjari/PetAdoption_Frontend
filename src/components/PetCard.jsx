import { Link } from "react-router-dom";
import PetImage from "./PetImage";

/** Badge colours per status. Previously every status rendered green. */
const STATUS_STYLES = {
  AVAILABLE: "bg-green-500 text-white",
  PENDING: "bg-amber-500 text-white",
  ADOPTED: "bg-gray-500 text-white",
};

function PetCard({ pet }) {
  const statusKey = String(pet.status ?? "AVAILABLE").toUpperCase();
  const badgeStyle =
    STATUS_STYLES[statusKey] ?? "bg-gray-200 text-gray-700";

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl duration-300">

      <div className="relative">

        <PetImage
          src={pet.image}
          className="w-full h-60 object-cover"
          alt={pet.name}
        />

        <span
          className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${badgeStyle}`}
        >
          {pet.statusLabel}
        </span>

      </div>

      <div className="p-5">

        <div className="flex justify-between items-start gap-2">

          <h3 className="font-bold text-lg">
            {pet.name}
          </h3>

          <span className="text-pink-500 text-sm shrink-0">
            {pet.genderLabel}
          </span>

        </div>

        <p className="text-gray-500 text-sm mt-1 truncate">
          {pet.breedLine || pet.breed}
        </p>

        {pet.city && (
          <p className="text-gray-400 text-xs mt-1">{pet.city}</p>
        )}

        <Link
          to={`/pets/${pet.id}`}
          className="mt-5 flex items-center justify-center w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default PetCard;
