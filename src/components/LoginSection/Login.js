import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { auth } from "./auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

export default function Login() {
  const [loginEmail, setLogin] = React.useState("");
  const [loginpassword, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const login = async () => {
    try {
       await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginpassword
      );
      if (loginEmail === process.env.REACT_APP_ADMIN) {
        navigate("/StudentData");
      } else {
        navigate("/Dashboard");
      }
    } catch (error) {
      setVisible(true);
      console.log(error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setVisible(false);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CssBaseline />

          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                onChange={(event) => {
                  setLogin(event.target.value);
                }}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={login}
              >
                Sign In
              </Button>
            </Box>
            <Link onClick={() => navigate("/SignUp")} variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Container>
      </ThemeProvider>
      <Snackbar
        open={visible}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Enter a Valid Email or Password"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
         <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
         Invalid Email or Password
  </Alert>
        </Snackbar>
    </>
  );
}
