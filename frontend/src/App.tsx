import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "react-activity/dist/Spinner.css";
import "react-toastify/dist/ReactToastify.css";

import LoginPage from "./pages/LoginPage.tsx";

import HomePage from "./pages/HomePage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import UnauthorizedPage from "./pages/UnauthorizedPage.tsx";
import AddViolationPage from "./pages/AddViolationPage.tsx";

import AdminLandingPage from "./pages/AdminHomePage.tsx";
import EncodePage from "./pages/EncodePage.tsx";
import ViolatorList from "./pages/ViolatorList.tsx";
import DriversList from "./pages/DriverList.tsx";
import AddDriver from "./pages/AddDriver.tsx";
import RegistrationList from "./pages/RegistrationList.tsx";
import RegisterDriver from "./pages/RegisterDriver.tsx";
import SendNotif from "./pages/SendNotif.tsx";

import ViewProfile from "./pages/ViewProfile.tsx";
import Protocols from "./components/Policies/protocols.tsx";
import Rules from "./components/Policies/rules.tsx";
import ChangePassword from "./pages/ChangePassword.tsx";

import RequireAuth from "./components/RequireAuth.tsx";
import PersistLogin from "./components/PersistLogin.tsx";

import Loading from "./components/Loading.tsx";
import { LoadingContextType } from "./types/loading.types.ts";
import useLoading from "./hooks/context-hooks/useLoading.ts";

const Main = () => {
  const { appLoading }: LoadingContextType = useLoading();

  return appLoading ? (
    <div className="flex justify-center items-center h-screen bg-hoverbutton">
      <Loading loading={appLoading} />
    </div>
  ) : (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/signup"
          element={<SignUpPage />}
        />

        <Route
          path="/unauthorized"
          element={<UnauthorizedPage />}
        />

        <Route element={<PersistLogin />}>
          {/* FOR ALL LOGGED IN */}
          <Route
            path="/view-profile/:driverId"
            element={<ViewProfile />}
          />
          <Route
            path="/changepassword"
            element={<ChangePassword />}
          />

          {/* USER ROUTES */}
          <Route element={<RequireAuth forAdmin={false} />}>
            <Route
              path="/homepage"
              element={<HomePage />}
            />
            <Route
              path="/about"
              element={<AboutPage />}
            />
            <Route
              path="/register-driver"
              element={<RegisterDriver />}
            />
            <Route
              path="/protocols"
              element={<Protocols />}
            />
            <Route
              path="/rules"
              element={<Rules />}
            />
          </Route>

          {/* ADMIN ROUTES */}
          <Route element={<RequireAuth forAdmin={true} />}>
            <Route
              path="/admin"
              element={<AdminLandingPage />}
            />
            <Route
              path="/driverslist"
              element={<DriversList />}
            />
            <Route
              path="/encode"
              element={<EncodePage />}
            />
            <Route
              path="/add-driver"
              element={<AddDriver />}
            />
            <Route
              path="/add-violation"
              element={<AddViolationPage />}
            />
            <Route
              path="/violatorslist"
              element={<ViolatorList />}
            />
            <Route
              path="/registration-list"
              element={<RegistrationList />}
            />
            <Route
              path="/send-notif/:id"
              element={<SendNotif />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
