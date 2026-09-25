import { BrowserRouter, Route, Routes } from "react-router-dom"
import TableEntryPage from "./pages/TableEntryPage"
import MenuPage from "./pages/MenuPage"
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
