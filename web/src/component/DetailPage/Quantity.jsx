import { Minus, Plus } from 'lucide-react'

function Quantity({ setQuantity, quantity }) {
    return (
        <div className="mb-6">

            <h3 className="mb-2 text-sm font-semibold">
                Quantity
            </h3>

            <div className="flex items-center gap-4">

                <button
                    type="button"
                    onClick={() =>
                        setQuantity((q) =>
                            Math.max(1, q - 1)
                        )
                    }
                    className="btn btn-circle btn-sm border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                >
                    <Minus size={14} />
                </button>


                <span className="w-6 text-center text-sm font-bold">
                    {quantity}
                </span>


                <button
                    type="button"
                    onClick={() =>
                        setQuantity((q) => q + 1)
                    }
                    className="btn btn-circle btn-sm border-none bg-[#FF5A3C] text-white hover:bg-[#e04a30]"
                >
                    <Plus size={14} />
                </button>

            </div>

        </div>

    )
}

export default Quantity