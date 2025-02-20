import AddViolationButton from "../AddViolationButton";
import { BrowserRouter } from "react-router-dom";
import { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/AddViolationButton",
  component: AddViolationButton,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} as Meta<typeof AddViolationButton>;

const Template: StoryFn<typeof AddViolationButton> = (args) => <AddViolationButton {...args} />;

// 1️⃣ Default state - Button visible, modal closed
export const Default = Template.bind({});
Default.args = {
  activeSection: 'violation',
  driver: { id: "4231", license_number: 'ABC123' },
  violationModalActive: false,
  setViolationModalActive: () => {},
};

// 2️⃣ Modal open - Simulate the modal being active
export const ModalOpen = Template.bind({});
ModalOpen.args = {
  activeSection: 'violation',
  driver: { id: "1234", license_number: 'XYZ789' },
  violationModalActive: true,
  setViolationModalActive: () => {},
};

// 3️⃣ Inactive section - Button hidden
export const InactiveSection = Template.bind({});
InactiveSection.args = {
  activeSection: 'driver',
  driver: { id: "5678", license_number: 'DEF456' },
  violationModalActive: false,
  setViolationModalActive: () => {},
};
