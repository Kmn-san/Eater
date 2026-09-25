import { ShoppingCart } from 'lucide-react'
import { formatPrice } from '../../utlis/formatPrice'
import { useNavigate } from 'react-router-dom'

function BottomCartBar({ restaurantCode, cartCount, cartTotal }) {
    const navigate = useNavigate();
    return (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#241A12] border-t border-[#E3A73B]/30 shadow-[0_-6px_16px_rgba(0,0,0,0.18)] p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <div className="max-w-md mx-auto flex items-center justify-between gap-4">
                <div className="flex flex-col">
                    <span className="text-[10px] text-[#E3A73B] mb-0.5">
                        Total
                    </span>
                    <span className="text-base font-bold text-[#FBF3DF] flex items-center gap-1.5">
                        <ShoppingCart size={16} className="text-[#E3A73B]" />
                        {cartCount} {cartCount === 1 ? "Item" : "Items"} • {formatPrice(cartTotal)}
                    </span>
                </div>
                <button
                    onClick={() => navigate(`/restaurant/${restaurantCode}/cart`)}
                    className="btn rounded-full bg-[#D6402C] hover:bg-[#b83521] text-white border-none px-6 font-semibold"
                >
                    View Cart
                </button>
            </div>
        </div>
    )
}

export default BottomCartBar