import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components

import Button from "components/CustomButtons/Button.js";
import { Delete, Edit } from "@material-ui/icons";

import Card from "components/Card/Card.js";
// import CardBody from "components/Card/CardBody.js";
// import Divider from "@mui/material/Divider";
// import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import styles from "assets/jss/material-kit-react/views/customJobs.js";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

//import IconButton from "@material-ui/core/IconButton";
//import Close from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// import { ListItemSecondaryAction } from "@material-ui/core";
//import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Preloader } from "components/UIHelper/preloader.jsx";

//import ListItemIcon from "@mui/material/ListItemIcon";
//import Divider from "@mui/material/Divider";
//import InboxIcon from "@mui/icons-material/Inbox";
//import DraftsIcon from "@mui/icons-material/Drafts";

// import SearchBar from "";

// import image from "assets/img/bg7.jpg";
// import helper from "assets/img/services/helper.jpg";
import team1 from "assets/img/faces/test1.jpg";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";

// import team2 from "assets/img/faces/christian.jpg";
// import team3 from "assets/img/faces/test3.jpg";
var ContractAddress = "";
// var accountLinked = "";
// var currentUser = 0;
var job_id = 0;
var provider = 0;
var signer = 0;
var numberContract = "";
var ContractAbi = "";
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function CustomJobsView(props) {
  const [loading, setLoading] = useState(true);

  const { ...rest } = props;
  console.log(rest);
  const userId = rest.userId;
  const [description, setDesc] = useState("");
  console.log(userId);
  // const userId = temp.match.params.userId;
  // const { isAuthenticated, user } = useMoralis();
  // var clientId;

  const { isAuthenticated, user } = useMoralis();
  var clientName;
  // var picture;
  if (isAuthenticated) {
    clientName = user.attributes.username;
    // picture = user.attributes.picture;
  }
  const deposit = async (cost) => {
    console.log("jobID: ", job_id);
    try {
      // const id = await user.id;
      // console.log(user.id);

      const res = await fetch(`/contract/${job_id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      ContractAddress = data.ContractAddress;
      // ContractAddress = data.ContractAddress;

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
    const value = ethers.utils.parseEther(cost); // ether in this case MUST be a string
    ContractAbi = ["function BuyerDeposit() onlyBuyer public payable"];
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    numberContract = new ethers.Contract(ContractAddress, ContractAbi, signer);
    const txResponse = await numberContract.BuyerDeposit({
      value: String(value),
      gasPrice: 20e9,
    });
    await txResponse.wait();
    console.log(txResponse.hash);
  };
  const checkFunction = async (id) => {
    // console.log("IM CALLED");
    try {
      const res = await fetch(`/jobs/check/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      getJobData(data);
      setLoading(false);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      // history.push('/login');
    }
    return;
  };

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

  const [bid, getBidData] = useState({
    bids: [
      {
        _id: "",
        price: "",
        workerName: "",
      },
    ],
  });
  const DeleteJob = async (id) => {
    // console.log("Check");
    try {
      const res = await fetch(`/job/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const postProject = async (bidId) => {
    // e.preventDefault();
    // console.log(e.target.value);
    // console.log(id + "CHECKING");
    // const { job_id } = id;
    // console.log(id);
    // console.log(job_id);
    // const { price } = bid;
    // const workerId = idd;

    // getting bid data against id to get associated workerId
    // console.log(bidId, "BID IDDDDDDDDDDDDDDDDDDDDDDDDDDD");
    const res = await fetch(`/bids/id/${bidId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    // setWorkerData(data);

    if (!res.status === 200) {
      const error = new Error(res.error);
      throw error;
    }

    // getting worker data against the Id of the worker
    // const workerRes = await fetch(`("/worker/${data.workerId}`, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // });

    // const workerData = await workerRes.json();
    // console.log(workerData);
    // // setWorkerData(data);

    // if (!workerRes.status === 200) {
    //   const error = new Error(workerRes.error);
    //   throw error;
    // }

    const workerName = data.workerName;
    const workerId = data.workerId;
    const clientId = userId;
    const budget = data.price;
    const status = "Ongoing";
    const deposited = true;
    // const consdition = "deposited";
    //passing bid value to the deposit function
    deposit(budget);
    // post request to enter project details in the project table
    const proejctRes = await fetch(`/projects/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientName,
        clientId,
        workerName,
        workerId,
        budget,
        description,
        status,
        job_id,
        deposited,
      }),
    });

    const projectData = await proejctRes.json();
    setClassicModal(false);

    if (projectData.status === 42 || !projectData) {
      window.alert("Invalid registeration");
      console.log("Invalid registeration");
    } else {
      // history.push("/landing-page");
    }
  };

  const viewBids = async (id, jobDescription) => {
    // console.log("VIEW BIDS CALLED");
    // console.log(source);
    setDesc(jobDescription);
    job_id = id;
    console.log("JobID in viewbids ", job_id);
    // // source = null;
    // console.log(source);
    setClassicModal(true);
    // source.close();
    const source = new EventSource(`http://localhost:6942/bids/${id}`);

    source.addEventListener("open", () => {
      console.log("SSE for Bids opened!");
      console.log(source);
    });

    source.addEventListener("message", (e) => {
      console.log("WE HERE");
      const data = JSON.parse(e.data);
      console.log(data);
      // console.log(e);
      // console.log("Event called: ", e.data);
      getBidData(data);

      // const data = JSON.parse(e.data);
    });

    source.addEventListener("error", (e) => {
      console.error("Error: ", e);
    });

    return () => {
      source.close();
    };
    // console.log(id);
    // try {
    //   const res = await fetch(`/bids/${id}`, {
    //     method: "GET",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   const data = await res.json();
    //   console.log(data);
    //   getBidData(data);

    //   if (!res.status === 200) {
    //     const error = new Error(res.error);
    //     throw error;
    //   }
    // } catch (err) {
    //   console.log(err);
    //   // history.push('/login');
    // }
  };

  // if (isAuthenticated) {
  //   console.log("IVE BEEN CALLED");
  //   clientId = user.id;
  //   // checkFunction(clientId);

  //   console.log(clientId);
  // }

  useEffect(() => {
    // ViewData();
    // clientId.map((data) => {
    checkFunction(userId);
    // });
    // console.log("USE EFFECT CALLED");
    // console.log("CLIENID: ", clientId);
    // var clientId;

    // console.log(clientId);

    //   console.log(clientId);
    // }
  }, []);

  const classes = useStyles();
  const [classicModal, setClassicModal] = React.useState(false);

  return (
    <div>
      <List>
        {console.log(job)}
        {job.jobs.length > 0 ? (
          job.jobs.map((jobs, index) => {
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
                        <Typography
                          className={classes.heading}
                          color="text.primary"
                        >
                          {jobs.address}
                        </Typography>
                        {/* <Typography
                          className={classes.heading}
                          color="text.primary"
                        >
                          Ali Connors
                        </Typography> */}
                        {jobs.description}
                        <br /> <br />
                        <strong>Max bid: {jobs.budget}</strong>
                        <hr />
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={10}>
                            <Button
                              color="green"
                              size="md"
                              //rel="noopener noreferrer"
                              onClick={() =>
                                viewBids(jobs._id, jobs.description)
                              }
                              className={classes.jobBtn}
                            >
                              <i className="fas fa-dollar-sign" />
                              View Bids
                            </Button>
                          </GridItem>

                          <GridItem xs={12} sm={12} md={1}>
                            <Link
                              onClick={() => DeleteJob(jobs._id)}
                              key={index}
                              // to={"gigs-page/"}
                              className={classes.dropdownLink}
                            >
                              <Delete className={classes.inputIconsColor} />
                            </Link>
                          </GridItem>

                          <GridItem xs={12} sm={12} md={1}>
                            <Link
                              to={"/updatejob-page/" + jobs._id}
                              className={classes.dropdownLink}
                            >
                              <Edit className={classes.inputIconsColor} />
                            </Link>
                          </GridItem>
                        </GridContainer>
                      </React.Fragment>
                    }
                  />
                </Card>
              </ListItem>

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
              //           <Typography className={classes.heading} color="text.primary">
              //             Sandra Adams
              //           </Typography>
              //           Ill be in your neighborhood doing errands this… Ill be in your
              //           neighborhood doing errands this… Ill be in your neighborhood
              //           doing errands this… Ill be in your neighborhood doing errands
              //           this… Ill be in your neighborhood doing errands this… Ill be
              //           in your neighborhood doing errands this… Ill be in your
              //           neighborhood doing errands this… Ill be in your neighborhood
              //           doing errands this… Ill be in your neighborhood doing errands
              //           this… Ill be in your neighborhood doing errands this… Ill be
              //           in your Ill be in your neighborhood doing errands this… Ill be
              //           in your neighborhood doing errands this… Ill be in your
              //           neighborhood doing errands this… Ill be in your.
              //           <br /> <br />
              //           <strong>Max bid: $45</strong>
              //           <hr />
              //           <Button
              //             color="green"
              //             size="md"
              //             //rel="noopener noreferrer"
              //             onClick={() => setClassicModal(true)}
              //             className={classes.jobBtn}
              //           >
              //             <i className="fas fa-dollar-sign" />
              //             View Bids
              //           </Button>
              //         </React.Fragment>
              //       }
              //     />
              //   </Card>
              // </ListItem>
            );
          })
        ) : (
          <ListItem alignItems="flex-start">
            <Card className={classes.jobCard}>
              <ListItemText
                primary={
                  <Typography className={classes.heading}>
                    <strong>No Data Present!</strong>
                  </Typography>
                }
                secondary={<React.Fragment></React.Fragment>}
              />
            </Card>
          </ListItem>
        )}
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
          <DialogTitle
          //id="classic-modal-slide-title"
          //disableTypography
          //className={classes.modalHeader}
          >
            {/*<IconButton
                        className={classes.modalCloseButton}
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={() => setClassicModal(false)}
                      >
                        <Close className={classes.modalClose} />
                      </IconButton>
                      <h4 className={classes.modalTitle}>Bids for the job</h4>*/}
          </DialogTitle>
          <DialogContent
            id="classic-modal-slide-description"
            className={classes.modalBody}
          >
            {/*<Box
                        sx={{
                          width: "100%",
                          maxWidth: 360,
                          bgcolor: "background.paper",
                        }}
                      >*/}

            <List
              sx={{
                width: "100%",
                maxWidth: 500,
                bgcolor: "background.paper",
                position: "relative",
                overflow: "auto",
                maxHeight: 400,
                "& ul": { padding: 0 },
              }}
            >
              {bid.bids.length > 0 ? (
                bid.bids.map((bids, index) => {
                  return (
                    <GridContainer key={index}>
                      <ListItem
                        button
                        /*component={Link} to="/gig2"*/ disablePadding
                      >
                        <GridItem xs={12} sm={12} md={8}>
                          <ListItemButton>
                            <ListItemAvatar>
                              <Avatar alt="Remy Sharp" src={team1} />
                            </ListItemAvatar>
                            <ListItemText
                            //className={classes.bidlist}
                            >
                              {bids.workerName}
                            </ListItemText>
                          </ListItemButton>
                        </GridItem>
                        {/* {(BidValue = "Bid: $" + bids.price)} */}
                        <GridItem xs={12} sm={12} md={4}>
                          <ListItemText>Bid: ${bids.price}</ListItemText>
                          {/* <h5>{BidValue}</h5> */}
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                          <Button
                            color="success"
                            onClick={() => postProject(bids._id)}
                          >
                            Accept
                          </Button>
                          {/* <h5>{BidValue}</h5> */}
                        </GridItem>
                      </ListItem>

                      {/* <ListItem button component={Link} to="/gig2" disablePadding>
                      <GridItem xs={12} sm={12} md={8}>
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={team3} />
                          </ListItemAvatar>
                          <ListItemText
                            className={classes.bidlist}
                            primary="Arooj Sikandar"
                          />
                        </ListItemButton>
                      </GridItem>

                      <GridItem xs={12} sm={12} md={4}>
                        <ListItemText primary="Bid: 55$" />
                      </GridItem>
                    </ListItem>  */}
                    </GridContainer>
                  );
                })
              ) : (
                <GridContainer>
                  <ListItem /*component={Link} to="/gig2"*/ disablePadding>
                    <GridItem xs={12} sm={12} md={12}>
                      <ListItemButton>
                        {/* <ListItemText
                        //className={classes.bidlist}
                        >
                          {bids.workerName}
                        </ListItemText> */}
                        <ListItemText>
                          <strong>No Bids Present!</strong>
                        </ListItemText>
                      </ListItemButton>
                    </GridItem>
                    {/* {(BidValue = "Bid: $" + bids.price)} */}
                  </ListItem>
                </GridContainer>
              )}
            </List>

            {/*</Box>*/}
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
      </List>
      <Preloader state={loading} />
    </div>
  );
}
