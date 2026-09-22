import express from "express"
import { ENV } from "./src/config/env.js";
import menuRoutes from "./src/route/menuRoutes.js"
import sessionRoutes from "./src/route/sessionRoutes.js"
import orderRoutes from "./src/route/orderRoute.js"
import paymentRoutes from "./src/route/paymentRoutes.js"

const app = express();
const PORT = ENV.PORT;
app.use(express.json());

app.use("/api/menu", menuRoutes)
app.use("/api/sessions", sessionRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/payment", paymentRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})