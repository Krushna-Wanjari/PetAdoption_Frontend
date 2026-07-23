import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Slider from '../components/Slider'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import FeaturedPets from '../components/FeaturedPets'

export default function Home() {
  return (
    <div>
      <NavBar/>
      <Hero/>
      <Categories/>
      <FeaturedPets/>
      <Footer/>
    </div>
  )
}
