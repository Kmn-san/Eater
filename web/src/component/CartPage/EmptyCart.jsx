import { ShoppingBag, ArrowLeft, UtensilsCrossed } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function EmptyCartPage() {
    const navigate = useNavigate();
    const { restaurantCode } = useParams();

    return (
        <div className="min-h-screen bg-[#FBF3DF] text-[#241A12] font-[Inter] flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-[#FBF3DF]">
                <div className="mx-auto flex max-w-5xl items-center gap-4 px-6 py-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="rounded-full p-2 hover:bg-[#241A12]/5 text-[#241A12]"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <div>
                        <p className="text-[11px] font-medium text-[#0F6660] mb-0.5">
                            Order review
                        </p>
                        <h1 className="text-xl font-bold tracking-tight">Your Cart</h1>
                    </div>
                </div>
                <div className="h-px bg-[#241A12]/10" />
            </header>

            {/* Empty state */}
            <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="relative mb-6">
                    <div className="h-24 w-24 rounded-full bg-[#0F6660]/10 flex items-center justify-center">
                        <ShoppingBag size={40} className="text-[#0F6660]" />
                    </div>
                    {/* small chili dot accent, the one bold detail */}
                    <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-[#D6402C] flex items-center justify-center border-2 border-[#FBF3DF]">
                        <span className="text-white text-xs font-bold">0</span>
                    </div>
                </div>

                <h2 className="text-lg font-bold tracking-tight mb-1.5">
                    Your cart is empty
                </h2>
                <p className="text-sm text-[#241A12]/50 max-w-xs mb-8">
                    Nothing here yet. Add a dish or two from the menu to get your order started.
                </p>

                <button
                    onClick={() => navigate(`/restaurant/${restaurantCode}/menu`)}
                    className="flex items-center justify-center gap-2 rounded-full bg-[#241A12] px-6 py-3 font-semibold text-[#FBF3DF] hover:bg-[#0F6660] transition-colors"
                >
                    <UtensilsCrossed size={18} />
                    Browse the menu
                </button>
            </main>
        </div>
    );
}