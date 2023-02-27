import React from "react";
import { LIST_TYPES, LIST_TITLES } from "../../config";
import TaskList from "../task_list/TaskList";
import css from "./TaskBoard.module.css";

// компонент TaskBoard: рендерит блок со списками задач
const TaskBoard = props => {
	const { tasks, setTasks } = props;
	
	return (
		<div className={css.task_board}>			
			{Object.values(LIST_TYPES).map(type => {							
				return (
					<TaskList 
						key={type} 
						type={type} 
						title={LIST_TITLES[type]} 
						tasks={tasks} 
						setTasks={setTasks}											
					/>	
				);				
			})}
		</div>
	);
};


export default TaskBoard;