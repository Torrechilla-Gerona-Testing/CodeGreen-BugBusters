import { describe, it, expect, vi, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import { pool } from ".."; // Ensure correct import path for pool
import router from "../routes/profile";

// Create a mock express app
const app = express();
app.use("/profile", router);

vi.mock(".."); // Mocking the pool (db)

describe("GET /profile/get/:id", () => {
  afterAll(() => {
    vi.resetAllMocks(); // Reset mocks after tests are done
  });

  it("should return driver details and violations for a valid driver ID", async () => {
    const mockDriver = {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      user_id: "123",
    };

    const mockViolations = [
      {
        violation_id: 1,
        description: "Speeding",
      },
      {
        violation_id: 2,
        description: "Red Light",
      },
    ];

    const mockCars = [
      {
        id: "123",
        driver_id: "1233",
        car_model: "Civic",
        color: "Blue",
        license_plate: "123-123",
        license_number: "123-123-123",
        brand: "Honda",
      },
      {
        id: "124",
        driver_id: "1244",
        car_model: "Civic",
        color: "Red",
        license_plate: "123-1232",
        license_number: "123-123-1232",
        brand: "Honda",
      },
    ];

    // Mocking database responses
    pool.query = vi
      .fn()
      .mockResolvedValueOnce({ rows: [mockDriver] }) // Mock driver query
      .mockResolvedValueOnce({ rows: mockViolations })
      .mockResolvedValueOnce({ rows: mockCars }); // Mock violations query

    const response = await request(app).get("/profile/get/123");

    expect(response.status).toBe(200);
    expect(response.body.first_name).toBe(mockDriver.first_name);
    expect(response.body.violations.length).toBe(2);
    expect(response.body.cars.length).toBe(2);
    expect(response.body.violations[0].description).toBe(
      mockViolations[0].description,
    );
    expect(response.body.cars[0].car_model).toBe(mockCars[0].car_model);
  });

  it("should return 404 if driver is not found", async () => {
    // Mocking that no driver is found
    pool.query = vi.fn().mockResolvedValueOnce({ rows: [] });

    const response = await request(app).get("/profile/get/999");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Driver Not Found");
  });

  it("should return 500 if there is an error during the database query", async () => {
    // Mocking a database query error
    pool.query = vi.fn().mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app).get("/profile/get/123");

    expect(response.status).toBe(500);
  });
});
