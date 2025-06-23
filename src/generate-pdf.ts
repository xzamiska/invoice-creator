import PdfPrinter from 'pdfmake';
import fs from 'fs';
import path from 'path';
import { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';
import { getTemplate, Templates } from './templates/template.service.js';
import { DocumentData, DocumentDataClass } from './types/document-data.js';
import { Options } from './types/options.js';
import { setLocale } from './services/localization.js';
import { EGenerateState } from './types/generate-state.enum.js';
import { once } from 'events';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FONTS = {
  Roboto: {
    normal: path.resolve(__dirname, '../', 'fonts/Roboto-Regular.ttf'),
    bold: path.resolve(__dirname, '../', 'fonts/Roboto-Medium.ttf'),
    italics: path.resolve(__dirname, '../', 'fonts/Roboto-Italic.ttf'),
    bolditalics: path.resolve(__dirname, '../', 'fonts/Roboto-MediumItalic.ttf'),
  },
};

export class GeneratePdf {
  private printer: PdfPrinter;
  private options?: Options;

  public data: DocumentDataClass;

  constructor(data: DocumentData, options?: Options) {
    this.printer = new PdfPrinter(FONTS);
    this.data = new DocumentDataClass(data);
    this.options = options;

    if (options?.locale) setLocale(options.locale);
  }

  async generate(): Promise<EGenerateState> {
    const options: BufferOptions = {};

    try {
      const docDefinition = await this.getDocument();
      const fileName = `${this.data.fileName}.pdf`;
      const whereToSavePath = this.options?.filePath
        ? path.resolve(this.options.filePath, fileName)
        : path.resolve('./', fileName);
      const pdfDoc = this.printer.createPdfKitDocument(docDefinition, options);
      const writeStream = fs.createWriteStream(whereToSavePath);

      pdfDoc.pipe(writeStream);
      pdfDoc.end();

      await once(writeStream, 'finish');

      return EGenerateState.success;
    } catch (error) {
      console.error(`EGenerateState.error - ${EGenerateState.error} - ${error}`);
      return EGenerateState.error;
    }

  }

  private async getDocument(): Promise<TDocumentDefinitions> {
    return await getTemplate(Templates.default, this.data);
  }
}