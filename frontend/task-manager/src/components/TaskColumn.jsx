import { useState } from "react";

import "./TaskColumn.css";
import TaskCard from "./TaskCard";

const TaskColumn = ({ title, icon, tasks, status, handleDelete, handleStatusChange }) => {
    const [isOverDropZone, setIsOverDropZone] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setIsOverDropZone(true);
    };

    const handleDragLeave = () => {
        setIsOverDropZone(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsOverDropZone(false);

        const taskIndex = parseInt(e.dataTransfer.getData("taskIndex"));
        const previousStatus = e.dataTransfer.getData("taskStatus");

        if (previousStatus !== status) {
            handleStatusChange(taskIndex, status);
        }
    };

    return (
        <section
            className={`task_column ${isOverDropZone ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <h2 className='task_column_heading'>
                <img className='task_column_icon' src={icon} alt='' /> {title}
            </h2>

            {tasks.map(
                (task, index) =>
                    task.status === status && (
                        <TaskCard
                            key={index}
                            title={task.task}
                            tags={task.tags}
                            handleDelete={handleDelete}
                            index={index}
                            status={task.status}
                        />
                    )
            )}
        </section>
    );
};

export default TaskColumn;
