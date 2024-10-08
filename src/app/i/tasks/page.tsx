import { NO_INDEX_PAGE } from "@/constants/seo.contants"
import { Metadata } from "next"
import { Heading } from "@/components/ui/Heading"
import { Tasks } from "./Tasks"

export const metadata: Metadata = {
    title: 'Tasks',
    ...NO_INDEX_PAGE
}

export default function TasksPage() {
    return (
        <div>
            <Heading title='Tasks'/>
            
            <Tasks />
        </div>
    )
}