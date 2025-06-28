import { Alignment, Margins } from 'pdfmake/interfaces';

export interface LabelValueColumn {
  fontSize?: number;
  alignment?: Alignment;
  bold?: boolean;
  color?: string;
  fillColor?: string;
  text: string;
  width?: string | number;
  margin?: Margins;
  border?: Border;
}

export type Border = [boolean, boolean, boolean, boolean];

// colors
export const HEADER_LABEL_COLOR = '#aaaaab'; // gray
// export const HEADER_LABEL_COLOR = '#37ABDB'; // blue

export const BG_COLOR = '#F3F4F6';
export const COLOR = '#000';
export const VALUE_FONT_SIZE = 10;
