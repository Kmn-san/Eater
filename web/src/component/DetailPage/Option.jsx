import React from 'react'
import { formatPrice } from '../../utlis/formatPrice';
import { Check } from 'lucide-react';

function Option({ item, selectedOptions, handleOptionSelect, showNotice }) {

    return (
        <div>
            {item.options?.map((option) => (

                <div
                    key={option.id}
                    className="mb-6"
                >

                    <div className="mb-3">
                        <div className="flex items-center gap-2">
                            <h3
                                className={`text-sm font-semibold ${showNotice &&
                                        option.min_select > 0 &&
                                        (selectedOptions[option.id]?.length || 0) <
                                        option.min_select
                                        ? "text-red-500"
                                        : "text-gray-900"
                                    }`}
                            >
                                {option.name}
                            </h3>

                            {showNotice &&
                                option.min_select > 0 &&
                                (selectedOptions[option.id]?.length || 0) <
                                option.min_select && (
                                    <span className="text-xs font-medium text-red-500">
                                        Please select {option.min_select}
                                    </span>
                                )}
                        </div>

                        <p className="mt-1 text-xs text-gray-400">
                            Select {option.min_select}
                            {option.max_select !== option.min_select &&
                                ` - ${option.max_select}`}
                        </p>
                    </div>


                    <div className="grid grid-cols-2 gap-2.5">

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
                                    className={`relative flex flex-col items-start gap-0.5 rounded-2xl border px-4 py-3 text-left transition-colors ${selected
                                        ? "border-[#FF5A3C] bg-[#FFF1EE]"
                                        : "border-gray-200 bg-white hover:border-gray-300"
                                        }`}
                                >
                                    {selected && (
                                        <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF5A3C]">
                                            <Check color="#ffffff" size={11} strokeWidth={3} />
                                        </span>
                                    )}

                                    <span
                                        className={`pr-5 text-sm font-medium ${selected ? "text-[#FF5A3C]" : "text-gray-800"
                                            }`}
                                    >
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