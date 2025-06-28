import { Alignment } from 'pdfmake/interfaces';
import { Margins } from 'pdfmake/interfaces';
import { Border, LabelValueColumn, BG_COLOR, COLOR, VALUE_FONT_SIZE } from '../../types/index.js';

export class ValueColumn implements LabelValueColumn {
  color: string;
  text: string;
  border: Border;
  fillColor: string;
  margin: Margins;
  fontSize: number;

  constructor(text: string, fillColor?: string, first: boolean = false, last: boolean = false) {
    this.color = COLOR;
    this.text = text;
    this.border = [false, false, false, false];
    this.fillColor = fillColor || BG_COLOR;
    this.margin = [15, first ? 10 : 0, 0, last ? 10 : 0,];
    this.fontSize = VALUE_FONT_SIZE;
  }
}
