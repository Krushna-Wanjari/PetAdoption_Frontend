import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import FeaturedPets from '../components/FeaturedPets'
import { usePets } from '../hooks/usePets'

export default function Home() {
  const { pets, loading } = usePets();
  const featured = pets.slice(0, 3);

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

      <Footer/>
    </div>
  )
}
