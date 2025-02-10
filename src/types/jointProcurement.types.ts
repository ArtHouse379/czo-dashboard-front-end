import { IBase } from "./root.types"
export interface IJointProcurement extends IBase {
    expectedValue?: number
    resultValue?: number
    announcedAt?: string
    finishedAt?: string
    prozorroId?: string
    prozorroLink?: string
    product?: string
    unit?: string
    scope?: number
    status?: string
}