import { Search, X } from 'lucide-react'

function SearchBar({ search, setSearch, expanded, onToggle }) {
    if (!expanded) {
        return (
            <button
                type="button"
                onClick={() => onToggle(true)}
                aria-label="Search the menu"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#241A12]/60 shadow-sm shrink-0"
            >
                <Search size={18} />
            </button>
        )
    }

    return (
        <div className="relative flex-1">
            <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#241A12]/40"
            />
            <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search the menu"
                className="input input-bordered w-full pl-10 pr-10 rounded-full bg-white border-[#241A12]/10 shadow-none focus:outline-none focus:ring-2 focus:ring-[#0F6660] focus:border-transparent text-sm h-10"
            />
            <button
                type="button"
                onClick={() => {
                    setSearch('')
                    onToggle(false)
                }}
                aria-label="Close search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#241A12]/40 hover:text-[#241A12]/70 transition-colors"
            >
                <X size={16} />
            </button>
        </div>
    )
}

export default SearchBar