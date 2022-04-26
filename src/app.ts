import express from "express";
import cors from "cors";
import { json } from "body-parser";

import route from "./routes/route";
import { get404 } from "./controller/404";

const app = express();

app.use(cors());
app.use(json());
app.use(route);

app.listen(8080);

app.use(get404);
