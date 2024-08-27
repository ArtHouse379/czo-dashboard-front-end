import { IBase } from "./root.types"

export enum EnumTaskPriority {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface ITaskResponse extends IBase {
    name: string
    priority?: EnumTaskPriority
    status: string
    terminationDate: string
    isCompleted: boolean
    notes: string
}

export type TypeTaskFormState = Partial<Omit<ITaskResponse, 'id' | 'updatedAt'>>