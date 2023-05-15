import React from "react";
import { Box } from "@chakra-ui/react";

function Layout({ children }) {
  return (
    <>
      <Box p="10">{children}</Box>
    </>
  );
}

export default Layout;
