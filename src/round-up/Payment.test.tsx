import {fireEvent, render, screen} from "@testing-library/react";
import {Payment} from "./Payment";
import RoundUpStrategyAustralia from "./algorithms/RoundUpStrategyAustralia";
import {RoundUpStrategy} from "./algorithms/RoundUpStrategy";
import RoundUpStrategyJapan from "./algorithms/RoundUpStrategyJapan";
import RoundUpStrategyDenmark from "./algorithms/RoundUpStrategyDenmark";

describe('Payment', () => {
  describe('Australia Market', () => {
    let strategy: RoundUpStrategy;

    beforeEach(() => {
      strategy = new RoundUpStrategyAustralia()
    })

    it('renders payment title', () => {
      render(<Payment amount={0.0} strategy={strategy} />);
      expect(screen.getByText('Payment')).toBeInTheDocument();
    })

    it('shows me the option of donate', () => {
      render(<Payment amount={19.9} strategy={strategy}  />);
      expect(screen.getByText('I would like to donate $0.1 to charity.')).toBeInTheDocument();
    })

    it('shows me the total amount', () => {
      render(<Payment amount={19.9} strategy={strategy}  />);
      expect(screen.getByText('$19.9')).toBeInTheDocument();
    })

    it('shows thanks when user selected donation', () => {
      render(<Payment amount={19.9} strategy={strategy}  />);

      const select = screen.getByText('I would like to donate $0.1 to charity.');
      expect(select).toBeInTheDocument();

      fireEvent.click(select);
      expect(screen.getByText('Thanks for your donation.')).toBeInTheDocument();
    })

    it('shows correct amount when user selected to donate', () => {
      render(<Payment amount={19.9} strategy={strategy}  />);

      const select = screen.getByText('I would like to donate $0.1 to charity.');
      expect(select).toBeInTheDocument();

      fireEvent.click(select);
      expect(screen.getByText('$20')).toBeInTheDocument();
    })
  })

  describe('Japan Market', function () {
    let strategy: RoundUpStrategy;

    beforeEach(() => {
      strategy = new RoundUpStrategyJapan()
    })

    it('shows correct amount when user selected to donate', () => {
      render(<Payment amount={3459} strategy={strategy} />);

      const select = screen.getByText('I would like to donate ¥41 to charity.');
      expect(select).toBeInTheDocument();

      fireEvent.click(select);
      expect(screen.getByText('¥3500')).toBeInTheDocument();
    })
  });

  describe('Denmark Market', function () {
    let strategy: RoundUpStrategy;

    beforeEach(() => {
      strategy = new RoundUpStrategyDenmark()
    })

    it('shows correct amount when user selected to donate', () => {
      render(<Payment amount={321} strategy={strategy} />);

      const select = screen.getByText('I would like to donate Kr.9 to charity.');
      expect(select).toBeInTheDocument();

      fireEvent.click(select);
      expect(screen.getByText('Kr.330')).toBeInTheDocument();
    })
  });

})