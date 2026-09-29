import Header from "../component/CartPage/Header";
import CartItems from "../component/CartPage/CartItems";
import Summary from "../component/CartPage/Summary";
import { useCart } from "../context/CartContext";
import EmptyCartPage from "../component/CartPage/EmptyCart";

export default function CartPage() {

    const { cartItems } = useCart()
    const token = localStorage.getItem("token")

    const subtotal = cartItems.reduce(
        (total, item) => total + item.totalPrice,
        0
    );

    const serviceTax = subtotal * 0.06;
    const serviceCharge = subtotal * 0.1;

    const total = subtotal + serviceTax + serviceCharge;

    const handleCheckout = () => {
        const checkoutItem = cartItems.map((item) => ({
            item_id: item.id,
            quantity: item.quantity,
            note: item.specialNote,
            options: item.selectedOption.map((option) => ({
                option_id: option.optionId,
                option_value_id: option.optionValueId
            }))
        }))
        console.log(checkoutItem);


    }

    if (cartItems.length === 0) {
        return <EmptyCartPage />
    }
    return (
        <div className="min-h-screen bg-[#FBF3DF] text-[#241A12] font-[Inter]">
            {/* Header */}
            <Header />

            <main className="mx-auto grid max-w-5xl gap-6 px-6 py-8 md:grid-cols-[1fr_320px]">
                {/* Cart Items */}
                <CartItems cartItems={cartItems} />

                {/* Summary */}
                <Summary serviceTax={serviceTax} serviceCharge={serviceCharge} subtotal={subtotal} total={total} handleCheckout={handleCheckout} />
            </main>
        </div>
    );
}