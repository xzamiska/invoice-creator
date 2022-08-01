import { Column } from "pdfmake/interfaces";
import { DocumentDataClass } from "../../../types/document-data";
import { LabelColumn } from "./types/label-column";
import { ValueColumn } from "./types/value-column";
import i18n from "i18n";

let headerLeft = (title: string): Column => ({
    text: title,
    width: 250,
    fontSize: 24,
    bold: true,
    color: '#333333',
    margin: [0, 0, 0, 15],
});

let headerRigth = (data: DocumentDataClass): Column => [
    {
        text: `${i18n.__('invoice')} ${data.payment.variableSymbol}`,
        color: '#333333',
        width: '*',
        fontSize: 18,
        bold: true,
        alignment: 'right',
        margin: [0, 0, 0, 15],
    },
    {
        stack: [
            {
                columns: [
                    new LabelColumn(`${i18n.__('issueDate')}:`), // const
                    new ValueColumn(data.dates.issueDate), // load this value
                ],
            },
            {
                columns: [
                    new LabelColumn(`${i18n.__('dueDate')}:`), // const
                    new ValueColumn(data.dates.dueDate), // load this value
                ],
            },
            '\n',
            {
                columns: [
                    new LabelColumn(`${i18n.__('variableSymbol')}:`), // const
                    new ValueColumn(data.payment.variableSymbol), // load this value
                ],
            },
            {
                columns: [
                    new LabelColumn(`${i18n.__('deliveryDate')}:`), // const
                    new ValueColumn(data.dates.deliveryDate), // load this value
                ],
            },
            {
                columns: [
                    new LabelColumn(`${i18n.__('paymentMethod')}:`), // const
                    new ValueColumn(data.payment.paymentMethod), // const??
                ],
            },
        ],
    },
];

export const header = (data: DocumentDataClass) => ({
    columns: [
        headerLeft(data.company.title),
        headerRigth(data)
    ] as Column[],
});