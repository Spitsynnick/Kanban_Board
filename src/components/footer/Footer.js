import React from "react";
import { Link } from "react-router-dom";
import { LIST_TYPES } from "../../config";
import css from "./Footer.module.css";

// компонент Footer: рендерит footer с количеством добавленных и завершенных задач
const Footer = props => {
    const { tasks } = props;
    
    const activeListTitle = Object.values(LIST_TYPES)[0];    
    const finishedListTitle = Object.values(LIST_TYPES)[Object.values(LIST_TYPES).length - 1];   
    const activeTasks = tasks.filter(task => task.status === activeListTitle);   
    const finishedTasks = tasks.filter(task => task.status === finishedListTitle);

	return (
		<footer className={css.footer}>
            <div className={css.tasks_counts}>
                <p className={css.tasks_active} key={activeListTitle}>Active tasks: {activeTasks.length}</p>
                <p className={css.tasks_finished}key={finishedListTitle}>Finished tasks: {finishedTasks.length}</p>
            </div>             
            <p className={css.author_paragraph}>
                Kanban board by <Link to="https://spitsynnick.github.io/Portfolio/" target="_blank">Nikolai Spitsyn</Link>, 2023
            </p>    
        </footer>      
	);
};


export default Footer;