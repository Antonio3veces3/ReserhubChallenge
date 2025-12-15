import CitiesByPopulation from "../features/places/components/CitiesByPopulation"
import { SearchCity } from "../features/places/components/SearchCity"

export function Home() {
    return (
        <div >
            <div>
                <h1 className="text-center text-4xl font-bold mb-10 text-green-900">Hi, where will be yout next trip?</h1>
                <h3 className="text-center text-2xl font-light text-green-800">Type the city you are looking for,</h3>
                <h3 className="text-center text-2xl font-light mb-10 text-green-800">and know how is the weather</h3>
                <SearchCity />
            </div>
            {/* <CitiesByPopulation orderBy="DESC" title="Most populated cities" /> */}
            {/* <CitiesByPopulation orderBy="ASC" title="Less populated cities" /> */}
        </div>
    )
}
