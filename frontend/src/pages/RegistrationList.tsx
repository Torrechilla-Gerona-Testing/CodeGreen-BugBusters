import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useGetRegistration from "../hooks/registration-hooks/useGetRegistration";
import useDeleteRegistration from "../hooks/registration-hooks/useDeleteRegistration";
import AdminHeader from "../components/AdminHeader";
import Loading from "../components/Loading";
import RegistrationListCard from "../components/RegistrationListCard";
import { Registration } from "../types/datatypes";
import { useApproveRegistration } from "../hooks/registration-hooks/useApproveRegistration";
import SearchAndSort from "../components/SearchAndSort";

const RegistrationList = () => {
  const { registration: registrations, loading } = useGetRegistration();
  const { deleteRegistration } = useDeleteRegistration();
  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration>();
  const { approveRegistration } = useApproveRegistration();
  const [sortedRegistrations, setSortedRegistrations] = useState<
    Registration[]
  >([]);
  const [originalRegistrations, setOriginalRegistrations] = useState<
    Registration[]
  >([]);
  const [isSorted, setIsSorted] = useState(false); // Tracks toggle state

  const handleRegisterClick = (registration: Registration) => {
    setSelectedRegistration(registration);
  };

  const handleAccept = async () => {
    if (!selectedRegistration?.license_number) {
      toast.error("License number is missing for the selected registration.");
      return;
    }

    await approveRegistration(selectedRegistration.license_number);
  };

  const handleReject = async () => {
    if (selectedRegistration) {
      // Perform the deletion of the registration
      await deleteRegistration(selectedRegistration.license_number);

      setSelectedRegistration(undefined);
    }
  };

  const handleSortToggle = () => {
    if (!registrations) return;

    if (isSorted) {
      setSortedRegistrations(originalRegistrations); // Reset to original order
    } else {
      const sorted = [...registrations].sort((a, b) => {
        const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
        const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
        return nameA.localeCompare(nameB);
      });
      setSortedRegistrations(sorted);
    }
    setIsSorted(!isSorted); // Toggle the sort state
  };

  useEffect(() => {
    if (registrations) {
      setOriginalRegistrations(registrations);
      setSortedRegistrations(registrations);
    }
  }, [registrations]);

  if (loading) return <Loading loading={loading} />;

  return (
    <div className="flex flex-col items-center bg-adminlanding-bg min-h-screen">
      <div>
        <AdminHeader />
      </div>
      <div className="flex justify-center items-center w-10/12 h-auto bg-gray-400 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 md:p-6 p-3">
        <div className="flex md:flex-row flex-col-reverse w-full justify-center items-center">
          <div className="w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
            {selectedRegistration ? (
              <div className="items-center p-6">
                <div className="text-left font-syke-light text-white">
                  <div className="text-textgreen py-2 mb-9">
                    <h1 className="text-4xl font-syke-bold">
                      Registration Details
                    </h1>
                    <div>Approve or Reject Registration.</div>
                  </div>
                </div>
                <form className="space-y-[2rem]">
                  <div className="flex space-x-1">
                    <div className="flex-1">
                      <h1 className="text-white font-syke-light lg:text-lg md:text-xs sm:text-sm xs:text-xs text-2xs">
                        Last Name
                      </h1>
                      <h1 className="text-textgreen font-syke-medium lg:text-xl md:text-xs sm:text-lg xs:text-sm text-xs">
                        {selectedRegistration.last_name || ""}
                      </h1>
                    </div>
                    <div className="flex-1">
                      <h1 className="text-white font-syke-light lg:text-lg md:text-xs sm:text-sm xs:text-xs text-2xs">
                        First Name
                      </h1>
                      <h1 className="text-textgreen font-syke-medium lg:text-xl md:text-xs sm:text-lg xs:text-sm text-xs">
                        {selectedRegistration.first_name || ""}
                      </h1>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <h1 className="text-white font-syke-light lg:text-lg md:text-xs sm:text-sm xs:text-xs text-2xs">
                        Sex
                      </h1>
                      <h1 className="text-textgreen font-syke-medium lg:text-xl md:text-xs sm:text-lg xs:text-sm text-xs">
                        {selectedRegistration.sex || ""}
                      </h1>
                    </div>
                    <div className="flex-1">
                      <h1 className="text-white font-syke-light lg:text-lg md:text-xs sm:text-sm xs:text-xs text-2xs">
                        Date of Birth
                      </h1>
                      <h1 className="text-textgreen font-syke-medium lg:text-xl md:text-xs sm:text-lg xs:text-sm text-xs">
                        {selectedRegistration.date_of_birth || "MM/DD/YY"}
                      </h1>
                    </div>
                    <div className="flex-1">
                      <h1 className="text-white font-syke-light lg:text-lg md:text-xs sm:text-sm xs:text-xs text-2xs">
                        Driver Type
                      </h1>
                      <h1 className="text-textgreen font-syke-medium lg:text-xl md:text-xs sm:text-lg xs:text-sm text-xs">
                        {selectedRegistration.driver_type || ""}
                      </h1>
                    </div>
                  </div>

                  <div className="w-full space-y-2">
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <h1 className="text-white font-syke-light lg:text-lg md:text-xs sm:text-sm xs:text-xs text-2xs">
                          Email
                        </h1>
                        <h1 className="text-textgreen font-syke-medium lg:text-xl md:text-xs sm:text-lg xs:text-sm text-xs">
                          {selectedRegistration.school_email || ""}
                        </h1>
                      </div>
                      <div className="flex-1">
                        <h1 className="text-white font-syke-light lg:text-lg md:text-xs sm:text-sm xs:text-xs text-2xs">
                          License Number
                        </h1>
                        <h1 className="text-textgreen font-syke-medium lg:text-xl md:text-xs sm:text-lg xs:text-sm text-xs">
                          {selectedRegistration.license_number || ""}
                        </h1>
                      </div>
                    </div>

                    <div className="flex w-full flex-row-reverse">
                      <button
                        className="p-2 px-4 bg-hoverbutton hover:bg-red-900 transition-colors rounded-sm text-white font-syke-bold w-2/6 ml-4 lg:text-md md:text-xs sm:text-sm xs:text-xs text-2xs"
                        onClick={handleReject}
                      >
                        Reject
                      </button>
                      <button
                        onClick={handleAccept}
                        className="p-2 px-4 bg-hoverbutton hover:bg-buttongreen transition-colors rounded-sm text-white font-syke-bold w-2/6 lg:text-md md:text-xs sm:text-sm xs:text-xs text-2xs"
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-white text-center font-syke p-4">
                Select a registration to see details.
              </div>
            )}
          </div>
          <div className="flex w-full h-full md:pl-6 pb-6 rounded-md">
            <div className="text-left w-full rounded-xl bg-clip-padding">
              <div className="text-left font-syke-light text-white">
                <div className="flex lg:flex-row flex-col text-textgreen pb-3">
                  <div className="lg:w-1/2 w-full">
                    <h1 className="lg:text-3xl text-2xl font-syke-bold">
                      Registrations List
                    </h1>
                    <p className="lg:text-xl md:text-lg text-md font-syke-bold">
                      List of Users that registered.
                    </p>
                  </div>
                  <SearchAndSort
                    registrations={registrations!}
                    setFilteredRegisters={setSortedRegistrations}
                    handleSortToggle={handleSortToggle}
                    isSorted={isSorted}
                  />
                </div>
              </div>
              <div
                className="w-full h-[20rem] overflow-y-auto"
                id="listcontainer"
              >
                <div className="flex flex-col w-full overflow-y-auto h-80 scrollbar-thin scrollbar text-white">
                  {sortedRegistrations && sortedRegistrations.length > 0 ? (
                    sortedRegistrations.map((registration) => (
                      <div
                        key={registration.user_id}
                        className="cursor-pointer hover:bg-secondgrey"
                        onClick={() => handleRegisterClick(registration)}
                      >
                        <RegistrationListCard
                          key={registration.user_id}
                          user_id={registration.user_id!}
                          license_number={registration.license_number!}
                          school_email={registration.school_email!}
                          first_name={registration.first_name!}
                          last_name={registration.last_name!}
                          sex={registration.sex!}
                          driver_type={registration.driver_type!}
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-white text-center">
                      No registrations found.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationList;
