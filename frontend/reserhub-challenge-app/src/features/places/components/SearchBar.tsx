interface SearchBarProps {
    handleSearch: (e?: React.FormEvent<Element> | undefined) => void
    value: string;
    setValue: (value: React.SetStateAction<string>) => void
}
export const SearchBar = ({ handleSearch, value, setValue }: SearchBarProps) => {
    return (
        <form onSubmit={handleSearch} className="flex gap-2 mb-4 w-full justify-center">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type the city name"
                className="border rounded p-2 w-xl"
            />
            <button
                type="submit"
                onClick={(e) => handleSearch(e)}
                className="text-black px-4 py-2 rounded flex-none"
            >
                Search
            </button>
        </form>
    )
}