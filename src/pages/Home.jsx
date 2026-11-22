import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import FeaturedPets from '../components/FeaturedPets'
import { usePets } from '../hooks/usePets'

export default function Home() {
  const { pets, loading, isFallback } = usePets();
  // "Pets looking for a home" should not advertise pets that are already adopted.
  const featured = pets.filter((pet) => !pet.isAdopted).slice(0, 3);

  return (
    <div>
      <NavBar/>
      <Hero/>
      <Categories/>

      {loading ? (
        <div className="py-20 text-center text-gray-400">Loading pets…</div>
      ) : (
        <FeaturedPets pets={featured}/>
      )}

      {isFallback && (
        <p className="max-w-7xl mx-auto px-6 pb-10 text-sm text-orange-600 bg-orange-50 border border-orange-200 rounded-xl py-3 px-4">
          Showing sample pets — the API could not be reached, so these are not live listings.
        </p>
      )}

      <Footer/>
    </div>
  )
}
