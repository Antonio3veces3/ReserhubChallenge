import CitiesByPopulation from "../features/places/components/CitiesByPopulation"
import { CityWeatherCard } from "../features/weather/components/CityWeatherCard"

export function Home() {
    return (
        <div>

            <h1>Home</h1>
            <CityWeatherCard />
            {/* <CitiesByPopulation orderBy="DESC" title="Most populated cities" />
            <CitiesByPopulation orderBy="ASC" title="Less populated cities" /> */}
        </div>
    )
}
