'use client'

import Loader from "@/components/ui/Loader"
import { useTasks } from "@/app/i/tasks/hooks/useTasks"
import { LocaleDateFormatter } from "@/utils/DateFormatter"

export  function Tasks() {

    const {data, isLoading} = useTasks()

    return isLoading ? ( 
        <Loader /> 
    ) : (
        <>
            {data ? 
                <div className="italic">
                    Count of tasks: {data.length} 
                </div>
            :''}
            <div>
                <div className="grid grid-cols-6 gap-4 mt-7 text-center">
                    <div>Name:</div>
                    <div>Priority:</div>
                    <div>Status:</div>
                    <div>Do before:</div>
                    <div>Is complete:</div>
                    <div>Notes:</div>
                </div>

                {data ? data.map(task => {
                    return (
                        <div className="grid grid-cols-6 gap-4 mt-7 text-center" key={task.id}>
                            <div>{task.name}</div>
                            <div>{task.priority || 'none'}</div>
                            <div>{task.status}</div>
                            <div>{LocaleDateFormatter(task.terminationDate)}</div>
                            <div>{task.isCompleted ? 'Complete' : 'Not complete'}</div>
                            <div>{task.notes}</div>
                           
                        </div>
                )}) : <div className="text-center">tasks not loaded!</div>}
            </div>
        </>
    )
}