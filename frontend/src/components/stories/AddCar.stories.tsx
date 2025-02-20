import { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import AddCar from "../AddCar";

export default {
  title: "Components/AddCar",
  component: AddCar,
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
} as Meta<typeof AddCar>;

const Template: StoryFn<typeof AddCar> = (args) => {
  const [, setModalActive] = useState<boolean>(true);
  return <AddCar {...args} setVehicleModalActive={setModalActive} />;
};

// Default State Story
export const Default = Template.bind({});
Default.args = {
  driverId: "58458",
  licenseNumber: "FAP435",
  setVehicleModalActive: () => console.log("Modal closed"),
};

// Filled Form Story
export const FilledForm = Template.bind({});
FilledForm.args = {
  driverId: "58458",
  licenseNumber: "FAP435",
  setVehicleModalActive: () => console.log("Modal closed"),
};

FilledForm.decorators = [
  (Story, context) => {
    const [formData] = useState({
      driver_id: "58458",
      brand: "Toyota",
      car_model: "Corolla",
      color: "Red",
      license_plate: "FAP435",
    });

    return <Story {...context} args={{ ...context.args, formData }} />;
  },
];

// Confirmation Step Story
export const ConfirmationStep = Template.bind({});
ConfirmationStep.args = {
  driverId: "58458",
  licenseNumber: "FAP435",
  setVehicleModalActive: () => console.log("Modal closed"),
};

ConfirmationStep.decorators = [
  (Story, context) => {
    const [formData] = useState({
      driver_id: "58458",
      brand: "Toyota",
      car_model: "Corolla",
      color: "Purple",
      license_plate: "FAP435",
    });

    // Simulate being on the second step
    const [currentStep] = useState(2);

    return <Story {...context} args={{ ...context.args, formData, currentStep }} />;
  },
];