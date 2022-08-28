import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import Paper from "@mui/material/Paper";
import { auth } from "../LoginSection/auth";
import { signOut } from "firebase/auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function Dashboard() {
  const nav = useNavigate();
  const [handleData, setHandleData] = React.useState("");

  const [obj, setobj] = React.useState({});
  const handle = (e) => {
    setHandleData(e.target.value);
  };

  const logout = async () => {
    await signOut(auth);
    nav("/");
  };

  const getDetails = async () => {
    await getUserCreds();
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}get/${handleData}`)
      .then((res) => {
        setobj(res.data);
        console.log("Result:", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserCreds = async () => {
    try {
      onAuthStateChanged(auth, (currentUser) => {
        console.log(currentUser);
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box display="flex" justifyContent="right">
          <Box padding={1}>
            <Button onClick={logout} color="neutral" variant="contained">
              Log Out
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
      <Container>
        <Box display="flex" justifyContent="center" marginTop={6}>
          <TextField
            id="filled-basic"
            label="Enter your Roll"
            variant="filled"
            value={handleData}
            onChange={handle}
          />
        </Box>
        <Box display="flex" justifyContent="center" padding={1}>
          <Button onClick={getDetails} variant="contained">
            Get Details
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",

            justifyContent: " center",
            "& > :not(style)": {
              m: 5,

              width: 200,
              height: 300,
            },
          }}
        >
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
                  <StyledTableCell align="center">
                    Mobile Number
                  </StyledTableCell>
                  <StyledTableCell align="center">Paid On</StyledTableCell>
                  <StyledTableCell align="center">Payment Mode</StyledTableCell>
                  <StyledTableCell align="center">Fee Amount</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {obj ? (
                  <StyledTableRow key={obj.id}>
                    <StyledTableCell align="center">
                      {obj.firstName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {obj.lastName}
                    </StyledTableCell>
                    <StyledTableCell align="center">{obj.roll}</StyledTableCell>
                    <StyledTableCell align="center">
                      {obj.mobileNumber}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {obj.paidOn}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {obj.paymentMode}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {obj.feeAmount}
                    </StyledTableCell>
                  </StyledTableRow>
                ) : (
                  <StyledTableRow align="center">
                    Access Denied...
                    <br /> (Write Your Correct Roll)
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
}
