import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";

export default function FeeDetails({
  FeeAmount,
  feeAmount,
  feeName,
  FeeName,
  PaidOn,
  paidOn,
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
            label="Fee Amount"
            value={feeAmount}
            onChange={FeeAmount}
          />
          <TextField
            id="outlined-name"
            label="Fee Name"
            value={feeName}
            onChange={FeeName}
          />
          <TextField
            id="outlined-name"
            label="PaidOn"
            value={paidOn}
            onChange={PaidOn}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
