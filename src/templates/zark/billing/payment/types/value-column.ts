import { Alignment } from 'pdfmake/interfaces';
import { Margins } from 'pdfmake/interfaces';
import { Border, LabelValueColumn, BG_COLOR, COLOR, VALUE_FONT_SIZE } from '../../../types/index.js';

export class ValueColumn implements LabelValueColumn {
  color: string;
  text: string;
  border: Border;
  margin: Margins;
  fontSize: number;
  alignment?: Alignment;

  constructor(text: string, fillColor?: string, alignment: Alignment = 'left', fontSize?: number) {
    this.color = COLOR;
    this.text = text;
    this.border = [false, false, false, false];
    this.margin = [-5, 0, 0, 0]; // left, top, right, bottom
    this.fontSize = fontSize || VALUE_FONT_SIZE;
    this.alignment = alignment;
  }
}
