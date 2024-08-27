'use client'

import Loader from "@/components/ui/Loader"
import { useContracts } from "./hooks/useContracts"
import { LocaleDateFormatter } from "@/utils/DateFormatter"
import { LocaleNumberFormatter } from "@/utils/NumberFormatter"

export  function Contracts() {

    const {data, isLoading} = useContracts()

    return isLoading ? ( 
        <Loader /> 
    ) : (
        <>
            {data ? 
                <div className="italic">
                    Count of contracts: {data.length} 
                </div>
            :''}
            <div >
                <div className="grid grid-cols-10 mt-7 text-center">
                    <div className="text-xl">#</div>
                    <div className="text-xl">Number:</div>
                    <div className="text-xl">Link:</div>
                    <div className="text-xl">Start value:</div>
                    <div className="text-xl">Current value:</div>
                    <div className="text-xl">Signature date:</div>
                    <div className="text-xl">Termination date:</div>
                    <div className="text-xl">Product:</div>
                    <div className="text-xl">Unit:</div>
                    <div className="text-xl">Scope:</div>
                </div>

                {data ? data.map((contract, index) => (
                        <div className="grid grid-cols-10 mt-7 text-center" key={contract.id}>
                            <div className="text-xl">{index+1}</div>
                            <div className="text-xl">{contract.number}</div>
                            <div className="text-xl">{contract.prozorroLink}</div>
                            <div className="text-xl">{LocaleNumberFormatter(contract.startValue)}</div>
                            <div className="text-xl">{LocaleNumberFormatter(contract.currentValue)}</div>
                            <div className="text-xl">{LocaleDateFormatter(contract.signatureDate)}</div>
                            <div className="text-xl">{LocaleDateFormatter(contract.terminationDate)}</div>
                            <div className="text-xl">{contract.product}</div>
                            <div className="text-xl">{contract.unit}</div>
                            <div className="text-xl">{LocaleNumberFormatter(contract.scope)}</div>
                        </div>
                )) : <div className="text-center">Customers not loaded!</div>}
            </div>
        </>
    )
}