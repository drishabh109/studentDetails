import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import { auth } from "../LoginSection/auth";
import { signOut } from "firebase/auth";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
 
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function StudentData() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}get`)
      .then((res) => {
        setData(res.data);
        console.log("Result:", data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box display="flex" justifyContent="space-between" padding="0px 20px">
          <h3>Student List</h3>
          <Box display="flex" justifyContent="right">
            <Box padding={2}>
              <Button
                onClick={() => navigate("/student")}
                color="neutral"
                variant="contained"
              >
                Add Student
              </Button>
              <Button onClick={logout} color="neutral" variant="outlined">
                Log Out
              </Button>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700 }}
          aria-label="customized table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              <StyledTableCell align="center">Roll</StyledTableCell>
              <StyledTableCell align="center">Mobile Number</StyledTableCell>
              <StyledTableCell align="center">Paid On</StyledTableCell>
              <StyledTableCell align="center">Payment Mode</StyledTableCell>
              <StyledTableCell align="center">Fee Amount</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="center">
                  {row.firstName}
                </StyledTableCell>
                <StyledTableCell align="center">{row.lastName}</StyledTableCell>
                <StyledTableCell align="center">{row.roll}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.mobileNumber}
                </StyledTableCell>
                <StyledTableCell align="center">{row.paidOn}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.paymentMode}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.feeAmount}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
