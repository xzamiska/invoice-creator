import { Alignment, Margins } from 'pdfmake/interfaces';
import { LabelValueColumn, COLOR } from '../../../types/index.js';

export class ValueColumn implements LabelValueColumn {
  alignment: Alignment;
  bold: boolean;
  color: string;
  text: string;
  fontSize: number;
  margin: Margins;

  constructor(text: string) {
    this.alignment = 'left';
    this.bold = false;
    this.color = COLOR;
    this.text = text;
    this.fontSize = 9;
    this.margin = [0, 1, 0, 0];
  }
}
