import { Box } from "@mui/material";
import Header from "./header";
import HomePage from "./homePage";


function MainPage() {
    

    return(
        <Box  display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        width="100%"
        overflow={"auto"}
        height={"100%"}
        sx={{ overflowX: "clip" }}>

    <Header/>
    <HomePage />
        </Box>
    )
};

export default MainPage;