import { Alignment } from 'pdfmake/interfaces';
import { HEADER_LABEL_COLOR, LabelValueColumn } from '../../types';

export class LabelColumn implements LabelValueColumn {
  fontSize: number;
  alignment: Alignment;
  bold: boolean;
  color: string;
  text: string;
  width: string | number;

  constructor(text: string) {
    this.fontSize = 10;
    this.alignment = 'left';
    this.bold = false;
    this.color = HEADER_LABEL_COLOR;
    this.text = text;
    this.width = '*';
  }
}
