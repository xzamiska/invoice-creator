import { Alignment, Margins } from 'pdfmake/interfaces';
import { Border, LabelValueColumn } from '../../../types/index.js';

export class ValueColumn implements LabelValueColumn {
  fontSize: number;
  text: string;
  border: Border;
  margin: Margins;
  alignment: Alignment;

  constructor(text: string, alignment: Alignment) {
    this.fontSize = 8;
    this.text = text;
    this.border = [false, false, false, true];
    this.margin = [0, 5, 0, 5];
    this.alignment = alignment;
  }
}
