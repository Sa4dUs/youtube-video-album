import express, { Request, Response } from "express";
import "dotenv/config";
import path from "path";
import db from "./lib/mongodb";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client/build")));

db()

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello World!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
