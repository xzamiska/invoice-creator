import { Column, ContentTable, Table } from 'pdfmake/interfaces';
import { ValueColumn } from './types/value-column.js';
import { DocumentDataClass } from '../../../../types/document-data.js';
import { __ } from '../../../../services/localization.js';
import { formatNumber as formatNumberAsCurrency } from '../../../../helper/number-formatting.js';
import * as fs from 'fs';
import { text } from 'stream/consumers';

const title = (): Column => [
    {
        columns: [
            {
                text: __('paymentInformation'),
                fontSize: 12,
                margin: [0, 15, 0, 10],
            }
        ]
    }
]

const INFO_PANEL_FONT_SIZE = 9;
const infoPanel = (data: DocumentDataClass): Column => [
    {
        columns: [
            {
                width: '100%',
                margin: [0, 0, 0, 0],
                table: {
                    headerRows: 0,
                    widths: [140, 170],
                    body: [
                        [
                            new ValueColumn(`${__('iban')}`, undefined, 'left', INFO_PANEL_FONT_SIZE),
                            new ValueColumn(data.payment.iban, undefined, 'left', INFO_PANEL_FONT_SIZE),
                        ],
                        [
                            new ValueColumn(`${__('variableSymbol')}:`, undefined, 'left', INFO_PANEL_FONT_SIZE),
                            new ValueColumn(data.payment.variableSymbol, undefined, 'left', INFO_PANEL_FONT_SIZE),
                        ],
                        [
                            new ValueColumn(`${__('paymentMethod')}:`, undefined, 'left', INFO_PANEL_FONT_SIZE),
                            new ValueColumn(data.payment.paymentMethod, undefined, 'left', INFO_PANEL_FONT_SIZE),
                        ],
                    ],
                },
            }
        ]
    }
];

export const pbsSignature = (data: DocumentDataClass): Column => [
    {
        alignment: 'right',
        text: __('issuedBy'),
        fontSize: 9,
        margin: [0, 10, 0, 5],
    },
    data.signatureBase64
        ? {
            image: data.signatureBase64,//base64_encode(data.signatureBase64),
            width: 200,
            alignment: 'right',
        }
        : {
            alignment: 'right',
            canvas: [
                {
                    type: 'rect',
                    x: 0,
                    y: 0,
                    w: 200,
                    h: 100,
                    color: '#fff',
                    lineColor: '#000',
                },
            ]
        },
];

function base64_encode(file: string) {
    return 'data:image/gif;base64,' + fs.readFileSync(file, 'base64');
}

export const payment = (documentData: DocumentDataClass) => [
    title(),
    infoPanel(documentData),
    pbsSignature(documentData),
];