import { GeneratePdf } from '../generate-pdf';
import { DocumentData } from '../types/document-data';
import { EGenerateState } from '../types/generate-state.enum.js';
import { Options } from '../types/options';

const data: DocumentData = {
  company: {
    title: 'my soft s.r.o.',
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
    iban: 'SK8309000000005191394374',
  },
  activities: [
    {
      description: 'Soft development',
      count: 1,
      pricePerUnit: 45000,
      vat: 23,
    },
    {
      description: 'Consulting',
      count: 12,
      pricePerUnit: 200,
      vat: 19,
    },
    {
      description: 'Environmet management',
      count: 25,
      pricePerUnit: 100,
      vat: 5,
    },
  ],
  fileName: 'test_document_without_vat',
};

const options: Options = {
  filePath: 'src/__tests__/assets/',
  locale: 'sk',
};

test('generateWOVat', () => {
  return new GeneratePdf(data, options).generate().then((val) => {
    expect(val).toBe(EGenerateState.success);
  });
});

test('generateWVatShort', () => {
  let testData = { ...data };
  testData.company.ic_dph = 'LA123456';
  testData.fileName = 'test_document_with_vat_short';
  return new GeneratePdf(testData, options).generate().then((val) => {
    expect(val).toBe(EGenerateState.success);
  });
});

test('generateWVat', () => {
  let testData = { ...data };
  testData.company.ic_dph = 'LA123456';
  testData.fileName = 'test_document_with_vat';

  testData.activities.push({
    description: 'Additional services',
    count: 1450,
    pricePerUnit: 100,
  });
  testData.activities.push({
    description: 'Additional services',
    count: 1450,
    pricePerUnit: 100,
  });
  testData.activities.push({
    description: 'Additional services',
    count: 1450,
    pricePerUnit: 100,
  });
  testData.activities.push({
    description: 'Additional services',
    count: 1450,
    pricePerUnit: 100,
  });
  testData.activities.push({
    description: 'Additional services',
    count: 1450,
    pricePerUnit: 100,
  });
  testData.activities.push({
    description: 'Additional services',
    count: 1450,
    pricePerUnit: 100,
  });
  testData.activities.push({
    description: 'Additional services',
    count: 1450,
    pricePerUnit: 100,
  });
  testData.activities.push({
    description:
      'Additional services with some additional info which should be provided here. Additional services with some additional info which should be provided here. Additional services with some additional info which should be provided here. Additional services with some additional info which should be provided here.',
    count: 1450,
    pricePerUnit: 100,
  });

  let testOptions = { ...options };
  testOptions.locale = 'en';
  return new GeneratePdf(testData, testOptions).generate().then((val) => {
    expect(val).toBe(EGenerateState.success);
  });
});
