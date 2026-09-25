function CategoryTabs({ categories, setActiveCategory, activeCategory }) {
    return (
        <div className="flex gap-2 px-4 mb-5 overflow-x-auto pb-2 scrollbar-hide">
            {/* "All" tab first, then each category */}
            {["All", ...categories].map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${activeCategory === cat
                        ? "bg-[#0F6660] text-[#FBF3DF] border-[#0F6660]"
                        : "bg-white text-[#241A12]/70 border-[#241A12]/10"
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    )
}

export default CategoryTabs