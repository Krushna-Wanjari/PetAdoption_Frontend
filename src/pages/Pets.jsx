import FeaturedPets from "../components/FeaturedPets";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar"
import pets from "../petDataList";

function Pets(){

   return(
   <>
   <NavBar/>
   <FeaturedPets pets = {pets}/>
   <Footer/>
   </>
   )
}

export default Pets;