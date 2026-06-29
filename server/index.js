import express from "express";
import { config } from "dotenv";
import { connectDB, prisma } from "./config/db.js";

const app = express();
const port = 3000;

// db connection
config();
connectDB();

// middleweare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// import routes
import routes from "./routes/index.js";
app.use(routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
