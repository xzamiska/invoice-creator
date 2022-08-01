import { DocumentDataClass } from "../../../types/document-data";
import { data } from "./data/data";
import { information } from "./info/info";
import { payment } from "./payment/payment";

export const billing = (documentData: DocumentDataClass) => [
    information(documentData),
    '\n\n',
    payment(documentData),
    '\n\n',
    data(documentData),
    '\n\n',
];