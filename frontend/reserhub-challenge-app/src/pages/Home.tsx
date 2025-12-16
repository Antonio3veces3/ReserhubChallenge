import { CityCategoryTabs } from "../features/places/components/CityCategoryTabs"
import { ReserhubCities } from "../features/places/components/ReserhubCities"

export function Home() {
    return (
        <div>
            <div className=" mt-5 border">
                <h1 className="text-center text-4xl font-bold mb-10 text-green-900">Hi, where will be your next trip?</h1>
                <h3 className="text-center text-2xl font-normal text-green-800">Type the city you are looking for</h3>
                <h3 className="text-center text-2xl font-normal mb-10 text-green-800">and find how is the weather</h3>
                <ReserhubCities />
            </div>
            <CityCategoryTabs />
        </div>
    )
}
