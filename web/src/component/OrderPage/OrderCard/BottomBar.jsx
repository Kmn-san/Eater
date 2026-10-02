import { Download } from 'lucide-react';
import React from 'react'

function BottomBar({order}) {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                console.log("Download receipt for", order.id);
            }}
            className="btn w-full mt-4 rounded-full bg-[#FF5A3C] hover:bg-[#e04a30] text-white border-none font-semibold gap-2"
        >
            <Download size={18} />
            Download Receipt
        </button>
    )
}

export default BottomBar