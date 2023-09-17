


export const saveTasksToLocalStorage = (tasks) => {
  window.localStorage.setItem("tasks",JSON.stringify(tasks));
  
  };

  export const getTasksFromLocalStorage = () => {
    if (window.localStorage.getItem("tasks") === null || window.localStorage.getItem("tasks") === "undefined") {
     window.localStorage.setItem("tasks",JSON.stringify([]));
     return [];
    } else {
     return JSON.parse(window.localStorage.getItem("tasks"));
    }
 };
  
  