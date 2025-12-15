import { CitiesByCountryCode } from "../features/places/components/CitiesByCountryCode"
import { CitiesByPopulationRefactor } from "../features/places/components/CitiesByPopulationRefactor"
import { ReserhubCities } from "../features/places/components/ReserhubCities"

export function Home() {
    return (
        <div >
            <div className="rounded-xl shadow-2xl mt-5">
                <h1 className="text-center text-4xl font-bold mb-10 text-green-900">Hi, where will be your next trip?</h1>
                <h3 className="text-center text-2xl font-light text-green-800">Type the city you are looking for</h3>
                <h3 className="text-center text-2xl font-light mb-10 text-green-800">and find how is the weather</h3>
                <ReserhubCities />
            </div>
            <div className="rounded-xl shadow-2xl">
                <CitiesByCountryCode />
            </div>
            <div className="rounded-xl shadow-2xl">
                <CitiesByPopulationRefactor orderBy="DESC" />
            </div>
            <div className="rounded-xl shadow-2xl">
                <CitiesByPopulationRefactor orderBy="ASC" />
            </div>
        </div>
    )
}
