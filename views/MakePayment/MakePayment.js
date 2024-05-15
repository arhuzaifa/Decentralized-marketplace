import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useMoralis } from "react-moralis";
//import Icon from "@material-ui/core/Icon";

import TextField from "@mui/material/TextField";
// @material-ui/icons
//import Email from "@material-ui/icons/Email";
//import People from "@material-ui/icons/People";

import Lock from "@mui/icons-material/LockTwoTone";
import Name from "@mui/icons-material/PeopleAltTwoTone";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
//import Question from "@material-ui/icons/Whatshot";

//import Zip from "@material-ui/icons/AirplanemodeInactive";

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
//import FormControl from "@material-ui/core/FormControl";
//import Datetime from "react-datetime";
//import CustomInput from "components/CustomInput/CustomInput.js";
import Box from "@mui/material/Box";
import DatePicker from "@mui/lab/DatePicker";
//import DateRangePicker from "@mui//DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
//import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

//import image from "assets/img/bg7.jpg";
const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
Transition.displayName = "Transition";

export default function LoginPage(props) {
  const { isAuthenticated, user } = useMoralis();
  const [value, setValue] = React.useState([null, null]);
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const [classicModal, setClassicModal] = React.useState(false);

  var id;
  var clientname;
  if (isAuthenticated) {
    id = user.id;
    clientname = user.attributes.username;
  }

  const { ...temp } = props;
  const projectId = temp.match.params.projectId;
  const [projects, setProject] = useState({
    _id: "",
    workerId: "",
    workerName: "",
  });

  const getProject = async () => {
    try {
      const res = await fetch(`/projects/${projectId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setProject(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      // history.push('/login');
    }
  };

  const [review, setReview] = useState({
    description: "",
  });

  const sendReview = () => {
    setClassicModal(true);
  };

  let name, val;
  const handleInputs = (e) => {
    console.log("Handle inputs block");
    name = e.target.name;
    val = e.target.value;
    console.log(e);
    setReview({ ...review, [name]: val });
  };

  const saveReview = async (e) => {
    e.preventDefault();
    setClassicModal(false);
    // console.log(e.target.value);
    const { description } = review;
    const clientId = id;
    const clientName = clientname;
    const workerId = projects.workerId;
    const workerName = projects.workerName;

    const res = await fetch("/review/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description,
        clientId,
        clientName,
        workerId,
        workerName,
      }),
    });
    console.log(res);
    console.log(res.message);
    const data = await res.json();

    // if (data.status === 42 || !data)
    if (data.status == 400 || !data) {
      window.alert("Invalid review");
      console.log("Invalid review");
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <div>
      <Header
        absolute
        color="white"
        brand="MARKAZ"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 40,
          color: "white",
        }}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundColor: "#008060",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="green" className={classes.cardHeader}>
                    <h4> Make Payment</h4>
                  </CardHeader>
                  <p className={classes.divider}></p>
                  <CardBody>
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "34ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        required
                        fullWidth
                        label="Card Number"
                        id="outlined-size-small"
                        //defaultValue="Small"
                        size="lg"
                        InputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Lock className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>

                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "34ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        required
                        fullWidth
                        label="Name on card"
                        id="outlined-size-small"
                        //defaultValue="Small"
                        size="lg"
                        InputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Name className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>

                    <GridContainer>
                      <GridItem xs={6} sm={6} md={5}>
                        <Box
                          component="form"
                          sx={{
                            "& .MuiTextField-root": { m: 1, width: "17ch" },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField
                            required
                            fullWidth
                            label="CVC"
                            id="outlined-size-small"
                            //defaultValue="Small"
                            size="small"
                          />
                        </Box>
                      </GridItem>

                      <GridItem xs={6} sm={6} md={7}>
                        <Box
                          component="form"
                          sx={{
                            "& .MuiTextField-root": { m: 1, width: "15ch" },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField
                            required
                            fullWidth
                            label="Zip Code"
                            id="outlined-size-small"
                            //defaultValue="Small"
                            size="small"
                          />
                        </Box>
                      </GridItem>
                    </GridContainer>
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "34ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Expiry Date "
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Box>

                    {/*<LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        label="From"
                        value={value}
                        minDate={new Date("2010-01-01")}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      </LocalizationProvider>*/}
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="black" onClick={sendReview}>
                      {" "}
                      Continue
                    </Button>
                  </CardFooter>
                </form>

                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal,
                  }}
                  open={classicModal}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => setClassicModal(false)}
                  aria-labelledby="classic-modal-slide-title"
                  aria-describedby="classic-modal-slide-description"
                >
                  <DialogTitle>Review Worker</DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <GridItem xs={12} sm={12} md={12}>
                      {/* <GridItem xs={12} sm={12} md={12}> */}

                      <form className={classes.form}>
                        <GridContainer>
                          <GridItem xs={6} sm={6} md={12}>
                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="description"
                              label="Write your comments..."
                              name="description"
                              variant="standard"
                              value={review.description}
                              onChange={handleInputs}
                            />
                          </GridItem>
                          <GridItem>
                            <Button color="green" href="" onClick={saveReview}>
                              Send Review
                            </Button>
                          </GridItem>
                        </GridContainer>
                      </form>

                      {/* </GridItem> */}
                    </GridItem>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Button
                      onClick={() => setClassicModal(false)}
                      color="black"
                      size="small"
                    >
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
