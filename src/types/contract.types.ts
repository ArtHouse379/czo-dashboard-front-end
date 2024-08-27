import Decimal from "decimal.js";
import { IBase } from "./root.types";

export interface IContract extends IBase {
    number: string
    prozorroLink: string
    startValue: number
    currentValue: number
    signatureDate: string
    terminationDate: string
    product: string
    unit: string
    scope: number
}

export type TypeContractFormState = Partial<IContract>