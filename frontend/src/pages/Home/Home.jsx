import Gallery from "./Gallery/Gallery"
import HeroContainer from "./Hero/HeroContainer"
import PopularClasses from "./PopularClasses/PopularClasses"
import PopularTeacher from "./PopularTeacher/PopularTeacher"

console.log(import.meta.env.VITE_APIKEY);

const Home = () => {
  return (
    <div>
      <HeroContainer />
      <div className="max-w-screen-xl mx-auto">
        <Gallery />
        <PopularClasses />
        <PopularTeacher />
      </div>
    </div>
  )
}

export default Home
