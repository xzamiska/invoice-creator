import { Content, ContentTable, Table, TableLayout } from 'pdfmake/interfaces';
import { formatNumber } from '../../../../helper/number-formatting';
import { DocumentDataClass } from '../../../../types/document-data';
import { LabelColumn } from './types/label-column';
import { ValueColumn } from './types/value-column';
import i18n from 'i18n';

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

export const data = (documentData: DocumentDataClass) => [
  {
    text: i18n.__('invoiceYou'),
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
          new LabelColumn(i18n.__('description'), 'left'),
          new LabelColumn(i18n.__('count'), 'right'),
          new LabelColumn(i18n.__('pricePerIncl'), 'right'),
          new LabelColumn(i18n.__('amount'), 'right'),
        ],
        // start loop
        ...documentData.activities.map((item) => [
          new ValueColumn(item.description, 'left'),
          new ValueColumn(item.count.toFixed(2), 'right'),
          new ValueColumn(formatNumber(item.pricePerUnit), 'right'),
          new ValueColumn(formatNumber(item.pricePerUnit * item.count), 'right'),
        ]),
        // end loop
        [
          {
            text: i18n.__('totalAmount'),
            margin: [0, 5, 0, 5],
            bold: true,
            fontSize: 9,
            border: [false, true, false, false],
          },
          '',
          '',
          {
            text: formatNumber(documentData.getPaymentAmount()),
            margin: [0, 5, 0, 5],
            bold: true,
            fontSize: 9,
            border: [false, true, false, false],
            alignment: 'right',
          },
        ],
      ],
    } as Table,
  } as ContentTable,
];
