import { ChevronDown, ChevronUp, Receipt } from 'lucide-react'
import { formatPrice } from '../../../utlis/formatPrice'
import { formatDate } from '../../../utlis/formatDate';

const STATUS_STYLES = {
    Pending: "bg-yellow-100 text-yellow-700",
    Preparing: "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
};

function OrderCardHeader({ order, onToggle, isExpanded }) {

    return (
        <button
            onClick={onToggle}
            className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
        >
            <div className="w-10 h-10 rounded-full bg-[#FF5A3C]/10 flex items-center justify-center flex-shrink-0">
                <Receipt size={18} className="text-[#FF5A3C]" />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <h2 className="font-bold text-sm">Order #{order.orderNumber}</h2>
                    <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_STYLES[order.status] || "bg-gray-100 text-gray-600"
                            }`}
                    >
                        {order.status}
                    </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">
                    {formatDate(order.placedAt)}
                </p>
            </div>

            <div className="flex flex-col items-end shrink-0">
                <span className="text-sm font-bold text-[#FF5A3C]">
                    {formatPrice(order.totalCents)}
                </span>
                {isExpanded ? (
                    <ChevronUp size={16} className="text-gray-400 mt-1" />
                ) : (
                    <ChevronDown size={16} className="text-gray-400 mt-1" />
                )}
            </div>
        </button>
    )
}

export default OrderCardHeader