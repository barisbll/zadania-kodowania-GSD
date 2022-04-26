import { injectable, inject } from "inversify";
import "reflect-metadata";
import axios from "axios";

import {
  OpenWeatherI,
  WeatherBitI,
  VisualCrossingI,
  WeatherAPII,
  ResponseObject,
  errorObject,
} from "./interfaces";
import { TYPES } from "./types";
import { ErrorMiddleware } from "../controller/controller";

@injectable()
class OpenWeather implements OpenWeatherI {
  // @ts-ignore
  getWeatherByLocation = async (loc: string): ResponseObject | errorObject => {
    const options = {
      method: "GET",
      url: "https://community-open-weather-map.p.rapidapi.com/weather",
      params: {
        q: loc,
      },
      headers: {
        "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
        "X-RapidAPI-Key": "e642513920msh3f7dae4c653d015p10abc0jsn83033e0bf3b6",
      },
    };

    try {
      const axiosRes = await axios.request(options);

      const resObject = {
        lon: axiosRes.data.coord.lon,
        lat: axiosRes.data.coord.lat,
        weather: axiosRes.data.weather[0].description,
        cityName: axiosRes.data.name,
        status: axiosRes.data.cod,
      };

      return resObject;
    } catch (err: any) {
      return {
        status: err.response.data.cod,
        error: err.response.data.message,
      };
    }
  };

  getWeatherByLatLon = async (
    lat: string,
    lon: string
    // @ts-ignore
  ): ResponseObject | errorObject => {
    const options = {
      method: "GET",
      url: "https://community-open-weather-map.p.rapidapi.com/weather",
      params: {
        lat,
        lon,
      },
      headers: {
        "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
        "X-RapidAPI-Key": "e642513920msh3f7dae4c653d015p10abc0jsn83033e0bf3b6",
      },
    };

    try {
      const axiosRes = await axios.request(options);

      const resObject = {
        lon: axiosRes.data.coord.lon,
        lat: axiosRes.data.coord.lat,
        weather: axiosRes.data.weather[0].description,
        cityName: axiosRes.data.name,
        status: axiosRes.data.cod,
      };

      return resObject;
    } catch (err: any) {
      return {
        status: err.response.data.cod,
        error: err.response.data.message,
      };
    }
  };
}

@injectable()
class WeatherBit implements WeatherBitI {
  getWeatherByLatLon = async (
    lat: string,
    lon: string
    // @ts-ignore
  ): ResponseObject | errorObject => {
    const options = {
      method: "GET",
      url: "https://weatherbit-v1-mashape.p.rapidapi.com/current",
      params: { lon, lat },
      headers: {
        "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
        "X-RapidAPI-Key": "e642513920msh3f7dae4c653d015p10abc0jsn83033e0bf3b6",
      },
    };

    try {
      const axiosRes = await axios.request(options);

      const resObject = {
        lon: axiosRes.data.data[0].lon,
        lat: axiosRes.data.data[0].lat,
        weather: axiosRes.data.data[0].weather.description,
        cityName: axiosRes.data.data[0].city_name,
        status: axiosRes.status,
      };

      return resObject;
    } catch (err: any) {
      return {
        status: err.response.status,
        error: err.response.data.error,
      };
    }
  };
}

@injectable()
class VisualCrossing implements VisualCrossing {
  // @ts-ignore
  getWeatherByLocation = async (loc: string): ResponseObject | errorObject => {
    const options = {
      method: "GET",
      url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
      params: {
        aggregateHours: "24",
        location: loc,
        contentType: "json",
        unitGroup: "us",
        shortColumnNames: "0",
      },
      headers: {
        "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
        "X-RapidAPI-Key": "e642513920msh3f7dae4c653d015p10abc0jsn83033e0bf3b6",
      },
    };

    try {
      const axiosRes = await axios.request(options);

      if (axiosRes.data.errorCode === 999) {
        const err: ErrorMiddleware = new Error(axiosRes.data.message);
        err.status = 404;
        throw err;
      }

      const city: any = Object.values(axiosRes.data.locations)[0];

      const resObject = {
        lon: city.longitude,
        lat: city.latitude,
        weather: city.values[0].conditions,
        cityName: city.address,
        status: axiosRes.status,
      };

      return resObject;
    } catch (err: any) {
      return {
        status: err.status,
        error: err.message,
      };
    }
  };

  getWeatherByLatLon = async (
    lat: string,
    lon: string
    // @ts-ignore
  ): ResponseObject | errorObject => {
    const options = {
      method: "GET",
      url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
      params: {
        aggregateHours: "24",
        location: lat + "," + lon,
        contentType: "json",
        unitGroup: "us",
        shortColumnNames: "0",
      },
      headers: {
        "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
        "X-RapidAPI-Key": "e642513920msh3f7dae4c653d015p10abc0jsn83033e0bf3b6",
      },
    };

    try {
      const axiosRes = await axios.request(options);

      if (axiosRes.data.errorCode === 999) {
        const err: ErrorMiddleware = new Error(axiosRes.data.message);
        err.status = 404;
        throw err;
      }

      const city: any = Object.values(axiosRes.data.locations)[0];

      const resObject = {
        lon: city.longitude,
        lat: city.latitude,
        weather: city.values[0].conditions,
        cityName: city.address,
        status: axiosRes.status,
      };

      return resObject;
    } catch (err: any) {
      return {
        status: err.status,
        error: err.message,
      };
    }
  };
}

@injectable()
class WeatherAPI implements WeatherAPII {
  private _openWeather: OpenWeather;
  private _weatherBit: WeatherBit;
  private _visualCrossing: VisualCrossing;

  public constructor(
    @inject(TYPES.OpenWeather) openWeather: OpenWeather,
    @inject(TYPES.WeatherBit) weatherBit: WeatherBit,
    @inject(TYPES.VisualCrossing) visualCrossing: VisualCrossing
  ) {
    this._openWeather = openWeather;
    this._weatherBit = weatherBit;
    this._visualCrossing = visualCrossing;
  }

  public getWeatherByLocation(loc: string): ResponseObject | errorObject {
    return this._openWeather.getWeatherByLocation(loc);
    // return this._visualCrossing.getWeatherByLocation(loc);
  }

  public getWeatherByLatLon(
    lat: string,
    lon: string
  ): ResponseObject | errorObject {
    return this._openWeather.getWeatherByLatLon(lat, lon);
    // return this._weatherBit.getWeatherByLatLon(lat, lon);
    // return this._visualCrossing.getWeatherByLatLon(lat, lon);
  }
}

export { OpenWeather, WeatherBit, VisualCrossing, WeatherAPI };
