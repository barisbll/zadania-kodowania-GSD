import { Container } from "inversify";
import { TYPES } from "./types";
import {
  OpenWeatherI,
  WeatherBitI,
  VisualCrossingI,
  WeatherAPII,
} from "./interfaces";
import {
  OpenWeather,
  WeatherBit,
  VisualCrossing,
  WeatherAPI,
} from "./entities";

const myContainer = new Container();

myContainer.bind<OpenWeatherI>(TYPES.OpenWeather).to(OpenWeather);
myContainer.bind<WeatherBitI>(TYPES.WeatherBit).to(WeatherBit);
myContainer.bind<VisualCrossingI>(TYPES.VisualCrossing).to(VisualCrossing);
myContainer.bind<WeatherAPII>(TYPES.WeatherAPI).to(WeatherAPI);

export { myContainer };
