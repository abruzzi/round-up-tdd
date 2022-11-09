import {fireEvent, render, screen} from "@testing-library/react";
import {Payment} from "./Payment";
import {PaymentStrategyAU} from "../../strategies/PaymentStrategyAU";
import {PaymentStrategyJP} from "../../strategies/PaymentStrategyJP";
import {PaymentStrategyDK} from "../../strategies/PaymentStrategyDK";
import {PaymentStrategy} from "../../types";
import {PaymentContext} from "../../context/PaymentContext";

const renderWithStrategy = (ui: JSX.Element, strategy: PaymentStrategy) => {
  return render(
    <PaymentContext.Provider value={{ strategy: strategy }}>
      {ui}
    </PaymentContext.Provider>
  );
};

describe('Payment', () => {
  it('renders payment title', () => {
    renderWithStrategy(<Payment amount={0.0} />, new PaymentStrategyAU());
    expect(screen.getByText('Payment')).toBeInTheDocument();
  })

  it('shows me the option of donate', () => {
    renderWithStrategy(<Payment amount={19.9} />, new PaymentStrategyAU());
    expect(screen.getByText('I would like to donate $0.1 to charity.')).toBeInTheDocument();
  })

  it('shows me the total amount', () => {
    renderWithStrategy(<Payment amount={19.9} />, new PaymentStrategyAU());
    expect(screen.getByText('$19.9')).toBeInTheDocument();
  })

  it('shows thanks when user selected donation', () => {
    renderWithStrategy(<Payment amount={19.9} />, new PaymentStrategyAU());

    const select = screen.getByText('I would like to donate $0.1 to charity.');
    expect(select).toBeInTheDocument();

    fireEvent.click(select);
    expect(screen.getByText('Thanks for your donation.')).toBeInTheDocument();
  })

  it('shows correct amount when user selected to donate', () => {
    renderWithStrategy(<Payment amount={19.9} />, new PaymentStrategyAU());

    const select = screen.getByText('I would like to donate $0.1 to charity.');
    expect(select).toBeInTheDocument();

    fireEvent.click(select);
    expect(screen.getByText('$20')).toBeInTheDocument();
  })

  describe('payment methods', () => {
    it('is able to pay when there is no other payment methods provided', () => {
      renderWithStrategy(<Payment amount={19.9} />, new PaymentStrategyAU());
      const button = screen.getByText('$19.9');
      expect(button).toBeInTheDocument();
      expect(button).not.toBeDisabled();
    })

    it('selects pay by cash by default when multiple methods provided', () => {
      renderWithStrategy(<Payment amount={19.9} />, new PaymentStrategyAU());

      expect(screen.getByText('Pay with apple')).toBeInTheDocument();
      expect(screen.getByText('Pay in cash')).toBeInTheDocument();

      const payInCash = screen.getByLabelText('Pay in cash');

      expect(payInCash).toBeChecked();
    })
  })

  describe('Japan Market', function () {
    it('shows correct amount when user selected to donate', () => {
      renderWithStrategy(<Payment amount={3459} />, new PaymentStrategyJP());

      const select = screen.getByText('I would like to donate ¥41 to charity.');
      expect(select).toBeInTheDocument();

      fireEvent.click(select);
      expect(screen.getByText('¥3500')).toBeInTheDocument();
    })
  });

  describe('Denmark Market', function () {
    it('shows correct amount when user selected to donate', () => {
      renderWithStrategy(<Payment amount={321} />, new PaymentStrategyDK());

      const select = screen.getByText('I would like to donate Kr.9 to charity.');
      expect(select).toBeInTheDocument();

      fireEvent.click(select);
      expect(screen.getByText('Kr.330')).toBeInTheDocument();
    })
  });
})