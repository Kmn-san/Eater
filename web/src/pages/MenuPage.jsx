import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../component/MenuPage/Header";
import SearchBar from "../component/MenuPage/SearchBar";
import CategoryTabs from "../component/MenuPage/CategoryTabs";
import EmptyState from "../component/MenuPage/EmptyState";
import BottomCartBar from "../component/MenuPage/BottomCartBar";
import MenuGrid from "../component/MenuPage/MenuGrid";
import useMenu from "../hooks/useMenu";
import LoadingState from "../component/LoadingState";
import ErrorState from "../component/ErrorState";
import { useCart } from "../context/CartContext";

export default function MenuPage() {
    const { restaurantCode } = useParams();
    const navigate = useNavigate();

    // --- State ---
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const { cartItems, addToCart } = useCart();

    const { data: menu, isLoading, error } = useMenu(restaurantCode)

    const CATEGORIES = [
        ...new Set(
            (menu?.categories ?? []).map(category =>
                category.name)
        )
    ]

    // --- Filter items based on active category ---
    const filteredItems =
        activeCategory === "All"
            ? menu?.categories
                ?.flatMap(category => category.items) ?? []
            : menu?.categories
                ?.filter(category => category.name === activeCategory)
                .flatMap(category => category.items) ?? []

    const searchedItems = filteredItems.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))

    // --- Add item to cart ---
    const handleAddToCart = (item) => {
        if (item.requires_options) {
            return handleOpenDetail(item)
        }
        const orderItem = {
            id: item.id,
            name: item.name,
            image: item.image,
            basePrice: item.price_cents,
            selectedOption: [],
            quantity: 1,
            specialNote: ""
        };
        addToCart(orderItem)
    };

    // --- Derived cart totals ---
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const cartTotal = cartItems.reduce((sum, item) => {
        const optionPrice = item.selectedOption.reduce((total, option) =>
            total + option.price_delta_cents
            , 0)

        return sum + ((item.basePrice + optionPrice) * item.quantity)
    }, 0);

    // --- Navigate to detail page (pass item via state) ---
    const handleOpenDetail = (item) => {
        navigate(`/menu/${restaurantCode}/${item.id}`, {
            state: { item },
        });
    };


    if (isLoading) {
        return <LoadingState />
    }

    if (error) {
        return <ErrorState message={error.message} />
    }
    return (
        <div className={`min-h-screen bg-[#FBF3DF] font-[Inter] text-[#241A12] ${cartCount > 0 ? "pb-28" : "pb-6"}`}>
            {/* ===== Header ===== */}
            <Header name={menu.restaurant_name} image={menu.restaurant_image} search={search} setSearch={setSearch} />

            {/* ===== Category Tabs ===== */}
            <CategoryTabs
                categories={CATEGORIES}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory} />

            {/* ===== Menu Grid ===== */}
            <MenuGrid
                filteredItems={searchedItems}
                handleOpenDetail={handleOpenDetail}
                handleAddToCart={handleAddToCart} />

            {/* ===== Empty State ===== */}
            {filteredItems.length === 0 && (
                <EmptyState />
            )}

            {/* ===== Sticky Bottom Cart Bar ===== */}
            {cartCount > 0 && (
                <BottomCartBar
                    cartCount={cartCount}
                    cartTotal={cartTotal}
                    restaurantCode={restaurantCode} />
            )}
        </div>
    );
}