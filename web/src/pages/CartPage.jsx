import Header from "../component/CartPage/Header";
import CartItems from "../component/CartPage/CartItems";
import Summary from "../component/CartPage/Summary";
import { useCart } from "../context/CartContext";

export default function CartPage() {

    const { cartItems } = useCart()
    console.log(cartItems);

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const deliveryFee = 300;

    const total = subtotal + deliveryFee;

    return (
        <div className="min-h-screen bg-[#FBF3DF] text-[#241A12] font-[Inter]">
            {/* Header */}
            <Header />

            <main className="mx-auto grid max-w-5xl gap-6 px-6 py-8 md:grid-cols-[1fr_320px]">
                {/* Cart Items */}
                <CartItems cartItems={cartItems} />

                {/* Summary */}
                <Summary deliveryFee={deliveryFee} subtotal={subtotal} total={total} />
            </main>
        </div>
    );
}