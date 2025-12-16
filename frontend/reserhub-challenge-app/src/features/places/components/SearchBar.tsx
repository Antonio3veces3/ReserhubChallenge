interface SearchBarProps {
    handleSearch: (e?: React.FormEvent<Element> | undefined) => void
    value: string;
    setValue: (value: React.SetStateAction<string>) => void
}
export const SearchBar = ({ handleSearch, value, setValue }: SearchBarProps) => {
    return (
        <form onSubmit={handleSearch} className="flex gap-2 mb-4 w-full justify-center pl-5 pr-5">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type the city name"
                className="border border-sky-900 focus:border-sky-100 focus:outline focus:outline-cyan-600 rounded p-2 w-xl bg-gray-50 font-medium pl-4"
            />
            <button
                type="submit"
                onClick={(e) => handleSearch(e)}
                className="rounded text-white bg-sky-800 border border-transparent hover:bg-sky-900 focus:ring-4 focus:ring-brand-medium shadow-xs font-semibold leading-4 rounded-base text-md px-4 py-2.5 focus:outline-none tracking-wider"
            >
                Search
            </button>
        </form>

    )
}