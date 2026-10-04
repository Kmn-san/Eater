import { useState } from "react"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { Lock } from "lucide-react"

export default function PaymentForm() {
    const stripe = useStripe()
    const elements = useElements()
    const [isProcessing, setIsProcessing] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setIsProcessing(true)
        setErrorMessage(null)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `http://localhost:5173/payment/success`,
            },
        })

        if (error) {
            setErrorMessage(error.message)
            setIsProcessing(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#241A12]/5">
                <PaymentElement />
            </div>

            {errorMessage && (
                <p className="text-sm text-[#D6402C] bg-[#D6402C]/5 rounded-xl px-3 py-2">
                    {errorMessage}
                </p>
            )}

            <button
                type="submit"
                disabled={!stripe || isProcessing}
                className="btn w-full rounded-full bg-[#D6402C] hover:bg-[#b8351f] text-white border-none font-semibold gap-2 disabled:opacity-60"
            >
                {isProcessing ? (
                    <span className="loading loading-spinner loading-sm" />
                ) : (
                    "Pay"
                )}
            </button>

            <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                <Lock size={12} />
                Secured by Stripe
            </p>
        </form>
    )
}