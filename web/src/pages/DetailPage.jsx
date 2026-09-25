import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDetail } from '../lib/api';
import LoadingState from '../component/LoadingState';
import ErrorState from '../component/ErrorState';
import { Minus, Plus, UtensilsCrossed } from 'lucide-react';
import { formatPrice } from '../utlis/formatPrice';
import ImageHeader from '../component/DetailPage/ImageHeader';
import ItemDetail from '../component/DetailPage/ItemDetail';
import Option from '../component/DetailPage/Option';
import Quantity from '../component/DetailPage/Quantity';
import Note from '../component/DetailPage/Note';
import BottomCartBar from '../component/DetailPage/BottomCartBar';

function DetailPage() {
    const { restaurantCode, itemId } = useParams();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedOptions, setSelectedOptions] = useState({})
    const [quantity, setQuantity] = useState(1);
    const [specialNote, setSpecialNote] = useState("");

    useEffect(() => {

        const fetchMenuData = async () => {

            try {

                const res = await fetchDetail(
                    restaurantCode,
                    itemId
                );

                setItem(res.result);

            } catch (error) {

                console.error(error);

                setError(
                    "Unable to load the menu. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };
        fetchMenuData();
    }, [restaurantCode, itemId]);

    const handleOptionSelect = (option, value) => {
        setSelectedOptions((previous) => {
            const currentSelected = previous[option.id] || [];

            const alreadySelected = currentSelected.some(
                (item) => item.id === value.id
            );

            // Click again → remove it
            if (alreadySelected) {
                return {
                    ...previous,
                    [option.id]: currentSelected.filter(
                        (item) => item.id !== value.id
                    ),
                };
            }

            // Don't allow more than max_select
            if (currentSelected.length >= option.max_select) {
                return previous;
            }

            // Add it
            return {
                ...previous,
                [option.id]: [...currentSelected, value],
            };
        });
    };
    const optionPrice = Object.values(selectedOptions).flat().reduce(
        (total, value) => {

            return total + (value.price_delta_cents || 0);
        },
        0
    );
    const basePrice = item?.price_cents ?? 0
    const totalPrice = basePrice + optionPrice

    const isOptionValue = item?.options?.every((option) => {
        const selectedCount = selectedOptions[option.id]?.length || 0;
        return selectedCount >= option.min_select
    }) ?? false

    if (loading) {
        return <LoadingState />;
    }

    if (error) {
        return <ErrorState message={error} />;
    }

    if (!item) {
        return <ErrorState message="Product not found." />;
    }


    return (
        <div className="min-h-screen bg-[#FFFFF0] text-[#1F1F1F] pb-28">

            <ImageHeader item={item} />
            <div className="relative -mt-6 rounded-t-3xl bg-[#FFFFF0] px-4 pt-6">
                <ItemDetail item={item} />
                <Option item={item} handleOptionSelect={handleOptionSelect} selectedOptions={selectedOptions} />
                <Quantity quantity={quantity} setQuantity={setQuantity} />
                <Note setSpecialNote={setSpecialNote} specialNote={specialNote} />
            </div>
            <BottomCartBar totalPrice={totalPrice} isOptionValue={isOptionValue} item={item} />
        </div>
    );
}

export default DetailPage

