import { Alignment, Margins } from 'pdfmake/interfaces';
import { LabelValueColumn, COLOR } from '../../../types/index.js';

export class LabelColumn implements LabelValueColumn {
  fontSize: number;
  alignment: Alignment;
  bold: boolean;
  color: string;
  text: string;
  margin: Margins;

  constructor(text: string) {
    this.fontSize = 12;
    this.alignment = 'left';
    this.bold = false;
    this.color = COLOR;
    this.text = text;
    this.margin = [0, 25, 0, 10];
  }
}
