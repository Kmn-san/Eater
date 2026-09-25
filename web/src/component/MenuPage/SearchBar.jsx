import { Search } from 'lucide-react'
import React from 'react'

function SearchBar() {
    return (
        <div className="px-4 mb-4">
            <div className="relative">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#241A12]/40"
                />
                <input
                    type="text"
                    placeholder="Search the menu"
                    className="input input-bordered w-full pl-10 rounded-full bg-white border-[#241A12]/10 shadow-none focus:outline-none focus:ring-2 focus:ring-[#0F6660] focus:border-transparent text-sm h-10"
                />
            </div>
        </div>
    )
}

export default SearchBar