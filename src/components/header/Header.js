import React from "react";
import { useState } from "react";
import user_avatar from "../../assets/user_avatar.svg";
import user_menu_arrow from "../../assets/user_menu_arrow.svg";
import little_square from "../../assets/little_square.svg";
import { USER_MENU_ITEMS } from "../../config";
import css from "./Header.module.css";

// компонент Header: рендерит header с заголовком и пользовательским меню
const Header = () => {    
    const [isUserMenuVisible, setUserMenuVisible] = useState(false);

    // обработчик нажатия кнопки отображения меню
    const handleClick = () => {
        setUserMenuVisible(!isUserMenuVisible);
    };
   
    const isHeaderMarginVisible = (isUserMenuVisible && window.innerWidth <= 650) ? true : false;

	return (
		<header className={css.header} style={{marginBottom: isHeaderMarginVisible && "78px"}}> 
            <h1 className={css.header_title}>Awesome Kanban Board</h1>
            <div className={css.user_block}>                
                <button className={css.user_menu_btn} onClick={handleClick}>
                    <div className={css.user_menu_images}>
                        <img src={user_avatar} alt="avatar" />
                        <img src={user_menu_arrow} 
                             style={{transform: isUserMenuVisible && "rotate(180deg)", transition: "transform .3s ease"}} 
                             alt={isUserMenuVisible ? "hide menu" : "show menu"}                       
                        />
                    </div>                    
                </button> 
                <div className={css.user_menu} style={{display: !isUserMenuVisible && "none"}}>
                    <img src={little_square} className={css.little_square} alt="square" />               
                    <ul className={css.user_menu_list}>                        
                        {Object.values(USER_MENU_ITEMS).map(item => {
                            return <li key={item} className={css.user_menu_item}>{item}</li>
                        })}
                    </ul>                    
                </div>                                
            </div>                
        </header> 
	);
};


export default Header;