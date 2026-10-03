import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";

export default function PaymentCancelPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { restaurantCode } = useParams();

    // Optional: your backend might pass a reason or the order id
    const orderId = searchParams.get("order_id");
    const reason = searchParams.get("reason");

    return (
        <div className="min-h-screen bg-[#FFFFF0] font-[Inter] text-[#1F1F1F] flex flex-col items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                {/* ===== Cancel Icon ===== */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                        <XCircle size={44} className="text-red-500" />
                    </div>
                </div>

                {/* ===== Heading ===== */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold mb-2">Payment Cancelled</h1>
                    <p className="text-sm text-gray-500">
                        {orderId ? `Order #${orderId}` : "Your order was not placed."}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        {reason
                            ? reason
                            : "Your payment was cancelled. You have not been charged."}
                    </p>
                </div>

                {/* ===== Info Card ===== */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
                    <p className="text-xs text-gray-500 leading-relaxed">
                        Your items are still in your cart. You can try again or return to
                        the menu to make changes.
                    </p>
                </div>

                {/* ===== Actions ===== */}
                <div className="space-y-3">
                    <button
                        onClick={() => navigate(`/restaurant/${restaurantCode}/cart`)}
                        className="btn w-full rounded-full bg-[#FF5A3C] hover:bg-[#e04a30] text-white border-none font-semibold gap-2"
                    >
                        <RefreshCw size={18} />
                        Try Again
                    </button>

                    <button
                        onClick={() => navigate(`/restaurant/${restaurantCode}/menu`)}
                        className="btn w-full rounded-full bg-white hover:bg-gray-50 text-[#1F1F1F] border border-gray-200 font-semibold gap-2"
                    >
                        <ArrowLeft size={18} />
                        Back to Menu
                    </button>
                </div>
            </div>
        </div>
    );
}