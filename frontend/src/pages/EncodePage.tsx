import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

const EncodePage = () => {
  const navigate = useNavigate();

  const handleAddDriverButton = () => {
    navigate("/add-driver");
  };

  const handleAddViolationButton = () => {
    navigate("/add-violation");
  };

  return (
    <div className="flex flex-col items-center bg-adminlanding-bg bg-cover bg-no-repeat h-screen sm:bg-top md:bg-right lg:bg-left">
      <div className="w-full">
        <AdminHeader />
      </div>
      <h1 className="text-white font-syke-light text-2xl mt-5 text-center sm:text-3xl md:text-4xl lg:text-5xl">
        What would you like to do?
      </h1>
      <div className="flex flex-col sm:flex-row justify-center gap-5 p-3 mt-10">
        <div
          className="flex items-center justify-center  w-72 h-40 rounded-lg cursor-pointer hover:border-textgreen hover:border-4 transition-all bg-secondgrey text-buttongreen hover:text-textgreen"
          onClick={handleAddDriverButton}>
          <span className="font-syke-medium text-white text-3xl">

            Add Driver
          </span>
        </div>

        <div

          className="flex items-center justify-center w-full sm:w-64 lg:w-72 h-36 sm:h-40 rounded-lg border-2 border-white cursor-pointer hover:border-textgreen hover:border-4 transition-all bg-secondgrey text-buttongreen hover:text-textgreen"
          onClick={handleAddViolationButton}
        >
          <span className="font-syke-medium p-5 text-lg sm:text-xl lg:text-2xl text-white">
            Add Violation
          </span>
        </div>
      </div>
    </div>
  );
};

export default EncodePage;
