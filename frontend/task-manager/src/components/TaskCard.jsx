import React, { useState } from "react";

import "./TaskCard.css";
import Tag from "./Tag";
import deleteIcon from "../assets/delete.png";

const TaskCard = ({ title, tags, handleDelete, index, status }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = (e) => {
        setIsDragging(true);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("taskIndex", index);
        e.dataTransfer.setData("taskStatus", status);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    return (
        <article
            className={`task_card ${isDragging ? 'dragging' : ''}`}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <p className='task_text'>{title}</p>

            <div className='task_card_bottom_line'>
                <div className='task_card_tags'>
                    {tags.map((tag, index) => (
                        <Tag key={index} tagName={tag} selected />
                    ))}
                </div>
                <div
                    className='task_delete'
                    onClick={() => handleDelete(index)}>
                    <img src={deleteIcon} className='delete_icon' alt='' />
                </div>
            </div>
        </article>
    );
};

export default TaskCard;
