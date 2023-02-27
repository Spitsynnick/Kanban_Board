import React from "react";
import { Link } from "react-router-dom";
import AddTask from "../add_task/AddTask";
import css from "./TaskList.module.css";

// компонент TaskList: рендерит один конкретный список задач, а также компонент AddTask для добавления в данный список новой задачи
const TaskList = props => {
    const { type, title, tasks, setTasks } = props;
    
    const taskList = tasks.filter(task => task.status === type);	
    
	return (
		<div className={css.task_list}>
            <h2 className={css.task_list_title}>{title}</h2>
            <div className={css.tasks_container}>                
                {taskList.map(task => {
                    return (
                        <Link to={`/tasks/${task.id}`} key={task.id}>
                            <div className={css.task}>{task.title}</div> 
                        </Link>                    
                    );
                })}
                <AddTask type={type} tasks={tasks} setTasks={setTasks} /> 
            </div>
        </div> 
	);
};


export default TaskList;