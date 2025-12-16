import { CityCategoryTabs } from "../features/places/components/CityCategoryTabs"
import { ReserhubCities } from "../features/places/components/ReserhubCities"

export function Home() {
    return (
        <div>
            <div className="h-auto" >
                <ReserhubCities />
            </div>
            <CityCategoryTabs />
        </div>
    )
}
