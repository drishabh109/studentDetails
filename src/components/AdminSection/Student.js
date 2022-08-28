import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StudentRoll from "./studentRoll";
import FeeDetails from "./feeDetails";
import FeeTransaction from "./feeTransaction";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const steps = ["Students' Roll", "Fee Details", "Fee Transaction"];

export default function Student() {
  const nav = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [feeAmount, setFeeAmount] = React.useState("");
  const [feeName, setfeeName] = React.useState("");
  const [paidOn, setPaidOn] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [roll, setRoll] = React.useState();
  const [mobileNumber, setmobileNumber] = React.useState();
  const [paymentMode, setPaymentMode] = React.useState("");

  const FirstName = (event) => {
    setFirstName(event.target.value);
  };
  const LastName = (event) => {
    setLastName(event.target.value);
  };
  const Roll = (event) => {
    setRoll(event.target.value);
  };
  const Mobile = (event) => {
    setmobileNumber(event.target.value);
  };
  const FeeAmount = (event) => {
    setFeeAmount(event.target.value);
  };
  const FeeName = (event) => {
    setfeeName(event.target.value);
  };
  const PaidOn = (event) => {
    setPaidOn(event.target.value);
  };
  const PaymentMode = (event) => {
    setPaymentMode(event.target.value);
  };
  console.log(
    firstName,
    lastName,
    roll,
    mobileNumber,
    feeName,
    feeAmount,
    paidOn
  );

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const postData = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}post`, {
        firstName,
        lastName,
        roll,
        mobileNumber,
        paidOn,
        paymentMode,
        feeAmount,
        feeName,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleNext = () => {
    if (activeStep === 2) {
      postData();
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    nav("/studentData");
  };
  console.log(activeStep);

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography
            sx={{
              mt: 2,
              mb: 1,
              display: "flex",
              justifyContent: "center",
              margin: 25,
            }}
          >
            All steps completed
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }} />
          <Button onClick={handleReset}>Student Section</Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1, align: "center" }}>
            {activeStep === 0 ? (
              <StudentRoll
                firstName={firstName}
                FirstName={FirstName}
                lastName={lastName}
                roll={roll}
                mobileNumber={mobileNumber}
                LastName={LastName}
                Roll={Roll}
                Mobile={Mobile}
              />
            ) : activeStep === 1 ? (
              <FeeDetails
                FeeAmount={FeeAmount}
                feeAmount={feeAmount}
                feeName={feeName}
                FeeName={FeeName}
                paidOn={paidOn}
                PaidOn={PaidOn}
              />
            ) : (
              <FeeTransaction
                PaymentMode={PaymentMode}
                paymentMode={paymentMode}
                FeeAmount={FeeAmount}
                feeAmount={feeAmount}
                paidOn={paidOn}
                PaidOn={PaidOn}
              />
            )}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              margin: "auto",
              pt: 8,
            }}
          >
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
