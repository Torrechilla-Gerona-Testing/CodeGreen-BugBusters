import React from "react";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import LoginPage from "../../src/pages/LoginPage";
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter} from "react-router-dom";
import useLogin from "../../src/hooks/useLogin";
import RegisterDriver from "../../src/pages/RegisterDriver"
import useUser from "../../src/hooks/useUser";
import Homepage from "../../src/pages/HomePage"
import useAddRegistration from "../../src/hooks/registration-hooks/useAddRegistration";

vi.mock("../../src/hooks/useLogin")
describe("registered user login, register as a driver", () => {

  beforeEach(() => {
    vi.clearAllMocks();
    (useLogin as Mock).mockReturnValue({
      loading: false,
      submitLogin: vi.fn(),
    })
  })
  it("should render the sign up button'", async () => {
    render(<LoginPage />, { wrapper: BrowserRouter });

    const signUpButtonElement = await screen.findByTestId("signup-button");

    expect(signUpButtonElement).toBeDefined();
    expect(signUpButtonElement.nodeName).toBe("BUTTON");
    expect(signUpButtonElement.innerHTML).toBe("Sign Up");
  });

  it("should verify the input of email and password", async () => {
    render(<LoginPage />, { wrapper: BrowserRouter });

    const emailInput = await screen.findByPlaceholderText(
      "Email address"
    );
    const passwordInput = await screen.findByPlaceholderText(
      "Enter your password"
    );

    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
  });

  it("should verify if the email and password input fields can accept and update their values", async () => {
    render(<LoginPage />, { wrapper: BrowserRouter });

    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveProperty("value", "test@example.com");
    expect(passwordInput).toHaveProperty("value", "password123");
  });

  it("should validate if the input of email and password have reached its maxLength", async () => {
    render(<LoginPage />, { wrapper: BrowserRouter });

    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    const maxLengthEmail = 50;
    const maxLengthPassword = 20;

    fireEvent.change(emailInput, { target: { value: "a".repeat(60) } });
    fireEvent.change(passwordInput, { target: { value: "b".repeat(30) } });

    expect((emailInput as HTMLInputElement).value.length).toBeLessThanOrEqual(maxLengthEmail);
    expect((passwordInput as HTMLInputElement).value.length).toBeLessThanOrEqual(maxLengthPassword);
  });

  it("should validate the email format", async () => {
    render(<LoginPage />, { wrapper: BrowserRouter });

    const emailInput = screen.getByPlaceholderText("Email address");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    expect(emailRegex.test((emailInput as HTMLInputElement).value)).toBe(false);

    fireEvent.change(emailInput, { target: { value: "valid@example.com" } });
    expect(emailRegex.test((emailInput as HTMLInputElement).value)).toBe(true);
  });
});

vi.mock("../../src/hooks/useUser");
describe("Route to Homepage as unregistered driver", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mocking the user as not registered and not a driver
    (useUser as Mock).mockReturnValue({
      loading: false,
      data: {
        user: {
          first_name: "John",
        },
        hasRegistered: false,
        isDriver: false,
      },
    });
  });

  it("should show the user homepage where the register button is visible if not registered as a driver", async () => {
    render(<Homepage />, { wrapper: BrowserRouter });

    const registerButtonElement = await screen.findByTestId("register_button");

    expect(registerButtonElement).toBeDefined();
    expect(registerButtonElement.nodeName).toBe("BUTTON");
    expect(registerButtonElement.innerHTML).toBe("Register Now!");
  });
});

vi.mock("../../src/hooks/registration-hooks/useAddRegistration");
describe("User should be able to register", () => {
  const mockPostRegistration = vi.fn();
  const mockLoading = false;

  beforeEach(() => {
    vi.clearAllMocks();
    (useAddRegistration as Mock).mockReturnValue({
      postRegistration: mockPostRegistration,
      loading: mockLoading,
      error: null,
    });
  });

  it("should render registration form", () => {
    render(<RegisterDriver />, { wrapper: BrowserRouter });
    expect(screen.getByTestId("last_name_register")).toBeDefined();
    expect(screen.getByTestId("first_name_register")).toBeDefined();
    expect(screen.getByTestId("middle_name_register")).toBeDefined();
    expect(screen.getByPlaceholderText("Enter license number")).toBeDefined();
    expect(screen.getByPlaceholderText("Enter school email")).toBeDefined();

    expect(screen.getByTitle("birthdate_register")).toBeDefined();  
    expect(screen.getByTitle("sex")).toBeDefined();  
    expect(screen.getByTitle("driver_type")).toBeDefined();
  });

  it("should disable confirm button if checkbox is not checked", () => {
    render(<RegisterDriver />, { wrapper: BrowserRouter });

    const confirmButton = screen.getByText("Confirm");
    const checkbox = screen.getByTitle("tickbox");

    expect(confirmButton).toBeDisabled();

    fireEvent.click(checkbox);
    expect(confirmButton).not.toBeDisabled();
  });


  it("should show loading spinner while submitting the form", () => {
    (useAddRegistration as Mock).mockReturnValueOnce({
      postRegistration: mockPostRegistration,
      loading: true,
      error: null,
    });

    render(<RegisterDriver />, { wrapper: BrowserRouter });
    expect(screen.getByText(/Adding Registration.../i)).toBeDefined();
  });
});

