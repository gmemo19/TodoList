import { Box } from '@mui/material';
import './App.css';
import MainPage from './components/mainPage';
import { useEffect } from 'react';
import { getTasksFromLocalStorage, saveTasksToLocalStorage } from './helpers/services';

function App({tasks}) {
  useEffect(() => {
    getTasksFromLocalStorage();
   }, []);
 
   useEffect((tasks) => {
     saveTasksToLocalStorage();
   }, [tasks]);
  
  return (
    <Box style={{height:"100%",width:"100%"}}>
<MainPage />
    </Box>
  );
}

export default App;
