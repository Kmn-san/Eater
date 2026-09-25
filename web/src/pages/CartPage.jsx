import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CartItemCard from "../component/CartPage.tsx/CartItemCard";
import OrderSummary from "../component/CartPage.tsx/OrderSummary";
import { useCart } from "../context/cartContext";

export default function CartPage() {
    const { restaurantCode } = useParams();
    const navigate = useNavigate();
    const { cart, handleIncrease, handleDecrease, handleRemove } = useCart()


    // --- Calculations ---
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price_cents * item.quantity,
        0
    );
    const tax = Math.round(subtotal * 0.06); // 6% tax
    const serviceCharge = 200; // RM 2.00 flat
    const total = subtotal + tax + serviceCharge;
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const formatPrice = (cents) => `RM ${(cents / 100).toFixed(2)}`;

    // --- Empty Cart State ---
    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-[#FFFFF0] font-[Inter] flex flex-col">
                <header className="flex items-center gap-3 px-4 py-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-circle btn-sm bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <h1 className="text-lg font-bold text-[#1F1F1F]">Your Order</h1>
                </header>

                <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
                    <div className="w-24 h-24 rounded-full bg-[#FF5A3C]/10 flex items-center justify-center text-5xl mb-4">
                        🛒
                    </div>
                    <h2 className="font-bold text-lg text-[#1F1F1F] mb-1">
                        Empty Cart
                    </h2>
                    <button
                        onClick={() => navigate(`/restaurant/${restaurantCode}/menu`)}
                        className="btn rounded-full bg-[#FF5A3C] hover:bg-[#e04a30] text-white border-none px-8"
                    >
                        Browse Menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFFFF0] font-[Inter] text-[#1F1F1F] pb-28">
            {/* Header */}
            <header className="flex items-center gap-3 px-4 py-4 sticky top-0 bg-[#FFFFF0] z-20">
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-circle btn-sm bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                    <ArrowLeft size={18} />
                </button>
                <h1 className="text-lg font-bold">Your Order</h1>
                <span className="ml-auto text-xs bg-[#FF5A3C]/10 text-[#FF5A3C] font-bold px-2.5 py-1 rounded-full">
                    {cartCount} {cartCount === 1 ? "item" : "items"}
                </span>
            </header>

            {/* Cart Items */}
            <div className="px-4 space-y-3">
                {cart.map((item) => (
                    <CartItemCard
                        key={item.cartItemId}
                        item={item}
                        onIncrease={handleIncrease}
                        onDecrease={handleDecrease}
                        onRemove={handleRemove}
                    />
                ))}
            </div>

            {/* Order Summary */}
            <div className="px-4 mt-4">
                <OrderSummary
                    subtotal={subtotal}
                    tax={tax}
                    serviceCharge={serviceCharge}
                    total={total}
                />
            </div>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <div className="max-w-md mx-auto flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wide text-gray-500">
                            Total
                        </span>
                        <span className="text-lg font-bold text-[#FF5A3C]">
                            {formatPrice(total)}
                        </span>
                    </div>
                    <button
                        onClick={() => navigate(`/restaurant/${restaurantCode}/payment`)}
                        className="btn flex-1 rounded-full bg-[#FF5A3C] hover:bg-[#e04a30] text-white border-none font-semibold max-w-[200px]"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}