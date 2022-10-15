import {fireEvent, render, screen} from "@testing-library/react";
import {Payment} from "./Payment";

describe('Payment', () => {
  it('renders payment title', () => {
    render(<Payment amount={0.0} />);
    expect(screen.getByText('Payment')).toBeInTheDocument();
  })

  it('shows me the option of donate', () => {
    render(<Payment amount={19.9} />);
    expect(screen.getByText('I would like to donate $0.1 to charity.')).toBeInTheDocument();
  })

  it('shows me the total amount', () => {
    render(<Payment amount={19.9} />);
    expect(screen.getByText('$19.9')).toBeInTheDocument();
  })

  it('shows thanks when user selected donation', () => {
    render(<Payment amount={19.9} />);

    const select = screen.getByText('I would like to donate $0.1 to charity.');
    expect(select).toBeInTheDocument();

    fireEvent.click(select);
    expect(screen.getByText('Thanks for your donation.')).toBeInTheDocument();
  })

  it('shows correct amount when user selected to donate', () => {
    render(<Payment amount={19.9} />);

    const select = screen.getByText('I would like to donate $0.1 to charity.');
    expect(select).toBeInTheDocument();

    fireEvent.click(select);
    expect(screen.getByText('$20')).toBeInTheDocument();
  })
})