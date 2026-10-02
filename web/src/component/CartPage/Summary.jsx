import { ShoppingBag } from 'lucide-react'
import { formatPrice } from '../../utlis/formatPrice'

function Summary({ total, subtotal, serviceTax, serviceCharge, handleCheckout, isPending }) {

    return (
        <aside className="h-fit rounded-xl border border-[#241A12]/10 bg-[#FFFDF8] p-5">
            <h2 className="text-lg font-bold tracking-tight">Order Summary</h2>

            <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-[#241A12]/50">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-[#241A12]/50">Service charge 10%</span>
                    <span>{formatPrice(serviceCharge)}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-[#241A12]/50">Service tax 6%</span>
                    <span>{formatPrice(serviceTax)}</span>
                </div>

                <div className="border-t border-dashed border-[#E3A73B]/60 pt-3">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Total</span>
                        <span className="text-lg font-bold text-[#D6402C]">
                            {formatPrice(total)}
                        </span>
                    </div>
                </div>
            </div>

            <button
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#241A12] py-3 font-semibold text-[#FBF3DF] transition-colors hover:bg-[#0F6660] disabled:cursor-not-allowed disabled:opacity-60"
                onClick={handleCheckout}
                disabled={isPending}
            >
                {isPending ? (
                    <span>Sending...</span>
                ) : (
                    <>
                        <ShoppingBag size={18} />
                        Checkout
                    </>
                )}
            </button>
        </aside >
    )
}

export default Summary