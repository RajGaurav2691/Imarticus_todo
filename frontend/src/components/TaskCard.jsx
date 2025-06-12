// src/components/TaskCard.jsx
import './TaskCard.css';

export default function TaskCard({ task, onEdit, onDelete }) {
    return (
        <div className="card">
            <p>{task.title}</p>
            <div className="modalButtons">
                <button className="modalButton" onClick={() => onEdit(task)}>Edit</button>
                <button className="modalButton" onClick={() => onDelete(task)}>Delete</button>
            </div>
        </div>
    );
}
