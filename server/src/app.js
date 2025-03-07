import express from "express"
import cors from  "cors"
import cookieParser from "cookie-parser"
import { createServer } from "http";
import initSocket from "./socket.js";

const app= express()
const server = createServer(app);
initSocket(server);

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.get("/", (req, res) => {
    res.send("Server is working!");
});
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from './routes/user.route.js'
import paymentRouter from "./routes/payment.route.js";
import chatRoutes from "./routes/chat.route.js";
import businessRouter from "./routes/business.route.js";
import agencyRouter from "./routes/agency.route.js"
console.log("Routes loaded!");

//routes declaration

app.use("/api/v1/users", userRouter)
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/businesses", businessRouter);
app.use("/api/v1/agencies", agencyRouter);

// http://localhost:8000/api/v1/users/register

export {app,server}
