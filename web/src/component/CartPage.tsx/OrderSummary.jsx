import React from 'react'

function OrderSummary({ subtotal, tax, serviceCharge, total }) {
    const formatPrice = (cents) => `RM ${(cents / 100).toFixed(2)}`;

    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-bold text-sm mb-3 text-[#1F1F1F]">Order Summary</h3>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Service Charge</span>
                    <span>{formatPrice(serviceCharge)}</span>
                </div>
                <div className="divider my-2"></div>
                <div className="flex justify-between font-bold text-[#1F1F1F]">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                </div>
            </div>
        </div>
    );
}

export default OrderSummary