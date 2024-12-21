import express, { Request, Response } from "express";
import { pool } from "..";

const router = express();

router.get("/get", async (_req: Request, res: Response) => {
  try {
    // this can be reused for profiles
    const { rows: drivers } = await pool.query("SELECT * FROM drivers");
    // this can be reused for profiles
    const driversWithViolations = drivers.map(async (driver) => {
      const { rows: violations } = await pool.query(
        "SELECT * FROM violations WHERE driver_id = $1",
        [driver.id],
      );
      return await { ...driver, violations: violations };
    });

    const unpromisedDriversWithViolations = await Promise.all(
      driversWithViolations,
    );

    const violators = unpromisedDriversWithViolations.filter(
      (driver) => driver.violations[0],
    );

    if (violators.length === 0) {
      res.status(404).json({
        title: "Violators Not Found",
        message: "There are no violators.",
      });
      return;
    }

    res.status(200).json(violators);
  } catch {
    res.sendStatus(500);
  }
});

export default router;
