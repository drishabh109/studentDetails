import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";

export default function StudentRoll({
  firstName,
  FirstName,
  lastName,
  LastName,
  mobileNumber,
  Mobile,
  roll,
  Roll,
}) {
  return (
    <Grid
      container
      component="main"
      sx={{ height: "50vh", alignItems: "center", justifyContent: "center" }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 4, width: "50ch", display: "flex" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-name"
            label="Student's First Name"
            value={firstName}
            onChange={FirstName}
          />
          <TextField
            id="outlined-name"
            label="Student's Last Name"
            value={lastName}
            onChange={LastName}
          />
          <TextField
            id="outlined-name"
            label="Roll"
            value={roll}
            onChange={Roll}
          />
          <TextField
            id="outlined-name"
            label="Mobile Number"
            value={mobileNumber}
            onChange={Mobile}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
