import { useState } from "react"
import { CitiesByCountryCode } from "./CitiesByCountryCode"
import { CitiesByPopulationRefactor } from "./CitiesByPopulationRefactor"

type TabMapDynamic = {
    [key: string]: React.ReactNode;
};

export const CityCategoryTabs = () => {
    const [activeTab, setActiveTab] = useState("tab1")

    const tabs = [
        { id: "tab1", label: "Your country" },
        { id: "tab2", label: "More population" },
        { id: "tab3", label: "Less population" }
    ]

    const tabContent: TabMapDynamic = {
        "tab1": <CitiesByCountryCode />,
        "tab2": <CitiesByPopulationRefactor orderBy="DESC" />,
        "tab3": <CitiesByPopulationRefactor orderBy="ASC" />
    }
    return (
        <div className=" justify-center justify-items-center  rounded-xl shadow-2xl bg-white pt-10 b-10">
            <h1 className="text-center text-4xl font-bold mb-10 text-gray-700">Explore our categories</h1>
            <ul className="flex flex-wrap -mb-px gap-10 justify-center">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`px-4 py-2 font-semibold text-2xl ${activeTab === tab.id ? "border-b-2 border-sky-800 text-sky-800" : "text-gray-800 hover:text-sky-800"
                            }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </ul>

            <div>
                {tabContent[activeTab]}
            </div>
        </div>
    )
}
