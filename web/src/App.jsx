import { BrowserRouter, Route, Routes } from "react-router-dom"
import TableEntryPage from "./pages/TableEntryPage"
import MenuPage from "./pages/MenuPage"
import DetailPage from "./pages/DetailPage"
import CartPage from "./pages/CartPage"
import OrderPage from "./pages/OrderPage"
import PaymentPage from "./pages/PaymentPage"
import PaymentCancelPage from "./pages/PaymentCancelPage"
import PaymentSuccessPage from "./pages/PaymentSuccessPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/restaurant/:restaurantCode/table/:tableCode"
          element={<TableEntryPage />}
        />

        <Route
          path="/restaurant/:restaurantCode/menu"
          element={<MenuPage />}
        />

        <Route
          path="/menu/:restaurantCode/:itemId"
          element={<DetailPage />}
        />

        <Route
          path="/restaurant/:restaurantCode/cart"
          element={<CartPage />}
        />

        <Route
          path="/restaurant/:restaurantCode/orders"
          element={<OrderPage />}
        />

        <Route
          path="/payment/:orderId/pay"
          element={<PaymentPage />}
        />

        <Route
          path="/payment/success"
          element={<PaymentSuccessPage />}
        />

        <Route
          path="/payment/cancel"
          element={<PaymentCancelPage />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App
