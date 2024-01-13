// adding drag and drop functionality to the workflow board

import React, { useMemo, useState } from 'react';
import {Column} from './workflowColumn';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import {WorkflowCard} from './workflow';
import { createPortal } from 'react-dom';

const generateId = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 8; // Adjust the length of the generated id as needed
    let id = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }
  
    return id;
  };

export const WorkflowBoard = () => {

    const [columns, setColumns] = useState([{id: "111", title:"Your Workflow Column"}]);

    const [workflows, setWorkflows] = useState([{id:"1",columnId:"111",title:"Your first workflow"}]);

    const [activeWorkflow, setActiveWorkflow] = useState(null);

    const createWorkflow = (columnId) =>
    {
        const newTask = {id:generateId(),columnId,title:`Task ${workflows.length + 1}`}
        setWorkflows(prev=>[...prev,newTask]);
    }

    console.log(workflows);

    const columnIds = columns.map(({id})=>id);

    const onDragStart = (event) => {
        if(event.active.data.current?.type === "Workflow")
        {
            setActiveWorkflow(event.active.data.current.workflow);
            return;
        }
    };

    const onDragOver = (event) => {
    // The active and over represent the card which we have holded n 
    // over is the card we are hovering on top of
        const {active, over} = event;
        if(!over) return;

        const activeId = active.id;
        const overId = over.id;

        const isActiveAWorkflow = active.data.current?.type === "Workflow";
        const isOverAWorkflow = over.data.current?.type === "Workflow"

        if(!isActiveAWorkflow) return;

        if(isActiveAWorkflow && isOverAWorkflow)
        {
            setWorkflows((workflow)=>{
            // Finding indexes here as we need to shuffle them
            // activeId is same because we always give draggable id remember?
                const activeIndex = workflow.findIndex((t)=> t.id === activeId);
                const overIndex = workflow.findIndex((t) => t.id === overId);

            // If we drop the task on a task on different column, just gotta check overId
            // We can also 
                if(workflow[activeIndex].columnId!== workflow[overIndex].columnId)
                {
                    workflow[activeIndex].columnId = workflow[overIndex].columnId;
                }

            // This is a smooth inbuilt function which switches positions of
            // 2 elements in an array based on index given.
                return arrayMove(workflow, activeIndex, overIndex);
            })
        }

    // I am dropping a task over another column i.e when no tasks are there in column

        const isOverAColumn = over.data.current?.type === "Column";
        if(isActiveAWorkflow && isOverAColumn) {
            setWorkflows((tasks)=>{
                const activeIndex = tasks.findIndex((t)=>t.id === activeId);

                tasks[activeIndex].columnId = overId;

            // The reason we are using arrayMove with same 2 indexes is bc we get new array
                return arrayMove(tasks, activeIndex, activeIndex)
            })
        }
    };

    return (
        <div className='m-auto flex min-h-screen w-full items-center overflow-x-auto
        overflow-y-hidden px-[40px]'>
          <DndContext onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={()=>setActiveWorkflow(null)}>
            <section className='flex gap-4'>
              <SortableContext items={columnIds}>
                {columns.map(col=>(
                  <Column column={col} key={col.id} createWorkflow={createWorkflow}
                  workflows={workflows.filter(task=>task.columnId === col.id)}
                  />
                ))}
              </SortableContext>
            </section>
            {typeof window !== 'undefined' && createPortal(<DragOverlay>
              {activeWorkflow && (
                <WorkflowCard workflow={activeWorkflow}/>
              )}
            </DragOverlay>, document.body)}
          </DndContext>
        </div>
      );
};