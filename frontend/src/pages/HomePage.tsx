import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";
import NotificationsList from "../components/NotificationsList";
import Loading from "../components/Loading";

const HomePage = () => {
  const navigate = useNavigate();
  const { data: data, loading } = useUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-homepage-bg bg-cover bg-no-repeat sm:bg-top md:bg-right lg:bg-left">
        <Spinner size={50} color="#86C232" />
      </div>
    );
  }

  const handleRegisterButton = () => {
    navigate("/register-driver");
  };
  if (loading) {
    return <Loading loading={loading} />;
  }
  return (
    <div className="flex flex-col items-center bg-homepage-bg md:bg-cover bg-no-repeat sm:bg-bottom md:bg-inherit lg:bg-left bg-center w-full h-screen">
      <div>
        <Header />
      </div>

      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 p-5 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-textgreen font-syke-bold">
          Welcome,
        </h1>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white font-syke-bold mt-2 sm:mt-0">
          {data?.user.first_name}
        </h1>
      </div>

      {/* Not Registered Section */}
      {!data?.hasRegistered && !data?.isDriver && (
        <div className="w-full max-w-lg text-center text-white mt-6 font-syke px-6 py-5 space-y-6">
          <h1 className="text-sm sm:text-base lg:text-lg">
            Oops! It looks like you have not registered yet as a driver.
          </h1>
          <button
            type="button"
            className="px-4 py-2 rounded-md w-full max-w-[200px] font-syke-medium text-white bg-buttongreen hover:bg-colorhover transition-all duration-300"
            onClick={handleRegisterButton}
            data-testid="register_button"
          >
            Register Now!
          </button>
        </div>
      )}

      {/* Registration Submitted Section */}
      {data?.hasRegistered && (
        <div className="w-full max-w-xl text-center text-white mt-6 font-syke px-6 py-5 space-y-6">
          <div className="bg-secondgrey bg-opacity-50 p-6 sm:p-8 rounded-lg shadow-lg text-center space-y-6 animate-fadeInZoom">
            <h1 className="text-lg sm:text-2xl font-syke-bold text-textgreen">
              🎉 Registration Submitted!
            </h1>

            <div className="relative text-sm sm:text-base lg:text-lg text-white overflow-hidden h-auto">
              <p className="inline-block ">
                Thank you for registering as a driver. Our team is reviewing
                your details to validate your registration.
              </p>
            </div>

            <p className="text-sm sm:text-base leading-relaxed">
              Please allow <b className="text-buttongreen">3-5</b> working days
              for the validation process to complete. Once verified, you will
              receive a notification.
            </p>

            <div className="mt-4">
              <p className="text-xs sm:text-sm text-gray-300">
                For inquiries or updates, feel free to contact our support team
                at{" "}
                <a
                  href="mailto:support@example.com"
                  className="text-buttongreen underline hover:text-textgreen transition duration-300"
                >
                  jrofer.casio11@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Driver Section */}
      {data?.isDriver && (
        <div className="w-full sm:w-5/6 lg:w-4/6 text-center text-white mt-6 font-syke px-6 py-5 space-y-6">
          <NotificationsList />
        </div>
      )}
    </div>
  );
};

export default HomePage;
