import {
  CurrencyCode,
  encode,
  PaymentOptions
} from 'bysquare';
import { ContentTable, Table } from 'pdfmake/interfaces';
import { DocumentDataClass } from '../../../types/document-data';

import * as fs from 'fs';
import * as QRCode from 'qrcode';
import { __ } from '../../../services/localization.js';

const noBorder = [false, false, false, false];

function base64_encode(file: string) {
  return 'data:image/gif;base64,' + fs.readFileSync(file, 'base64');
}

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

export const pbsSignature = async (data: DocumentDataClass) => [
  {
    unbreakable: true,
    table: {
      headerRows: 1,
      widths: ['*', '*'],
      body: [
        [
          {
            text: '',
            border: noBorder,
            fontSize: 10,
            bold: true,
          },
          {
            text: `${__('issuedBy')}:`,
            alignment: 'right',
            border: noBorder,
            fontSize: 10,
            bold: true,
          },
        ],
        [
          {
            image: await getQrCode(data),
            border: noBorder,
            width: 130
          },
          data.signatureBase64
            ? {
              image: data.signatureBase64,//base64_encode(data.signatureBase64),
              width: 200,
              alignment: 'right',
              border: noBorder,
            }
            : {
              alignment: 'right',
              border: noBorder,
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
        ],
      ],
    } as Table,
  } as ContentTable,
];
