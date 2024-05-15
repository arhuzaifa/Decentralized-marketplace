import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
//import Button from "@mui/material/Button";
import Button from "components/CustomButtons/Button.js";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
//import List from "@mui/material/List";
//import ListItem from "@mui/material/ListItem";
//import ListItemText from "@mui/material/ListItemText";
//import classNames from "classnames";
// @material-ui/core components
//import { makeStyles } from "@material-ui/core/styles";

//import styles from "assets/jss/material-kit-react/views/landingPageSections/guidepage.js";
//const useStyles = makeStyles(styles);

const steps = [
  {
    label: "Sign Up",
    description: `Sign up to the website by providing your email and password.
    Verify your details and explore our services. `,
  },

  {
    label: "Find Worker",
    description: `Use filters to search any services.
    Explore the profiles of workers and find your desired worker.
    Post your custom jobs and let the workers contact you.
    Let the workers bid for your jobs. `,
    /*<List>
        <ListItem>
          <ListItemText primary="No need to worry about hourly rates.Maximize your benefit and bid for your work." />
        </ListItem>
        <ListItem>
          <ListItemText primary="No need to worry about hourly rates.Maximize your benefit and bid for your work." />
        </ListItem>
        <ListItem>
          <ListItemText primary="No need to worry about hourly rates.Maximize your benefit and bid for your work." />
        </ListItem>
      </List>*/
  },
  {
    label: "Hire Worker",
    description: `Compare the bids and select the most suitable worker.
    Check out worker's reviews/ratings and decide.
    Contact the worker and finalize the job.
    Hire the worker and get your task done. `,
  },
  {
    label: "Pay",
    description: `Once your task is complete, pay the custmer using our any of our payment channels.
    We provide the following payments channels:
        1- Cash on Delivery.
        2- Bank Payments.
        3- Crypto Tokens.
    Verify your payment and you're done! 
   `,
  },
];

export default function VerticalLinearStepper() {
  //const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 900 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    color="green"
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          {/*<Typography>All steps completed - you&apos;re finished</Typography>*/}
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Back to top
          </Button>
        </Paper>
      )}
    </Box>
  );
}
