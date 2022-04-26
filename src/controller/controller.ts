import { Request, Response, NextFunction } from "express";

import { myContainer } from "../inversify/inversify.config";
import { TYPES } from "../inversify/types";
import {
  WeatherAPII,
  ResponseObject,
  errorObject,
} from "../inversify/interfaces";

const weatherApi = myContainer.get<WeatherAPII>(TYPES.WeatherAPI);

export interface ErrorMiddleware extends Error {
  status?: number;
  message: string;
}

export const getWeather = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { loc } = req.query as { loc: string };
  const { lat, lon } = req.query as { lat: string; lon: string };

  if (loc) {
    try {
      const result: ResponseObject | errorObject =
        await weatherApi.getWeatherByLocation(loc);

      if ("error" in result) {
        const err: ErrorMiddleware = new Error(result.error);
        err.status = result.status;
        throw err;
      }

      res.status(result.status).json({ result });
    } catch (err: ErrorMiddleware | any) {
      res.status(err.status).json({ error: err.message });
    }
  } else if (+lat & +lon) {
    try {
      const result: ResponseObject | errorObject =
        await weatherApi.getWeatherByLatLon(lat, lon);

      if ("error" in result) {
        const err: ErrorMiddleware = new Error(result.error);
        err.status = result.status;
        throw err;
      }

      res.status(result.status).json({ result });
    } catch (err: ErrorMiddleware | any) {
      res.status(err.status).json({ error: err.message });
    }
  } else {
    res
      .status(404)
      .json({ error: "Enter correct loc or (lat, lon) parameters" });
  }
};
