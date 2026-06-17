import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { SearchControl } from "./ui/SearchControl"
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"
import { searchHeroAction } from "@/heroes/actions/search-hero.action"

export const SearchPage = () => {

  const [searchParms] = useSearchParams()

  const name = searchParms.get('name') ?? undefined
  const strength = searchParms.get('strength') ?? undefined


  const {data: heroes = []} = useQuery({
    queryKey: ['search', {name, strength}],
    queryFn: () => searchHeroAction({name, strength}),
    staleTime: 1000 * 60 * 5
  })

  return (
    <>
      <CustomJumbotron title="Búsqueda de SuperHéroes" description="Descubre, explora y adminstra super héroes y villanos" />

      <CustomBreadcrumbs currentPage="Buscador de héroes"/>

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filter and search */}
      <SearchControl />

      <HeroGrid heroes={heroes}/>
    </>
  )
}


export default SearchPage