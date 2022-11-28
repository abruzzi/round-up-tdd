export type RemotePaymentMethod = {
  name: string;
  countryCode?: string;
  id?: string;
};

export class PaymentMethod {
  private remotePaymentMethod: RemotePaymentMethod;

  constructor(remotePaymentMethod: RemotePaymentMethod) {
    this.remotePaymentMethod = remotePaymentMethod
  }

  get provider() {
    return this.remotePaymentMethod.name;
  }

  get label() {
    return `Pay with ${this.remotePaymentMethod.name}`;
  }

  get isDefaultMethod() {
    return this.provider === 'cash';
  }
}