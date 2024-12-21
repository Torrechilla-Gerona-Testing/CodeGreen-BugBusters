import Header from "../components/Header";
import React, { useState } from "react";
import Adding from "../components/Adding";
import Success from "../components/Success";
import { Registration } from "../types/datatypes";
import { useAddRegistration } from "../hooks/registration-hooks/useAddRegistration";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterDriver = () => {
  const { postRegistration, loading } = useAddRegistration();
  const [successMessage] = useState("");
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false); // Added here for checkbox
  const [formErrors, setFormErrors] = useState({
    last_name: false,
    first_name: false,
    middle_name: false,
    sex: false,
    date_of_birth: false,
    driver_type: false,
    license_number: false,
    school_email: false,
  });
  const [formData, setFormData] = useState<Registration>({
    last_name: "",
    first_name: "",
    middle_name: "",
    sex: "Select",
    date_of_birth: "",
    driver_type: "Select",
    license_number: "",
    school_email: "",
  });

  const validateForm = (): boolean => {
    const errors: Record<string, boolean> = {};
    let isValid = true;

    const today = new Date();
    const minAgeDate = new Date();
    minAgeDate.setFullYear(today.getFullYear() - 16);

    if (!formData.last_name!.trim()) {
      errors.last_name = true;
      toast.error("Last Name is required.");
      isValid = false;
    }

    if (!formData.first_name!.trim()) {
      errors.first_name = true;
      toast.error("First Name is required.");
      isValid = false;
    }

    if (!formData.date_of_birth!.trim()) {
      errors.date_of_birth = true;
      toast.error("Date of Birth is required.");
      isValid = false;
    } else if (new Date(formData.date_of_birth!) > today) {
      errors.date_of_birth = true;
      toast.error("Invalid Birth Date");
      isValid = false;
    }

    if (!formData.sex || formData.sex === "Select") {
      errors.sex = true;
      toast.error("Sex is required.");
      isValid = false;
    }

    if (!formData.driver_type || formData.driver_type === "Select") {
      errors.driver_type = true;
      toast.error("Driver Type is required.");
      isValid = false;
    }

    if (!formData.license_number!.trim()) {
      errors.license_number = true;
      toast.error("License Number is required.");
      isValid = false;
    }

    if (!formData.school_email!.trim()) {
      errors.school_email = true;
      toast.error("School Email is required.");
      isValid = false;
    }

    return isValid;
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleConfirmClick = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      await postRegistration(formData); // Send the form data to the backend
      const isValid = validateForm(); // Validate the form
      if (isValid) navigate("/homepage"); // Redirect to the homepage
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (value.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  return (
    <div className="flex flex-col items-center bg-homepage-bg bg-cover bg-no-repeat sm:bg-top md:bg-right lg:bg-left h-screen">
      <div>
        <Header />
        {loading && <Adding text="Adding Registration..." />}
        {successMessage && <Success text="Registration Successful" />}
      </div>

      <div className="h-auto w-auto px-7 py-5 bg-zinc-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
        <div className="text-center font-syke-light text-white justify-center items-center">
          <div className="text-textgreen text-left font-syke-light">
            <h1 className="font-syke-medium text-2xl">Registering as Driver</h1>
            <h1 className="text-sm font-syke-light">
              Please enter your information
            </h1>

            <div className="bg- w-[40rem] h-auto mt-4">
              <form className="space-y-2">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <h1 className="text-white font-syke-light text-l">
                      Last Name
                    </h1>
                    <input
                      type="text"
                      data-testid="last_name_register"
                      name="last_name"
                      placeholder="Enter Last Name"
                      value={formData.last_name}
                      onChange={(e) => {
                        if (e.target.value.length <= 20) {
                          handleChange(e);
                        }
                      }}
                      className={`w-full px-4 py-2 mt-1 border rounded-sm bg-secondgrey text-white focus:outline-none focus:ring-0 active:outline-none ${
                        formErrors.last_name ? "border-red-800" : "border-none"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-white font-syke-light text-l">
                      Middle Name
                    </h1>
                    <input
                      data-testid="middle_name_register"
                      type="text"
                      className={`w-full px-4 py-2 mt-1 border rounded-sm bg-secondgrey text-white focus:outline-none focus:ring-0 active:outline-none ${
                        formErrors.middle_name
                          ? "border-red-800"
                          : "border-none"
                      }`}
                      name="middle_name"
                      value={formData.middle_name}
                      onChange={(e) => {
                        if (e.target.value.length <= 20) {
                          handleChange(e);
                        }
                      }}
                      placeholder="Optional"
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-white font-syke-light text-l">
                      First Name
                    </h1>
                    <input
                      placeholder="Enter First Name"
                      type="text"
                      name="first_name"
                      data-testid="first_name_register"
                      className={`w-full px-4 py-2 mt-1 border rounded-sm bg-secondgrey text-white focus:outline-none focus:ring-0 active:outline-none ${
                        formErrors.first_name ? "border-red-800" : "border-none"
                      }`}
                      value={formData.first_name}
                      onChange={(e) => {
                        if (e.target.value.length <= 20) {
                          handleChange(e);
                        }
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex-1">
                    <h1 className="text-white font-syke-light text-l">
                      Birth Date
                    </h1>
                    <input
                      title="birthdate_register"
                      type="date"
                      className={`w-full px-4 py-1.5 mt-1 border rounded-sm bg-secondgrey text-white focus:outline-none focus:ring-0 active:outline-none ${
                        formErrors.date_of_birth
                          ? "border-red-800"
                          : "border-none"
                      }`}
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-white font-syke-light text-l">Sex</h1>
                    <select
                      title="sex"
                      className={`w-full px-4 py-2 mt-1 border rounded-sm bg-secondgrey text-white focus:outline-none focus:ring-0 active:outline-none ${
                        formErrors.sex ? "border-red-800" : "border-none"
                      }`}
                      name="sex"
                      value={formData.sex}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>{" "}
                    </select>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-white font-syke-light text-l">
                      Driver Type
                    </h1>
                    <select
                      title="driver_type"
                      className={`w-full px-4 py-2 mt-1 border rounded-sm bg-secondgrey text-white focus:outline-none focus:ring-0 active:outline-none ${
                        formErrors.driver_type
                          ? "border-red-800"
                          : "border-none"
                      }`}
                      value={formData.driver_type}
                      onChange={handleChange}
                      name="driver_type"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Student">Student</option>
                      <option value="Faculty">Faculty</option>
                      <option value="Staff">Staff</option>
                    </select>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex-1">
                    <h1 className="text-white font-syke-light text-l">
                      License Number
                    </h1>
                    <input
                      type="text"
                      className={`w-full px-4 py-2 mt-1 border rounded-sm bg-secondgrey text-white focus:outline-none focus:ring-0 active:outline-none ${
                        formErrors.license_number
                          ? "border-red-800"
                          : "border-none"
                      }`}
                      name="license_number"
                      value={formData.license_number}
                      onChange={(e) => {
                        if (e.target.value.length <= 20) {
                          handleChange(e);
                        }
                      }}
                      placeholder="Enter license number"
                      required
                    />
                  </div>

                  <div className="flex-1">
                    <h1 className="text-white font-syke-light text-l">
                      School email:
                    </h1>
                    <input
                      type="text"
                      className={`w-full px-4 py-2 mt-1 border rounded-sm bg-secondgrey text-white focus:outline-none focus:ring-0 active:outline-none ${
                        formErrors.school_email
                          ? "border-red-800"
                          : "border-none"
                      }`}
                      name="school_email"
                      value={formData.school_email}
                      onChange={(e) => {
                        if (e.target.value.length <= 50) {
                          handleChange(e);
                        }
                      }}
                      placeholder="Enter school email"
                      pattern="[\-a-zA-Z0-9~!$%^&amp;*_=+\}\{'?]+(\.[\-a-zA-Z0-9~!$%^&amp;*_=+\}\{'?]+)*@[a-zA-Z0-9_][\-a-zA-Z0-9_]*(\.[\-a-zA-Z0-9_]+)*\.[cC][oO][mM](:[0-9]{1,5})?"
                      required
                    />
                  </div>
                </div>
              </form>

              <div className="flex items-center mt-4">
                <input
                  title="tickbox"
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="w-6 h-6 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
                <label
                  htmlFor="termsCheckbox"
                  className="ms-4 text-l font-medium text-gray-900 dark:text-gray-300"
                >
                  I verify that the information I have provided above is true.
                </label>
              </div>
              <button
                disabled={!isChecked}
                onClick={handleConfirmClick}
                className={`bg-buttongreen hover:bg-colorhover text-l text-white py-2 px-4 w-[9rem] mt-[1rem] rounded-sm font-syke-bold ${
                  !isChecked ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterDriver;
