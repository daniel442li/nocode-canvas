// organizing workflow cards into proper column and being able to add new workflow through button

import React from 'react';
import { WorkflowCard } from './workflow';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const Column = ({ column, createWorkflow, workflows }) => {
    const workflowIds = workflows.map(({id}) => id);

    const {setNodeRef,attributes,listeners,transform,transition,isDragging} = useSortable({
        id:column.id,
        data: {
            type: "Column",
            column,
        },
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    return (
        <div className='bg-columnBG w-[350px] h-[500px]
        max-h-[500px] rounded-md flex flex-col'>
            <header className=' bg-mainBG text-base h-[60px] 
            rounded-md rounded-b-none p-3 font-bold border-columnBG border-4'>
                {column.title}
            </header>

            <main 
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className='flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto'>
                <SortableContext items={workflowIds}>
                {workflows.map(workflow=>(
                    <WorkflowCard key={workflow.id} workflow={workflow}/>
                ))}
                </SortableContext>
            </main>

            <footer>
                <button className='border-columnBG border-2 rounded-md p-4
                border-x-columnBG bg-mainBG hover:text-rose-500'
                onClick={()=>createWorkflow(column.id)}>Add Workflow</button>
            </footer>
        </div>
    )
};