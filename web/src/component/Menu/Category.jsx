
function Category({ displayCategories, activeCategory, setActiveCategory, displayItems }) {
    return (
        <div>
            {/* CATEGORY BUTTON  */}
            <div className="mb-4 overflow-x-auto scrollbar-hide">
                <div className="flex w-max gap-2 px-4">
                    {displayCategories.map((category) => {
                        const active =
                            activeCategory === category;

                        return (
                            <button
                                key={category}
                                type="button"
                                onClick={() => {
                                    setActiveCategory(category);
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth',
                                    });
                                }}
                                className={`
                                        min-h-11
                                        whitespace-nowrap
                                        rounded-full
                                        px-4
                                        text-sm
                                        font-semibold
                                        transition
                                        active:scale-95
                                        ${active
                                        ? 'bg-[#FF5A3C] text-white shadow-sm'
                                        : 'bg-white text-gray-600 border border-gray-200'
                                    }
                                    `}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* CATEGORY NAME & COUNTS  */}
            <div className="mb-3 flex items-center justify-between px-4">
                <div>
                    <h2 className="text-lg font-bold">
                        {activeCategory}
                    </h2>
                    <p className="text-xs text-gray-500">
                        {displayItems.length}{" "}
                        {displayItems.length === 1 ?
                            'item' : 'items'}
                    </p>
                </div>
            </div>
        </div>

    )
}

export default Category