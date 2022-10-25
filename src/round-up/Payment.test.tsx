import {fireEvent, render, screen} from "@testing-library/react";
import {Payment} from "./Payment";
import {RoundUpStrategyAustralia} from "./strategy/RoundUpStrategyAustralia";
import {RoundUpStrategyJapan} from "./strategy/RoundUpStrategyJapan";
import {RoundUpStrategyDenmark} from "./strategy/RoundUpStrategyDenmark";
import {RoundUpStrategy} from "./types";
import RoundUpStrategyContext from "./RoundUpStrategyContext";

const myRender = (ui: JSX.Element, strategy: RoundUpStrategy = new RoundUpStrategyAustralia()) => {
  return render(<RoundUpStrategyContext.Provider value={{strategy}}>
    {ui}
  </RoundUpStrategyContext.Provider>)
}

describe('Payment', () => {
  describe('Australia Market', () => {
    it('renders payment title', () => {
      myRender(<Payment amount={0.0} />, new RoundUpStrategyAustralia());
      expect(screen.getByText('Payment')).toBeInTheDocument();
    })

    it('shows me the option of donate', () => {
      myRender(<Payment amount={19.9} />);
      expect(screen.getByText('I would like to donate $0.1 to charity.')).toBeInTheDocument();
    })

    it('shows me the total amount', () => {
      myRender(<Payment amount={19.9} />, new RoundUpStrategyAustralia());
      expect(screen.getByText('$19.9')).toBeInTheDocument();
    })

    it('shows thanks when user selected donation', () => {
      myRender(<Payment amount={19.9}/>, new RoundUpStrategyAustralia());

      const select = screen.getByText('I would like to donate $0.1 to charity.');
      expect(select).toBeInTheDocument();

      fireEvent.click(select);
      expect(screen.getByText('Thanks for your donation.')).toBeInTheDocument();
    })

    it('shows correct amount when user selected to donate', () => {
      myRender(<Payment amount={19.9}/>, new RoundUpStrategyAustralia());

      const select = screen.getByText('I would like to donate $0.1 to charity.');
      expect(select).toBeInTheDocument();

      fireEvent.click(select);
      expect(screen.getByText('$20')).toBeInTheDocument();
    })
  })

  describe('Japan Market', function () {
    it('shows correct amount when user selected to donate', () => {
      myRender(<Payment amount={3459}/>, new RoundUpStrategyJapan());

      const select = screen.getByText('I would like to donate ¥41 to charity.');
      expect(select).toBeInTheDocument();

      fireEvent.click(select);
      expect(screen.getByText('¥3500')).toBeInTheDocument();
    })
  });

  describe('Denmark Market', function () {
    it('shows correct amount when user selected to donate', () => {
      myRender(<Payment amount={321} />, new RoundUpStrategyDenmark());

      const select = screen.getByText('I would like to donate Kr.9 to charity.');
      expect(select).toBeInTheDocument();

      fireEvent.click(select);
      expect(screen.getByText('Kr.330')).toBeInTheDocument();
    })
  });

})