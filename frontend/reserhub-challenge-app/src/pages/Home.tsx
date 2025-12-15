import { SearchCity } from "../features/places/components/SearchCity"

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
