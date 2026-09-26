import React from 'react'

function ItemOptions({ SUGAR_LEVELS, ICE_LEVELS, TEMPERATURES, setTemperature, setIceLevel, setSugarLevel, iceLevel, sugarLevel, temperature }) {
    return (
        <div>
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-sm">Sugar Level</h3>
                    <span className="text-xs text-gray-500">0% - 100%</span>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {SUGAR_LEVELS.map((level) => (
                        <button
                            key={level}
                            onClick={() => setSugarLevel(level)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${sugarLevel === level
                                ? "bg-[#FF5A3C] text-white"
                                : "bg-white text-gray-600 border border-gray-200"
                                }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- Ice Level --- */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-sm">Ice Level</h3>
                    <span className="text-xs text-gray-500">Temperature</span>
                </div>
                <div className="flex gap-2">
                    {ICE_LEVELS.map((level) => (
                        <button
                            key={level}
                            onClick={() => setIceLevel(level)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${iceLevel === level
                                ? "bg-[#FF5A3C] text-white"
                                : "bg-white text-gray-600 border border-gray-200"
                                }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- Temperature Toggle --- */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-sm">Temperature</h3>
                    <span className="text-xs text-gray-500">+RM 1.00 for Hot</span>
                </div>
                <div className="flex gap-2">
                    {TEMPERATURES.map((temp) => (
                        <button
                            key={temp}
                            onClick={() => setTemperature(temp)}
                            className={`px-6 py-1.5 rounded-full text-sm font-medium transition-colors ${temperature === temp
                                ? "bg-[#FF5A3C] text-white"
                                : "bg-white text-gray-600 border border-gray-200"
                                }`}
                        >
                            {temp}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ItemOptions