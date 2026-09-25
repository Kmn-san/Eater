import React from 'react'
import { formatPrice } from '../../utlis/formatPrice';

function Option({ item, selectedOptions, handleOptionSelect }) {
    
    return (
        <div>
            {item.options?.map((option) => (

                <div
                    key={option.id}
                    className="mb-6"
                >

                    <div className="mb-2">

                        <h3 className="text-sm font-semibold">
                            {option.name}
                        </h3>

                        <p className="text-xs text-gray-400">
                            Select {option.min_select}
                            {option.max_select !== option.min_select &&
                                ` - ${option.max_select}`}
                        </p>

                    </div>


                    <div className="grid grid-cols-2 gap-2">

                        {option.option_value?.map((value) => {

                            const selected =
                                selectedOptions[option.id]?.some(
                                    (item) => item.id === value.id
                                );
                            return (

                                <button
                                    key={value.id}
                                    type="button"
                                    onClick={() =>
                                        handleOptionSelect(
                                            option,
                                            value
                                        )
                                    }
                                    className={
                                        selected
                                            ? "rounded-full bg-[#FF5A3C] px-4 py-2 text-sm text-white"
                                            : "rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600"
                                    }
                                >

                                    <span>
                                        {value.name}
                                    </span>


                                    {value.price_delta_cents !== 0 && (

                                        <span className="ml-1">

                                            {value.price_delta_cents > 0
                                                ? `+${formatPrice(
                                                    value.price_delta_cents
                                                )}`
                                                : formatPrice(
                                                    value.price_delta_cents
                                                )}

                                        </span>

                                    )}

                                </button>

                            );

                        })}

                    </div>

                </div>

            ))}


        </div>
    )
}

export default Option