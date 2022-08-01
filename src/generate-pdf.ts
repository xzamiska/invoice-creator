import PdfPrinter from 'pdfmake';
import fs from 'fs';
import path from 'path';
import { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';
import { getTemplate, Templates } from './templates/template.service';
import { DocumentData, DocumentDataClass } from './types/document-data';
import i18n from 'i18n';
import { Options } from './types/options';

const FONTS = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf',
  },
};

export class GeneratePdf {
  private printer: PdfPrinter;
  private data: DocumentDataClass;
  private options?: Options;

  constructor(data: DocumentData, options?: Options) {
    this.printer = new PdfPrinter(FONTS);
    this.data = new DocumentDataClass(data);
    this.options = options;

    i18n.configure({
      locales: ['sk', 'en'],
      directory: 'locales',
    });

    if (options?.locale) i18n.setLocale(options.locale);
  }

  async generate(): Promise<void> {
    const options: BufferOptions = {};

    const docDefinition = await this.getDocument();
    const fileName = `${this.data.fileName}.pdf`;
    const whereToSavePath = this.options?.filePath
      ? path.resolve(this.options.filePath, fileName)
      : path.resolve(__dirname, fileName);

    const pdfDoc = this.printer.createPdfKitDocument(docDefinition, options);
    pdfDoc.pipe(fs.createWriteStream(whereToSavePath));
    pdfDoc.end();
  }

  private async getDocument(): Promise<TDocumentDefinitions> {
    return await getTemplate(Templates.default, this.data);
  }
}
