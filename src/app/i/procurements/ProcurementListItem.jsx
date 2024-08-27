'use client'

import { LocaleDateFormatter } from "@/utils/DateFormatter"
import { LocaleNumberFormatter } from "@/utils/NumberFormatter"
import { useCustomer } from "./hooks/useCustomer"
import { Loader } from "lucide-react"

export default function ProcurementListItem(props) {

    const {procurement, index} = props

    const {data, isLoading} = useCustomer(procurement.customerId)

    return (
        <>
            <div className="grid grid-flow-col justify-items-center place-items-center bg-gray-800 border border-blue-300 rounded-md px-2 py-4 mt-7 hover:cursor-pointer hover:opacity-95">
                <div>{index+1}</div>
                <div>
                    <p className="mb-2 text-xl font-bold">{procurement.product}</p>
                    <p className="mb-2">Quantity: {LocaleNumberFormatter(procurement.scope)} {procurement.unit}</p>
                    <p className="mb-2">
                        {procurement.resultValue ? 
                        <>Signed contract value: {LocaleNumberFormatter(procurement.resultValue)} UAH</> : 
                        <>Expected value: {LocaleNumberFormatter(procurement.expectedValue)}</>}
                    </p>
                </div>
                <div>
                    <p>{ procurement.finishedAt ? <>Was finished: {LocaleDateFormatter(procurement.finishedAt)}</> : <>Announced at: {LocaleDateFormatter(procurement.announcedAt)}</> }</p>
                </div>
                <div>
                    {isLoading ? 
                    <Loader /> :
                    data ? <p className="mb-2">Customer: {data.name}</p> : <p className="mb-2">Haven't customer name</p>}
                    <p className="mb-2">Is participate in joint: {procurement.jointProcurementid ? "Yes" : "No"}</p>
                    <p className="mb-2">Current status: {procurement.status}</p>
                </div>
            </div>
        </>
    )
}