import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRestaurant } from "../lib/api";
import LoadingState from "../component/LoadingState";
import ErrorState from "../component/ErrorState";

export default function TableEntryPage() {
    const { restaurantCode, tableCode } = useParams();
    const navigate = useNavigate();

    const [restaurantName, setRestaurantName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let timer;
        const startSession = async () => {
            try {
                const res = await fetchRestaurant({ restaurantCode, tableCode });

                setRestaurantName(res.restaurantName);
                localStorage.setItem("token", res.token);
                timer = setTimeout(() => {
                    navigate(`/restaurant/${restaurantCode}/menu`);
                }, 3000);
            } catch (error) {
                console.error(error);
                setError("Unable to start your session.");
            } finally {
                setLoading(false);
            }
        };
        startSession();

        return () => {
            clearTimeout(timer);
        };
    }, [restaurantCode, tableCode, navigate]);

    if (loading) {
        <LoadingState />
    }

    if (error) {
        return (
            <ErrorState />
        );
    }

    // Welcome / Redirect State
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 p-4 text-center">
            {/* Welcome Text */}
            <p className="text-base text-base-content/70 mb-1">
                Welcome to
            </p>
            <h1 className="text-3xl font-bold text-base-content mb-1">
                {restaurantName}
            </h1>
            <p className="text-lg text-base-content/80 mb-10">
                Table {tableCode}
            </p>

            {/* Custom Spinner (matching the ticks style) */}
            <div className="relative w-12 h-12 mb-6">
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '1s' }}>
                    {/* 12 ticks around the circle */}
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-0.5 h-2 bg-primary rounded-full"
                            style={{
                                left: '50%',
                                top: '50%',
                                transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-16px)`,
                                opacity: 0.2 + (i * 0.06), // gradient fade
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Preparing Text */}
            <p className="text-sm text-base-content/60">
                Preparing your menu...
            </p>
        </div>
    );
}