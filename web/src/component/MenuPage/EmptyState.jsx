import { UtensilsCrossed } from 'lucide-react'
import React from 'react'

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-[#241A12]/40">
            <UtensilsCrossed size={48} className="mb-2 opacity-40" />
            <p className="text-sm">No items in this category.</p>
        </div>
    )
}

export default EmptyState