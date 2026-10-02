import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, ShieldCheck } from 'lucide-react'
import { formatPrice } from '../utlis/formatPrice'
import LoadingState from '../component/LoadingState'
import ErrorState from '../component/ErrorState'
import useCreateCheckoutSession from '../hooks/useCreateCheckoutSession'
import useOrderDetail from '../hooks/useOrderDetail'


export default function PaymentPage() {
    const { orderId } = useParams()
    const navigate = useNavigate()

    const { data, isLoading, error } = useOrderDetail(orderId)
    const order = data?.result?.orders[0]

    const { mutate, isPending } = useCreateCheckoutSession()
    
    const handlePay = () => {
        mutate(orderId, {
            onSuccess: (data) => {
                window.location.href = data.result.checkoutUrl
            },
        })
    }
    
    if (isLoading) {
        return <LoadingState />
    }
    
    console.log(order);

    if (error || !order) {
        return <ErrorState message={error?.message ?? "Order not found"} />
    }

    return (
        <div className="min-h-screen bg-[#FBF3DF] font-[Inter] text-[#241A12] pb-32">
            {/* ===== Header ===== */}
            <header className="flex items-center gap-3 px-4 py-4 sticky top-0 bg-[#FBF3DF] z-20">
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-circle btn-sm bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                    <ArrowLeft size={18} />
                </button>
                <h1 className="text-lg font-bold">Payment</h1>
            </header>

            {/* ===== Order Summary ===== */}
            <div className="px-4">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#241A12]/5 mb-4">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-500">Order</span>
                        <span className="text-sm font-bold">#{order.orderNumber}</span>
                    </div>
                    
                </div>

                {/* ===== Item list ===== */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#241A12]/5 mb-4">
                    <h3 className="font-bold text-sm mb-3">Items</h3>
                    <div className="space-y-3">
                        {order.items?.map((item) => (
                            <div key={item.id} className="flex items-center justify-between text-sm">
                                <span className="text-[#241A12]/80">
                                    {item.quantity}× {item.name}
                                </span>
                                <span className="font-semibold">
                                    {formatPrice(item.unitPriceCents * item.quantity)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ===== Total ===== */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#241A12]/5">
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>{formatPrice(order.subtotalCents)}</span>
                        </div>
                        {order.taxCents > 0 && (
                            <div className="flex justify-between text-gray-600">
                                <span>Tax</span>
                                <span>{formatPrice(order.taxCents)}</span>
                            </div>
                        )}
                        {order.serviceChargeCents > 0 && (
                            <div className="flex justify-between text-gray-600">
                                <span>Service Charge</span>
                                <span>{formatPrice(order.serviceChargeCents)}</span>
                            </div>
                        )}
                        <div className="divider my-2" />
                        <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span className="text-[#D6402C]">{formatPrice(order.totalCents)}</span>
                        </div>
                    </div>
                </div>

                <p className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-3 px-1">
                    <ShieldCheck size={13} />
                    Payments are securely processed by our payment provider.
                </p>
            </div>

            {/* ===== Sticky Pay Bar ===== */}
            <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#241A12]/10 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <div className="max-w-md mx-auto">
                    <button
                        onClick={handlePay}
                        disabled={isPending}
                        className="btn w-full rounded-full bg-[#D6402C] hover:bg-[#b8351f] text-white border-none font-semibold gap-2 disabled:opacity-60"
                    >
                        {isPending ? (
                            <span className="loading loading-spinner loading-sm" />
                        ) : (
                            <>
                                <CreditCard size={18} />
                                Pay {formatPrice(order.totalCents)}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}