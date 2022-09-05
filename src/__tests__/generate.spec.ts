import { EGenerateState, GeneratePdf } from "../generate-pdf";
import { DocumentData } from "../types/document-data";
import { Options } from "../types/options";

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
        phone: '00112 224 522 222'
    },
    client: {
        name: 'Client s.r.o.',
        street: 'Client street 17',
        postalCode: '90086',
        city: 'West Hollywood',
        country: 'Los Angeles',
        ico: '12345678',
        dic: '2222257758',
        ic_dph: 'LA2225334858'
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
            pricePerUnit: 45000
        }
    ],
    fileName: 'test_document',
}

const options: Options = {
    filePath: 'src/__tests__/assets/',
    locale: 'en'
}

test('generate', () => {
    new GeneratePdf(data, options).generate().then((val) => {
        expect(val).toBe(EGenerateState.success);
    });
    
});