import { Search, X } from 'lucide-react'

function SearchBar({ search, setSearch }) {
    return (
        <div className="px-4 pt-4 mb-4">
            <div className="relative">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#241A12]/40"
                />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search the menu"
                    className="input input-bordered w-full pl-10 rounded-full bg-white border-[#241A12]/10 shadow-none focus:outline-none focus:ring-2 focus:ring-[#0F6660] focus:border-transparent text-sm h-10"
                />
                {search && (
                    <button
                        type="button"
                        onClick={() => setSearch('')}
                        aria-label="Clear search"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#241A12]/40 hover:text-[#241A12]/70 transition-colors"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>
        </div>
    )
}

export default SearchBar