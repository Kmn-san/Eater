import React from 'react'

function Note({ setSpecialNote, specialNote }) {
    return (

        <div className="mb-6">

            <h3 className="mb-2 text-sm font-semibold">
                Special Note
            </h3>

            <input
                type="text"
                value={specialNote}
                onChange={(e) =>
                    setSpecialNote(e.target.value)
                }
                placeholder="e.g. Less sugar, no ice..."
                className="input input-bordered h-11 w-full rounded-xl border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A3C]"
            />

        </div>

    )
}

export default Note