import { Margins } from "pdfmake/interfaces";
import { Border, LabelValueColumn, PAYMENT_BG_COLOR, PAYMENT_COLOR, PAYMENT_VALUE_FONT_SIZE } from "../../../types";

export class ValueColumn implements LabelValueColumn {
    color: string;
    text: string;
    border: Border;
    fillColor: string;
    margin: Margins;
    fontSize: number;

    constructor(text: string, fillColor?: string) {
        this.color = PAYMENT_COLOR;
        this.text = text;
        this.border = [false, false, false, false];
        this.fillColor = fillColor || PAYMENT_BG_COLOR;
        this.margin = [0, 0, 0, 5];
        this.fontSize = PAYMENT_VALUE_FONT_SIZE
    }
    
}
