import { NO_INDEX_PAGE } from "@/constants/seo.contants"
import { Metadata } from "next"
import { Heading } from "@/components/ui/Heading"
import { Contracts } from "./Contracts"

export const metadata: Metadata = {
    title: 'Contracts',
    ...NO_INDEX_PAGE
}

export default function ContractsPage() {
    return (
        <div>
            <Heading title='Contracts'/>
            
            <Contracts />
        </div>
    )
}