import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, Mock } from "vitest";
import CarListCard from "../../src/components/AdminViewProfileComponent/CarListCard";
import { useDeleteCar } from "../../src/hooks/car-hooks/useDeleteCar";
import useEditCar from "../../src/hooks/car-hooks/useEditCars";
import '@testing-library/jest-dom';

vi.mock("../../src/hooks/car-hooks/useDeleteCar");
vi.mock("../../src/hooks/car-hooks/useEditCars");

describe("CarListCard Component", () => {
  const mockDeleteCar = vi.fn();
  const mockUpdateCar = vi.fn();
  const mockCar = {
    id: "1",
    license_number: "123456",
    license_plate: "ABC-123",
    brand: "Toyota",
    car_model: "Corolla",
    color: "Blue",
  };

  beforeEach(() => {
    vi.resetAllMocks();
    (useDeleteCar as Mock).mockReturnValue({ deleteCar: mockDeleteCar });
    (useEditCar as Mock).mockReturnValue({ updateCar: mockUpdateCar });
  });

  it("renders car details correctly", () => {
    render(<CarListCard car={mockCar} />);

    expect(screen.getByText(/License Number:/)).toBeInTheDocument();
    expect(screen.getByText(mockCar.license_number)).toBeInTheDocument();
    expect(screen.getByText(mockCar.license_plate)).toBeInTheDocument();
    expect(screen.getByText(mockCar.brand)).toBeInTheDocument();
    expect(screen.getByText(mockCar.car_model)).toBeInTheDocument();
    expect(screen.getByText(mockCar.color)).toBeInTheDocument();
  });

  it("calls deleteCar when delete button is clicked", () => {
    render(<CarListCard car={mockCar} />);

    const menuButton = screen.getByText("⋮");
    fireEvent.click(menuButton);

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(mockDeleteCar).toHaveBeenCalledWith(mockCar.id);
  });

  it("enters edit mode and allows input changes", () => {
    render(<CarListCard car={mockCar} />);

    const menuButton = screen.getByText("⋮");
    fireEvent.click(menuButton);

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    const input = screen.getByDisplayValue(mockCar.license_number) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "654321" } });

    expect(input.value).toBe("654321");
  });

  it("calls updateCar when update button is clicked", () => {
    render(<CarListCard car={mockCar} />);

    const menuButton = screen.getByText("⋮");
    fireEvent.click(menuButton);

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    const updateButton = screen.getByText("Update");
    fireEvent.click(updateButton);

    expect(mockUpdateCar).toHaveBeenCalledWith({
      ...mockCar,
      license_number: "123456"
    });
  });
});
