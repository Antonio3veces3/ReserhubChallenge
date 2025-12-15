import CitiesByPopulation from "../features/places/components/CitiesByPopulation"
import { SearchCity } from "../features/places/components/SearchCity"

export function Home() {
    return (
        <div >
            <div className="rounded-xl shadow-2xl mt-5">
                <h1 className="text-center text-4xl font-bold mb-10 text-green-900">Hi, where will be your next trip?</h1>
                <h3 className="text-center text-2xl font-light text-green-800">Type the city you are looking for</h3>
                <h3 className="text-center text-2xl font-light mb-10 text-green-800">and find how is the weather</h3>
                <SearchCity />
            </div>

            <div className="rounded-xl shadow-2xl">
                <CitiesByPopulation orderBy="DESC" title="Most populated cities" />
            </div>
            <div className="rounded-xl shadow-2xl">
                <CitiesByPopulation orderBy="ASC" title="Less populated cities" />
            </div>
        </div>
    )
}
