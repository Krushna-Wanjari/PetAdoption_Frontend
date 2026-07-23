import { FaDog, FaCat, FaDove, FaPaw } from "react-icons/fa";

const categories = [
  {
    name: "Dogs",
    icon: <FaDog size={30} />,
    color: "bg-orange-100",
    text: "text-orange-500",
  },
  {
    name: "Cats",
    icon: <FaCat size={30} />,
    color: "bg-cyan-100",
    text: "text-cyan-600",
  },
  {
    name: "Birds",
    icon: <FaDove size={30} />,
    color: "bg-yellow-100",
    text: "text-yellow-600",
  },
  {
    name: "Others",
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

          <div
            key={item.name}
            className={`${item.color}
            rounded-2xl
            p-8
            text-center
            cursor-pointer
            hover:scale-105
            duration-300
            shadow-md`}
          >

            <div className={`${item.text} flex justify-center mb-4`}>
              {item.icon}
            </div>

            <h3 className="font-semibold">
              {item.name}
            </h3>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Categories;