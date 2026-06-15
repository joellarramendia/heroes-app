import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { SearchControl } from "./ui/SearchControl"
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"

export const SearchPage = () => {
  return (
    <>
      <CustomJumbotron title="Búsqueda de SuperHéroes" description="Descubre, explora y adminstra super héroes y villanos" />

      <CustomBreadcrumbs currentPage="Buscador de héroes"
        breadcrumbs={[
          { label: 'Home1', to: '/' },
          { label: 'Home2', to: '/' },
          { label: 'Home3', to: '/' },
       ]}
      />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filter and search */}
      <SearchControl />
    </>
  )
}


export default SearchPage