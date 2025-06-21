import { Alignment, Margins } from 'pdfmake/interfaces';
import { LabelValueColumn } from '../../../types/index.js';

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
    this.bold = true;
    this.color = '#aaaaab';
    this.text = text;
    this.margin = [0, 20, 0, 5];
  }
}
