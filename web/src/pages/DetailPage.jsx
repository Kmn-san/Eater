import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useItemDetail from "../hooks/useItemDetail";
import LoadingState from "../component/LoadingState";
import ImageHeader from "../component/DetailPage/ImageHeader";
import ItemDetail from "../component/DetailPage/ItemDetail";
import ItemOptions from "../component/DetailPage/ItemOptions";
import ItemQuantity from "../component/DetailPage/ItemQuantity";
import ItemNote from "../component/DetailPage/ItemNote";
import BottomCartBar from "../component/DetailPage/BottomCartBar";
import ErrorState from "../component/ErrorState";
import { useCart } from "../context/CartContext";

export default function DetailPage() {
    const { restaurantCode, itemId } = useParams();
    const [selectedOptions, setSelectedOptions] = useState({})
    const { data: item, isLoading, isError } = useItemDetail(restaurantCode, itemId)
    const { addToCart } = useCart();
    // --- Option State ---
    const [quantity, setQuantity] = useState(1);
    const [specialNote, setSpecialNote] = useState("");
    const navigate = useNavigate();

    if (isLoading) {
        return <LoadingState />
    }
    if (isError) {
        return <ErrorState />
    }

    // --- Price Calculation ---
    const basePrice = item.price_cents;

    const selectedOptionPrice = item?.options.reduce((total, option) => {
        const selectedValueIds = selectedOptions[option.id] ?? [];

        const optionTotal = option.option_value.filter(value => selectedValueIds.includes(value.id)).reduce((sum, value) => sum + value.price_delta_cents, 0)
        return optionTotal + total

    }, 0)

    const totalPrice = (basePrice + selectedOptionPrice) * quantity;

    const validateOptions = () => {
        for (const option of item.options) {
            const selectedValue = selectedOptions[option.id] ?? []

            if (selectedValue.length < option.min_select) {
                return {
                    valid: false,
                    optionName: option.name
                }
            }
        }
        return {
            valid: true
        }
    }

    const handleAddToCart = () => {
        const result = validateOptions();

        if (!result.valid) {
            alert(`Please select ${result.optionName}`)
            return
        }

        const selectedValues = item.options.flatMap((option) =>
            option.option_value
                .filter((value) => (selectedOptions[option.id] ?? []).includes(value.id))
                .map((value) => ({
                    optionId: option.id,
                    optionName: option.name,
                    id: value.id,
                    name: value.name,
                    price_delta_cents: value.price_delta_cents ?? 0,
                }))
        );

        const orderItem = {
            id: item.item_id,
            name: item.item_name,
            image: item.image_url,
            basePrice: item.price_cents,
            selectedOption: selectedValues,
            quantity,
            specialNote,
            totalPrice,
        };

        addToCart(orderItem)
        navigate(-1);
    };


    return (
        <div className="min-h-screen bg-[#FFFFF0] font-[Inter] text-[#1F1F1F] pb-28">
            {/* --- Hero Image --- */}
            <ImageHeader item={item} />

            {/* --- Content Sheet --- */}
            <div className="relative -mt-6 bg-[#FFFFF0] rounded-t-3xl px-4 pt-6">
                {/* Name + Price */}
                <ItemDetail item={item} />

                {/* --- Options --- */}
                <ItemOptions options={item.options} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />

                {/* --- Quantity --- */}
                <ItemQuantity setQuantity={setQuantity} quantity={quantity} />

                {/* --- Special Note --- */}
                <ItemNote setSpecialNote={setSpecialNote} specialNote={specialNote} />
            </div>

            {/* --- Sticky Add to Cart Bar --- */}
            <BottomCartBar handleAddToCart={handleAddToCart} item={item} totalPrice={totalPrice} />
        </div>
    );
}