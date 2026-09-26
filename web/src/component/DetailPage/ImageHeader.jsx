import { ArrowLeft, Heart, Share2, UtensilsCrossed } from 'lucide-react'
import React from 'react'

function ImageHeader({item}) {
    return (
        <div className="relative h-72 w-full">
            {item.image ? (
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <UtensilsCrossed size={54} className="text-[#D6402C]" />
                </div>
            )}

            {/* Top Action Bar */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-circle btn-sm bg-black/30 backdrop-blur-sm border-none text-white hover:bg-black/50"
                >
                    <ArrowLeft size={18} />
                </button>
                <div className="flex gap-2">
                    <button className="btn btn-circle btn-sm bg-black/30 backdrop-blur-sm border-none text-white hover:bg-black/50">
                        <Share2 size={16} />
                    </button>
                    <button className="btn btn-circle btn-sm bg-black/30 backdrop-blur-sm border-none text-white hover:bg-black/50">
                        <Heart size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageHeader