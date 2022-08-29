import { CircularProgress, Stack } from "@mui/material";
import React from "react";

export default function BasicSpinner() {
  return (
    <Stack
      direction="column"
      sx={{ height: "100%", width: "100%" }}
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Stack>
  );
}
