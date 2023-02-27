import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";

// компонент App: рендерит контейнер с основными частями приложения: header, main, footer
function App() {
  const initialTasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(initialTasks);
  
  useEffect(() => {
    try {
      window.localStorage.setItem("tasks", JSON.stringify(tasks))
    } catch(err) {
      alert(`Error: ${err.message}`);
    };
  }, [tasks]);  

  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Main tasks={tasks} setTasks={setTasks} />
        <Footer tasks={tasks} />      
      </div>
    </BrowserRouter>
  );
};


export default App;
