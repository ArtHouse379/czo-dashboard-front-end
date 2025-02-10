import { Heading } from "@/components/ui/Heading"
import { NO_INDEX_PAGE } from "@/constants/seo.contants"
import { Metadata } from "next"
import { Customers } from "./Customers"

export const metadata: Metadata = {
    title: 'Customers',
    ...NO_INDEX_PAGE
}

export default function CustomersPage() {
    return (
        <div>
            <Heading title='Customers'/>
            
            <Customers/>
        </div>
    )
}