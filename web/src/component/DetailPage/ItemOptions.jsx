function ItemOptions({ options, selectedOptions, setSelectedOptions }) {

    return (
        <div>

            {options.map((option) => {
                const selectionText =
                    option.min_select === option.max_select
                        ? `Choose ${option.min_select}`
                        : `Choose ${option.min_select} - ${option.max_select}`
                return (<div className="mb-6" key={option.id}>

                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-sm">{option.name}</h3>
                        <span className="font-semibold text-sm text-gray-500">
                            {selectionText}
                        </span>

                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        {option.option_value.map((value) => {

                            const selectedValues = selectedOptions[option.id] ?? [];

                            const selected = selectedValues.includes(value.id);

                            const handleSelect = () => {
                                setSelectedOptions(prev => {
                                    const current = prev[option.id] ?? [];

                                    if (current.includes(value.id)) {
                                        return {
                                            ...prev,
                                            [option.id]: current.filter(id => id !== value.id)
                                        }
                                    }
                                    if (current.length >= option.max_select) {
                                        return prev
                                    }

                                    return {
                                        ...prev,
                                        [option.id]: [...current, value.id]
                                    }
                                })
                            }


                            return (
                                <button
                                    key={value.id}
                                    onClick={handleSelect}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium ${selected
                                        ? "bg-black text-white"
                                        : "bg-gray-100"
                                        }`}
                                >
                                    <div className="text-sm">
                                        {value.name}
                                    </div>

                                    {value.price_delta_cents > 0 && (
                                        <div className="text-xs mt-1">
                                            + RM{value.price_delta_cents / 100}
                                        </div>
                                    )}
                                </button>

                            )
                        })}
                    </div>
                </div >)
            }
            )
            }


        </div >

    )
}

export default ItemOptions