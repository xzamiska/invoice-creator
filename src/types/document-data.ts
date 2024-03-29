export interface CompanyBase {
  name: string;

  // address
  street: string;
  postalCode: string;
  city: string;
  country: string;

  // slovak region specific byrocracy
  ico: string;
  dic: string;
  ic_dph?: string;
}

export interface CompanyData extends CompanyBase {
  title: string;
  email: string;
  phone: string;
}

// tslint:disable-next-line: no-empty-interface
export interface ClientData extends CompanyBase {}

export interface DatesData {
  issueDate: string;
  dueDate: string;
  deliveryDate: string;
}

export interface PaymentData {
  variableSymbol: string;
  paymentMethod: string;
  iban: string;
}

export interface ActivityData {
  description: string;
  count: number;
  pricePerUnit: number;
}

export interface DocumentData {
  company: CompanyData;
  client: ClientData;

  dates: DatesData;
  payment: PaymentData;
  activities: ActivityData[];

  fileName: string;
  signatureSrc?: string;
}

export interface PaymentAmount {
  result: number;
  withoutVat: number;
  withVat?: number;
  vat?: number;
  vatAmount?: number;
}

export class DocumentDataClass implements DocumentData {
  company: CompanyData;
  client: ClientData;
  dates: DatesData;
  payment: PaymentData;
  activities: ActivityData[];
  fileName: string;
  signatureSrc?: string;

  constructor(data: DocumentData) {
    this.company = data.company;
    this.client = data.client;
    this.dates = data.dates;
    this.payment = data.payment;
    this.activities = data.activities;
    this.fileName = data.fileName;
    this.signatureSrc = data.signatureSrc;
  }

  getPaymentAmount(): PaymentAmount {
    const reducer = (accumulator: number, curr: number) => accumulator + curr;
    const paymentAmountWOVat = this.activities.map((item) => item.count * item.pricePerUnit).reduce(reducer);
    const vat = this.company.ic_dph ? 1.2 : 1;
    const paymentAmountWVat = this.company.ic_dph && paymentAmountWOVat * vat;
    return {
      vat: +Number((vat - 1) * 100).toFixed() || undefined,
      withoutVat: paymentAmountWOVat,
      withVat: paymentAmountWVat || undefined,
      result: paymentAmountWVat || paymentAmountWOVat,
      vatAmount: paymentAmountWVat ? +Number(paymentAmountWVat - paymentAmountWOVat).toFixed(2) : 0,
    };
  }
}
