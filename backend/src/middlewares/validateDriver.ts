import { NextFunction, Request, Response } from "express";

const validateDriver = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const validateEmail = (email: string) => {
    return email.match(
      "[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+(.[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+)*@[a-zA-Z0-9_][-a-zA-Z0-9_]*(.[-a-zA-Z0-9_]+)*.[cC][oO][mM](:[0-9]{1,5})?",
    );
  };

  switch (req.path) {
    case "/add-driver": {
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
      } = req.body;

      if (!validateEmail(email)) {
        res.status(401).json({
          title: "Invalid Email",
          message: "Email is not available, please use a proper email account.",
        });
        return;
      }

      const missingFields = [];

      if (!email) missingFields.push("email");
      if (!first_name) missingFields.push("first_name");
      if (!last_name) missingFields.push("last_name");
      if (!middle_name) missingFields.push("middle_name");
      if (!date_of_birth) missingFields.push("date_of_birth");
      if (!sex) missingFields.push("sex");
      if (!driver_type) missingFields.push("driver_type");
      if (!license_number) missingFields.push("license_number");
      if (!license_expiration_date)
        missingFields.push("license_expiration_date");

      if (missingFields.length > 0) {
        res.status(400).json({
          title: "Validation Error",
          message: `Missing required fields: ${missingFields.join(", ")}`,
        });
        return;
      }

      next();
      break;
    }

    default:
      next();
      break;
  }
};

export default validateDriver;
