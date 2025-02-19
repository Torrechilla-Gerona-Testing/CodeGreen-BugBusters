import { StoryFn, Meta } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import AddCarButton from "../AddCarButton";


export default {
  title: "AddCarButton",
  component: AddCarButton,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} as Meta<typeof AddCarButton>;

const Template: StoryFn<typeof AddCarButton> = (args) => <AddCarButton {...args} />;

// 1st story
export const Default = Template.bind({});
Default.args = {
  activeSection: "vehicle",
  driver: {
    id: "1653",
    license_number: "FAB314",
    first_name: "John",
    last_name: "Gerona",
    cars: [],
    violations: [],
  },
  vehicleModalActive: false,
  setVehicleModalActive: () => {},
};

// 2nd story
export const VehicleModalActive = Template.bind({});
VehicleModalActive.args = {
  activeSection: "vehicle",
  driver: {
    id: "1141",
    license_number: "BOP678",
    first_name: "do",
    last_name: "Doe",
    cars: [],
    violations: [],
  },
  vehicleModalActive: true,
  setVehicleModalActive: () => {},
};

//3rd story
export const NoVehicle = Template.bind({});
NoVehicle.args = {
  activeSection: "",
  driver: {
    id: "1092",
    license_number: "DID134",
    first_name: "John",
    last_name: "Rofer",
    cars: [],
    violations: [],
  },
  vehicleModalActive: false,
  setVehicleModalActive: () => {},
};