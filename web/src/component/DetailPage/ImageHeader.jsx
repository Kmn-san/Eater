import { ArrowLeft, UtensilsCrossed } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

function ImageHeader({ item }) {
    const navigate = useNavigate();
    return (
        <div className="relative h-72 w-full">

            {item.image_url ? (
                <img
                    src={item.image_url}
                    alt={item.item_name}
                    className="h-full w-full object-cover"
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200">

                    <UtensilsCrossed
                        size={52}
                        color="#9ca3af"
                    />
                </div>
            )}
            {/* Back Button */}
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm"
            >
                <ArrowLeft
                    size={20}
                    className="text-gray-700"
                />
            </button>
        </div>
    )
}

export default ImageHeader