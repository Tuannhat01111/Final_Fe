import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
const AdminElement = ({ children }) => {
  const role = useSelector((state) => state.auth.role);
  if (role === "Administrator") {
    return <>{children}</>;
  } else {
    return <Box>You do not have access to this page</Box>;
  }
};

export default AdminElement;