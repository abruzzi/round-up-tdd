import {PaymentMethod, RemotePaymentMethod} from "./PaymentMethod";

const payInCash = new PaymentMethod({name: "cash"});

export class FetchClient {
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  async fetch() {
    const response = await fetch(this.url);
    const methods: RemotePaymentMethod[] = await response.json();
    return this.convertPaymentMethods(methods)
  }

  convertPaymentMethods(methods: RemotePaymentMethod[]) {
    if (methods.length === 0) {
      return [];
    }

    const extended: PaymentMethod[] = methods.map(
      (method) => new PaymentMethod(method)
    );
    extended.push(payInCash);

    return extended;
  }
}