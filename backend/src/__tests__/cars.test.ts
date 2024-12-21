import { describe, it, expect, beforeEach, vi, Mock } from "vitest";
import request from "supertest";
import express from "express";
import router from "../routes/cars";
import { pool } from "..";

// Mock the database pool with a more specific type
vi.mock("../index", () => ({
  pool: {
    query: vi.fn().mockResolvedValue({ rows: [], rowCount: 0 }),
  },
}));

const app = express();
app.use(express.json());
app.use(router);

describe("Cars API", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test
  });

  describe("POST /check-license", () => {
    it("should return 401 if license number is not found", async () => {
      (pool.query as Mock).mockResolvedValue({
        rows: [],
      });

      const response = await request(app)
        .post("/check-license")
        .send({ license_number: "12345678" });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        title: "License Number Not Found",
        message: "Driver with this license number does not exist.",
      });
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT id FROM drivers WHERE license_number = $1",
        ["12345678"],
      );
    });

    it("should return 200 if license number is found", async () => {
      (pool.query as Mock).mockResolvedValue({
        rows: [{ id: 1 }],
      });

      const response = await request(app)
        .post("/check-license")
        .send({ license_number: "12345678" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: 1 });
    });
  });

  describe("POST /add", () => {
    it("should return 404 if driver is not found", async () => {
      (pool.query as Mock).mockResolvedValueOnce({ rows: [] });

      const response = await request(app).post("/add").send({
        car_model: "Tesla",
        license_plate: "ABC123",
        brand: "Tesla",
        color: "Red",
        driver_id: 1,
        license_number: "12345678",
      });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        title: "No Driver Found",
        message: "Driver is not found.",
      });
    });

    it("should add a car and return 200", async () => {
      (pool.query as Mock)
        .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // Mock driver query
        .mockResolvedValueOnce({ rows: [{ id: 1 }] }); // Mock car insert

      const response = await request(app).post("/add").send({
        car_model: "Tesla",
        license_plate: "ABC123",
        brand: "Tesla",
        color: "Red",
        driver_id: 1,
        license_number: "12345678",
      });

      expect(response.status).toBe(200);
      expect(response.body.title).toBe("Car Added!");
      expect(pool.query).toHaveBeenCalledTimes(2);
    });
  });

  describe("GET /get", () => {
    it("should return 400 if driverId is not provided", async () => {
      const response = await request(app).get("/get");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        title: "Driver ID is required",
        message: "Please provide a driver ID.",
      });
    });

    it("should return 404 if no cars are found", async () => {
      (pool.query as Mock).mockResolvedValue({ rows: [] });

      const response = await request(app).get("/get?driverId=1");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        title: "No Cars Found",
        message: "No cars found for the given driver ID.",
      });
    });

    it("should return cars for a valid driverId", async () => {
      (pool.query as Mock).mockResolvedValue({
        rows: [
          {
            car_model: "Tesla",
            license_plate: "ABC123",
            brand: "Tesla",
            color: "Red",
            license_number: "12345678",
          },
        ],
      });

      const response = await request(app).get("/get?driverId=1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          car_model: "Tesla",
          license_plate: "ABC123",
          brand: "Tesla",
          color: "Red",
          license_number: "12345678",
        },
      ]);
    });
  });

  describe("PATCH /update", () => {
    it("should return 400 if id is not provided", async () => {
      const response = await request(app).patch("/update").send({
        car_model: "Tesla",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        title: "Validation Error",
        message: "License plate is required to update the record.",
      });
    });

    it("should update a car and return 200", async () => {
      (pool.query as Mock).mockResolvedValue({
        rowCount: 1,
        rows: [{ id: 1, car_model: "Tesla", license_plate: "ABC123" }],
      });

      const response = await request(app).patch("/update").send({
        id: 1,
        car_model: "Tesla",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        title: "Car Updated!",
        message: "Car has been updated successfully.",
        driver: { id: 1, car_model: "Tesla", license_plate: "ABC123" },
      });
    });
  });

  describe("DELETE /delete", () => {
    it("should delete a car and return 200", async () => {
      (pool.query as Mock).mockResolvedValue({
        rowCount: 1,
      });

      const response = await request(app).delete("/delete").send({
        id: 1,
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Car Added Successfully",
      });
    });
  });
});
