import AddViolationComponent from "../AddViolationComponent";
import { MemoryRouter } from "react-router-dom";
import { StoryFn, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/AddViolationComponent",
  component: AddViolationComponent,
  argTypes: {
    driverId: { control: 'text' },
    setViolationModalActive: { action: 'setViolationModalActive' },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta<typeof AddViolationComponent>;

const Template: StoryFn<typeof AddViolationComponent> = (args) => (<AddViolationComponent {...args} />);

export const Default = Template.bind({});

export const Lightmode = Template.bind({});
Lightmode.args = {
  driverId: "12345",
  setViolationModalActive: action('setViolationModalActive'),
  customStyles: {
    titleColor: "#333333", 
    labelColor: "#555555", 
    placeholderColor: "#999999", 
  },
};

export const DarkMode = Template.bind({});
DarkMode.args = {
  driverId: '77777',
  setViolationModalActive: action('setViolationModalActive'),
  customStyles: {
    titleColor: "#ffffff",
    labelColor: "#cccccc",
    inputBackgroundColor: "#ffffff",
    inputTextColor: "black",
    placeholderColor: "aaaaaa", 
  },
};