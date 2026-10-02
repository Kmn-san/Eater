import { Download, CreditCard } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

function BottomBar({ order }) {
    const isPending = order.paymentStatus === "pending"
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.stopPropagation();
        if (isPending) {
            navigate(`/payment/${order.id}/pay`)
        } else {
            console.log("Download receipt for", order.id)
        }
    }
    return (
        <button
            onClick={handleClick}
            className={`btn w-full mt-4 rounded-full border-none font-semibold gap-2 ${isPending
                ? "bg-[#D6402C] hover:bg-[#b8351f] text-white"
                : "bg-white hover:bg-[#241A12]/5 text-[#241A12] border border-[#241A12]/10"
                }`}
        >
            {isPending ? (
                <>
                    <CreditCard size={18} />
                    Pay
                </>
            ) : (
                <>
                    <Download size={18} />
                    Download Receipt
                </>
            )}
        </button>
    )
}

export default BottomBar