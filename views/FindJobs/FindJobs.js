import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import WorkerHeaderLinks from "components/Header/WorkerHeaderLinks.js";

import Button from "components/CustomButtons/Button.js";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import Card from "components/Card/Card.js";
// import CardBody from "components/Card/CardBody.js";
// import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
// import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import styles from "assets/jss/material-kit-react/views/findJobsPage.js";
// import { ListItemSecondaryAction } from "@material-ui/core";
// import CustomInput from "components/CustomInput/CustomInput.js";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

// import SearchBar from "";

// import image from "assets/img/bg7.jpg";
// import helper from "assets/img/services/helper.jpg";
// import team1 from "assets/img/faces/test1.jpg";
//import team2 from "assets/img/faces/christian.jpg";
//import team3 from "assets/img/faces/test3.jpg";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";

var ContractAddress = "";
// var accountLinked = "";
// var currentUser = 0;
// var contract = 0;
var provider = 0;
var signer = 0;
var numberContract = "";
var ContractAbi = "";
const useStyles = makeStyles(styles);
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function FindJobs(props) {
  const { isAuthenticated, user } = useMoralis();
  const setSeller = async (price, id) => {
    try {
      //   // const id = await user.id;
      //   // console.log(user.id);

      const res = await fetch(`/contract/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      ContractAddress = data.ContractAddress;
      console.log(ContractAddress);

      // if (data) {
      //   // console.log("WE HEREEE");
      //   setReference("/worker-dashboard");
      //   // reference = "/worker-dashboard";
      // } else {
      //   setReference("/worker-page");
      //   // reference = "/worker-page";
      // }

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      // history.push('/login');
    }
    console.log("price:", price);
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    ContractAbi = [
      "function setSeller(address payable _seller,address payable _owner, uint256 _price) escrowNotStarted public",
    ];
    numberContract = new ethers.Contract(ContractAddress, ContractAbi, signer);
    const txResponse = await numberContract.setSeller(
      user.attributes.ethAddress,
      "0x5385f16f6d616B4a4b3ebFeAC012e1c6dcf11F4E",
      price
    );
    await txResponse.wait();
    console.log(txResponse.hash);
    return;
  };
  var idd, name_worker;
  if (isAuthenticated) {
    idd = user.id;
    console.log(user);
    name_worker = user.attributes.username;
  }
  // const [bid, setBidData] = useState({
  //   price: "",
  // });
  // let name, value;
  // const handleInputs = (e) => {
  //   name = e.target.name;
  //   value = e.target.value;
  //   console.log(e);
  //   setBidData({ ...bid, [name]: value });
  // };
  const initialValues = {
    price: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setFormErrors(validate(formValues));
  //   setIsSubmit(true);
  //   console.log(Object.keys(formErrors).length);
  //   console.log(isSubmit);
  //   // if (Object.keys(formErrors).length === 0 && isSubmit) {
  //   //   postData();
  //   //   history.push("/customjobs-page/" + id_of.id);
  //   // }
  // };
  // function checkData(job_id, id) {
  //   console.log("inside Check data");
  //   console.log(Object.keys(formErrors).length);
  //   console.log(isSubmit);
  //   postBid(job_id, id);
  //   // postData();
  // }
  // const validate = (values) => {
  //   const errors = {};
  //   // const regex = /^[a-zA-Z ]*$/;

  //   ////////////////////////////////////////////////////
  //   if (!values.price) {
  //     errors.price = "Price is required!";
  //   } else if (values.price < 1) {
  //     errors.price = "Price should be greater than 0";
  //   }
  //   /////////////////////////////////////
  //   return errors;
  // };
  const [job, getJobData] = useState({
    jobs: [
      {
        _id: "",
        title: "",
        budget: "",
        city: "",
        address: "",
        category: "",
        description: "",
        picture: "",
      },
    ],
  });

  const postBid = async (job_id, id) => {
    // e.preventDefault();
    // console.log(e.target.value);
    // console.log(id + "CHECKING");
    // const { job_id } = id;
    // console.log(id);
    // console.log(job_id);
    const errors = {};
    if (!formValues.price) {
      errors.price = "Price is required!";
      setFormErrors(errors);
      return;
    } else if (formValues.price < 1) {
      errors.price = "Price should be greater than 0";
      setFormErrors(errors);
      return;
    }
    setFormErrors(errors);
    const { price } = formValues;
    setSeller(price, job_id);
    const workerId = idd;
    const workerName = name_worker;
    const res = await fetch("/bids/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price,
        job_id,
        workerId,
        workerName,
      }),
    });
    // setDisabledButtons(prevState => [...prevState, id]);
    setDisable((prevState) => [...prevState, id]);
    setOpen(true);

    const data = await res.json();

    if (data.status === 42 || !data) {
      window.alert("Invalid registeration");
      console.log("Invalid registeration");
    } else {
      // history.push("/landing-page");
    }
  };

  // const ViewJobsData = async () => {
  //   // console.log("Check");
  //   try {
  //     const res = await fetch("/job", {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await res.json();
  //     console.log(data);
  //     getJobData(data);

  //     if (!res.status === 200) {
  //       const error = new Error(res.error);
  //       throw error;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     // history.push('/login');
  //   }
  // };

  const checkFunction = () => {
    const source = new EventSource(`http://localhost:6942/jobs/getAll`);

    source.addEventListener("open", () => {
      console.log("SSE opened!");
    });

    source.addEventListener("message", (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
      // console.log(e);
      // console.log("Event called: ", e.data);
      getJobData(data);
      // const data = JSON.parse(e.data);
    });

    // source.addEventListener("error", (e) => {
    //   console.error("Error: ", e);
    // });

    return () => {
      source.close();
    };
  };

  useEffect(() => {
    // ViewJobsData();
    checkFunction();
  }, []);

  const [open, setOpen] = React.useState(false);
  const [disable, setDisable] = React.useState([]);
  const classes = useStyles();
  const { ...rest } = props;
  // const handleClick = () => {
  //   // prop.setDisable(true);
  //   setDisable(true);
  //   setOpen(true);
  // };

  const handleClose = () => {
    // if (reason === "clickaway") {
    //   return;
    // }

    setOpen(false);
  };

  const searchHandle = async (event) => {
    // console.warn();
    let key = event.target.value;
    if (key) {
      let result = await fetch(`/job/${key}`);
      result = await result.json();
      if (result) {
        getJobData(result);
      }
    } else {
      checkFunction();
    }
  };

  return (
    <div>
      <Header
        absolute
        color="black"
        brand="MARKAZ"
        rightLinks={<WorkerHeaderLinks />}
        {...rest}
      />
      <div className={classes.pageHeader}>
        <div className={classes.container}>
          <h2 className={classes.title}>Find Jobs of your interest!</h2>
          <h3 className={classes.desc}>
            Choose from a number of jobs posted from different areas, place your
            bids to get selected.
          </h3>
          <div className={classes.new}>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 700,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search for desired jobs..."
                inputProps={{ "aria-label": "search google maps" }}
                onChange={searchHandle}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            {/* <CustomInput
              black
              inputProps={{
                placeholder: "Search",
                inputProps: {
                  "aria-label": "Search",
                  className: classes.searchInput,
                  //error: true,
                },
              }}
            />

            <Button color="green" className={classes.searchBtn}>
              <i className="fas fa-search" />
              Search
            </Button> */}
          </div>
          {/* <SearchBar
            onChange={() => console.log("onChange")}
            onRequestSearch={() => console.log("onRequestSearch")}
            style={{
              margin: "0 auto",
              maxWidth: 800,
            }}
          /> */}
          <List>
            {/* {console.log(job)} */}
            {job.jobs.map((jobs, index) => {
              const id = `b${index}`;
              return (
                <ListItem alignItems="flex-start" key={index}>
                  <Card className={classes.jobCard}>
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src={"data:image/png;base64," + jobs.picture}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography className={classes.heading}>
                          <strong> {jobs.title}</strong>
                        </Typography>
                      }
                      secondary={
                        <React.Fragment>
                          {/* <Typography
                            className={classes.heading}
                            color="text.primary"
                          >
                            Ali Connors
                          </Typography> */}
                          {jobs.description}
                          <br /> <br />
                          <strong> {jobs.budget}</strong>
                          <Divider
                            sx={{ width: 1000, m: 0.5 }}
                            orientation="horizontal"
                          />
                          <TextField
                            defaultValue="45"
                            InputProps={{ inputProps: { min: 0 } }}
                            variant="standard"
                            type="number"
                            id="price"
                            label="Bid"
                            name="price"
                            value={formValues.price}
                            onChange={handleChange}
                            sx={{ width: 60 }}
                          />
                          <p className={classes.warningPara}>
                            {formErrors.price}
                          </p>
                          {/* <TextField
                            type="hidden"
                            id="job_id"
                            label="job_id"
                            name="job_id"
                            value={jobs._id}
                          /> */}
                          <Button
                            color="green"
                            size="md"
                            // href="/signup-page"
                            // target="_blank"
                            disabled={disable.includes(id)}
                            id={id}
                            rel="noopener noreferrer"
                            className={classes.jobBtn}
                            onClick={() => postBid(jobs._id, id)}
                          >
                            <i className="fas fa-dollar-sign" />
                            Make Bid
                          </Button>
                          {/* {Object.keys(formErrors).length === 0 && isSubmit
                            ? // <div className="ui message success">Signed in successfully</div>
                              checkData(jobs._id, id)
                            : console.log("Error in form!")} */}
                        </React.Fragment>
                      }
                    />
                  </Card>
                  {/* <Button
                    color="black"
                    size="md"
                    href="/signup-page"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.searchBtn}
                  >
                    <i className="fas fa-check" />
                    Bid
                  </Button> */}
                </ListItem>

                // <ListItem alignItems="flex-start">
                //   <Card className={classes.jobCard}>
                //     <ListItemAvatar>
                //       <Avatar alt="Travis Howard" src={team2} />
                //     </ListItemAvatar>
                //     <ListItemText
                //       primary={
                //         <Typography className={classes.heading}>
                //           <strong>Title: Plumbing</strong>
                //         </Typography>
                //       }
                //       secondary={
                //         <React.Fragment>
                //           <Typography
                //             className={classes.heading}
                //             color="text.primary"
                //           >
                //             Ali Connors
                //           </Typography>
                //           Ill be in your neighborhood doing errands this… Ill be in
                //           your neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           <br /> <br />
                //           <strong>Max bid: $45</strong>
                //           <Divider
                //             sx={{ width: 1000, m: 0.5 }}
                //             orientation="horizontal"
                //           />
                //           <TextField
                //             defaultValue="45"
                //             InputProps={{ inputProps: { min: 0 } }}
                //             variant="standard"
                //             type="number"
                //             id="bid"
                //             label=" "
                //             sx={{ width: 60 }}
                //           />
                //           <Button
                //             color="green"
                //             size="md"
                //             // href="/signup-page"
                //             // target="_blank"
                //             // disabled={disable}
                //             rel="noopener noreferrer"
                //             className={classes.jobBtn}
                //             onClick={handleClick}
                //           >
                //             <i className="fas fa-dollar-sign" />
                //             Make Bid
                //           </Button>
                //           {/* <Snackbar
                //             open={open}
                //             autoHideDuration={6000}
                //             onClose={handleClose}
                //           >
                //             <Alert
                //               onClose={handleClose}
                //               severity="success"
                //               sx={{ width: "100%" }}
                //             >
                //               Bid placed successfully!
                //             </Alert>
                //           </Snackbar> */}
                //         </React.Fragment>
                //       }
                //     />
                //   </Card>
                // </ListItem>
                // {/* <Divider variant="inset" component="li" /> */}
                // {/* </div> */}
                // {/* <div className={classes.newClass}> */}
                // <ListItem alignItems="flex-start">
                //   <Card className={classes.jobCard}>
                //     <ListItemAvatar>
                //       <Avatar alt="Cindy Baker" src={team3} />
                //     </ListItemAvatar>
                //     <ListItemText
                //       primary={
                //         <Typography className={classes.heading}>
                //           <strong>Title: Plumbing</strong>
                //         </Typography>
                //       }
                //       secondary={
                //         <React.Fragment>
                //           <Typography
                //             className={classes.heading}
                //             color="text.primary"
                //           >
                //             Ali Connors
                //           </Typography>
                //           Ill be in your neighborhood doing errands this… Ill be in
                //           your neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           <br /> <br />
                //           <strong>Max bid: $45</strong>
                //           <Divider
                //             sx={{ width: 1000, m: 0.5 }}
                //             orientation="horizontal"
                //           />
                //           <TextField
                //             defaultValue="45"
                //             InputProps={{ inputProps: { min: 0 } }}
                //             variant="standard"
                //             type="number"
                //             id="bid"
                //             label=" "
                //             sx={{ width: 60 }}
                //           />
                //           <Button
                //             color="green"
                //             size="md"
                //             // href="/signup-page"
                //             // target="_blank"
                //             // disabled={disable}
                //             rel="noopener noreferrer"
                //             className={classes.jobBtn}
                //             onClick={handleClick}
                //           >
                //             <i className="fas fa-dollar-sign" />
                //             Make Bid
                //           </Button>
                //           {/* <Snackbar
                //             open={open}
                //             autoHideDuration={6000}
                //             onClose={handleClose}
                //           >
                //             <Alert
                //               onClose={handleClose}
                //               severity="success"
                //               sx={{ width: "100%" }}
                //             >
                //               Bid placed successfully!
                //             </Alert>
                //           </Snackbar> */}
                //         </React.Fragment>
                //       }
                //     />
                //   </Card>
                // </ListItem>
                // {/* <Divider variant="inset" component="li" /> */}
                // {/* </div> */}
                // {/* <div className={classes.newClass}> */}
                // <ListItem alignItems="flex-start">
                //   <Card className={classes.jobCard}>
                //     <ListItemAvatar>
                //       <Avatar alt="Remy Sharp" src={team1} />
                //     </ListItemAvatar>
                //     <ListItemText
                //       primary={
                //         <Typography className={classes.heading}>
                //           <strong>Title: Plumbing</strong>
                //         </Typography>
                //       }
                //       secondary={
                //         <React.Fragment>
                //           <Typography
                //             className={classes.heading}
                //             color="text.primary"
                //           >
                //             Ali Connors
                //           </Typography>
                //           Ill be in your neighborhood doing errands this… Ill be in
                //           your neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           <br /> <br />
                //           <strong>Max bid: $45</strong>
                //           <Divider
                //             sx={{ width: 1000, m: 0.5 }}
                //             orientation="horizontal"
                //           />
                //           <TextField
                //             defaultValue="45"
                //             InputProps={{ inputProps: { min: 0 } }}
                //             variant="standard"
                //             type="number"
                //             id="bid"
                //             label=" "
                //             sx={{ width: 60 }}
                //           />
                //           <Button
                //             color="green"
                //             size="md"
                //             // href="/signup-page"
                //             // target="_blank"
                //             // disabled={disable}
                //             rel="noopener noreferrer"
                //             className={classes.jobBtn}
                //             onClick={handleClick}
                //           >
                //             <i className="fas fa-dollar-sign" />
                //             Make Bid
                //           </Button>
                //           {/* <Snackbar
                //             open={open}
                //             autoHideDuration={6000}
                //             onClose={handleClose}
                //           >
                //             <Alert
                //               onClose={handleClose}
                //               severity="success"
                //               sx={{ width: "100%" }}
                //             >
                //               Bid placed successfully!
                //             </Alert>
                //           </Snackbar> */}
                //         </React.Fragment>
                //       }
                //     />
                //   </Card>
                // </ListItem>
                // {/* <Divider variant="inset" component="li" /> */}
                // {/* </div> */}
                // {/* <div className={classes.newClass}> */}
                // <ListItem alignItems="flex-start">
                //   <Card className={classes.jobCard}>
                //     <ListItemAvatar>
                //       <Avatar alt="Travis Howard" src={team2} />
                //     </ListItemAvatar>
                //     <ListItemText
                //       primary={
                //         <Typography className={classes.heading}>
                //           <strong>Title: Plumbing</strong>
                //         </Typography>
                //       }
                //       secondary={
                //         <React.Fragment>
                //           <Typography
                //             className={classes.heading}
                //             color="text.primary"
                //           >
                //             Ali Connors
                //           </Typography>
                //           Ill be in your neighborhood doing errands this… Ill be in
                //           your neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           <br /> <br />
                //           <strong>Max bid: $45</strong>
                //           <Divider
                //             sx={{ width: 1000, m: 0.5 }}
                //             orientation="horizontal"
                //           />
                //           <TextField
                //             defaultValue="45"
                //             InputProps={{ inputProps: { min: 0 } }}
                //             variant="standard"
                //             type="number"
                //             id="bid"
                //             label=" "
                //             sx={{ width: 60 }}
                //           />
                //           <Button
                //             color="green"
                //             size="md"
                //             // href="/signup-page"
                //             // target="_blank"
                //             // disabled={disable}
                //             rel="noopener noreferrer"
                //             className={classes.jobBtn}
                //             onClick={handleClick}
                //           >
                //             <i className="fas fa-dollar-sign" />
                //             Make Bid
                //           </Button>
                //           {/* <Snackbar
                //             open={open}
                //             autoHideDuration={6000}
                //             onClose={handleClose}
                //           >
                //             <Alert
                //               onClose={handleClose}
                //               severity="success"
                //               sx={{ width: "100%" }}
                //             >
                //               Bid placed successfully!
                //             </Alert>
                //           </Snackbar> */}
                //         </React.Fragment>
                //       }
                //     />
                //   </Card>
                // </ListItem>
                // {/* <Divider variant="inset" component="li" /> */}
                // {/* </div> */}
                // {/* <div className={classes.newClass}> */}
                // <ListItem alignItems="flex-start">
                //   <Card className={classes.jobCard}>
                //     <ListItemAvatar>
                //       <Avatar alt="Cindy Baker" src={team3} />
                //     </ListItemAvatar>
                //     <ListItemText
                //       primary={
                //         <Typography className={classes.heading}>
                //           <strong>Title: Plumbing</strong>
                //         </Typography>
                //       }
                //       secondary={
                //         <React.Fragment>
                //           <Typography
                //             className={classes.heading}
                //             color="text.primary"
                //           >
                //             Ali Connors
                //           </Typography>
                //           Ill be in your neighborhood doing errands this… Ill be in
                //           your neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           neighborhood doing errands this… Ill be in your
                //           <br /> <br />
                //           <strong>Max bid: $45</strong>
                //           <Divider
                //             sx={{ width: 1000, m: 0.5 }}
                //             orientation="horizontal"
                //           />
                //           <TextField
                //             defaultValue="45"
                //             InputProps={{ inputProps: { min: 0 } }}
                //             variant="standard"
                //             type="number"
                //             id="bid"
                //             label=" "
                //             sx={{ width: 60 }}
                //           />
                //           <Button
                //             color="green"
                //             size="md"
                //             // href="/signup-page"
                //             // target="_blank"
                //             // disabled={disable}
                //             rel="noopener noreferrer"
                //             className={classes.jobBtn}
                //             onClick={handleClick}
                //           >
                //             <i className="fas fa-dollar-sign" />
                //             Bid
                //           </Button>
                //           {/* <Snackbar
                //             open={open}
                //             autoHideDuration={6000}
                //             onClose={handleClose}
                //           >
                //             <Alert
                //               onClose={handleClose}
                //               severity="success"
                //               sx={{ width: "100%" }}
                //             >
                //               Bid placed successfully!
                //             </Alert>
                //           </Snackbar> */}
                //         </React.Fragment>
                //       }
                //     />
                //   </Card>
                // </ListItem>
                // {/* </div> */}
              );
            })}
            <Snackbar
              open={open}
              // id={id}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                // id={id}
                severity="success"
                sx={{ width: "100%" }}
              >
                Bid placed successfully!
              </Alert>
            </Snackbar>
          </List>
        </div>
      </div>
    </div>
  );
}
