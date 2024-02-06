import React from "react";
import { Pagination, createTheme, ThemeProvider } from "@mui/material/";

function CustomPagination({ setPage, numOfPages = 10 }) {
  const handleChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  const theme = createTheme({
    palette: {
      type: "dark",
      
    },
  });
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <ThemeProvider theme={theme}>
        <Pagination
          count={numOfPages}
          onChange={(e) => handleChange(e.target.textContent)}
          color="primary"
        />
      </ThemeProvider>
    </div>
  );
}

export default CustomPagination;
