import express, { Request, Response } from "express";
import { pool } from "..";

const router = express();

router.get("/get/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { rows: drivers } = await pool.query(
      "SELECT * FROM drivers WHERE user_id = $1",
      [id],
    );

    const foundDriver = await drivers[0];

    if (!foundDriver) {
      res.status(404).json({ message: "Driver Not Found" });
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
  } catch {
    res.sendStatus(500);
  }
});

export default router;
