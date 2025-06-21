import { Alignment, Margins } from 'pdfmake/interfaces';
import { Border, LabelValueColumn, PAYMENT_BG_COLOR, PAYMENT_COLOR, PAYMENT_LABEL_FONT_SIZE } from '../../../types/index.js';

export class LabelColumn implements LabelValueColumn {
  fontSize: number;
  color: string;
  text: string;
  margin: Margins;
  fillColor: string;
  border: Border;

  constructor(text: string, fillColor?: string) {
    this.fontSize = PAYMENT_LABEL_FONT_SIZE;
    this.color = PAYMENT_COLOR;
    this.fillColor = fillColor || PAYMENT_BG_COLOR;
    this.text = text;
    this.margin = [0, 5, 0, 0];
    this.border = [false, false, false, false];
  }
}
