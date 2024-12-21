import { Violators } from "../types/datatypes";

const ViolatorsListCard = ({
  first_name,
  last_name,
  driver_type,
  license_number,
  violations,
}: Violators) => {
  return (
    <div
      className="border-b-2 flex-col flex-1 border-t-transparent w-full border-b-inputfield"
      id="row">
      <div className="flex p-2 w-full items-right overflow-y-auto">
        <div className="flex-2 w-2/12">
          <h1 className="text-white font-syke-light lg:text-sm md:text-2xs xs:text-xs text-xxs">
            Violations
          </h1>
          <h1 className="text-textgreen font-syke-medium lg:text-sm md:text-xs xs:text-xs text-2xs">
            {violations ? violations.length : 0}
          </h1>
        </div>
        <div className="flex-2 w-4/12">
          <h1 className="text-white font-syke-light lg:text-sm md:text-2xs xs:text-xs text-xxs">
            Name
          </h1>
          <h1 className="text-textgreen font-syke-medium lg:text-sm md:text-xs xs:text-xs text-2xs">
            {first_name} {last_name}
          </h1>
        </div>
        <div className="flex-2 text-left lg:w-2/12 md:3/12 w-2/12">
          <h1 className="text-white font-syke-light lg:text-sm md:text-2xs xs:text-xs text-xxs">
            Driver Type
          </h1>
          <h1 className="text-textgreen font-syke-medium lg:text-sm md:text-xs xs:text-xs text-2xs">
            {driver_type}
          </h1>
        </div>
        <div className="flex-2 text-left lg:w-4/12 md:w-3/12 w-4/12">
          <h1 className="text-white font-syke-light lg:text-sm md:text-2xs xs:text-xs text-xxs">
            License Number
          </h1>
          <h1 className="text-textgreen font-syke-medium lg:text-sm md:text-xs xs:text-xs text-2xs">
            {license_number}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ViolatorsListCard;
