import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Slider from '../components/Slider'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import FeaturedPets from '../components/FeaturedPets'

import pet1 from "../assets/hero/pet1.jpg";
import pet2 from "../assets/hero/pet4.jpg";
import pet3 from "../assets/hero/pet5.jpg";

export default function Home() {
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

  return (
    <div>
      <NavBar/>
      <Hero/>
      <Categories/>
      <FeaturedPets pets={pets}/>
      <Footer/>
    </div>
  )
}
