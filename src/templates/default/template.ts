import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { DocumentDataClass } from '../../types/document-data';
import { billing } from './billing/billing.js';
import { footer } from './footer/footer.js';
import { header } from './header/header.js';
import { pbsSignature } from './pbs-signature/pbs-signature.js';

export const DefaultTemplate = async (data: DocumentDataClass): Promise<TDocumentDefinitions> => ({
  content: [header(data), billing(data), await pbsSignature(data), '\n'],
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
  },
  footer: [footer(data)],
});
