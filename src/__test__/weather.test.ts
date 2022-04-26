import supertest from "supertest";

import createServer from "../util/server";

const app = createServer();

describe("weather", () => {
  describe("get weather route", () => {
    describe("given the weather location or lat, lon does not exist", () => {
      it("should return a 404 with error body", async () => {
        const { body, statusCode } = await supertest(app).get("/weather");

        expect(statusCode).toBe(404);

        expect(body.error).toBe("Enter correct loc or (lat, lon) parameters");
      });
    });

    describe("given the weather location,", () => {
      it("should return a 200 with response body", async () => {
        const { body, statusCode } = await supertest(app).get(
          "/weather?loc=Paris"
        );

        expect(statusCode).toBe(200);

        expect(body.result).toEqual({
          lon: expect.any(Number),
          lat: expect.any(Number),
          weather: expect.any(String),
          cityName: expect.any(String),
          status: 200,
        });
      });
    });

    describe("given the wrong weather location,", () => {
      it("should return an 404 with error body", async () => {
        const { body, statusCode } = await supertest(app).get(
          "/weather?loc=xxxxx"
        );

        expect(statusCode).toBe(404);

        expect(body).toEqual({
          error: expect.any(String),
        });
      });
    });

    describe("given the weather latitude and longitude,", () => {
      it("should return a 200 with response body", async () => {
        const { body, statusCode } = await supertest(app).get(
          "/weather?lon=-17&lat=09"
        );

        expect(statusCode).toBe(200);

        expect(body.result).toEqual({
          lon: expect.any(Number),
          lat: expect.any(Number),
          weather: expect.any(String),
          cityName: expect.any(String),
          status: 200,
        });
      });
    });

    describe("given the wrong weather latitude, longitude", () => {
      it("should return an 404 with error body", async () => {
        const { body, statusCode } = await supertest(app).get(
          "/weather?lon=-17&lat=xxxxxx"
        );

        expect(statusCode).toBe(404);

        expect(body).toEqual({
          error: expect.any(String),
        });
      });
    });

    describe("given the weather location and lat, lon", () => {
      it("should return a 200 with response body", async () => {
        const { body, statusCode } = await supertest(app).get(
          "/weather?loc=Paris&lon=-17&lat=10"
        );

        expect(statusCode).toBe(200);

        expect(body.result).toEqual({
          lon: expect.any(Number),
          lat: expect.any(Number),
          weather: expect.any(String),
          cityName: expect.any(String),
          status: 200,
        });
      });
    });
  });
});
