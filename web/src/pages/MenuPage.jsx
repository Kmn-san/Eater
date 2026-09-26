import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../component/MenuPage/Header";
import SearchBar from "../component/MenuPage/SearchBar";
import CategoryTabs from "../component/MenuPage/CAtegoryTabs";
import EmptyState from "../component/MenuPage/EmptyState";
import BottomCartBar from "../component/MenuPage/BottomCartBar";
import MenuGrid from "../component/MenuPage/MenuGrid";
import useMenu from "../hooks/useMenu";
import LoadingState from "../component/LoadingState";
import ErrorState from "../component/ErrorState";

const MENU_ITEMS = [
    {
        id: 1,
        name: "Nasi Lemak",
        description: "Fragrant rice with sambal, egg and peanuts",
        price: 850, // cents
        image: "https://images.unsplash.com/photo-1596790011468-470938547032?auto=format&fit=crop&q=80&w=400&h=300",
        category: "Rice",
        isAvailable: true,
    },
    {
        id: 2,
        name: "Nasi Lemak Ayam",
        description: "Nasi lemak with crispy fried chicken",
        price: 1250,
        image: "https://images.unsplash.com/photo-1596790011468-470938547032?auto=format&fit=crop&q=80&w=400&h=300",
        category: "Rice",
        isAvailable: true,
    },
    {
        id: 3,
        name: "Chicken Rice",
        description: "Steamed chicken with fragrant rice",
        price: 1100,
        image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=400&h=300",
        category: "Rice",
        isAvailable: true,
    },
    {
        id: 4,
        name: "Mee Goreng",
        description: "Spicy stir-fried noodles",
        price: 950,
        image: "https://images.unsplash.com/photo-1612929633738-8fe44d8e8f47?auto=format&fit=crop&q=80&w=400&h=300",
        category: "Noodles",
        isAvailable: true,
    },
    {
        id: 5,
        name: "Mee Goreng Ayam",
        description: "Stir-fried noodles with chicken",
        price: 1250,
        image: "https://images.unsplash.com/photo-1612929633738-8fe44d8e8f47?auto=format&fit=crop&q=80&w=400&h=300",
        category: "Noodles",
        isAvailable: true,
    },
    {
        id: 6,
        name: "Curry Laksa",
        description: "Rich coconut curry noodle soup",
        price: 1200,
        image: "https://images.unsplash.com/photo-1612929633738-8fe44d8e8f47?auto=format&fit=crop&q=80&w=400&h=300",
        category: "Noodles",
        isAvailable: true,
    },
    {
        id: 7,
        name: "Milk Tea",
        description: "Classic sweet milk tea with pearls",
        price: 550,
        image: "https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&q=80&w=400&h=300",
        category: "Drinks",
        isAvailable: true,
    },
    {
        id: 8,
        name: "Teh Tarik",
        description: "Malaysian pulled milk tea",
        price: 500,
        image: "https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&q=80&w=400&h=300",
        category: "Drinks",
        isAvailable: true,
    },
    {
        id: 9,
        name: "Curry Puff",
        description: "Crispy pastry filled with curry",
        price: 350,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400&h=300",
        category: "Snacks",
        isAvailable: true,
    },
    {
        id: 10,
        name: "Fried Chicken Wings",
        description: "Golden crispy wings",
        price: 850,
        image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=400&h=300",
        category: "Snacks",
        isAvailable: false, // Sold out example
    },
    {
        id: 11,
        name: "Cendol",
        description: "Shaved ice dessert with pandan jelly",
        price: 650,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=400&h=300",
        category: "Desserts",
        isAvailable: true,
    },
    {
        id: 12,
        name: "Ice Cream Scoop",
        description: "Choice of vanilla, chocolate or strawberry",
        price: 450,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=400&h=300",
        category: "Desserts",
        isAvailable: true,
    },
];


export default function MenuPage() {
    const { restaurantCode } = useParams();
    const navigate = useNavigate();
    // --- State ---
    const [activeCategory, setActiveCategory] = useState("All");
    const [cart, setCart] = useState([]);

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
                ?.find(category => category.name === activeCategory)
                ?.items ?? []

    // --- Add item to cart ---
    const handleAddToCart = (item) => {
        setCart((prevCart) => {
            // Check if item already in cart
            const existing = prevCart.find((c) => c.id === item.id);

            if (existing) {
                // Increment quantity
                return prevCart.map((c) =>
                    c.id === item.id ? { ...c, qty: c.qty + 1 } : c
                );
            } else {
                // Add new item with qty 1
                return [...prevCart, { ...item, qty: 1 }];
            }
        });
    };

    // --- Derived cart totals ---
    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartTotal = cart.reduce((sum, item) => sum + item.price_cents * item.qty, 0);

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
        <div className="min-h-screen bg-[#FBF3DF] font-[Inter] text-[#241A12] pb-28">
            {/* ===== Header ===== */}
            <Header name={menu.restaurant_name} />

            {/* ===== Search Bar ===== */}
            <SearchBar />

            {/* ===== Category Tabs ===== */}
            <CategoryTabs
                categories={CATEGORIES}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory} />

            {/* ===== Menu Grid ===== */}
            <MenuGrid
                filteredItems={filteredItems}
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