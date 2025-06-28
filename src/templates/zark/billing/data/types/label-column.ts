import { Alignment, Margins } from 'pdfmake/interfaces';
import { BG_COLOR, Border, LabelValueColumn } from '../../../types/index.js';

export class LabelColumn implements LabelValueColumn {
  fontSize: number;
  text: string;
  border: Border;
  bold: boolean;
  margin: Margins;
  alignment: Alignment;
  fillColor: string;

  constructor(text: string, alignment: Alignment) {
    this.fontSize = 9;
    this.text = text;
    this.border = [false, false, false, false];
    this.bold = true;
    this.margin = [0, 5, 0, 5];
    this.alignment = alignment;
    this.fillColor = BG_COLOR;
  }
}
