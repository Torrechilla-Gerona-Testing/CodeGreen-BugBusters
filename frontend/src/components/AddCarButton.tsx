import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import AddCar from "./AddCar";
import { DriverWithVandC } from "../types/datatypes";

const AddCarButton = ({
  activeSection,
  driver,
  vehicleModalActive,
  setVehicleModalActive,
}: {
  activeSection: string;
  driver: DriverWithVandC;
  vehicleModalActive: boolean;
  setVehicleModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleAddVehiclePressed = () => {
    setVehicleModalActive(true);
  };
  return (
    <>
      {activeSection === "vehicle" && (
        <button
          onClick={handleAddVehiclePressed}
          className="flex bg-buttongreen text-white py-3 px-5 hover:bg-[#33471a] font-syke-regular transition-colors rounded-md justify-center items-center font-bold lg:text-md md:text-sm text-xs mt-3 w-auto self-end">
          Add Vehicle
        </button>
      )}
      {vehicleModalActive && (
        <AddCar
          driverId={driver.id!}
          licenseNumber={driver.license_number!}
          setVehicleModalActive={setVehicleModalActive}
        />
      )}
    </>
  );
};


AddCarButton.propTypes = {
  activeSection: PropTypes.string.isRequired, 
  driver: PropTypes.shape({
    id: PropTypes.string.isRequired, 
    license_number: PropTypes.string.isRequired, 
    first_name: PropTypes.string.isRequired, 
    last_name: PropTypes.string.isRequired, 
    cars: PropTypes.array, 
    violations: PropTypes.array,
  }).isRequired, 
  vehicleModalActive: PropTypes.bool.isRequired, 
  setVehicleModalActive: PropTypes.func.isRequired, 
};

export default AddCarButton;