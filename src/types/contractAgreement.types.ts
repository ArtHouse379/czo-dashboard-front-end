import { IBase } from "./root.types";

export interface IContractAgreement extends IBase {
    number?: string
    signatureDate?: string
    reason?: string
    changes?: string
}