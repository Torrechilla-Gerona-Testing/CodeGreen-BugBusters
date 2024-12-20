import express, { Request as Req, Response } from "express";
import { pool } from "..";

const router = express();

// Get a specific notification by ID
router.get("/get-by-user", async (req: Req, res: Response) => {
  const id = req.user;

  const { rows: drivers } = await pool.query(
    "SELECT * FROM drivers WHERE user_id = $1",
    [id],
  );

  const foundDriver = await drivers[0];

  try {
    const { rows: notifications } = await pool.query(
      "SELECT * FROM notifications WHERE driver_id = $1",
      [foundDriver.id],
    );

    if (notifications.length === 0) {
      res.status(404).json({ message: "Notification not found." });
    } else {
      res.json(notifications);
    }
  } catch {
    res.status(500).json({
      title: "Server Error",
      message: "An unexpected error occurred while retrieving notifications",
    });
  }
});

// Create a new notification
router.post("/add", async (req: Req, res: Response) => {
  try {
    const { driver_id, title, message } = req.body;

    const { rows: drivers } = await pool.query(
      "SELECT * FROM drivers WHERE id = $1",
      [driver_id],
    );

    if (drivers.length === 0) {
      res.status(404).json({
        title: "Driver Not Found",
        message: "There is no driver with this license number.",
      });
      return;
    }

    const driver = await drivers[0];

    const { rows: notifications } = await pool.query(
      "INSERT INTO notifications (driver_id, title, message) VALUES ($1, $2, $3) RETURNING *",
      [driver.id, title, message],
    );

    if (notifications.length === 0) {
      res.status(409).json({
        title: "Notification Not Sent",
        message: "Notification has not been sent, try again later.",
      });
      return;
    }

    res.status(200).json({
      title: "Notification Sent",
      message: "Notification has been sent successfully.",
    });
  } catch {
    res
      .status(500)
      .json({ error: "An error occurred while creating notification." });
  }
});

// Delete a notification
router.delete("/delete", async (req: Req, res: Response) => {
  const id = req.user;
  try {
    const { rows: notifications } = await pool.query(
      "DELETE FROM notifications WHERE id = $1 RETURNING *",
      [id],
    );
    if (notifications.length === 0) {
      res.status(404).json({ error: "Notification not found." });
    } else {
      res.status(200).json({
        title: "Notification Deleted",
        message: "Notification successfully deleted.",
      });
    }
  } catch {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the notification." });
  }
});

export default router;
