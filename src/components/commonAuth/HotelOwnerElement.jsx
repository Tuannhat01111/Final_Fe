import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const HotelOwnerElement = ({ children }) => {
  const role = useSelector((state) => state.auth.role);
  if (role === "Hotel Owner") {
    return <>{children}</>;
  } else {
    return <Box>You do not have access to this page</Box>;
  }
};

export default HotelOwnerElement;