import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"

export const SearchPage = () => {
  return (
    <>
      <CustomJumbotron title="Búsqueda de SuperHéroes" description="Descubre, explora y adminstra super héroes y villanos" />

      {/* Stats Dashboard */}
      <HeroStats />
    </>
  )
}


export default SearchPage