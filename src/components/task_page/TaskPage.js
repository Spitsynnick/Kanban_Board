import React from "react";
import { useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import close_task_page from "../../assets/close_task_page.svg"
import css from "./TaskPage.module.css";

// компонент TaskPage: рендерит страницу конкретной задачи, - ее заголовок, редактируемое описание и кнопку редактирования; если страница по URL не найдена, - рендерит соответствующий заголовок
const TaskPage = props => {
	const { tasks, setTasks } = props;
	
	const location = useLocation();	
	const currentId = location.pathname.substring(7);		
	const currentTask = tasks.find(task => task.id === currentId);	
	const currentDescription = currentTask.description;	
	const initialDescription = "This task has no description";
    
	const [isEditing, setEditing] = useState(false);
	
	const textareaRef = useRef(null);

	// обработчик изменения значения textarea с описанием
	const handleChange = (e) => {		
		updateTaskDescription(e.target.value);
	};

	// обработчик нажатия кнопки редактирования описания
	const handleClick = () => {		
		setEditing(!isEditing);
				
		isEditing ? textareaRef.current.blur() : textareaRef.current.focus();
		
		if (!currentDescription) {
			updateTaskDescription(initialDescription);
		};         	
	};

	// функция для обновления описания задачи
	const updateTaskDescription = (description) => {
		const updatedTasks = tasks.map(task => {
            if (task.id === currentId) {				  				                                           
                return {...task, description: description};                
            };            
            return task;            
        });

		setTasks(updatedTasks);  
	};
	
	return (
		<div className={css.task_page}>
			<Link to="/" className={css.link_back}><img src={close_task_page} alt="close" title="Back"/></Link>
			{currentTask ? (
				<>					
					<h2 className={css.task_title}>{currentTask.title}</h2>
					<div className={css.task_description}>
						<textarea 
							className={css.description_text}
							value={((currentDescription === initialDescription) && isEditing) ? "" : currentDescription}				
							readOnly={!isEditing}
							onChange={handleChange}							
							ref={textareaRef}											
						/>
						<button 
							onClick={handleClick}
							className={isEditing ? css.submit_btn : css.edit_btn} 
							title={isEditing ? "Save changes" : "Edit description"}
						>
							{isEditing ? "Save" : "Edit"}
						</button>
					</div>
					
				</>	
			) : (
				<h2>Task with ID "{currentId}" is not found</h2>
			)
			}						
		</div>
	);
};


export default TaskPage;