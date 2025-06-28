import { Column } from 'pdfmake/interfaces';
import { DocumentDataClass } from '../../../types/document-data';
import { ValueColumn } from './types/value-column.js';
import { __ } from '../../../services/localization.js';
import {
    CurrencyCode,
    encode,
    PaymentOptions
} from 'bysquare';
import * as QRCode from 'qrcode';

const headerTitle = (): Column => [
    {
        columns: [
            {
                text: __('invoice'),
                fontSize: 32,
                margin: [40, 25, 0, 0],
            }
        ]
    }
];

const infoPanel = async (data: DocumentDataClass): Promise<Column> => [
    {
        columns: [
            {
                table: {
                    headerRows: 1,
                    widths: [140, 170],
                    body: [
                        [
                            new ValueColumn(`${__('invoice')} #`, undefined, true),
                            new ValueColumn(data.invoiceNumber, undefined, true),
                        ],
                        [
                            new ValueColumn(`${__('issueDate')}:`),
                            new ValueColumn(data.dates.issueDate),
                        ],
                        [
                            new ValueColumn(`${__('dueDate')}:`),
                            new ValueColumn(data.dates.dueDate),
                        ],
                        [
                            new ValueColumn(`${__('variableSymbol')}:`),
                            new ValueColumn(data.payment.variableSymbol),
                        ],
                        [
                            new ValueColumn(`${__('deliveryDate')}:`),
                            new ValueColumn(data.dates.deliveryDate),
                        ],
                        [
                            new ValueColumn(`${__('iban')}:`),
                            new ValueColumn(data.payment.iban),
                        ],
                        [
                            new ValueColumn(`${__('paymentMethod')}:`, undefined, false, true),
                            new ValueColumn(data.payment.paymentMethod, undefined, false, true),
                        ],
                    ],
                },
            },
            {
                canvas: [
                    {
                        type: 'rect',
                        x: -20,
                        y: 20,
                        w: 180,
                        h: 5,
                        color: '#F5F5F5',
                    },
                ]
            },
            {
                image: await getQrCode(data),
                width: 110,
                absolutePosition: { x: 430, y: 130 },
            },
        ]
    }
];

const getQrCode = async (data: DocumentDataClass) => {
    const qrString = encode({
        invoiceId: data.invoiceNumber,
        payments: [
            {
                type: PaymentOptions.PaymentOrder,
                amount: data.getPaymentAmount().result,
                bankAccounts: [
                    {
                        iban: data.payment.iban,
                    },
                ],
                currencyCode: CurrencyCode.EUR,
                variableSymbol: data.payment.variableSymbol,
            },
        ],
    });

    const qrcode64 = await QRCode.toDataURL(qrString);
    return qrcode64;
};

export const header = async (documentData: DocumentDataClass) => [
    headerTitle(),
    await infoPanel(documentData),
];
