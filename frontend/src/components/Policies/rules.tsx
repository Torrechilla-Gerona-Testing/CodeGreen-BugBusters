import Header from "../Header";

const Rules = () => {
  return (
    <div className="flex flex-col items-center bg-policies-bg bg-cover bg-no-repeat sm:bg-top md:bg-right lg:bg-left min-h-screen px-4">
      <div className="w-full">
        <Header />
      </div>
      <div className="w-full max-w-4xl h-auto max-h-[70vh] bg-gray-400 overflow-y-auto rounded-md mt-6 p-4 scrollbar bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
      <div className="text-white text-left py-2 px-6 rounded-xl bg-clip-padding">
        <h1 className="text-textgreen font-syke-medium text-xl sm:text-2xl mt-4">
          Parking Rules and Regulations
        </h1>

        <div className="whitespace-normal font-syke indent-8 space-y-5">
            <h1>
          <span className="text-textgreen font-syke mr-1">1. </span>
          All vehicles/motorcycles are required to park properly at designated
          parking areas.
            </h1>

        <h1 className="whitespace-normal font-syke">
          <span className="text-textgreen font-syke mr-1">2. </span>
          Avoid parking on roadsides and gutters on campus.
        </h1>

        <h1 className="whitespace-normal font-syke">
          <span className="text-textgreen font-syke mr-1">3. </span>
          Any damage caused by a vehicle/motorcycle to any CPU property shall be
          properly assessed and the owner will be charged the amount equivalent
          to its current cost.
        </h1>

        <h1 className="whitespace-normal font-syke">
          <span className="text-textgreen font-sykemr-1">4. </span>
          Vehicles/motorcycles with car passes are given priority in parking
          areas while non-car pass vehicles are limited to only 3 hours on
          parking inside the campus unless it is used for official purposes and
          sanctioned by the University Administration. All vehicles/motorcycles
          owners must follow 10:00 PM to 5:00 AM curfew hours inside the campus.
        </h1>

        <h1 className="whitespace-normal font-syke">
          <span className="text-textgreen font-syke mr-1">5. </span>A
          vehicle/motorcycle who wants to park overnight inside the campus must
          ask permission from CPU Administration.
        </h1>

        <h1 className="whitespace-normal font-syke">
          <span className="text-textgreen font-syke mr-1">6. </span>
          The CPU Administration is not liable for any loss or damage that may
          happen to any vehicle/motorcycle while parked inside the campus.
        </h1>

        <h1 className="whitespace-normal font-syke">
          <span className="text-textgreen font-syke mr-1">7. </span>
          The CPU Administration has the right to revoke parking privileges to
          any vehicle/motorcycle as necessary to protect the University in
          <br />
          accordance with the University standing policies for security and
          safety reasons.
        </h1>

        <h1 className="whitespace-normal font-syke">
          <span className="text-textgreen font-syke mr-1">8. </span>
          Parking inside the CPU Campus is only a privilege given by the
          Administration and not a right given to any individual or group
          regardless of his position or affiliation.
        </h1>
      </div>
      </div>

      </div>
    </div>
  );
};

export default Rules;
