import { ContentTable } from 'pdfmake/interfaces';
import { formatNumber } from '../../../../helper/number-formatting';
import { DocumentDataClass } from '../../../../types/document-data';
import { LabelColumn } from './types/label-column';
import { ValueColumn } from './types/value-column';
import { __ } from '../../../../services/localization';

export const payment = (data: DocumentDataClass): ContentTable => ({
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
