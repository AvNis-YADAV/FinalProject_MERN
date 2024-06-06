require("dotenv").config();
const express = require("express");
const compression = require("compression");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connect = require("./configs/db");
const PORT = 8080;

// Other Route files
const {
  userRoute,
  conversationRoute,
  gigRoute,
  messageRoute,
  orderRoute,
  reviewRoute,
  authRoute,
} = require("./routes");

// App
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
    credentials: true,
  })
);

// Other Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/orders", orderRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);


app.get("/ip", (request, response) => {
  const list =
    request.headers["x-forwarded-for"] || request.socket.remoteAddress;
  const ips = list.split(",");

  return response.send({ ip: ips[0] });
});

app.listen(PORT, async () => {
  try {
    await connect();

    console.log(`Listening at http://localhost:${PORT}`);
    console.log("connected to MongoDB");
  } catch ({ message }) {
    console.log(message);
  }
});
