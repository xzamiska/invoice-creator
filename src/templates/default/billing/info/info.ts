import { Column } from 'pdfmake/interfaces';
import { DocumentDataClass } from '../../../../types/document-data';
import { LabelColumn } from './types/label-column';
import { ValueColumn } from './types/value-column';
import i18n from 'i18n';

export const information = (data: DocumentDataClass) => [
  {
    columns: [
      new LabelColumn(i18n.__('contractor').toUpperCase()),
      new LabelColumn(i18n.__('purchaser').toUpperCase()), // client
    ] as Column[],
  },
  {
    columns: [
      new ValueColumn(data.company.name),
      new ValueColumn(data.client.name), // client data
    ] as Column[],
  },
  {
    columns: [
      new ValueColumn(data.company.street),
      new ValueColumn(data.client.street), // client data
    ] as Column[],
  },
  {
    columns: [
      new ValueColumn(`${data.company.postalCode} ${data.company.city}`),
      new ValueColumn(`${data.client.postalCode} ${data.client.city}`), // client data
    ] as Column[],
  },
  {
    columns: [
      new ValueColumn(data.company.country),
      new ValueColumn(data.client.country), // client data
    ] as Column[],
  },
  '\n',
  {
    columns: [
      new ValueColumn(`${i18n.__('idNumber')}: ${data.company.ico}`),
      new ValueColumn(`${i18n.__('idNumber')}: ${data.client.ico}`), // client data
    ] as Column[],
  },
  {
    columns: [
      new ValueColumn(`${i18n.__('tin')}: ${data.company.dic}`),
      new ValueColumn(`${i18n.__('tin')}: ${data.client.dic}`), // client data
    ] as Column[],
  },
  {
    columns: [
      new ValueColumn(`${data.company.ic_dph ? `${i18n.__('vat')}: ${data.company.ic_dph}` : i18n.__('vatNonPayer')}`),
      new ValueColumn(`${data.client.ic_dph ? `${i18n.__('vat')}: ${data.client.ic_dph}` : i18n.__('vatNonPayer')}`), // client data
    ] as Column[],
  },
];
