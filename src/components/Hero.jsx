import Slider from "../components/Slider";

function Hero() {
  return (
    <section className="bg-orange-50">

      <div className="max-w-7xl mx-auto px-8 py-20">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left */}

          <div>

            <span className="bg-orange-100 text-orange-500 px-4 py-2 rounded-full font-semibold">
              🐾 Pets waiting for a home
            </span>

            <h1 className="text-6xl font-extrabold mt-6 leading-tight">

              Find your

              <span className="text-orange-500">
                {" "}furry{" "}
              </span>

              best friend

            </h1>

            <p className="text-gray-500 mt-6 text-lg leading-8">

              Browse verified pet profiles, connect with shelters,
              and bring home a companion who's waiting just for you.

            </p>

            <div className="flex gap-5 mt-8">

              <button className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-4 rounded-xl font-semibold">

                Browse Pets

              </button>

              <button className="bg-white shadow-md px-7 py-4 rounded-xl">

                List a Pet

              </button>

            </div>

            <div className="flex gap-10 mt-12">

              <div>
                <h2 className="text-3xl font-bold">1200+</h2>
                <p className="text-gray-500">Pets Adopted</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold">300+</h2>
                <p className="text-gray-500">Partner Shelters</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold">4.9★</h2>
                <p className="text-gray-500">Average Rating</p>
              </div>

            </div>

          </div>

          {/* Right */}

          <Slider />

        </div>

      </div>

    </section>
  );
}

export default Hero;