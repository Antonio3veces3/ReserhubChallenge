import { CitiesByCountryCode } from "../features/places/components/CitiesByCountryCode"
import { CitiesByPopulationRefactor } from "../features/places/components/CitiesByPopulationRefactor"
import { CityCategoryTabs } from "../features/places/components/CityCategoryTabs"
import { ReserhubCities } from "../features/places/components/ReserhubCities"

export function Home() {
    return (
        <div>
            <div className=" mt-5">
                <h1 className="text-center text-4xl font-bold mb-10 text-green-900">Hi, where will be your next trip?</h1>
                <h3 className="text-center text-2xl font-light text-green-800">Type the city you are looking for</h3>
                <h3 className="text-center text-2xl font-light mb-10 text-green-800">and find how is the weather</h3>
                <ReserhubCities />
            </div>
            <CityCategoryTabs />
            {/* <CitiesByCountryCode />
            <CitiesByPopulationRefactor orderBy="DESC" />
            <CitiesByPopulationRefactor orderBy="ASC" /> */}

        </div>
    )
}
