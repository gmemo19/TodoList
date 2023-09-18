import TocIcon from "@mui/icons-material/Toc";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Checkbox, IconButton, Input } from "@mui/material";
import { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { getTasksFromLocalStorage, saveTasksToLocalStorage } from "../helpers/services";


function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editedValue,setEditedValue] = useState([]);
  const [filterTask, setFilterTask] = useState("All");
  
  

  useEffect(() => {
    const savedTasks = getTasksFromLocalStorage();
    if (savedTasks.length > 0) {
      setTasks(savedTasks);
    }
  }, []);
  
  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };



  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      saveTasksToLocalStorage(tasks);
      setInputValue("");
     
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (taskId) => {
    const updatedCompletedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });

    setTasks(updatedCompletedTasks);
    
  };

  const handleEdit = (taskId) => {
    const editedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          editing: true,
        };
      }
      return task;
    });
    setTasks(editedTasks);
    setEditedValue({
      ...editedValue,
      [taskId]: tasks.find((task) => task.id === taskId).text,
    });
  };
  
  const handleBlur = (taskId) => {
    const editedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          editing: false,
          text: editedValue[taskId] || task.text, 
        };
      }
      return task;
    });
    setTasks(editedTasks);
    setEditedValue({
      ...editedValue,
      [taskId]: "", 
    });
  };
  
  const handleDeleteDoneTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };
  
  const handleDeleteAllTasks = () => {
    setTasks([]);
    saveTasksToLocalStorage([]);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterTask === "Done" && !task.completed) {
      return false;
    }
    if (filterTask === "Todo" && task.completed) {
      return false;
    }
    return true;
  });

  return (
    <Box height={"100%"} sx={{ width: "100%", mt: "25px" }}>
      <Box
        height={"300px"}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box fontSize={"25px"} fontWeight={"bold"} height={"50px"} mb={"15px"}>
          My List
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #000",
            borderRadius: "4px",
            width: "750px",
          }}
        >
          <TocIcon sx={{ m: 1 }} />
          <Input
            value={inputValue}
            placeholder="New Task"
            disableUnderline
            sx={{ flexGrow: 1 }}
            onChange={handleInputChange}
          />
          <IconButton type="button" sx={{ m: 1 }}>
            {inputValue ? <CloseIcon /> : <SearchIcon />}
          </IconButton>
        </Box>
        <Button
          sx={{ border: "1px solid #000", width: "500px", marginTop: "20px" }}
          onClick={handleAddTask}
        >
          Add new task
        </Button>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "750px",
            mt: 4,
          }}
        >
          <Button
            variant="outlined"
            sx={{ width: "200px", border: "1px solid #000" }}
            onClick={() => setFilterTask("All")}
          >
            All
          </Button>
          <Button
            variant="outlined"
            sx={{ width: "200px", border: "1px solid #000" }}
            onClick={() => setFilterTask("Done")}
          >
            Done
          </Button>
          <Button
            variant="outlined"
            sx={{ width: "200px", border: "1px solid #000" }}
            onClick={() => setFilterTask("Todo")}
          >
            Todo
          </Button>
        </Box>
      </Box>
      <Box
   
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {filteredTasks.map((task, index) => (
          <Box
            height={"50px"}
            key={task.id}
            sx={{
              width: "750px",
              border: "1px solid #000",
              mt: "15px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                paddingLeft: "15px",
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.editing ? (
    <Input
      value={editedValue[task.id] || ""}
      onChange={(e) => setEditedValue({ ...editedValue, [task.id]: e.target.value })}
          onBlur={() => handleBlur(task.id)} 
      fullWidth
      disableUnderline
    />
  ) : (
    task.text
  )}
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: "15px",
              }}
            >
              <Checkbox
                checked={task.completed}
                onClick={() => handleToggleComplete(task.id)}
              />
              <CreateIcon onClick={() => handleEdit(task.id)} />
              <DeleteIcon onClick={() => handleDeleteTask(task.id)} />
            </Box>
          </Box>
        ))}
      </Box>
      <Box  
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>

      <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "750px",
            mt: 4,
            mb:4,
          }}
        >
          <Button
            variant="outlined"
            sx={{ width: "300px", border: "1px solid #000" }}
            onClick={handleDeleteDoneTasks}
          >
            DELETE DONE TASK
          </Button>
          <Button
            variant="outlined"
            sx={{ width: "300px", border: "1px solid #000" }}
            onClick={handleDeleteAllTasks}
          >
            DELETE ALL TASK
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
