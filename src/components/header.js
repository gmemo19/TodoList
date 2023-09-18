import { Box } from "@mui/material";
import React from "react";

function Header() {



  return (
    <Box
      sx={{
        bgcolor: "#000000",
        height: "80px",
        minHeight:"80px",
        display: "flex",
        alignItems: "center",
        justifyContent:"center",
        width: "100%",
        boxSizing: "border-box",
        position: "sticky",
        top: "0",
        zIndex: "999",
      }}
    >
    <Box color={"#ffffff"} fontSize={"25px"}>MY ToDoList</Box>
    </Box>
  );
}

export default Header;