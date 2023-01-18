import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import {Payment} from "./Payment";
import {roundUpToNearestHundred} from "../utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import {PaymentStrategyImpl} from "../models/PaymentStrategyImpl";

const queryClient = new QueryClient();

const myRender = (ui: React.ReactElement) => {
  return render(<QueryClientProvider client={queryClient}>
    {ui}
  </QueryClientProvider>)
}

describe('Payment', () => {
  it('renders payment title', () => {
    myRender(<Payment amount={0.0} />);
    expect(screen.getByText('Payment section')).toBeInTheDocument();
  })

  it('shows me the option of donate', () => {
    myRender(<Payment amount={19.9} />);
    expect(screen.getByText('I would like to donate $0.1 to charity.')).toBeInTheDocument();
  })

  it('shows me the total amount', () => {
    myRender(<Payment amount={19.9} />);
    expect(screen.getByText('$19.9')).toBeInTheDocument();
  })

  it('shows thanks when user selected donation', () => {
    myRender(<Payment amount={19.9} />);

    const select = screen.getByText('I would like to donate $0.1 to charity.');
    expect(select).toBeInTheDocument();

    fireEvent.click(select);
    expect(screen.getByText('Thanks for your donation.')).toBeInTheDocument();
  })

  it('shows correct amount when user selected to donate', () => {
    myRender(<Payment amount={19.9} />);

    const select = screen.getByText('I would like to donate $0.1 to charity.');
    expect(select).toBeInTheDocument();

    fireEvent.click(select);
    expect(screen.getByText('$20')).toBeInTheDocument();
  })

  describe('japan market', () => {
    it('shows correct amount when user selected to donate', () => {
      myRender(<Payment amount={3312} strategy={new PaymentStrategyImpl("¥", roundUpToNearestHundred)} />);

      const select = screen.getByText('I would like to donate ¥88 to charity.');
      expect(select).toBeInTheDocument();

      fireEvent.click(select);
      expect(screen.getByText('¥3400')).toBeInTheDocument();
    })
  })

  describe('payment methods from remote', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('shows all available payment methods', async () => {
      const methods = [{name: 'apple',}, {name: 'google'}];

      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(methods)
      }));

      myRender(<Payment amount={19.9}/>)

      await waitFor(() => {
        expect(screen.getByText('Pay with apple')).toBeInTheDocument();
      })

      await waitFor(() => {
        expect(screen.getByText('Pay with google')).toBeInTheDocument();
      })

      await waitFor(() => {
        expect(screen.getByText('Pay with cash')).toBeInTheDocument();
      })
    })
  })
})