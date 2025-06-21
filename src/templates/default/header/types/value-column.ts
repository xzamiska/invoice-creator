import { Alignment } from 'pdfmake/interfaces';
import { LabelValueColumn } from '../../types/index.js';

export class ValueColumn implements LabelValueColumn {
  fontSize: number;
  alignment: Alignment;
  bold: boolean;
  color: string;
  text: string;
  width: string | number;

  constructor(text: string) {
    this.fontSize = 10;
    this.alignment = 'right';
    this.bold = true;
    this.color = '#333333';
    this.text = text;
    this.width = 100;
  }
}
