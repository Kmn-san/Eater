import { formatPrice } from '../../../utlis/formatPrice'

function OrderSummary({ order }) {

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-bold text-xs mb-3 uppercase tracking-wide text-gray-500">
                Summary
            </h3>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(order.subtotalCents)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>{formatPrice(order.serviceTaxCents)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Service Charge</span>
                    <span>{formatPrice(order.serviceChargeCents)}</span>
                </div>
                <div className="divider my-2"></div>
                <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-[#FF5A3C]">
                        {formatPrice(order.totalCents)}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary