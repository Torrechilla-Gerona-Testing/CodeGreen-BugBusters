import { Registration } from "../types/datatypes";

const RegistrationListCard = ({
  driver_type,
  first_name,
  last_name,
}: Registration) => {
  return (
    <div
      className="border-b-2 flex-col flex border-t-transparent w-full border-b-inputfield"
      id="row"
    >
      <div className="flex p-2 items-right w-full space-x-5 overflow-y-auto">
        <div className="flex-2 w-1/2">
          <h1 className="text-white font-syke-light md:text-md xs:text-sm text-xs">
            Name
          </h1>
          <h1 className="text-textgreen font-syke-medium lg:text-xl md:text-lg xs:text-lg text-md">
            {first_name} {last_name}
          </h1>
        </div>
        <div className="flex-2 text-left w-1/2">
          <h1 className="text-white font-syke-light md:text-md xs:text-sm text-xs">
            Driver Type
          </h1>
          <h1 className="text-textgreen font-syke-medium lg:text-xl md:text-lg xs:text-lg text-md">
            {driver_type}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default RegistrationListCard;
