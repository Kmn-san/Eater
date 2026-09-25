import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchMenu } from '../lib/api';
import LoadingState from '../component/LoadingState';
import ErrorState from '../component/ErrorState';
import Header from '../component/Menu/Header';
import SearchBar from '../component/Menu/SearchBar';
import Category from '../component/Menu/Category';
import MenuGrid from '../component/Menu/MenuGrid';

function MenuPage() {
    const { restaurantCode } = useParams();

    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeCategory, setActiveCategory] = useState("All")

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const res = await fetchMenu(restaurantCode)
                setMenu(res.result)
            } catch (error) {
                console.error(error);
                setError("Unable to load the menu. Please try again.");
            } finally {
                setLoading(false);
            }
        }
        fetchMenuData();
    }, [restaurantCode])

    const flattenedMenu = useMemo(() => {
        if (!menu) return { categories: [], itemsByCategory: {} }

        const itemsByCategory = {};

        menu.categories.forEach((cat) => {
            if (!itemsByCategory[cat.name]) {
                itemsByCategory[cat.name] = []
            }
            itemsByCategory[cat.name].push(...cat.items)
        })
        return {
            categories: Object.keys(itemsByCategory),
            itemsByCategory
        }
    }, [menu])

    if (loading) {
        return <LoadingState />
    }

    if (error) {
        return <ErrorState message={error} />
    }

    if (!menu) {
        return <ErrorState message="Menu not found." />
    }

    const displayCategories = ["All", ...flattenedMenu.categories]
    const displayItems =
        activeCategory === "All"
            ? Object.values(flattenedMenu.itemsByCategory).flat()
            : flattenedMenu.itemsByCategory[activeCategory] || []

    return (
        <div className="min-h-screen bg-[#FFFFF0] text-[#1F1F1F]">
            <div className="mx-auto min-h-screen w-full max-w-md bg-[#FFFFF0] pb-28 shadow-sm">
                {/* HEADER */}
                <Header menu={menu} />

                {/* SEARCH BAR */}
                <SearchBar />

                {/* CATEGORY  */}
                <Category
                    displayCategories={displayCategories}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    displayItems={displayItems} />

                {/* MENU GRID */}
                <MenuGrid displayItems={displayItems}
                    restaurantCode={restaurantCode} />
            </div >
        </div >
    )
}

export default MenuPage