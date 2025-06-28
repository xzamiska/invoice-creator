import { DocumentDataClass } from '../../../types/document-data';
import { data } from './data/data.js';
import { information } from './info/info.js';
import { payment } from './payment/payment.js';

export const billing = (documentData: DocumentDataClass) => [
    information(documentData),
    data(documentData),
    {
        unbreakable: true,
        stack: [
            payment(documentData),
        ]
    }
];
