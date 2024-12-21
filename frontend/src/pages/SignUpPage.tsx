import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserSignUp } from "../types/user.types";
import useSignUp from "../hooks/useSignUp";
import { Spinner } from "react-activity";

const initialFormData = {
  last_name: "",
  first_name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const SignUpPage = () => {
  const navigate = useNavigate();

  const [signUpForm, setSignUpForm] = useState<UserSignUp>(initialFormData);
  const { submitSignUp, loading } = useSignUp();

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const successful = await submitSignUp(signUpForm);
    if (successful) navigate("/login");
  };

  const handleLogInButton = () => {
    navigate("/login");
  };

  return (
    <div className="flex relative justify-center items-center bg-signup-bg bg-cover bg-no-repeat sm:bg-top md:bg-right h-screen overflow-hidden">
      <div className="flex bg-transparent p-6 rounded-lg w-full max-w-3xl mt-10 space-x-5">
        <div className="w-1/2 flex flex-col justify-center items-start font-syke-medium text-textgreen lg:text-4xl md:text-3xl sm:text-2xl text-xl gap-2">
          <h1>Stay compliant.</h1>
          <h1>Sign up to track and manage your vehicle's records.</h1>
        </div>

        <div className="w-1/2">
          <h2 className="lg:text-3xl md:text-2xl sm:text-xl text-lg text-textgreen font-syke-regular-">
            Create new account
          </h2>
          <h1 className="lg:text-sm md:text-xs text-xxs mb-1 text-white">
            Already have an account?{" "}
            <button
              className="text-buttongreen font-syke-medium"
              type="button"
              onClick={handleLogInButton}>
              Log In
            </button>
          </h1>

          <form
            className="space-y-2"
            onSubmit={handleSubmit}>
            <div className="flex space-x-2.5">
              <div className="flex-1">
                <input
                  type="text"
                  className="bg-secondgrey font-syke-regular w-full mt-1 px-4 py-2 border border-none focus:outline-none focus:shadow-inner focus:ring-1 focus:ring-textgreen text-white placeholder-white rounded-sm lg:text-sm md:text-xs text-xxs"
                  placeholder="Last Name"
                  name="last_name"
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  className="bg-secondgrey font-syke-regular w-full mt-1 px-4 py-2 border border-none focus:outline-none focus:shadow-inner focus:ring-1 focus:ring-textgreen text-white placeholder-white rounded-sm lg:text-sm md:text-xs text-xxs"
                  placeholder="First Name"
                  name="first_name"
                  onChange={handleFormChange}
                  required
                />
              </div>
            </div>

            <div>
              <input
                type="text"
                className="bg-secondgrey font-syke-regular w-full mt-1 px-4 py-2 border border-none focus:outline-none focus:shadow-inner focus:ring-1 focus:ring-textgreen text-white placeholder-white rounded-sm lg:text-sm md:text-xs text-xxs"
                placeholder="Email"
                pattern="[\-a-zA-Z0-9~!$%^&amp;*_=+\}\{'?]+(\.[\-a-zA-Z0-9~!$%^&amp;*_=+\}\{'?]+)*@[a-zA-Z0-9_][\-a-zA-Z0-9_]*(\.[\-a-zA-Z0-9_]+)*\.[cC][oO][mM](:[0-9]{1,5})?"
                name="email"
                onChange={handleFormChange}
                required
              />
            </div>

            <div>
              <input
                type="password"
                className="bg-secondgrey font-syke-regular w-full mt-1 px-4 py-2 border border-none focus:outline-none focus:shadow-inner focus:ring-1 focus:ring-textgreen text-white placeholder-white rounded-sm lg:text-sm md:text-xs text-xxs"
                placeholder="Password"
                name="password"
                onChange={handleFormChange}
                required
              />
            </div>

            <div>
              <input
                type="password"
                className="bg-secondgrey font-syke-regular w-full mt-1 px-4 py-2 mb-3 border border-none focus:outline-none focus:shadow-inner focus:ring-1 focus:ring-textgreen text-white placeholder-white rounded-sm lg:text-sm md:text-xs text-xxs"
                placeholder="Confirm Password"
                name="confirm_password"
                onChange={handleFormChange}
                required
              />
            </div>

            <button
              type="submit"
              className="flex justify-center items-center justify-self-end w-auto bg-buttongreen font-syke-regular text-white py-2 px-5 hover:bg-[#33471a] transition-colors rounded-sm lg:text-sm md:text-xs text-xxs">
              {loading ? (
                <Spinner
                  size={15}
                  color="#fff"
                  animating={loading}
                />
              ) : (
                "Create account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
