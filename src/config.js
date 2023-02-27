// файл конфигурации проекта 

// наименования пунктов меню пользователя
const USER_MENU_ITEMS = {
	ITEM_1: "Profile",
	ITEM_2: "Log Out"
};

// наименования списков задач
const LIST_TYPES = {
	BACKLOG: "backlog",
    READY: "ready",
	IN_PROGRESS: "inProgress",
	FINISHED: "finished"
};

// заголовки списков задач
const LIST_TITLES = {
	[LIST_TYPES.BACKLOG]: "Backlog",
    [LIST_TYPES.READY]: "Ready",
	[LIST_TYPES.IN_PROGRESS]: "In Progress",
	[LIST_TYPES.FINISHED]: "Finished"
};


export { USER_MENU_ITEMS, LIST_TYPES, LIST_TITLES };