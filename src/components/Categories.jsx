import { FaDog, FaCat, FaDove, FaPaw } from "react-icons/fa";
import { Link } from "react-router-dom";

// "species" is the singular value the API stores and returns (PetRequest.species),
// so it - not the display label - is what gets put in the query string.
// Previously this navigated to /pets?species=dogs while pets are stored as
// "Dog", which matched nothing and always showed an empty grid.
const categories = [
  {
    name: "Dogs",
    species: "Dog",
    icon: <FaDog size={30} />,
    color: "bg-orange-100",
    text: "text-orange-500",
  },
  {
    name: "Cats",
    species: "Cat",
    icon: <FaCat size={30} />,
    color: "bg-cyan-100",
    text: "text-cyan-600",
  },
  {
    name: "Birds",
    species: "Bird",
    icon: <FaDove size={30} />,
    color: "bg-yellow-100",
    text: "text-yellow-600",
  },
  {
    name: "Others",
    species: "Other",
    icon: <FaPaw size={30} />,
    color: "bg-pink-100",
    text: "text-pink-500",
  },
];

function Categories() {
  return (
    <section className="max-w-7xl mx-auto py-16">

      <h2 className="text-3xl font-bold text-center mb-10">
        Browse by Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {categories.map((item) => (

          // A real <Link>, not a div with an onClick handler: keyboard users can
          // focus and activate it, and it gets middle-click / open-in-new-tab and
          // screen-reader link semantics for free.
          <Link
            key={item.name}
            to={`/pets?species=${encodeURIComponent(item.species)}`}
            className={`${item.color}
            rounded-2xl
            p-8
            text-center
            cursor-pointer
            hover:scale-105
            duration-300
            shadow-md
            focus:outline-none focus:ring-4 focus:ring-orange-300`}
          >

            <div className={`${item.text} flex justify-center mb-4`}>
              {item.icon}
            </div>

            <h3 className="font-semibold">
              {item.name}
            </h3>

          </Link>

        ))}

      </div>

    </section>
  );
}

export default Categories;
