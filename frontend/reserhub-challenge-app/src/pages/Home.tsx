import CitiesByPopulation from "../features/places/components/CitiesByPopulation"
import { SearchCity } from "../features/places/components/SearchCity"
import { CityWeatherCard } from "../features/weather/components/CityWeatherCard"

export function Home() {
    return (
        <div >
            <div>
                <SearchCity />
            </div>
            {/* <CitiesByPopulation orderBy="DESC" title="Most populated cities" />
            <CitiesByPopulation orderBy="ASC" title="Less populated cities" /> */}
        </div>
    )
}
