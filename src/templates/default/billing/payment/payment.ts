import { ContentTable } from 'pdfmake/interfaces';
import { formatNumber } from '../../../../helper/number-formatting';
import { DocumentDataClass } from '../../../../types/document-data';
import { LabelColumn } from './types/label-column';
import { ValueColumn } from './types/value-column';
import i18n from 'i18n';

export const payment = (data: DocumentDataClass): ContentTable => ({
  table: {
    headerRows: 1,
    widths: [220, '*', 80, 100],
    body: [
      [
        new LabelColumn(i18n.__('iban')),
        new LabelColumn(i18n.__('variableSymbol')),
        new LabelColumn(i18n.__('dueDate')),
        new LabelColumn(i18n.__('amountToBePaid'), '#3A3A3A'),
      ],
      [
        new ValueColumn(data.payment.iban),
        new ValueColumn(data.payment.variableSymbol),
        new ValueColumn(data.dates.dueDate),
        new ValueColumn(formatNumber(data.getPaymentAmount()), '#3A3A3A'),
      ],
    ],
  },
});
