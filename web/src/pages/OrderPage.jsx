import { ArrowLeft, Receipt } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderCard from "../component/OrderPage/OrderCard";
import LoadingState from "../component/LoadingState";
import { useOrder } from "../hooks/useOrder";


export default function OrderPage() {
    const { restaurantCode } = useParams();
    const navigate = useNavigate();

    const { data, isLoading } = useOrder();

    const orders = data?.result?.orders ?? []
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    useEffect(() => {
        if (orders?.length && expandedOrderId === null) {
            setExpandedOrderId(orders[0].id);
        }
    }, [orders]);

    if (isLoading) {
        return <LoadingState />;
    }


    const toggleOrder = (orderId) => {
        // If clicking the same order, collapse it. Otherwise, expand the new one.
        setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
    };

    return (
        <div className="min-h-screen bg-[#FFFFF0] font-[Inter] text-[#1F1F1F] pb-8">
            {/* ===== Header ===== */}
            <header className="flex items-center gap-3 px-4 py-4 sticky top-0 bg-[#FFFFF0] z-20">
                <button
                    onClick={() => navigate(`/restaurant/${restaurantCode}/menu`)}
                    className="rounded-full p-2 hover:bg-[#241A12]/5 text-[#241A12]"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-lg font-bold leading-tight">Your Orders</h1>
                    <p className="text-[11px] text-gray-500">
                        {orders.length} order{orders.length !== 1 ? "s" : ""}{" "}
                        • Table A01
                    </p>
                </div>
            </header>

            {/* ===== Orders List ===== */}
            <div className="px-4">
                {orders.length === 0 ? (
                    // Empty state
                    <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                        <Receipt size={48} className="mb-3 opacity-40" />
                        <p className="text-sm">No orders yet.</p>
                        <button
                            onClick={() => navigate(`/restaurant/${restaurantCode}/menu`)}
                            className="btn btn-sm mt-4 rounded-full bg-[#FF5A3C] hover:bg-[#e04a30] text-white border-none"
                        >
                            Browse Menu
                        </button>
                    </div>
                ) : (
                    orders.map((order) => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            isExpanded={expandedOrderId === order.id}
                            onToggle={() => toggleOrder(order.id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}