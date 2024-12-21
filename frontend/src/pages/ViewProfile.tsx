import { useState } from "react";
import { useParams } from "react-router-dom";
import ViolationList from "../components/AdminViewProfileComponent/ViolationList";
import VehicleList from "../components/AdminViewProfileComponent/VehicleList";
import Profile from "../components/AdminViewProfileComponent/Profile";
import AdminHeader from "../components/AdminHeader";
import Header from "../components/Header";
import useGetDriver from "../hooks/driver-hooks/useGetDriver";
import { AuthContextType } from "../types/user.types";
import useAuth from "../hooks/context-hooks/useAuth";
import Loading from "../components/Loading";
import AddCarButton from "../components/AddCarButton";
import AddViolationButton from "../components/AddViolationButton";

const ViewProfile = () => {
  const { driverId } = useParams<{ driverId: string }>();
  const [activeSection, SetActiveSection] = useState("profile");
  const { loading, driver } = useGetDriver(driverId!);
  const { auth }: AuthContextType = useAuth();
  const [vehicleModalActive, setVehicleModalActive] = useState<boolean>(false);
  const [violationModalActive, setViolationModalActive] =
    useState<boolean>(false);

  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <div className="flex flex-col items-center bg-homepage-bg md:bg-cover bg-no-repeat sm:bg-bottom md:bg-inherit lg:bg-left bg-center w-full h-screen">
      <div>{auth!.isAdmin ? <AdminHeader /> : <Header />}</div>

      <div className="flex flex-col w-full justify-center items-center">
        {!driver.license_number ? (
          <div className="flex flex-col justify-center items-center p-20">
            <h1 className="lg:text-4xl text-center md:text-3xl text-2xl text-textgreen font-syke-bold md:w-full w-auto">
              Driver Details Not Available.
            </h1>
            <h1 className="lg:text-2xl text-center md:text-xl text-lg text-white font-syke-bold md:w-full w-auto">
              Register to get your driver details.
            </h1>
          </div>
        ) : (
          <div className="flex flex-col sm:w-9/12 w-11/12 md:px-0 px-15">
            <div className="flex md:space-x-10 space-y-5 md:flex-row flex-col">
              <aside className="flex flex-col justify-center items-center">
                <h1 className="lg:text-4xl text-center md:text-3xl text-2xl text-textgreen font-syke-bold md:mb-16 mb-5 md:w-full w-auto">
                  My Gateway Account
                </h1>
                <div className="md:space-y-[2rem] flex md:flex-col h-auto justify-center items-center md:space-x-0 space-x-5">
                  <button
                    onClick={() => SetActiveSection("profile")}
                    className={`block cursor-pointer transition-colors md:text-2xl sm:text-xl text-lg font-syke-medium ${
                      activeSection === "profile"
                        ? "text-textgreen"
                        : "text-white hover:text-textgreen"
                    }`}>
                    Profile
                  </button>

                  <button
                    onClick={() => SetActiveSection("vehicle")}
                    className={`block cursor-pointer transition-colors md:text-2xl sm:text-xl text-lg font-syke-medium ${
                      activeSection === "vehicle"
                        ? "text-textgreen"
                        : "text-white hover:text-textgreen"
                    }`}
                    data-testid="vehicle-button">
                    Vehicles
                  </button>

                  <button
                    onClick={() => SetActiveSection("violation")}
                    className={`block cursor-pointer transition-colors md:text-2xl sm:text-xl text-lg font-syke-medium ${
                      activeSection === "violation"
                        ? "text-textgreen"
                        : "text-white hover:text-textgreen"
                    }`}>
                    Violations
                  </button>
                </div>
              </aside>
              {activeSection === "profile" && <Profile driver={driver} />}
              {activeSection === "vehicle" && <VehicleList driver={driver} />}
              {activeSection === "violation" && (
                <ViolationList violations={driver.violations!} />
              )}
            </div>
            {auth?.isAdmin && (
              <>
                <AddCarButton
                  activeSection={activeSection}
                  driver={driver}
                  vehicleModalActive={vehicleModalActive}
                  setVehicleModalActive={setVehicleModalActive}
                />
                <AddViolationButton
                  activeSection={activeSection}
                  driver={driver}
                  violationModalActive={violationModalActive}
                  setViolationModalActive={setViolationModalActive}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProfile;
