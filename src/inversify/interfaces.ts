export interface ResponseObject {
  lon: string;
  lat: string;
  weather: string;
  cityName: string;
  status: number;
}

export interface errorObject {
  status: number;
  error: string;
}

export interface OpenWeatherI {
  getWeatherByLocation(test: string): ResponseObject | errorObject;
  getWeatherByLatLon(lat: string, lon: string): ResponseObject | errorObject;
}

export interface WeatherBitI {
  getWeatherByLatLon(lat: string, lon: string): ResponseObject | errorObject;
}

export interface VisualCrossingI {
  getWeatherByLocation(test: string): ResponseObject | errorObject;
  getWeatherByLatLon(lat: string, lon: string): ResponseObject | errorObject;
}

export interface WeatherAPII {
  getWeatherByLocation(test: string): ResponseObject | errorObject;
  getWeatherByLatLon(lat: string, lon: string): ResponseObject | errorObject;
}
