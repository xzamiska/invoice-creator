import { EGenerateState, GeneratePdf } from '../generate-pdf';
import { DocumentData, DocumentDataClass } from '../types/document-data';
import { Options } from '../types/options';

const price = 10;
const data: DocumentData = {
  company: {
    title: 'Invoice for client',
    name: 'my soft s.r.o.',
    street: 'My soft street 45G',
    postalCode: '90074',
    city: 'Santa Monica',
    country: 'Los Angeles',
    ico: '97846512',
    dic: '1215578910',
    email: 'mysoft@mysoft.test',
    phone: '00112 224 522 222',
  },
  client: {
    name: 'Client s.r.o.',
    street: 'Client street 17',
    postalCode: '90086',
    city: 'West Hollywood',
    country: 'Los Angeles',
    ico: '12345678',
    dic: '2222257758',
    ic_dph: 'LA2225334858',
  },
  dates: {
    issueDate: '5. 9. 2022',
    dueDate: '19. 9. 2022',
    deliveryDate: '31. 8. 2022',
  },
  payment: {
    variableSymbol: '111111',
    paymentMethod: 'Prevod',
    iban: 'SK9909000000009999999999',
  },
  activities: [
    {
      description: 'Soft delivered',
      count: 1,
      pricePerUnit: price,
    },
    {
      description: 'Soft delivered',
      count: 2,
      pricePerUnit: price * 0.25,
    },
    {
      description: 'Soft delivered',
      count: 1,
      pricePerUnit: price * 0.5,
    },
  ],
  fileName: 'test_document',
};

const options: Options = {
  filePath: 'src/__tests__/assets/',
  locale: 'en',
};

test('paymentAmountWOVat', () => {
  const documentDataClass = new DocumentDataClass(data);
  const paymentAmount = documentDataClass.getPaymentAmount();
  expect(paymentAmount.withoutVat).toBe(20);
  expect(paymentAmount.withVat).toBe(undefined);
  expect(paymentAmount.vat).toBe(undefined);
  expect(paymentAmount.result).toBe(20);
  expect(paymentAmount.vatAmount).toBe(0);
});

test('paymentAmountWVat', () => {
  const testData: DocumentData = {
    ...data,
    company: {
      ...data.company,
      ic_dph: 'LA123456',
    },
    activities: [
      ...data.activities,
      {
        count: 9,
        description: 'Test Consult',
        pricePerUnit: 20,
      },
    ],
  };
  const documentDataClass = new DocumentDataClass(testData);
  const paymentAmount = documentDataClass.getPaymentAmount();
  expect(paymentAmount.withVat).toBe(240);
  expect(paymentAmount.withoutVat).toBe(200);
  expect(paymentAmount.vat).toBe(20);
  expect(paymentAmount.result).toBe(240);
  expect(paymentAmount.vatAmount).toBe(40);
});
