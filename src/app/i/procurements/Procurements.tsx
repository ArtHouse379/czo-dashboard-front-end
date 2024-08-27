'use client'

import Loader from "@/components/ui/Loader"
import { useProcurements } from "@/app/i/procurements/hooks/useProcurements"
import ProcurementListItem from './ProcurementListItem'
import { Button } from "@/components/ui/buttons/Button"

export  function Procurements() {

    const {data, isLoading} = useProcurements()
    
    return isLoading ?  <Loader /> : (
        <>
            {data ? 
                <>
                    <div className="flex justify-between items-center py-2">

                        <div className="italic basis-1/4">
                            Count of procurements: {data.length} 
                        </div>

                        <div className="searching basis-1/3">
                            <input type="text" name="search" id="search" placeholder="search...(product, price)" className="bg-transparent border rounded-md p-1 border-gray-400 w-full text-center" />
                        </div>

                        <div className="sorting">
                            <label htmlFor="sort-data">By data:</label>
                            <select name="sort" id="sort-data" className="bg-transparent border-b-2 hover:cursor-pointer ml-2 text-center">
                                <option value="null">-</option>
                                <option value="older">Older</option>
                                <option value="newest">Newest</option>
                                <option value="Cheaper">Cheaper</option>
                                <option value="expensive">Most expensive</option>
                            </select>
                        </div>

                        <div className="sorting">
                            <label htmlFor="sort-manager">By manager:</label>
                            <select name="sort" id="sort-manager" className="bg-transparent border-b-2 hover:cursor-pointer ml-2 text-center">
                                <option value="all">All</option>
                                <option value="Kuchansky">Kuchansky</option>
                                <option value="Guz">Guz</option>
                                <option value="Chechel">Chechel</option>
                            </select>
                        </div>

                    </div>

                    <div className="flex my-2">
                        <div>
                            <Button>Add new</Button>
                        </div>
                    </div>
                </>
            :''}

            {
                data ? 
                data.map((procurement, index) => <ProcurementListItem procurement={procurement} key={`procurement${index}`} index={index}/>) : 
                <div className="text-center">...procurements not loaded!</div>
            }
        </>
    )
}