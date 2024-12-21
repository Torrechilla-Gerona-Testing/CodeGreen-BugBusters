import CarListCard from "./CarListCard";
import { DriverWithVandC } from "../../types/datatypes";

const VehicleList = ({ driver }: { driver: DriverWithVandC }) => {
  return (
    <div
      className="flex flex-col items-center justify-center w-full"
      data-testid="vehichlelist"
    >
      <div className="w-full h-[25rem] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 overflow-y-auto scrollbar">
        {
          driver.cars?.map((car) => (
            <CarListCard key={car.id || "placeholder-license"} car={car} />
          ))}
      </div>
    </div>
  );
};

export default VehicleList;
