import { NO_INDEX_PAGE } from "@/constants/seo.contants"
import { Metadata } from "next"
import { Heading } from "@/components/ui/Heading"
import { Procurements } from "./Procurements"

export const metadata: Metadata = {
    title: 'Procurements',
    ...NO_INDEX_PAGE
}

export default function ProcurementsPage() {
    return (
        <div>
            <Heading title='Procurements'/>

            <Procurements/>
        </div>
    )
}