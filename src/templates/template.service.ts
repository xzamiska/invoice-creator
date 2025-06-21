import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { DocumentDataClass } from '../types/document-data.js';
import { DefaultTemplate } from './default/template.js';
// import { ChloinTemplate } from './chloin/template';

export const getTemplate = async (type: Templates, data: DocumentDataClass): Promise<TDocumentDefinitions> => {
  switch (type) {
    // case Templates.default: {
    //   return await DefaultTemplate(data);
    // }
    // case Templates.chloin: {
    //   return await ChloinTemplate(data);
    // };
    default: {
      return await DefaultTemplate(data);
    };
  }
};

export enum Templates {
  default = 0,
  chloin = 1,
  zark = 2,
}
