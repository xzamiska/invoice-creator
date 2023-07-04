import { Content, ContentTable, Table, TableLayout } from 'pdfmake/interfaces';
import { formatNumber as formatNumberAsCurrency } from '../../../../helper/number-formatting';
import { DocumentDataClass, PaymentAmount } from '../../../../types/document-data';
import { LabelColumn } from './types/label-column';
import { ValueColumn } from './types/value-column';
import { __ } from '../../../../services/localization';

const layout: TableLayout = {
  defaultBorder: false,
  hLineWidth: () => 1,
  vLineWidth: () => 1,
  hLineColor: (i, node) => {
    if (i === 1 || i === 0) {
      return '#bfdde8';
    }
    return '#eaeaea';
  },
  vLineColor: () => '#eaeaea',
  hLineStyle: () => null,
  paddingLeft: () => 10,
  paddingRight: () => 10,
  paddingTop: () => 2,
  paddingBottom: () => 2,
  fillColor: (rowIndex, node, columnIndex) => '#fff',
};

export const data = (documentData: DocumentDataClass) => {
  const paymentAmount = documentData.getPaymentAmount();

  const result = [
    {
      text: __('invoiceYou'),
      margin: [0, 10, 0, 10],
      fontSize: 8,
      italics: true,
    } as Content,
    {
      layout,
      table: {
        headerRows: 1,
        widths: [250, '*', '*', '*'],
        body: [
          [
            new LabelColumn(__('description'), 'left'),
            new LabelColumn(__('count'), 'right'),
            new LabelColumn(__('pricePerIncl'), 'right'),
            new LabelColumn(__('amount'), 'right'),
          ],
          // start loop
          ...documentData.activities.map((item) => [
            new ValueColumn(item.description, 'left'),
            new ValueColumn(item.count.toFixed(2), 'right'),
            new ValueColumn(formatNumberAsCurrency(item.pricePerUnit), 'right'),
            new ValueColumn(formatNumberAsCurrency(item.pricePerUnit * item.count), 'right'),
          ]),
          // end loop
          [
            {
              text: documentData.company.ic_dph ? __('totalWithoutVat') : __('totalAmount'),
              margin: [0, 5, 0, 5],
              bold: !!!documentData.company.ic_dph,
              fontSize: 9,
              border: [false, true, false, false],
            },
            '',
            '',
            ...getAmout(paymentAmount, !!documentData.company.ic_dph),
          ],
        ],
      } as Table,
    } as ContentTable,
  ];

  // TODO: resolve page break
  // let absolutePosition = result.map((tmptem: any) => tmptem.absolutePosition);
  // let relativePosition = result.map((tmptem: any) => tmptem.relativePosition);

  // console.log('absolutePosition', absolutePosition);
  // console.log('relativePosition', relativePosition);

  if (documentData.company.ic_dph) {
    getVatAmount(paymentAmount).forEach((row) => (result[1] as ContentTable).table.body.push(row));
  }

  if (documentData.activities.length > 3) {
    result.push({ pageBreak: 'after', text: '' } as Content);
  }

  return result;
};

function getVatAmount(paymentAmount: PaymentAmount): any[] {
  return [
    [
      {
        text: `${__('vatLabel')} ${paymentAmount.vat}% z ${formatNumberAsCurrency(paymentAmount.withoutVat)}`,
        margin: [0, 5, 0, 5],
        bold: false,
        fontSize: 9,
        border: [false, false, false, false],
      },
      '',
      '',
      {
        text: formatNumberAsCurrency(paymentAmount.vatAmount as number),
        margin: [0, 5, 0, 5],
        bold: false,
        fontSize: 9,
        border: [false, false, false, false],
        alignment: 'right',
      },
    ],
    [
      {
        text: __('totalAmountInclVat'),
        margin: [0, 5, 0, 5],
        bold: true,
        fontSize: 9,
        border: [false, false, false, false],
      },
      '',
      '',
      {
        text: formatNumberAsCurrency(paymentAmount.result),
        margin: [0, 5, 0, 5],
        bold: true,
        fontSize: 9,
        border: [false, false, false, false],
        alignment: 'right',
      },
    ],
  ];
}

function getAmout(paymentAmount: PaymentAmount, isVatPayer: boolean): any[] {
  if (isVatPayer) {
    return [
      {
        text: formatNumberAsCurrency(paymentAmount.withoutVat),
        margin: [0, 5, 0, 5],
        bold: false,
        fontSize: 9,
        border: [false, true, false, false],
        alignment: 'right',
      },
    ];
  } else
    return [
      {
        text: formatNumberAsCurrency(paymentAmount.result),
        margin: [0, 5, 0, 5],
        bold: true,
        fontSize: 9,
        border: [false, true, false, false],
        alignment: 'right',
      },
    ];
}
