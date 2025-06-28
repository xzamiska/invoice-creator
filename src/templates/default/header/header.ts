import { Column } from 'pdfmake/interfaces';
import { DocumentDataClass } from '../../../types/document-data';
import { LabelColumn } from './types/label-column.js';
import { ValueColumn } from './types/value-column.js';
import { __ } from '../../../services/localization.js';

const headerLeft = (title: string): Column => ({
  text: title,
  width: 250,
  fontSize: 24,
  bold: true,
  color: '#333333',
  margin: [0, 0, 0, 15],
});

const headerRigth = (data: DocumentDataClass): Column => [
  {
    text: `${__('invoice')} ${data.invoiceNumber}`,
    color: '#333333',
    // width: '*',
    fontSize: 18,
    bold: true,
    alignment: 'right',
    margin: [0, 0, 0, 15],
  },
  {
    stack: [
      {
        columns: [
          new LabelColumn(`${__('issueDate')}:`), // const
          new ValueColumn(data.dates.issueDate), // load this value
        ],
      },
      {
        columns: [
          new LabelColumn(`${__('dueDate')}:`), // const
          new ValueColumn(data.dates.dueDate), // load this value
        ],
      },
      '\n',
      {
        columns: [
          new LabelColumn(`${__('variableSymbol')}:`), // const
          new ValueColumn(data.payment.variableSymbol), // load this value
        ],
      },
      {
        columns: [
          new LabelColumn(`${__('deliveryDate')}:`), // const
          new ValueColumn(data.dates.deliveryDate), // load this value
        ],
      },
      {
        columns: [
          new LabelColumn(`${__('paymentMethod')}:`), // const
          new ValueColumn(data.payment.paymentMethod), // const??
        ],
      },
    ],
  },
];

export const header = (data: DocumentDataClass) => ({
  columns: [headerLeft(data.company.title), headerRigth(data)] as Column[],
});
