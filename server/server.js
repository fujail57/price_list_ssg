import express from "express";
import { config } from "dotenv";
import { connectDB, prisma } from "./config/db.js";

const app = express();
const port = process.env.PORT || 3000;

// db connection
config();
connectDB();

// middleweare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// import routes
import routes from "./routes/index.js";
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((req, res, next) => {
  res.status(404).json({
    message: "Page not found!",
  });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}/api/`);
});
