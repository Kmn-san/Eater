import React from 'react'

function ColumnHeader() {
    return (
        <div className="flex justify-between text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-3 pb-2 border-b border-gray-100">
            <span className="flex-1">Item</span>
            <span className="w-12 text-center">Qty</span>
            <span className="w-20 text-right">Price</span>
        </div>
    )
}

export default ColumnHeader