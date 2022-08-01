import { Alignment, Margins } from "pdfmake/interfaces";

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

export const PAYMENT_BG_COLOR = '#37ABDB';
export const PAYMENT_COLOR = '#fff';
export const PAYMENT_LABEL_FONT_SIZE = 8;
export const PAYMENT_VALUE_FONT_SIZE = 14;