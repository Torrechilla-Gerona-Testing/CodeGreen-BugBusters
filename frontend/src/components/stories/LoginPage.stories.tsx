import { StoryFn, Meta } from "@storybook/react";
import { within, userEvent, waitFor } from "@storybook/testing-library";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";

export default {
  title: "Pages/LoginPage",
  component: LoginPage,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="bg-secondgrey min-h-screen">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'secondgrey', 
      values: [
        { name: 'lightgray', value: '#d3d3d3' },
        { name: 'dark', value: '#333333' },
        { name: 'secondgrey', value: '#f0f0f0' }, 
      ],
    },
  },
} as Meta<typeof LoginPage>;

const Template: StoryFn<typeof LoginPage> = (args: any) => <LoginPage {...args} />;

// Default story
export const Default = Template.bind({});

// Story simulating a successful login
export const SuccessfulLogin = Template.bind({});
SuccessfulLogin.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const emailInput = canvas.getByPlaceholderText("Email address");
  const passwordInput = canvas.getByPlaceholderText("Enter your password");
  const submitButton = canvas.getByTestId("login-button");

 
  await userEvent.type(emailInput, "test@example.com", { delay: 100 });
  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 500))); // Add delay
  await userEvent.type(passwordInput, "password123", { delay: 100 });
  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 500))); // Add delay

  
  await userEvent.click(submitButton);

  
  await new Promise((resolve) => setTimeout(resolve, 1000)); 
};

// Story with password visibility toggled
export const PasswordVisibilityToggled = Template.bind({});
PasswordVisibilityToggled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const passwordInput = canvas.getByPlaceholderText("Enter your password");
  const toggleButton = canvas.getByTestId("toggle-password-visibility");

  await userEvent.type(passwordInput, "password123", { delay: 100 });
  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 500))); // Add delay
  await userEvent.click(toggleButton);
};