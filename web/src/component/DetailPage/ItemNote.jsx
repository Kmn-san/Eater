import React from 'react'

function ItemNote({ setSpecialNote, specialNote }) {
    return (
        <div className="mb-6">
            <h3 className="font-semibold text-sm mb-2">Special Note</h3>
            <input
                type="text"
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                placeholder="e.g. Less sugar, no ice..."
                className="input input-bordered w-full rounded-xl bg-white border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF5A3C] text-sm h-11"
            />
        </div>
    )
}

export default ItemNote