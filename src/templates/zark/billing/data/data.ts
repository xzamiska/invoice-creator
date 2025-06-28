import { Content, ContentTable, Table, TableLayout } from 'pdfmake/interfaces';
import { formatNumber as formatNumberAsCurrency } from '../../../../helper/number-formatting.js';
import { ActivityIntern, DocumentDataClass, PaymentAmount } from '../../../../types/document-data';
import { LabelColumn } from './types/label-column.js';
import { ValueColumn } from './types/value-column.js';
import { __ } from '../../../../services/localization.js';

const layout: TableLayout = {
  defaultBorder: false,
  hLineWidth: (i, node) => {
    // If it's the last row, return 0 to avoid drawing a line
    if (i === node.table.body.length) {
      return 0;
    }
    return 1;
  },
  hLineColor: (i, node) => {
    if (i === 1 || i === 0) {
      return '#D1D5DB';
    }
    return '#F3F4F6';
  },
  hLineStyle: () => null,
  paddingLeft: () => 10,
  paddingRight: () => 10,
  paddingTop: () => 2,
  paddingBottom: () => 2,
  fillColor: (rowIndex, node, columnIndex) => '#fff',
};

const amountLayout: TableLayout = {
  ...layout,
  hLineColor: () => '#D1D5DB',
}

export const data = (documentData: DocumentDataClass) => {
  const paymentAmount = documentData.getPaymentAmount();
  const activitiesTableWidths = paymentAmount.result > 100000 ? [130, '*', '*', 20, '*', '*'] : [150, '*', '*', 20, '*', '*'];

  const amountTableWidths = paymentAmount.result > 100000 ?
    (paymentAmount.result > 1000000 ? [80, '*', '*', 20, '*', '*'] : [105, '*', '*', 20, '*', '*'])
    : [160, '*', '*', 15, '*', '*'];

  const result = [
    documentData.company.ic_dph ?
      {
        margin: [0, 15, 0, 10],
        layout,
        table: {
          headerRows: 1,
          widths: activitiesTableWidths,
          body: [
            [
              new LabelColumn(__('description'), 'left'),
              new LabelColumn(__('count'), 'right'),
              new LabelColumn(__('pricePerIncl'), 'right'),
              new LabelColumn(__('vatLabel'), 'right'),
              new LabelColumn(__('totalAmountWOVat'), 'right'),
              new LabelColumn(__('totalAmountInclVat'), 'right')
            ],
            // start loop
            ...documentData.activities.map((item) => [
              new ValueColumn(item.description, 'left'),
              new ValueColumn(item.count.toFixed(2), 'right'),
              new ValueColumn(formatNumberAsCurrency(item.pricePerUnit), 'right'),
              new ValueColumn(`${item.vat}%`, 'right'),
              new ValueColumn(formatNumberAsCurrency(item.pricePerUnit * item.count), 'right'),
              new ValueColumn(
                formatNumberAsCurrency(item.pricePerUnit * item.count * (1 + item.vat / 100)),
                'right'
              ),
            ]),
          ],
        } as Table,
      } as ContentTable :
      {
        margin: [0, 15, 0, 10],
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
          ],
        } as Table,
      } as ContentTable,
    documentData.company.ic_dph ?
      {
        layout: amountLayout,
        unbreakable: true,
        table: {
          headerRows: 0,
          widths: amountTableWidths,
          body: [
            [
              {
                text: __('amount'),
                margin: [0, 5, 0, 5],
                bold: true,
                fontSize: 9,
                border: [false, true, false, false],
              },
              {
                text: '',
                border: [false, true, false, false],
              },
              {
                text: '',
                border: [false, true, false, false],
              },
              {
                text: '',
                border: [false, true, false, false],
              },
              ...getAmout(paymentAmount, !!documentData.company.ic_dph),
              {
                text: formatNumberAsCurrency(paymentAmount.result),
                margin: [0, 5, 0, 5],
                fontSize: 9,
                bold: true,
                border: [false, true, false, false],
                alignment: 'right',
              },
            ],
            // ...getVatAmount(paymentAmount, documentData.activities),
          ]
        }
      } as ContentTable :
      {
        layout: amountLayout,
        unbreakable: true,
        table: {
          headerRows: 0,
          widths: [250, '*',],
          body: [
            [
              {
                text: __('amount'),
                margin: [0, 5, 0, 5],
                bold: !!!documentData.company.ic_dph,
                fontSize: 9,
                border: [false, true, false, false],
              },
              ...getAmout(paymentAmount, !!documentData.company.ic_dph),
            ],
          ]
        }
      } as ContentTable,
  ];

  return result;
};

function getAmout(paymentAmount: PaymentAmount, isVatPayer: boolean): any[] {
  if (isVatPayer) {
    return [
      {
        text: formatNumberAsCurrency(paymentAmount.withoutVat),
        margin: [0, 5, 0, 5],
        bold: true,
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
