import express from "express";
import cors from "cors";
import { json } from "body-parser";

import route from "../routes/route";

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(json());
  app.use(route);

  return app;
};

export default createServer;
