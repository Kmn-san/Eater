 {isExpanded && (
                <div className="border-t border-gray-100 p-4 bg-gray-50/50">
                    {/* Column Headers */}
                    <div className="flex justify-between text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-3 pb-2 border-b border-gray-100">
                        <span className="flex-1">Item</span>
                        <span className="w-12 text-center">Qty</span>
                        <span className="w-20 text-right">Price</span>
                    </div>

                    {/* Items */}
                    <div className="space-y-4 mb-4">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-3">
                                {/* Image / Fallback */}
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <UtensilsCrossed
                                                size={22}
                                                className="text-[#D6402C]"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm truncate">
                                        {item.name}
                                    </p>
                                    {item.options && (
                                        <p className="text-[11px] text-gray-500 line-clamp-1">
                                            {item.options}
                                        </p>
                                    )}
                                    <p className="text-xs font-bold text-[#FF5A3C] mt-0.5">
                                        {formatPrice(item.price_cents)}
                                    </p>
                                </div>

                                <div className="w-12 text-center">
                                    <span className="text-sm font-semibold text-gray-600">
                                        × {item.quantity}
                                    </span>
                                </div>

                                <div className="w-20 text-right">
                                    <span className="text-sm font-bold">
                                        {formatPrice(item.price_cents * item.quantity)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-xs mb-3 uppercase tracking-wide text-gray-500">
                            Summary
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>{formatPrice(order.subtotal_cents)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax</span>
                                <span>{formatPrice(order.tax_cents)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Service Charge</span>
                                <span>{formatPrice(order.service_charge_cents)}</span>
                            </div>
                            <div className="divider my-2"></div>
                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span className="text-[#FF5A3C]">
                                    {formatPrice(order.total_cents)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Download Receipt */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log("Download receipt for", order.orderId);
                        }}
                        className="btn w-full mt-4 rounded-full bg-[#FF5A3C] hover:bg-[#e04a30] text-white border-none font-semibold gap-2"
                    >
                        <Download size={18} />
                        Download Receipt
                    </button>
                </div>
            )}