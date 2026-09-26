import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Share2,
    Heart,
    Minus,
    Plus,
    UtensilsCrossed,
} from "lucide-react";
import useItemDetail from "../hooks/useItemDetail";
import LoadingState from "../component/LoadingState";
import ImageHeader from "../component/DetailPage/ImageHeader";
import ItemDetail from "../component/DetailPage/ItemDetail";
import ItemOptions from "../component/DetailPage/ItemOptions";
import ItemQuantity from "../component/DetailPage/ItemQuantity";
import ItemNote from "../component/DetailPage/ItemNote";
import BottomCartBar from "../component/DetailPage/BottomCartBar";

// --- Mock Item Data ---
const MOCK_ITEM = {
    id: "38640a82-a027-4e77-9a5f-faaa0b861c08",
    name: "Milk Tea",
    description: "Classic sweet milk tea with pearls",
    price_cents: 550,
    image:
        "https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&q=80&w=600&h=500",
    is_available: true,
};

const SUGAR_LEVELS = ["0%", "25%", "50%", "75%", "100%"];
const ICE_LEVELS = ["None", "Less", "Normal"];
const TEMPERATURES = ["Cold", "Hot"];

export default function DetailPage() {
    const { restaurantCode, itemId } = useParams();

    const { data: items, isLoading } = useItemDetail(restaurantCode, itemId)
    console.log(items);

    const navigate = useNavigate();

    // --- Mock item (replace with location.state?.item when wired to MenuPage) ---
    const item = MOCK_ITEM;

    // --- Option State ---
    const [sugarLevel, setSugarLevel] = useState("50%");
    const [iceLevel, setIceLevel] = useState("Normal");
    const [temperature, setTemperature] = useState("Cold");
    const [quantity, setQuantity] = useState(1);
    const [specialNote, setSpecialNote] = useState("");

    // --- Price Calculation ---
    const basePrice = item.price_cents;
    const temperatureUpcharge = temperature === "Hot" ? 100 : 0;
    const totalPrice = (basePrice + temperatureUpcharge) * quantity;

    const formatPrice = (cents) => `RM ${(cents / 100).toFixed(2)}`;

    const handleAddToCart = () => {
        const orderItem = {
            id: item.id,
            name: item.name,
            image: item.image,
            basePrice: item.price_cents,
            sugarLevel,
            iceLevel,
            temperature,
            quantity,
            specialNote,
            totalPrice,
        };
        console.log("Added to cart:", orderItem);
        // TODO: hook into cart context
        navigate(-1);
    };
    if (isLoading) {
        return < LoadingState />
    }

    return (
        <div className="min-h-screen bg-[#FFFFF0] font-[Inter] text-[#1F1F1F] pb-28">
            {/* --- Hero Image --- */}
            <ImageHeader item={item} />

            {/* --- Content Sheet --- */}
            <div className="relative -mt-6 bg-[#FFFFF0] rounded-t-3xl px-4 pt-6">
                {/* Name + Price */}
                <ItemDetail item={item} />

                {/* --- Sugar Level --- */}
                <ItemOptions ICE_LEVELS={ICE_LEVELS} SUGAR_LEVELS={SUGAR_LEVELS} TEMPERATURES={TEMPERATURES} />

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