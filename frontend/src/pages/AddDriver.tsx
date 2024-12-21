import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import React, { useState } from "react";
import Adding from "../components/Adding";
import Success from "../components/Success";
import { Driver } from "../types/datatypes";
import useAddDriver from "../hooks/driver-hooks/useAddDriver";
import ErrorAlert from "../components/ErrorAlert";
import { toast } from "react-toastify";

const AddDriver = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const { postDriver, loading, setLoading } = useAddDriver();
  const [successMessage, setSuccessMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState<Driver>({
    first_name: "",
    last_name: "",
    middle_name: "",
    date_of_birth: "",
    sex: "Select",
    driver_type: "Select",
    license_number: "",
    license_expiration_date: "",
  });

  const handleNextClick = () => {
    if (
      (currentStep === 1 &&
        (formData.first_name === "" || formData.last_name === "")) ||
      (currentStep === 2 &&
        (formData.date_of_birth === "" ||
          formData.sex === "Select" ||
          formData.driver_type === "Select")) ||
      (currentStep === 3 &&
        (formData.license_number === "" ||
          formData.license_expiration_date === ""))
    ) {
      toast.error("Missing input fields.");
      return;
    }
    setAlertMessage("");
    setCurrentStep(currentStep + 1);
  };

  const handleBackClick = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleCancelButton = () => {
    navigate("/encode");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    try {
      await postDriver(formData);
      setLoading(false);

      setSuccessMessage("Success");
      setTimeout(() => {
        navigate("/admin");
      }, 5000);
    } catch (error) {
      setLoading(false);
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

  };

  return (
    <div className="flex flex-col items-center bg-adminlanding-bg bg-cover bg-no-repeat sm:bg-top md:bg-right lg:bg-left h-screen">
      <div>
        <AdminHeader />
        {loading && <Adding text="Adding Driver..."/>}
        {successMessage && <Success text="Driver Successfully Added"/>}
        {alertMessage && <ErrorAlert />}
      </div>

      {currentStep === 1 && (
        <div>
          <div className="h-full w-full px-7 py-5 bg-zinc-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
            <div className="text-left font-syke-light text-white justify-center items-center">
              <div className="text-textgreen">
                <h1 className="text-4xl font-syke-bold">Adding a Driver</h1>
                <div>Step 1: Please enter driver's Full Name.</div>
              </div>

              <div className="w-[30rem] mt-[1rem]">
                <form className="space-y-5">
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <h1 className="text-white font-syke-light text-xl">
                        Last Name
                      </h1>
                      <input
                        type="text"
                        className="bg-secondgrey font-syke-regular text-[1.2rem] w-full mt-1 px-4 py-2 border h-10 border-none focus:outline-none focus:shadow-inner focus:ring-1 focus:ring-textgreen text-white placeholder-white placeholder-opacity-25 rounded-sm"
                        name="last_name"
                        value={formData.last_name}
                        onChange={(e) => {
                          if (e.target.value.length <= 20) {
                              handleChange(e);
                            }
                          }}                          
                          placeholder="Enter Last Name"
                        required
                      />
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <h1 className="text-white font-syke-light text-xl">
                          Middle Name
                        </h1>
                        <input
                          type="text"
                          className="bg-secondgrey font-syke-regular text-[1.2rem] w-full mt-1 px-4 py-2 border h-10 border-none focus:outline-none focus:shadow-inner focus:ring-1 focus:ring-textgreen text-white placeholder-white placeholder-opacity-25 rounded-sm"
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
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <h1 className="text-white font-syke-light text-xl">
                        First Name
                      </h1>
                      <input
                        type="text"
                        className="bg-secondgrey border-b	 font-syke-regular text-[1.2rem] w-full mt-1 px-4 py-2 border h-10 border-none focus:outline-none focus:shadow-inner focus:ring-1 focus:ring-textgreen text-white placeholder-white placeholder-opacity-25 rounded-sm"
                        name="first_name"
                        value={formData.first_name}
                        onChange={(e) => {
                          if (e.target.value.length <= 20) {
                              handleChange(e);
                            }
                          }}                          
                          placeholder="Enter First Name"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h1 className="text-white font-syke-light text-xl">
                      Email
                    </h1>
                    <input
                      type="text"
                      className="bg-secondgrey font-syke-regular text-[1.2rem] w-full mt-1 px-4 py-2 border h-10 border-none focus:outline-none focus:shadow-inner focus:ring-1 focus:ring-textgreen text-white placeholder-white placeholder-opacity-25 rounded-sm"
                      name="email"
                      value={formData.email}
                      onChange={(e) => {
                        if (e.target.value.length <= 50) {
                            handleChange(e);
                          }
                        }}                        
                        placeholder="Optional"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <div className="h-full w-full px-7 py-5 bg-zinc-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
            <div className="text-left font-syke-light text-white justify-center items-center">
              <div className="text-textgreen">
                <h1 className="text-4xl font-syke-bold">Adding a Driver</h1>
                <div>Step 2: Please enter driver's additional information.</div>
              </div>
              <div className="w-[30rem] mt-4">
                <form className="space-y-5">
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <h1 className="text-white font-syke-light text-xl">
                        Sex
                      </h1>
                      <select
                        title="sex"
                        className="bg-secondgrey font-syke-regular text-[1.2rem] w-full mt-1 px-4 py-2 border h-10 border-none focus:outline-none focus:shadow-inner focus:ring-1 focus:ring-textgreen text-white placeholder-white rounded-sm"
                        name="sex"
                        value={formData.sex}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <h1 className="text-white font-syke-light text-xl">
                        Birth Date
                      </h1>
                      <input
                        title="dateOfBirth"
                        type="date"
                        className="bg-secondgrey font-syke-regular text-[1.2rem] w-full mt-1 px-4 py-2 border h-10 border-none focus:outline-none focus:shadow-inner focus:ring-1 focus:ring-textgreen text-white placeholder-white rounded-sm"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <h1 className="text-white font-syke-light text-xl">
                        Driver Type
                      </h1>
                      <select
                        title="driverType"
                        className="bg-secondgrey font-syke-regular text-[1.2rem] w-full mt-1 px-4 py-2 border h-10 border-none focus:outline-none focus:shadow-inner focus:ring-1 focus:ring-textgreen text-white placeholder-white rounded-sm"
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
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <div className="h-full w-full px-7 py-5 bg-zinc-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
            <div className="text-left font-syke-light text-white justify-center items-center">
              <div className="text-textgreen">
                <h1 className="text-4xl font-syke-bold">Adding a Driver</h1>
                <div>Step 3: Please enter driver's license information.</div>
              </div>

              <div className="w-[30rem] mt-[1rem]">
                <form className="space-y-5">
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <h1 className="text-white font-syke-light text-xl">
                        License Number
                      </h1>
                      <input
                        type="text"
                        className="bg-secondgrey border-b	 font-syke-regular text-[1.2rem] w-full mt-1 px-4 py-2 border h-10 border-none focus:outline-none focus:shadow-inner focus:ring-1 focus:ring-textgreen text-white placeholder-white placeholder-opacity-25 rounded-sm"
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
                  </div>

                  <div className="flex-1">
                    <h1 className="text-white font-syke-light text-xl">
                      License Expiration Date
                    </h1>
                    <input
                      title="licenseExpDate"
                      type="date"
                      value={formData.license_expiration_date}
                      onChange={handleChange}
                      className="bg-secondgrey font-syke-regular text-[1.2rem] w-full mt-1 px-4 py-2 border h-10 border-none focus:outline-none focus:shadow-inner focus:ring-1 focus:ring-textgreen text-white placeholder-white rounded-sm"
                      name="license_expiration_date"
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div>
          <div className="h-full w-full px-7 py-5 bg-zinc-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
            <div className="text-textgreen">
              <h1 className="text-4xl font-syke-bold">Adding a Driver</h1>
              <div>Step 4: Confirm Details</div>
            </div>

            <div className="w-[40rem] h-[auto] mt-4">
              <form className="space-y-[2rem]">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <h1 className="text-white font-syke-light text-xl">
                      Last Name
                    </h1>
                    <h1 className="text-textgreen font-syke-medium text-3xl">
                      {formData.last_name}
                    </h1>
                  </div>

                  <div className="flex-1">
                    <h1 className="text-white font-syke-light text-xl">
                      Middle Name
                    </h1>
                    <h1 className="text-textgreen font-syke-medium text-3xl">
                      {formData.middle_name}
                    </h1>
                  </div>
                </div>

                <div className="flex-1">
                  <h1 className="text-white font-syke-light text-xl">
                    First Name
                  </h1>
                  <h1 className="text-textgreen font-syke-medium text-3xl">
                    {formData.first_name}
                  </h1>
                </div>

                <div className="flex space-x-4">
                  <div className="flex-1">
                    <h1 className="text-white font-syke-light text-xl">Sex</h1>
                    <h1 className="text-textgreen font-syke-medium text-3xl">
                      {formData.sex}
                    </h1>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-white font-syke-light text-xl">
                      Date of Birth
                    </h1>
                    <h1 className="text-textgreen font-syke-medium text-3xl">
                      {formData.date_of_birth}
                    </h1>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-white font-syke-light text-xl">
                      Driver Type
                    </h1>
                    <h1 className="text-textgreen font-syke-medium text-3xl">
                      {formData.driver_type}
                    </h1>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex-1">
                    <h1 className="text-white font-syke-light text-xl">
                      License Number
                    </h1>
                    <h1 className="text-textgreen font-syke-medium text-3xl">
                      {formData.license_number}
                    </h1>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-white font-syke-light text-xl">
                      License Expiration Date
                    </h1>
                    <h1 className="text-textgreen font-syke-medium text-3xl">
                      {formData.license_expiration_date}
                    </h1>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="relative">
        {currentStep === 1 && (
          <div className="flex justify-center gap-10 p-5">
            <div>
              <button
                type="button"
                className="w-32 text-xl bg-buttongreen font-syke-medium text-white py-2 hover:bg-[#33471a] font-syke-regular transition-colors rounded-sm"
                onClick={handleCancelButton}
              >
                Cancel
              </button>
            </div>

            <div>
              <button
                type="submit"
                className="w-32 text-xl bg-buttongreen text-white py-2 font-syke-medium hover:bg-[#33471a] transition-colors rounded-sm"
                onClick={handleNextClick}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {(currentStep === 2 || currentStep === 3) && (
          <div className="flex justify-center gap-10 p-5">
            <div>
              <button
                type="button"
                className="w-32 text-xl bg-buttongreen font-syke-medium text-white py-2 hover:bg-[#33471a] font-syke-regular transition-colors rounded-sm"
                onClick={handleBackClick}
              >
                Back
              </button>
            </div>

            <div>
              <button
                type="button"
                className="w-32 text-xl bg-buttongreen font-syke-medium text-white py-2 hover:bg-[#33471a] font-syke-regular transition-colors rounded-sm"
                onClick={handleNextClick}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="flex justify-center gap-20 p-5">
            <div>
              <button
                type="button"
                className="w-32 bg-buttongreen font-syke-medium text-white py-2 hover:bg-[#33471a] font-syke-regular transition-colors rounded-sm"
                onClick={handleBackClick}
              >
                Back
              </button>
            </div>

            <div>
              <button
                type="button"
                className="w-32 bg-buttongreen font-syke-medium text-white py-2 hover:bg-[#33471a] font-syke-regular transition-colors rounded-sm"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddDriver;
