import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { DocumentDataClass } from '../types/document-data';
import { DefaultTemplate } from './default/template';

export const getTemplate = async (type: Templates, data: DocumentDataClass): Promise<TDocumentDefinitions> => {
  switch (type) {
    case Templates.default: {
      return await DefaultTemplate(data);
    }
  }
};

export enum Templates {
  default = 1,
}
