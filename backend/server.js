import express from "express"
import cors from "cors";
import path from "path";

import { ENV } from "./src/config/env.js";
import menuRoutes from "./src/route/menuRoutes.js"
import sessionRoutes from "./src/route/sessionRoutes.js"
import orderRoutes from "./src/route/orderRoute.js"
import paymentRoutes from "./src/route/paymentRoutes.js"
import { handleStripeWebhook } from "./src/controller/paymentController.js";

const app = express();
const PORT = ENV.PORT;
const __dirname = path.resolve()

app.post("/api/payment/webhook",
    express.raw({type:"application/json"}),
    handleStripeWebhook
)

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true // allow frontend to send cookies
}))
app.use(express.json());

app.use("/api/menu", menuRoutes)
app.use("/api/sessions", sessionRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/payment", paymentRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "web/dist")));

    app.get("/{*any}", (_, res) => {
        res.sendFile(path.join(__dirname, "web", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})