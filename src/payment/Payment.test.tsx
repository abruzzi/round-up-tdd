import {fireEvent, render, screen} from "@testing-library/react";
import {Payment} from "./Payment";
import {PaymentStrategyAU, PaymentStrategyDK, PaymentStrategyJP} from "./useRoundUp";

describe('Payment', () => {
  it('renders payment title', () => {
    render(<Payment amount={0.0} strategy={new PaymentStrategyAU()} />);
    expect(screen.getByText('Payment')).toBeInTheDocument();
  })

  it('shows me the option of donate', () => {
    render(<Payment amount={19.9} strategy={new PaymentStrategyAU()}/>);
    expect(screen.getByText('I would like to donate $0.1 to charity.')).toBeInTheDocument();
  })

  it('shows me the total amount', () => {
    render(<Payment amount={19.9} strategy={new PaymentStrategyAU()}/>);
    expect(screen.getByText('$19.9')).toBeInTheDocument();
  })

  it('shows thanks when user selected donation', () => {
    render(<Payment amount={19.9} strategy={new PaymentStrategyAU()}/>);

    const select = screen.getByText('I would like to donate $0.1 to charity.');
    expect(select).toBeInTheDocument();

    fireEvent.click(select);
    expect(screen.getByText('Thanks for your donation.')).toBeInTheDocument();
  })

  it('shows correct amount when user selected to donate', () => {
    render(<Payment amount={19.9} strategy={new PaymentStrategyAU()}/>);

    const select = screen.getByText('I would like to donate $0.1 to charity.');
    expect(select).toBeInTheDocument();

    fireEvent.click(select);
    expect(screen.getByText('$20')).toBeInTheDocument();
  })

  describe('payment methods', () => {
    it('is able to pay when there is no other payment methods provided', () => {
      render(<Payment amount={19.9} strategy={new PaymentStrategyAU()}/>);
      const button = screen.getByText('$19.9');
      expect(button).toBeInTheDocument();
      expect(button).not.toBeDisabled();
    })

    it('selects pay by cash by default when multiple methods provided', () => {
      render(<Payment amount={19.9} strategy={new PaymentStrategyAU()} />);

      expect(screen.getByText('Pay with apple')).toBeInTheDocument();
      expect(screen.getByText('Pay in cash')).toBeInTheDocument();

      const payInCash = screen.getByLabelText('Pay in cash');

      expect(payInCash).toBeChecked();
    })
  })

  describe('Japan Market', function () {
    it('shows correct amount when user selected to donate', () => {
      render(<Payment amount={3459} strategy={new PaymentStrategyJP()} />);

      const select = screen.getByText('I would like to donate ¥41 to charity.');
      expect(select).toBeInTheDocument();

      fireEvent.click(select);
      expect(screen.getByText('¥3500')).toBeInTheDocument();
    })
  });

  describe('Denmark Market', function () {
    it('shows correct amount when user selected to donate', () => {
      render(<Payment amount={321} strategy={new PaymentStrategyDK()} />);

      const select = screen.getByText('I would like to donate Kr.9 to charity.');
      expect(select).toBeInTheDocument();

      fireEvent.click(select);
      expect(screen.getByText('Kr.330')).toBeInTheDocument();
    })
  });
})