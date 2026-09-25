import { Plus, UtensilsCrossed } from 'lucide-react'
import { formatPrice } from '../../utlis/formatPrice'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cartContext';

export default function MenuGrid({ displayItems, restaurantCode }) {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handleAdd = (item) => {
        if (item.requires_options) {
            navigate(`/menu/${restaurantCode}/${item.id}`)
            return;
        }
        addToCart({
            id: item.id,
            name: item.name,
            image: item.image,
            price_cents: item.price_cents,
            selectedOptions: [],
            quantity: 1,
            specialNote: ""
        })
    }
    return (
        <div className="grid grid-cols-2 gap-3 px-4" >
            {displayItems.map((item) => (
                <div key={item.id}
                    onClick={() => navigate(`/menu/${restaurantCode}/${item.id}`)}
                    className="card bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-100 flex flex-col">
                    {/* Image Wrapper */}
                    <div className="relative h-32 w-full bg-gray-100">
                        {item.image ? (
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300 text-3xl">
                                <UtensilsCrossed color="#d1d5db" size={32} />
                            </div>
                        )}

                        {/* Availability Badge */}
                        {!item.is_available && (
                            <span className="absolute top-2 left-2 bg-gray-800/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                Sold Out
                            </span>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-3 flex flex-col justify-between flex-1">
                        <div>
                            <h3 className="font-bold text-sm mb-1 line-clamp-2">{item.name}</h3>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                            <span className="font-bold text-[#FF5A3C] text-sm">
                                {formatPrice(item.price_cents)}
                            </span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAdd(item);
                                }}
                                disabled={!item.is_available}
                                className={`btn btn-circle btn-xs border-none ${item.is_available
                                    ? "bg-[#FF5A3C] text-white hover:bg-[#e04a30]"
                                    : "cursor-not-allowed bg-gray-200 text-gray-400"
                                    }`}
                            >
                                <Plus
                                    color={item.is_available ? "#ffffff" : "#9ca3af"}
                                    size={16}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    )
}
