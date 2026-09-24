import { Search } from 'lucide-react';

function SearchBar() {
    return (
        <div className="sticky top-14 z-20 bg-[#FFFFF0] px-4 py-3">
            <div className="relative">
                <Search
                    size={19}
                    color="#9ca3af"
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
                />

                <input
                    type="text"
                    // value={searchQuery}
                    // onChange={(e) =>
                    //     setSearchQuery(e.target.value)
                    // }
                    placeholder="Search food or drinks"
                    className="
                                h-11
                                w-full
                                rounded-full
                                border
                                border-black/5
                                bg-white
                                pl-11
                                pr-4
                                text-sm
                                shadow-sm
                                outline-none
                                transition
                                focus:border-[#FF5A3C]
                                focus:ring-2
                                focus:ring-[#FF5A3C]/20
                            "
                />
            </div>
        </div>
    );
}

export default SearchBar;
