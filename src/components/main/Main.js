import React from "react";
import { Routes, Route } from "react-router-dom";
import TaskBoard from "../task_board/TaskBoard";
import TaskPage from "../task_page/TaskPage";
import css from "./Main.module.css";

// компонент Main: рендерит блок со списками задач или страницу конкретной задачи в зависимости от URL
const Main = props => {	
	return (
		<main className={css.main}>
			<Routes>
				<Route path="/" element={<TaskBoard {...props} />} />
				<Route path="/tasks/:taskId" element={<TaskPage {...props} />} />
			</Routes>			
		</main>
	);
};


export default Main;