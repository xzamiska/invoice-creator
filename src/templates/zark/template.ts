import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { DocumentDataClass } from '../../types/document-data';
import { billing } from './billing/billing.js';
import { header } from './header/header.js';

export const ZarkTemplate = async (data: DocumentDataClass): Promise<TDocumentDefinitions> => ({
  content: [
    await header(data), 
    billing(data), 
],
  styles: {
    notesTitle: {
      fontSize: 10,
      bold: true,
      margin: [0, 50, 0, 3],
    },
    notesText: {
      fontSize: 10,
    },
  },
  defaultStyle: {
    columnGap: 20,
    font: 'CourierPrime',
  },
});
