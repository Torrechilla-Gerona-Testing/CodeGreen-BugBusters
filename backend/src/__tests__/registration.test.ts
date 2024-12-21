import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import request from "supertest";
import express from "express";
import router from "../routes/registration";
import { pool } from ".."; // Assuming pool is exported from your index file

interface Registration {
  user_id?: number;
  license_number?: string;
  school_email: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  date_of_birth?: string;
  driver_type?: string;
  sex?: string;
}

vi.mock("../index", () => ({
  pool: {
    connect: vi.fn().mockResolvedValue({
      query: vi.fn(),
      release: vi.fn(),
      begin: vi.fn().mockResolvedValue({}),
      commit: vi.fn().mockResolvedValue({}),
      rollback: vi.fn().mockResolvedValue({}),
    }),
    query: vi.fn(),
  },
}));

const app = express();
app.use(express.json());
app.use(router);

describe("Registration API", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test to avoid state carry-over
  });

  describe("GET /get", () => {
    it("should fetch all registrations successfully", async () => {
      const mockRegistrations: Registration[] = [
        {
          user_id: 1,
          license_number: "123",
          school_email: "test@example.com",
        },
        {
          user_id: 2,
          license_number: "456",
          school_email: "test2@example.com",
        },
      ];

      // Correctly mock the pool.query method
      (pool.query as Mock).mockResolvedValue({ rows: mockRegistrations });

      const response = await request(app).get("/get");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockRegistrations);
      expect(pool.query).toHaveBeenCalledOnce();
      expect(pool.query).toHaveBeenCalledWith(
        `SELECT user_id, license_number, school_email, first_name, last_name, middle_name, date_of_birth, driver_type, sex FROM registrations`,
      );
    });

    it("should handle database errors", async () => {
      const dbError = new Error("Database query failed");
      (pool.query as Mock).mockRejectedValue(dbError);

      const response = await request(app).get("/get");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        title: "Unknown Error",
        message: dbError.message,
      });
    });
  });

  describe("POST /add", () => {
    it("should return 400 if missing required information", async () => {
      const incompleteData: Registration = {
        user_id: 1,
        license_number: "12345678",
        school_email: "test@example.com",
        first_name: "John",
      };

      const response = await request(app).post("/add").send(incompleteData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        title: "Missing Information",
        message: "Please input all information needed.",
      });
    });

    it("should add a registration successfully", async () => {
      const registrationData: Registration = {
        user_id: 1,
        license_number: "12345678",
        school_email: "test@example.com",
        first_name: "John",
        last_name: "Doe",
        middle_name: "A",
        date_of_birth: "1990-01-01",
        driver_type: "Student",
        sex: "M",
      };

      (pool.query as Mock).mockResolvedValueOnce({ rowCount: 1 });

      const response = await request(app).post("/add").send(registrationData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        title: "Success",
        message: "Registration created successfully.",
      });

      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO registrations"),
        expect.arrayContaining([
          "12345678",
          "test@example.com",
          "John",
          "Doe",
          "A",
          "1990-01-01",
          "Student",
          "M",
        ]),
      );
    });

    it("should handle database errors on registration creation", async () => {
      const registrationData: Registration = {
        user_id: 1,
        license_number: "12345678",
        school_email: "test@example.com",
        first_name: "John",
        last_name: "Doe",
        middle_name: "A",
        date_of_birth: "1990-01-01",
        driver_type: "Student",
        sex: "M",
      };

      const dbError = new Error("Database insertion failed");
      (pool.query as Mock).mockRejectedValue(dbError);

      const response = await request(app).post("/add").send(registrationData);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        title: "Server Error",
        message: dbError.message,
      });
    });
  });
});
