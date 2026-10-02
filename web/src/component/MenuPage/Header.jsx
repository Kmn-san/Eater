import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UtensilsCrossed, ShoppingCart, Receipt } from 'lucide-react'
import SearchBar from './SearchBar'

function Header({ name, image, search, setSearch, cartCount = 0 }) {
    const [searchOpen, setSearchOpen] = useState(false)
    const navigate = useNavigate()
    const { restaurantCode } = useParams()

    return (
        <div>
            <div className="flex items-center gap-2 px-4 pt-6 pb-2 bg-[#FBF3DF] relative z-20">
                <div className={`flex items-center gap-2 ${searchOpen ? 'flex-1' : 'ml-auto'}`}>
                    <SearchBar
                        search={search}
                        setSearch={setSearch}
                        expanded={searchOpen}
                        onToggle={setSearchOpen}
                    />

                    {!searchOpen && (
                        <>
                            <button
                                onClick={() => navigate(`/restaurant/${restaurantCode}/orders`)}
                                aria-label="Order history"
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#241A12]/60 shadow-sm"
                            >
                                <Receipt size={18} />
                            </button>

                            <button
                                onClick={() => navigate(`/restaurant/${restaurantCode}/cart`)}
                                aria-label="Cart"
                                className="relative w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#241A12]/60 shadow-sm"
                            >
                                <ShoppingCart size={18} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#D6402C] text-white text-[10px] font-bold flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </>
                    )}
                </div>
            </div>

            <header className="bg-[#FBF3DF] z-20">
                {image && (
                    <div className="px-4">
                        <div className="h-24 rounded-2xl overflow-hidden">
                            <img
                                src={image}
                                alt={name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}

                <div className="px-4 pt-4 pb-5">
                    <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2 text-[#241A12]">
                        <UtensilsCrossed size={20} className="text-[#D6402C]" />
                        {name}
                    </h1>
                </div>
            </header>
        </div>
    )
}

export default Header