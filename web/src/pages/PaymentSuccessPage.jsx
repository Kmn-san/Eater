import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { CheckCircle2, Download } from "lucide-react";
import { useOrderDetail } from "../hooks/useOrder";
import LoadingState from "../component/LoadingState";
import { formatPrice } from "../utlis/formatPrice";

export default function PaymentSuccessPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const orderId = searchParams.get("order_id");
    const restaurantCode = searchParams.get("restaurant_code");

    const { data, isLoading } = useOrderDetail(orderId);

    if (isLoading) {
        return <LoadingState />;
    }

    const orderDetail = data?.result;

    return (
        <div className="min-h-screen bg-[#FBF3DF] font-[Inter] text-[#241A12] flex flex-col items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                {/* ===== Success Icon ===== */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 size={44} className="text-green-600" />
                    </div>
                </div>

                {/* ===== Heading ===== */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold mb-2">Payment Successful</h1>
                    <p className="text-sm text-gray-500">
                        Order #{orderDetail.orderNumber}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Amount paid:{" "}
                        <span className="font-bold text-[#D6402C]">
                            {formatPrice(orderDetail.totalCents)}
                        </span>
                    </p>
                </div>

                {/* ===== Status Card ===== */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#241A12]/5 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 size={18} className="text-green-600" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm">Order confirmed</p>
                            <p className="text-[11px] text-gray-500 capitalize">
                                Status: {orderDetail.status}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ===== Actions ===== */}
                <div className="space-y-3">
                    <button
                        onClick={() => console.log("Download receipt")}
                        className="btn w-full rounded-full bg-[#D6402C] hover:bg-[#b8351f] text-white border-none font-semibold gap-2"
                    >
                        <Download size={18} />
                        Download Receipt
                    </button>

                    <button
                        onClick={() => navigate(`/restaurant/${restaurantCode}/orders`)}
                        className="btn w-full rounded-full bg-white hover:bg-gray-50 text-[#241A12] border border-[#241A12]/10 font-semibold"
                    >
                        View Order
                    </button>
                </div>
            </div>
        </div>
    );
}