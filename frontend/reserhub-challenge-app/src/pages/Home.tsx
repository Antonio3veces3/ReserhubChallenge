import CitiesByPopulation from "../features/places/components/CitiesByPopulation"

export function Home() {
    return (
        <div>

            <h1>Home</h1>
            <CitiesByPopulation orderBy="DESC" title="Most populated cities" />
            <CitiesByPopulation orderBy="ASC" title="Less populated cities" />
        </div>
    )
}
