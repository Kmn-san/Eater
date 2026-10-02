import { BrowserRouter, Route, Routes } from "react-router-dom"
import TableEntryPage from "./pages/TableEntryPage"
import MenuPage from "./pages/MenuPage"
import DetailPage from "./pages/DetailPage"
import CartPage from "./pages/CartPage"
import OrderPage from "./pages/OrderPage"
function App() {
  const token = localStorage.getItem("token");
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

      </Routes>
    </BrowserRouter>
  )
}

export default App
