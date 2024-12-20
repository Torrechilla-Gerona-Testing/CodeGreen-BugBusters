import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import { useState } from "react";
import { toast } from "react-toastify";
import useCheckLicenseNumber from "../hooks/car-hooks/useCheckLicenseNumber"; 
import { DriverWithVandC } from "../types/datatypes";

const AddViolation = () => {
  const navigate = useNavigate();
  const { checkLicenseNumber, loading } = useCheckLicenseNumber(); 

  const [currentStep, setCurrentStep] = useState(1);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [driverProfile, setDriverProfile] = useState<DriverWithVandC>(); 

  const handleCancelButton = () => {
    navigate("/encode");
  };

  const handleNextClick = async () => {
    try {
      const driver = await checkLicenseNumber(licenseNumber);
      console.log(driver);
      if (driver) {
        setDriverProfile(driver);
        setCurrentStep(currentStep + 1);
        return;
      }
    } catch (error) {
      alert(error);
      toast.error("Something went wrong!");
    }
  };

  const handleBackClick = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="flex flex-col items-center bg-adminlanding-bg bg-cover bg-no-repeat sm:bg-top md:bg-right lg:bg-left h-screen p-4">
      <div className="w-full">
        <AdminHeader />
      </div>

      {currentStep === 1 && (
        <div className="w-full max-w-lg px-6 py-5 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
          <div className="text-left font-syke-light text-white">
            <div className="text-textgreen">
              <h1 className="text-2xl md:text-4xl font-syke-bold">Adding a Violation</h1>
              <p>Find the driver by searching for the license number.</p>
            </div>

            <div className="mt-4">
              <form className="space-y-5">
                <div>
                  <label htmlFor="license_number" className="text-white font-syke-light text-lg">
                    License Number
                  </label>
                  <input
                    type="text"
                    id="license_number"
                    className="bg-secondgrey font-syke-regular text-lg w-full mt-1 px-4 py-2 border-none focus:outline-none focus:shadow-inner focus:ring-1 focus:ring-textgreen text-white placeholder-white placeholder-opacity-25 rounded-sm"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    placeholder="Enter license number"
                    required
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {currentStep === 2 && driverProfile && (
        <div className="w-full max-w-xl px-6 py-5 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
          <div className="text-left font-syke-light text-white">
            <div className="text-textgreen">
              <h1 className="text-2xl md:text-4xl font-syke-bold">Driver Found</h1>
              <p>Driver details are shown below.</p>
            </div>

            <div className="mt-4">
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h1 className="text-white font-syke-light text-xl">Last Name</h1>
                    <h1 className="text-textgreen font-syke-medium text-lg md:text-3xl">
                      {driverProfile.last_name}
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-white font-syke-light text-xl">First Name</h1>
                    <h1 className="text-textgreen font-syke-medium text-lg md:text-3xl">
                      {driverProfile.first_name}
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-white font-syke-light text-xl">Sex</h1>
                    <h1 className="text-textgreen font-syke-medium text-lg md:text-3xl">
                      {driverProfile.sex}
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-white font-syke-light text-xl">Date of Birth</h1>
                    <h1 className="text-textgreen font-syke-medium text-lg md:text-3xl">
                      {driverProfile.date_of_birth}
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-white font-syke-light text-xl">Driver Type</h1>
                    <h1 className="text-textgreen font-syke-medium text-lg md:text-3xl">
                      {driverProfile.driver_type}
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-white font-syke-light text-xl">License Number</h1>
                    <h1 className="text-textgreen font-syke-medium text-lg md:text-3xl">
                      {driverProfile.license_number}
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-white font-syke-light text-xl">License Expiration Date</h1>
                    <h1 className="text-textgreen font-syke-medium text-lg md:text-3xl">
                      {driverProfile.license_expiration_date}
                    </h1>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="text-center flex justify-center gap-5 p-5">
        {currentStep === 1 && (
          <>
            <button
              type="button"
              className="w-32 bg-buttongreen font-syke-medium text-white py-2 hover:bg-[#33471a] transition-colors rounded-sm"
              onClick={handleCancelButton}
            >
              Cancel
            </button>
            <button
              type="button"
              className="w-32 bg-buttongreen font-syke-medium text-white py-2 hover:bg-[#33471a] transition-colors rounded-sm"
              onClick={handleNextClick}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </>
        )}
        {currentStep === 2 && (
          <>
            <button
              type="button"
              className="w-32 bg-buttongreen font-syke-medium text-white py-2 hover:bg-[#33471a] transition-colors rounded-sm"
              onClick={handleBackClick}
            >
              Back
            </button>
            <button
              type="button"
              className="w-32 bg-buttongreen font-syke-medium text-white py-2 hover:bg-[#33471a] transition-colors rounded-sm"
              onClick={() => navigate("/add-violation")}
            >
              Add Violation
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AddViolation;


// to ELEF previous code

// import { useNavigate } from "react-router-dom";
// import AdminHeader from "../components/AdminHeader";
// import { useState } from "react";

// const AddViolation = () => {
//   const navigate = useNavigate();

//   const [currentStep, setCurrentStep] = useState(1);

//   const handleCancelButton = () => {
//     navigate("/encode");
//   };

//   const handleNextClick = () => {
//     setCurrentStep(currentStep + 1);
//   };

//   const handleBackClick = () => {
//     setCurrentStep(currentStep - 1);
//   };
//   return (
//     <div className="flex flex-col items-center overflow-y-hidden bg-adminlanding-bg bg-cover bg-no-repeat sm:bg-top md:bg-right lg:bg-left h-screen">
//       <div>
//         <AdminHeader />
//       </div>

//       {currentStep === 1 && (
//         <div>
//           <div className = "h-[auto w-[auto] px-6 py-5 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
//             <div className="text-left font-syke-light text-white justify-center items-center">
//               <div className="text-textgreen">
//                 <h1 className="text-4xl font-syke-bold">Adding a Violation</h1>
//                 <div>Find the driver by searching.</div>
//               </div>

//               <div className="w-[32rem] mt-[1rem]">
//                 <form className="space-y-5">
//                   <div className="flex space-x-4">
//                     <div className="flex-1">
//                       <h1 className="text-white font-syke-light text-xl">
//                         Last Name
//                       </h1>
//                       <input
//                         type="text"
//                         className="bg-secondgrey border-b	 font-syke-regular text-[1.2rem] w-full mt-1 px-4 py-2 border h-10 border-none focus:outline-none focus:shadow-inner focus:ring-1 focus:ring-textgreen text-white placeholder-white placeholder-opacity-25 rounded-sm"
//                         name="last_name"
//                         placeholder="Enter last name"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="flex space-x-4">
//                     <div className="flex-1">
//                       <h1 className="text-white font-syke-light text-xl">
//                         First Name
//                       </h1>
//                       <input
//                         type="text"
//                         className="bg-secondgrey border-b	font-syke-regular text-[1.2rem] w-full mt-1 px-4 py-2 border h-10 border-none focus:outline-none focus:shadow-inner focus:ring-1 focus:ring-textgreen text-white placeholder-white placeholder-opacity-25 rounded-sm"
//                         name="first_name"
//                         placeholder="Enter first name"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="flex space-x-4">
//                     <div className="flex-1">
//                       <h1 className="text-white font-syke-light text-xl">
//                         License Number
//                       </h1>
//                       <input
//                         type="text"
//                         className="bg-secondgrey font-syke-regular text-[1.2rem] w-full mt-1 px-4 py-2 border h-10 border-none focus:outline-none focus:shadow-inner focus:ring-1 focus:ring-textgreen text-white placeholder-white placeholder-opacity-25 rounded-sm"
//                         name="license_number"
//                         placeholder="Enter license number"
//                       />
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {currentStep === 2 && (
//           <div className = "h-[auto] w-[auto] px-6 py-5 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
//             <div className="text-left font-syke-light text-white justify-center items-center">
//             <div className="text-textgreen">
//             <h1 className="text-4xl font-syke-bold">Adding a Violation</h1>
//             <div>Driver found.</div>
//             </div>

//             <div className="bg- w-[40rem] h-[auto] mt-4">
//             <form className="space-y-[2rem]">
//               <div className="flex space-x-4">
//                 <div className="flex-[1]">
//                   <h1 className="text-white font-syke-light text-xl">
//                     Last Name
//                   </h1>
//                   <h1 className="text-textgreen font-syke-medium text-3xl">
//                     Alcorin
//                   </h1>
//                 </div>

//                 <div className="flex-1">
//                   <h1 className="text-white font-syke-light text-xl">
//                     First Name
//                   </h1>
//                   <h1 className="text-textgreen font-syke-medium text-3xl">
//                     Shawn Patrick
//                   </h1>
//                 </div>
//                 <div className="flex-2">
//                   <h1 className="text-white font-syke-light text-xl">Sex</h1>
//                   <h1 className="text-textgreen font-syke-medium text-3xl">
//                     Female
//                   </h1>
//                 </div>
//               </div>

//               <div className="flex space-x-4">
//                 <div className="flex-1">
//                   <h1 className="text-white font-syke-light text-xl">
//                     Date of Birth
//                   </h1>
//                   <h1 className="text-textgreen font-syke-medium text-3xl">
//                     02/29/2004
//                   </h1>
//                 </div>
//                 <div className="flex-1">
//                   <h1 className="text-white font-syke-light text-xl">
//                     Driver Type
//                   </h1>
//                   <h1 className="text-textgreen font-syke-medium text-3xl">
//                     Student
//                   </h1>
//                 </div>
//               </div>

//               <div className="flex space-x-4">
//                 <div className="flex-1">
//                   <h1 className="text-white font-syke-light text-xl">
//                     License Number:
//                   </h1>
//                   <h1 className="text-textgreen font-syke-medium text-3xl">
//                     NO3-12-123456
//                   </h1>
//                 </div>
//                 <div className="flex-1">
//                   <h1 className="text-white font-syke-light text-xl">
//                     License Expiration Date
//                   </h1>
//                   <h1 className="text-textgreen font-syke-medium text-3xl">
//                     03/10/2026
//                   </h1>
//                 </div>
//               </div>
//             </form>
//             </div>
//           </div>
//       </div>
//       )}

//       {currentStep === 1 && (
//         <div className="text-center flex justify-center gap-5 p-5">
//           <div>
//             <button
//               type="button"
//               className="w-32 bg-buttongreen font-syke-medium text-white py-2 hover:bg-[#33471a] font-syke-regular transition-colors rounded-sm"
//               onClick={handleCancelButton}
//             >
//               Cancel
//             </button>
//           </div>

//           <div>
//             <button
//               type="button"
//               className="w-32 bg-buttongreen font-syke-medium text-white py-2 hover:bg-[#33471a] font-syke-regular transition-colors rounded-sm"
//               onClick={handleNextClick}
//             >
//               Search
//             </button>
//           </div>
//         </div>
//       )}

//       {currentStep === 2 && (
//         <div className="flex justify-center gap-5 p-5">
//           <div>
//             <button
//               type="button"
//               className="w-32 bg-buttongreen font-syke-medium text-white py-2 hover:bg-[#33471a] font-syke-regular transition-colors rounded-sm"
//               onClick={handleBackClick}
//             >
//               Back
//             </button>
//           </div>

//           <div>
//             <button
//               type="button"
//               className="w-32 bg-buttongreen font-syke-medium text-white py-2 hover:bg-[#33471a] font-syke-regular transition-colors rounded-sm"
//               onClick={handleNextClick}
//             >
//               Add Violation
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddViolation;
