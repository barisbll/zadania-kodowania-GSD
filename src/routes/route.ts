import { Router } from "express";

import { getWeather } from "../controller/controller";

const router = Router();

router.get("/weather/", getWeather);

export default router;
