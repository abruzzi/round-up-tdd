import { fireEvent, render, screen } from "@testing-library/react";
import { Payment } from "./Payment";

describe("Payment", () => {
  it("renders payment section", () => {
    render(<Payment />);

    expect(screen.getByText("Payment")).toBeInTheDocument();
  });

  it("renders current amount on button", () => {
    render(<Payment amount={20} />);
    expect(screen.getByText("$20")).toBeInTheDocument();
  });

  it("shows an option for user to round up", () => {
    render(<Payment amount={19.9} />);
    expect(
      screen.getByText("I'd to donate $0.1 to charity")
    ).toBeInTheDocument();
  });

  it('shows an option for user to round up - 2', () => {
    render(<Payment amount={19.8} />);
    expect(
      screen.getByText("I'd to donate $0.2 to charity")
    ).toBeInTheDocument();
  })

  it("allows user to donate", () => {
    render(<Payment amount={19.9} />);
    const checkbox = screen.getByText("I'd to donate $0.1 to charity");
    fireEvent.click(checkbox);
    expect(screen.getByText("$20")).toBeInTheDocument();
  });

  it("allows user to opt-out", () => {
    render(<Payment amount={19.9} />);
    const checkbox = screen.getByText("I'd to donate $0.1 to charity");

    fireEvent.click(checkbox);
    expect(screen.getByText("$20")).toBeInTheDocument();

    fireEvent.click(checkbox);
    expect(screen.getByText("$19.9")).toBeInTheDocument();
  });

  it('shows thanks when user selected to donate', () => {
    render(<Payment amount={19.9} />);
    const checkbox = screen.getByText("I'd to donate $0.1 to charity");

    fireEvent.click(checkbox);
    expect(screen.getByText("Thanks for your donation!")).toBeInTheDocument();
  })
});
