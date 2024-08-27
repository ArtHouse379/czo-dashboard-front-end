import { IBase } from "./root.types";

export interface IProcurement extends IBase {
    expectedValue: number
    resultValue: number
    announcedAt: string
    finishedAt: string
    prozorroId: string
    prozorroLink: string
    product: string
    unit: string
    scope: number
    status: string
    customerId: string
    jointProcurementid: string
}


export type TypeProcurementFormState = Partial<Omit<IProcurement, 'id' | 'updatedAt'| 'createdAt'>>
