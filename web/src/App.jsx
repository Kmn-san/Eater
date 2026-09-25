import { BrowserRouter, Route, Routes } from "react-router-dom"
import TableEntryPage from "./pages/TableEntryPage"
import MenuPage from "./pages/MenuPage"
import DetailPage from "./pages/DetailPage"
import CartPage from "./pages/CartPage"
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
          element={<DetailPage />} />

        <Route
          path="/restaurant/:restaurantCode/cart"
          element={<CartPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
