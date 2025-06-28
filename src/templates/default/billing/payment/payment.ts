import { ContentTable } from 'pdfmake/interfaces';
import { formatNumber } from '../../../../helper/number-formatting.js';
import { DocumentDataClass } from '../../../../types/document-data';
import { LabelColumn } from './types/label-column.js';
import { ValueColumn } from './types/value-column.js';
import { __ } from '../../../../services/localization.js';


export const payment = (data: DocumentDataClass): ContentTable => ({
  layout: {
    defaultBorder: false,
    hLineWidth: (i, node) => 1,
    vLineWidth: (i, node) => 1,
  },
  table: {
    headerRows: 1,
    widths: [220, '*', 80, 100],
    body: [
      [
        new LabelColumn(__('iban')),
        new LabelColumn(__('variableSymbol')),
        new LabelColumn(__('dueDate')),
        new LabelColumn(__('amountToBePaid'), '#3A3A3A'),
      ],
      [
        new ValueColumn(data.payment.iban),
        new ValueColumn(data.payment.variableSymbol),
        new ValueColumn(data.dates.dueDate),
        new ValueColumn(formatNumber(data.getPaymentAmount().result), '#3A3A3A'),
      ],
    ],
  },
});
