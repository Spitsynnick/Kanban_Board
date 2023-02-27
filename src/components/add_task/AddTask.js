import React from "react";
import { useState } from "react";
import { LIST_TYPES } from "../../config";
import uniqid from "uniqid";
import task_menu_arrow from "../../assets/task_menu_arrow.svg";
import css from "./AddTask.module.css";

// компонент AddTask: рендерит HTML-элементы для добавления в текущий список новой задачи: если текущий список - первый в файле config, - input для ввода новой задачи; иначе - меню для выбора задачи из предыдущего списка
const AddTask = props => {
    const { type, tasks, setTasks } = props;
    
    const [isAddItemVisible, setAddItemVisible] = useState(false);
    
    const [inputValue, setInputValue] = useState("");
    
    const [isTaskMenuVisible, setTaskMenuVisible] = useState(false);
    
    // обработчик изменения значения input в первом списке
    const handleInput = (e) => {
        setInputValue(e.target.value);
    };

    // обработчик нажатия кнопки добавления новой задачи
    const handleAddBtn = () => {         
        setAddItemVisible(!isAddItemVisible);       
               
        if (inputValue) {
            const newTask = {
                id: uniqid(),
                title: inputValue,
                description: "This task has no description",            
                status: Object.values(LIST_TYPES)[0]
            };            
            setTasks([...tasks, newTask]);
            setInputValue("");            
        };        
    };

    // обработчик нажатия кнопки раскрытия меню для добавления в текущий список задачи из предыдущего списка
    const handleMenuBtn = () => {
        setTaskMenuVisible(!isTaskMenuVisible);
    };
   
    // обработчик клика по элементу меню для добавления в текущий список задачи из предыдущего списка
    const handleListItem = (e) => {
        const currentTask = tasks.find(task => task.id === e.target.id);       
        const updatedCurrentTask = {...currentTask, status: type};        
        const filteredTasks = tasks.filter(task => task !== currentTask);
        const updatedTasks = [...filteredTasks, updatedCurrentTask];                   
        setTasks(updatedTasks);
        
        setTaskMenuVisible(!isTaskMenuVisible);        
        setAddItemVisible(!isAddItemVisible); 
    };

    // функция для определения типа предыдущего списка из файла config по типу текущего
    const setPreviousList = (type) => {
        const listTypes = Object.values(LIST_TYPES);
        const currentListIndex = listTypes.findIndex(listType => listType === type);       
        return listTypes[currentListIndex - 1];         
    };
    
    // обработчик нажатия клавиши "Enter" в input для добавления новой задачи в первый список
	const onPressEnter = (e) => {           
		if (e.code === "Enter") {			
			handleAddBtn();
		};
	};
    
    const prevListTasks = tasks.filter(task => task.status === setPreviousList(type));

	return (
        // если текущий список соответствует первому в файле config,- отрендерить кнопку для добавления новой задачи и/или input для ее ввода 
        (type === Object.values(LIST_TYPES)[0]) ? (
            <div className={css.add_task_container}>
                {isAddItemVisible && <input 
                                        type="text" 
                                        value={inputValue} 
                                        onChange={handleInput}
                                        onKeyDown={onPressEnter}
                                        className={css.add_task_input}
                                        autoFocus
                                     />}
                <button 
                    className={isAddItemVisible ? css.submit_button : css.add_task_button}
                    onClick={handleAddBtn}
                    disabled={isAddItemVisible && (!inputValue || /^\s+$/.test(inputValue))}
                    title={isAddItemVisible ? "Add task" : "Add new task"}
                >
                    {isAddItemVisible ? "Submit" : "+ Add card"}
                </button>
            </div>
        ) : (
        // если текущий список не соответствует первому в файле config, - отрендерить кнопку отображения меню для выбора задачи из предыдущего списка или само меню с кнопкой его раскрытия       
            <>
                {isAddItemVisible ? (
                    <>
                        <button onClick={handleMenuBtn} className={css.task_menu_btn}>
                            <img 
                                src={task_menu_arrow} 
                                style={{transform: isTaskMenuVisible && "rotate(180deg)", transition: "transform .3s ease"}}
                                alt={isTaskMenuVisible ? "hide tasks" : "show tasks"}
                            />
                        </button>
                        <div className={css.task_menu}>
                            <ul className={css.task_menu_list} style={{display: !isTaskMenuVisible && "none"}}>
                                {prevListTasks.map(prevListTask => {
                                    return <li 
                                               key={prevListTask.id}
                                               id={prevListTask.id}                                                                                      
                                               className={css.task_menu_item}
                                               onClick={handleListItem}
                                           >
                                               {prevListTask.title}
                                           </li>
                                })}
                            </ul>           
                        </div>                        
                    </>                    
                ) : (             
                    <button 
                        className={css.add_task_button} 
                        onClick={handleAddBtn}
                        disabled={!prevListTasks.length}
                        title="Add new task"
                    >
                        + Add card
                    </button>                    
                )
                }
            </>    
        )                           
	);
};


export default AddTask;