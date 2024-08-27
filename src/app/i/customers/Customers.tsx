'use client'

import Loader from "@/components/ui/Loader"
import { useCustomers } from "@/app/i/customers/hooks/useCustomers"

export  function Customers() {

    const {data, isLoading} = useCustomers()

    return isLoading ? ( 
        <Loader /> 
    ) : (
        <>
            {data ? 
                <div className="italic">
                    Count of customers: {data.length} 
                </div>
            :''}
            <div >
                <div className="grid grid-cols-4 gap-12 mt-7 text-center">
                    <div className="text-xl">Name:</div>
                    <div className="text-xl">Code:</div>
                    <div className="text-xl">Email:</div>
                    <div className="text-xl">Phone:</div>
                </div>

                {data ? data.map((customer) => (
                        <div className="grid grid-cols-4 gap-12 mt-7 text-center" key={customer.code}>
                            <div className="text-xl">{customer.name}</div>
                            <div className="text-xl">{customer.code}</div>
                            <div className="text-xl">{customer.email}</div>
                            <div className="text-xl">+38{customer.phone}</div>
                        </div>
                )) : <div className="text-center">Customers not loaded!</div>}
            </div>
        </>
    )
}