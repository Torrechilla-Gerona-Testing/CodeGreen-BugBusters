import express, { Request, Response } from "express";
import { pool } from ".."; // Assuming Neon database pool is imported correctly
import { Registration } from "../types/datatypes";

const router = express.Router();

// Helper function to fetch registration by license
const fetchRegistrationByLicense = async (license_number: string) => {
  const { rows } = await pool.query(
    `SELECT school_email, user_id FROM registrations WHERE license_number = $1`,
    [license_number],
  );
  return rows[0];
};

// GET route to fetch all registrations
router.get("/get", async (_req: Request, res: Response) => {
  try {
    const { rows: registrations } = await pool.query(
      "SELECT user_id, license_number, school_email, first_name, last_name, middle_name, date_of_birth, driver_type, sex FROM registrations",
    );

    res.json(registrations); // Send the registration list as a response
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ title: "Unknown Error", message: errorMessage });
  }
});

// POST route to create a new registration
router.post("/add", async (req: Request, res: Response) => {
  try {
    // Extract data from the request body
    const user_id = req.user;
    const {
      license_number,
      school_email,
      first_name,
      sex,
      last_name,
      middle_name,
      date_of_birth,
      driver_type,
    } = req.body as Registration;

    if (
      ![
        license_number,
        school_email,
        first_name,
        sex,
        last_name,
        date_of_birth,
        driver_type,
      ].every(Boolean)
    ) {
      res.status(400).json({
        title: "Missing Information",
        message: "Please input all information needed.",
      });
      return;
    }

    await pool.query(
      `
      INSERT INTO registrations (user_id, license_number, school_email, first_name, last_name, middle_name, date_of_birth, driver_type, sex) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
      [
        user_id,
        license_number,
        school_email,
        first_name,
        last_name,
        middle_name,
        date_of_birth,
        driver_type,
        sex,
      ],
    );

    res.status(201).json({
      title: "Success",
      message: "Registration created successfully.",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ title: "Server Error", message: error.message });
    } else {
      res.status(500).json({
        title: "Server Error",
        message: "An unexpected error occurred.",
      });
    }
  }
});

router.delete("/delete", async (req: Request, res: Response): Promise<void> => {
  try {
    const { license_number } = req.body as Registration; // Extract license_number from request body

    // Attempt to delete the registration
    await pool.query(
      `DELETE FROM registrations WHERE license_number = $1 RETURNING *`,
      [license_number],
    );

    // If deletion was successful, return a success response
    res.status(200).json({
      success: true,
      title: "Registration Deleted",
      message: `Registration with license number ${license_number} has been successfully deleted.`,
    });
  } catch {
    res.status(500).json({
      success: false,
      title: "Server Error",
      message: "An error occurred while attempting to delete the registration.",
      // error: error.message, // Include error message for debugging
    });
  }
});

// POST route to approve a registration
router.post("/approve", async (req: Request, res: Response) => {
  const { license_number } = req.body;

  if (!license_number) {
    res.status(400).json({
      title: "Validation Error",
      message: "License number is required.",
    });
    return;
  }

  const client = await pool.connect();
  try {
    const registration = await fetchRegistrationByLicense(license_number);
    if (!registration) {
      res.status(404).json({
        title: "Not Found",
        message: "Registration with the specified license number not found.",
      });
      return;
    }

    const { school_email, user_id } = registration;

    const { rows: existingDrivers } = await client.query(
      `SELECT id, email FROM drivers WHERE license_number = $1`,
      [license_number],
    );

    if (existingDrivers.length > 0) {
      const existingDriver = existingDrivers[0];

      // Only update the email if it's NULL or an empty string
      if (!existingDriver.email) {
        await client.query(
          `UPDATE drivers SET email = $1, user_id = $2 WHERE license_number = $3`,
          [school_email, user_id, license_number],
        );

        await client.query(
          `DELETE FROM registrations WHERE license_number = $1`,
          [license_number],
        );

        res.status(200).json({
          title: "Driver Updated!",
          message: `Driver's email and user_id have been updated successfully.`,
        });
        return;
      }

      if (existingDriver.email) {
        await client.query(
          `UPDATE drivers SET user_id = $1 WHERE license_number = $2`,
          [user_id, license_number],
        );

        await client.query(
          `DELETE FROM registrations WHERE license_number = $1`,
          [license_number],
        );

        res.status(200).json({
          title: "Driver Updated!",
          message: `Driver's user_id has been updated successfully.`,
        });
        return;
      }
    } else {
      res.status(404).json({
        title: "License Number Not Found",
        message: "No driver found with the provided license number.",
      });
      await client.query("ROLLBACK");
      return;
    }
  } catch (error) {
    res
      .status(500)
      .json({ title: "Server Error", message: (error as Error).message });
  } finally {
    client.release();
  }
});

export default router;
