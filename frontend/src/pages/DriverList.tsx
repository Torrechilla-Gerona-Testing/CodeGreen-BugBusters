import { useState, useEffect } from "react";

import AdminHeader from "../components/AdminHeader";
import DriverListCard from "../components/DriversListCard";
import useDrivers from "../hooks/driver-hooks/useDrivers";
import Loading from "../components/Loading";
import { DriverWithVandC } from "../types/datatypes.ts";
import SearchAndSort from "../components/SearchAndSort.tsx";
import PreviewProfile from "../components/PreviewProfile.tsx";

const DriversList = () => {
  const { data: Drivers, loading } = useDrivers();
  const [selectedDriver, setSelectedDriver] = useState<DriverWithVandC>();
  const [sortedDrivers, setSortedDrivers] = useState<DriverWithVandC[]>([]);
  const [isSorted, setIsSorted] = useState(false); // Tracks toggle state
  const [originalDrivers, setOriginalDrivers] = useState<DriverWithVandC[]>([]); // Stores the original list

  // Handle driver click to show more details
  const handleDriverClick = (driver: DriverWithVandC) => {
    setSelectedDriver(driver);
  };

  // Toggle sorting between alphabetical and default
  const handleSortToggle = () => {
    if (!Drivers) return;

    if (isSorted) {
      setSortedDrivers(originalDrivers); // Reset to original order
    } else {
      const sorted = [...Drivers].sort((a, b) => {
        const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
        const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
        return nameA.localeCompare(nameB);
      });
      setSortedDrivers(sorted);
    }
    setIsSorted(!isSorted); // Toggle the sort state
  };

  // Initialize drivers and store the original list
  useEffect(() => {
    if (Drivers) {
      setOriginalDrivers(Drivers);
      setSortedDrivers(Drivers); // Default display
    }
  }, [Drivers]);

  if (loading) return <Loading loading={loading} />;

  return (
    <div className="flex flex-col items-center bg-adminlanding-bg min-h-screen">
      <div>
        <AdminHeader />
      </div>

      <div className="flex justify-center items-center w-10/12 h-auto bg-gray-400 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 md:p-6 p-3">
        <div className="flex md:flex-row flex-col-reverse w-full justify-center items-center">
          <div className="w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
            {selectedDriver ? (
              <PreviewProfile selectedEntry={selectedDriver} />
            ) : (
              <div className="text-white text-center font-syke p-4">
                Select a driver to see details.
              </div>
            )}
          </div>

          <div className="flex w-full h-full md:pl-6 pb-6 rounded-md">
            <div className="text-left w-full rounded-xl bg-clip-padding">
              <div className="text-left font-syke-light text-white">
                <div className="flex lg:flex-row flex-col text-textgreen pb-3">
                  <div>
                    <h1 className="lg:text-4xl text-3xl font-syke-bold">
                      Drivers List
                    </h1>
                    <p className="lg:text-xl md:text-lg text-md font-syke-bold">
                      List of Drivers within the university.
                    </p>
                  </div>
                  <SearchAndSort
                    entries={Drivers!}
                    setFilteredEntries={setSortedDrivers}
                    handleSortToggle={handleSortToggle}
                    isSorted={isSorted}
                  />
                </div>
              </div>
              <div
                className="w-full h-80 overflow-y-auto"
                id="listcontainer">
                <div className="flex flex-col overflow-y-auto h-80 scrollbar-thin scrollbar text-white">
                  {sortedDrivers && sortedDrivers.length > 0 ? (
                    sortedDrivers.map((driver) => (
                      <div
                        key={driver.id}
                        className="cursor-pointer hover:bg-secondgrey"
                        onClick={() => handleDriverClick(driver)} // Show more details on click
                      >
                        <DriverListCard
                          key={driver.id}
                          id={driver.id!}
                          first_name={driver.first_name!}
                          last_name={driver.last_name!}
                          driver_type={driver.driver_type!}
                          license_number={driver.license_number!}
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-white text-center">No drivers found.</p>
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

export default DriversList;
