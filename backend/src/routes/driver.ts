import express, { Request, Response } from "express";
import { pool } from "..";
import { Driver } from "../types/datatypes";
import validateDriver from "../middlewares/validateDriver";

const router = express();
router.post("/add", validateDriver, async (req: Request, res: Response) => {
  try {
    const {
      email,
      first_name,
      last_name,
      middle_name,
      date_of_birth,
      sex,
      driver_type,
      license_number,
      license_expiration_date,
    } = req.body as Driver;

    await pool.query(
      `INSERT INTO drivers (
        email, 
        first_name, 
        last_name, 
        middle_name, 
        date_of_birth, 
        sex, 
        driver_type, 
        license_number, 
        license_expiration_date) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,

      [
        email,
        first_name,
        last_name,
        middle_name,
        date_of_birth,
        sex,
        driver_type,
        license_number,
        license_expiration_date,
      ],
    );

    res.status(200).json({
      title: "Driver Added!",
      message: `Driver ${last_name}, ${first_name} ${middle_name} has been added`,
    });

    return;
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ title: "Unknown Error", message: errorMessage });
  }
});

router.get("/get", async (req: Request, res: Response) => {
  try {
    const { rows: drivers } = await pool.query(
      `SELECT *
        FROM drivers`,
    );

    // Send the drivers list as a response
    res.json(drivers);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ title: "Unknown Error", message: errorMessage });
  }
});

router.get("/get/:driverId", async (req: Request, res: Response) => {
  try {
    const { driverId } = req.params;

    const { rows: users } = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [req.user],
    );

    const foundUser = users[0];

    if (driverId !== req.user && !foundUser.is_admin) {
      res.status(400).json({
        title: "Access Unauthorized!",
        message: "You cannot access this information.",
      });
      return;
    }

    const { rows: drivers } = await pool.query(
      "SELECT * FROM drivers WHERE id = $1",
      [driverId],
    );

    const foundDriver = await drivers[0];

    if (!foundDriver) {
      res.status(404).json({ message: "Driver not found" });
      return;
    }

    const { rows: violations } = await pool.query(
      "SELECT * FROM violations WHERE driver_id = $1",
      [foundDriver.id],
    );

    const { rows: cars } = await pool.query(
      "SELECT * FROM cars WHERE driver_id = $1",
      [foundDriver.id],
    );

    res.status(200).json({ ...foundDriver, violations, cars });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ title: "Unknown Error", message: errorMessage });
  }
});

router.patch("/update", async (req: Request, res: Response) => {
  try {
    const {
      id,
      email,
      first_name,
      last_name,
      middle_name,
      date_of_birth,
      sex,
      driver_type,
      license_number,
      license_expiration_date,
    } = req.body;

    if (
      ![
        id,
        email,
        first_name,
        last_name,
        date_of_birth,
        sex,
        driver_type,
        license_number,
        license_expiration_date,
      ].every(Boolean)
    ) {
      res.status(404).json({ message: "Driver does not exist." });
      return;
    }

    await pool.query(
      `
      UPDATE drivers
      SET email = $1,
      first_name = $2,
      last_name = $3,
      middle_name = $4,
      date_of_birth = $5,
      sex = $6,
      driver_type = $7,
      license_expiration_date = $8
      WHERE id = $9
      `,
      [
        email,
        first_name,
        last_name,
        middle_name,
        date_of_birth,
        sex,
        driver_type,
        license_expiration_date,
        id,
      ],
    );

    res.status(200).json({
      message: `Successfully updated Driver: ${first_name} ${last_name}.`,
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ title: "Unknown Error", message: errorMessage });
  }
});

router.delete("/delete", async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    if (!id) {
      res.status(400).json({
        title: "Validation Error",
        message: "Driver ID is required to delete a record.",
      });
      return;
    }

    await pool.query(`DELETE FROM cars WHERE driver_id = $1 RETURNING *`, [id]);

    await pool.query(`DELETE FROM violations WHERE id = $1 RETURNING *`, [id]);

    const resultDriver = await pool.query(
      `DELETE FROM drivers WHERE id = $1 RETURNING *`,
      [id],
    );

    if (resultDriver.rowCount === 0) {
      res.status(404).json({
        title: "Not Found",
        message: "Driver with the specified ID does not exist.",
      });
      return;
    }

    const deletedDriver = resultDriver.rows[0];

    res.status(200).json({
      title: "Driver Deleted",
      message: `Driver ${deletedDriver.last_name}, ${deletedDriver.first_name} has been removed.`,
      driver: deletedDriver,
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ title: "Unknown Error", message: errorMessage });
  }
});

export default router;
