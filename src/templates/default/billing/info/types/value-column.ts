import { Alignment } from 'pdfmake/interfaces';
import { LabelValueColumn } from '../../../types/index.js';

export class ValueColumn implements LabelValueColumn {
  alignment: Alignment;
  bold: boolean;
  color: string;
  text: string;
  fontSize: number;

  constructor(text: string) {
    this.alignment = 'left';
    this.bold = true;
    this.color = '#333333';
    this.text = text;
    this.fontSize = 10;
  }
}
