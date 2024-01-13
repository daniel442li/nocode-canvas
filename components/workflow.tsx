//creating workflow cards
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface WorkflowProps {
    workflow: {
        id: string;
        columnId: string;
        title: string;
    };
}

export const WorkflowCard = ({workflow}: WorkflowProps) => {

    const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
        id: workflow.id,
        data: {
            type: 'workflowCard',
            workflow
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        // backgroundColor: 'lightgray', // added for debugging
        // height: '100px', // added for debugging
        // width: '200px', // added for debugging
        // opacity: isDragging ? 0.6 : 1, // added for debugging
    };

    if(isDragging){
        console.log('Dragging Card:', workflow.id);
        return (
            <div ref={setNodeRef} style={style} className="bg-mainBG p-2.5 h-[100px] min-h-[100px] 
            items-center flex text-left rounded-xl border-2 border-rose-500
            cursor-grab relative opacity-30"></div>
        )
    }

    console.log('Rendering Card:', workflow.id, workflow.title);

    return(
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-mainBG p-2.5 h-[100px] min-h-[100px]
        items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset
        hover:ring-rose-500 cursor-grab">{workflow.title}</div>
    )

}