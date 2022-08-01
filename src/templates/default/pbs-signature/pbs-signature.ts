import { generate, Model } from 'bysquare';
import { ContentTable, Table } from 'pdfmake/interfaces';
import { DocumentDataClass } from '../../../types/document-data';

import * as fs from 'fs';
import * as QRCode from 'qrcode';
import i18n from 'i18n';

const noBorder = [false, false, false, false];

function base64_encode(file: string) {
  return 'data:image/gif;base64,' + fs.readFileSync(file, 'base64');
}

const getQrCode = async (data: DocumentDataClass) => {
  const model: Model = {
    IBAN: data.payment.iban,
    Amount: data.getPaymentAmount(),
    CurrencyCode: 'EUR',
    VariableSymbol: data.payment.variableSymbol,
    Payments: 1,
    PaymentOptions: 1,
    BankAccounts: 1,
  };

  const qrstring = await generate(model);
  const qrcode64 = await QRCode.toDataURL(qrstring);
  return qrcode64;
};

export const pbsSignature = async (data: DocumentDataClass) => [
  {
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
            text: `${i18n.__('issuedBy')}:`,
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
          },
          {
            image: base64_encode(data.signatureSrc),
            width: 200,
            border: noBorder,
            alignment: 'right',
          },
        ],
      ],
    } as Table,
  } as ContentTable,
];
