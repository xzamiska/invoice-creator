import { ContentTable } from 'pdfmake/interfaces';
import { DocumentDataClass } from '../../../types/document-data';

const noBorder = [false, false, false, false];

export const footer = (data: DocumentDataClass): ContentTable[] => [
  {
    table: {
      headerRows: 1,
      widths: ['*', '*'],
      body: [
        [
          {
            text: data.company.phone,
            border: noBorder,
            alignment: 'left',
            fontSize: 8,
          },
          {
            text: data.company.email,
            border: noBorder,
            alignment: 'right',
            fontSize: 8,
          },
        ],
        // [
        //     {
        //         text: '',
        //         border: [false, true, false, false],
        //         fontSize: 8
        //     },
        //     {
        //         text: 'Banka: , Kod Banky:',
        //         border: [false, true, false, false],
        //         alignment: "right",
        //         fontSize: 8
        //     }
        // ]
      ],
    },
  },
];
