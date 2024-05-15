import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes

import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import { Link } from "react-router-dom";

import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

//import { Widget, addResponseMessage, toggleWidget } from "react-chat-widget";

//import "react-chat-widget/lib/styles.css";
//import logo from "assets/img/faces/test1.jpg";

// import Avatar from "@mui/material/Avatar";
// import Image from "@mui/material/Image";
// import team2 from "assets/img/faces/face5.jpg";
// import team3 from "assets/img/faces/face6.jpg";

// import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import Slider from "react-slick";

// import gig1 from "assets/img/gigs/gig1.jpg";
// import gig3 from "assets/img/gigs/gig3.jpg";
// import gig6 from "assets/img/gigs/gig6.jpg";
import Button from "components/CustomButtons/Button.js";

// import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import styles from "assets/jss/material-kit-react/views/gig.js";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";
import { abi, bytecode } from "views/Contract/Contract.js";

// import image from "assets/img/bg7.jpg";
// import helper from "assets/img/services/helper.jpg";

const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// const handleNewUserMessage = (newMessage) => {
// console.log(`New message incoming! ${newMessage}`);
// Now send the message throught the backend API
// isWidgetOpened(false);
//toggleWidget();
// };
Transition.displayName = "Transition";
const currencies = [
  {
    value: "Lahore",
  },
  {
    value: "Faisalabad",
  },
  {
    value: "Multan",
  },
];
var ContractAddress = "";
var accountLinked = "";
var currentUser = 0;
var contract = 0;
var provider = 0;
var signer = 0;
var numberContract = "";
var ContractAbi = "";

export default function Gig(props) {
  const { isAuthenticated, user, Moralis } = useMoralis();
  //contract integration

  // SETTING USER METAMASK
  const LinkMetaMask = async () => {
    await Moralis.enableWeb3();
    currentUser = Moralis.User.current();
    console.log(currentUser);
    console.log(window.ethereum.selectedAddress);
    const add = window.ethereum.selectedAddress;
    // accountLinked = user.attributes.accounts;
    // console.log("ACC:",accountLinked);
    //   add
    // );
    window.confirm("Would you like to link this account to your user profile?");
    accountLinked = await Moralis.link(add);
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();

    console.log("signer", signer);
    console.log("provi", provider);
    console.log(user.attributes.ethAddress);
    // numberContract = new ethers.Contract(ContractAddress, ContractAbi, signer);
    return accountLinked;
  };
  const contractDeploy = () => {
    setClassicModal(true);
    // console.log("hello")
    // provider.send("seth_requestAccounts", []);

    // signer = provider.getSigner();

    // console.log("Account address s:", signer.getAddress());
    // provider = new ethers.providers.Web3Provider(window.ethereum)
    // signer = provider.getSigner();
    // Connect to the network
    // const provider = ethers.getDefaultProvider('ropsten');

    // Load the walconst to deploy the contract with
    // const privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123';
    // const walconst = new ethers.Walconst(privateKey, provider);

    // Deployment is asynchronous, so we use an async IIFE
    (async function () {
      console.log(bytecode);
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      // Create an instance of a Contract Factory
      const factory = new ethers.ContractFactory(abi, bytecode, signer);

      // Notice we pass in "Hello World" as the parameter to the constructor
      contract = await factory.deploy();

      // The address the Contract WILL have once mined
      // See: https://ropsten.etherscan.io/address/0x2bd9aaa2953f988153c8629926d22a6a5f69b14e
      ContractAddress = contract.address;

      console.log(ContractAddress);
      // "0x2bD9aAa2953F988153c8629926D22A6a5F69b14E"

      // The transaction that was sent to the network to deploy the Contract
      // See: https://ropsten.etherscan.io/tx/0x159b76843662a15bd67e482dcfbee55e8e44efad26c5a614245e12a00d4b1a51
      console.log(contract.deployTransaction.hash);
      // "0x159b76843662a15bd67e482dcfbee55e8e44efad26c5a614245e12a00d4b1a51"

      // The contract is NOT deployed yet; we must wait until it is mined
      await contract.deployed();
      console.log(ContractAddress);

      // Done! The contract is deployed.
    })();
  };
  const setBuyer = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    console.log(ContractAddress);
    // const txResponse =  await numberContract.getValue();
    ContractAbi = ["function setBuyer(address _buyer) public"];
    numberContract = new ethers.Contract(ContractAddress, ContractAbi, signer);
    const txResponse = await numberContract.setBuyer(
      user.attributes.ethAddress
    );
    await txResponse.wait();
    console.log(txResponse.hash);
  };
  const initialize = async () => {
    ContractAbi = ["function initializeContract() escrowNotStarted public"];
    numberContract = new ethers.Contract(ContractAddress, ContractAbi, signer);
    const txResponse = await numberContract.initializeContract();
    await txResponse.wait();
    console.log(txResponse.hash);
    return;
  };
  const Deposit = async () => {
    // const overrides = {
    // To convert Ether to Wei:
    const value = ethers.utils.parseEther("1"); // ether in this case MUST be a string

    // Or you can use Wei directly if you have that:
    // value: someBigNumber
    // value: 1234   // Note that using JavaScript numbers requires they are less than Number.MAX_SAFE_INTEGER
    // value: "1234567890"
    // value: "0x1234"

    // Or, promises are also supported:
    // value: provider.getBalance(addr)
    // };
    ContractAbi = ["function deposit() onlyBuyer public payable"];
    numberContract = new ethers.Contract(ContractAddress, ContractAbi, signer);
    const txResponse = await numberContract.deposit({
      value: String(value),
      gasPrice: 20e9,
    });
    await txResponse.wait();
    console.log(txResponse.hash);
  };
  const jobDone = async () => {
    ContractAbi = ["function jobDone() payable public"];
    numberContract = new ethers.Contract(ContractAddress, ContractAbi, signer);
    const txResponse = await numberContract.jobDone();
    await txResponse.wait();
    console.log(txResponse.hash);
  };
  ///////////////
  var id;
  var clientname;
  if (isAuthenticated) {
    id = user.id;
    clientname = user.attributes.username;

    // console.log("email: ", email);
  }

  const [currency, setCurrency] = React.useState("None");
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const [gig, setGigData] = useState({
    _id: "",
    gigTitle: "",
    budget: "",
    category: "",
    gigdescription: "",
    workerId: "",
    picture: "",
  });
  const [worker, setWorkerData] = useState({
    _id: "",
    Name: "",
    about: "",
    city: "",
    email: "",
    contact: "",
    picture: "",
  });

  const [offer, setJobOfferData] = useState({
    title: "",
    city: "",
    budget: "",
    address: "",
    description: "",
    // clientId: "",
    // clientName: "",
  });

  let name, value;
  const handleInputs = (e) => {
    console.log("Handle inputs block");
    name = e.target.name;
    value = e.target.value;
    console.log(e);
    setJobOfferData({ ...offer, [name]: value });
  };

  const [otherGigs, setOtherGigsData] = useState({
    gigs: [
      {
        _id: "",
        gigTitle: "",
        budget: "",
        category: "",
        gigdescription: "",
        picture: "",
      },
    ],
  });

  const [reviewdata, setReviewData] = useState({
    reviews: [
      {
        _id: "",
        description: "",
        clientName: "",
        clientId: "",
        workerId: "",
        workerName: "",
      },
    ],
  });

  // console.log(props.location.param1);
  const { ...temp } = props;
  const gigId = temp.match.params.gigId;

  const callAboutPage = async () => {
    console.log("Check");
    try {
      // fetching gig data

      const res = await fetch("/gig/" + gigId, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setGigData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }

      //gettingReviews
      const res1 = await fetch(`/review/worker/${data.workerId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data1 = await res1.json();
      console.log(data1);
      setReviewData(data1);
      if (!res1.status === 200) {
        const error = new Error(res1.error);
        throw error;
      }

      // fetching Worker data

      const res2 = await fetch(`/worker/gig/${data.workerId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data2 = await res2.json();
      console.log(data2);
      setWorkerData(data2);

      if (!res2.status === 200) {
        const error = new Error(res2.error);
        throw error;
      }

      // fetching 'other gigs by this worker'

      const res3 = await fetch(`/gig/worker/${data.workerId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data3 = await res3.json();
      console.log(data3);
      setOtherGigsData(data3);

      if (!res3.status === 200) {
        const error = new Error(res3.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      // history.push('/login');
    }
  };

  const sendJobOffer = async (e) => {
    //contract function call
    initialize();
    ////
    e.preventDefault();
    // console.log(e.target.value);

    const clientId = id;
    const workerId = gig.workerId;
    const clientName = clientname;

    const { title, city, budget, address, description, gigId } = offer;
    const res = await fetch("/offer/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        budget,
        city,
        address,
        description,
        clientId,
        clientName,
        workerId,
        gigId,
      }),
    });
    console.log(res);
    const data = await res.json();
    console.log(data.data.insertedId);
    const jobOfferId = data.data.insertedId;
    const res1 = await fetch("/contract/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ContractAddress,
        jobOfferId,
      }),
    });

    const data1 = await res1.json();

    if (data1.status === 42 || !data1) {
      window.alert("Invalid registeration");
      console.log("Invalid registeration");
    } else {
      // console.log(data);
      // history.push("/landing-page");
    }
    if (data.status === 42 || !data) {
      window.alert("Invalid registeration");
      console.log("Invalid registeration");
    } else {
      // console.log(data);
      // history.push("/landing-page");
    }
  };

  // const getReviewData = async () => {
  //   console.log("Check");
  //   try {
  //     // fetching gig data

  //     const res = await fetch(`/review/worker/${gig.workerId}`, {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await res.json();
  //     console.log(data);
  //     setReviewData(data);

  //     if (!res.status === 200) {
  //       const error = new Error(res.error);
  //       throw error;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     // history.push('/login');
  //   }
  // };

  useEffect(async () => {
    await callAboutPage();
  }, []);

  //   const [currency, setCurrency] = React.useState("None");

  //   const handleChange = (event) => {
  //     setCurrency(event.target.value);
  //   };
  const [classicModal, setClassicModal] = React.useState(false);

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  console.log(rest.match.params.gigId);

  const imageClasses1 = classNames(classes.imgCard);

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid,
    classes.workerImg
  );
  const settings = {
    dots: false,
    color: "black",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    // arrows: "black",
  };

  return (
    <div>
      <Header
        absolute
        color="black"
        brand="MARKAZ"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div className={classes.pageHeader}>
        <div className={classes.container}>
          {/* <Paper elevation={3} style={styles.paperContainer}> */}
          <GridContainer xs={12} sm={12} md={12}>
            <GridItem xs={12} sm={12} md={12}>
              <Card className={(classes[cardAnimaton], classes.card)}>
                <form className={classes.form}>
                  {/* <CardHeader color="green" className={classes.cardHeader}>
                    <h4> One step away from becoming a worker !</h4>
                  </CardHeader> */}
                  {/* <p className={classes.divider}></p> */}
                  <GridContainer>
                    {/* <GridItem>
                      <h2 className={classes.title}>Title: Plumbing</h2>
                    </GridItem> */}

                    <GridItem md={6}>
                      {/* <div className={classes.content}> */}
                      <img
                        src={"data:image/png;base64," + worker.picture}
                        className={imageClasses}
                      />
                      {/* <h1 className={classes.name}>Wadood </h1>
                        <i className="fas fa-map-marker" />
                        <p>Lahore</p> */}
                      {/* </h1> */}
                      {/* </div> */}
                    </GridItem>
                    <GridItem md={6}>
                      <h1 className={classes.name}> {worker.Name} </h1>
                      <h4>
                        <i className="fas fa-map-marker-alt">
                          <span className={classes.data}>{worker.city}</span>
                        </i>
                      </h4>
                      <h4>
                        <i className="fas fa-mobile-alt">
                          <span className={classes.data}>{worker.contact}</span>
                        </i>
                      </h4>
                      {/* <h4>
                        <i className="fas fa-envelope">
                          <span className={classes.data}>{worker.email}</span>
                        </i>
                      </h4> */}
                      <h4>
                        {" "}
                        <Button color="green" onClick={contractDeploy}>
                          {" "}
                          Send job offer
                        </Button>
                        <Button color="black" onClick={LinkMetaMask}>
                          Connect to Crypto Wallet
                        </Button>
                        {/* <Button color="green" href="/payment-page">
                          {" "}
                          Make Payment
                        </Button> */}
                        {/* <Button color="green" onClick={() => toggleWidget()}> 
                          {" "}
                          Chat <i className="fa fa-comment" />
                        </Button>*/}
                        <div className="App">
                          {/* <Widget 
                            handleNewUserMessage={handleNewUserMessage}
                            profileAvatar={logo}
                            // launcher={(handleToggle) => getCustomLauncher(handleToggle)}
                            title="Chat"
                            // subtitle="And my cool subtitle"
                          />*/}
                        </div>
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
                          <DialogTitle>Send Job Offer</DialogTitle>
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
                                      id="title"
                                      label="Job Title"
                                      name="title"
                                      variant="standard"
                                      value={offer.title}
                                      onChange={handleInputs}
                                    />
                                  </GridItem>

                                  <GridItem xs={6} sm={6} md={6}>
                                    <TextField
                                      required
                                      fullWidth
                                      variant="standard"
                                      id="outlined-select-currency"
                                      select
                                      margin="normal"
                                      label="Select"
                                      value={currency}
                                      onChange={handleChange}
                                      helperText="city"
                                    >
                                      {currencies.map((option) => (
                                        <MenuItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.value}
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                  </GridItem>
                                  <GridItem xs={6} sm={6} md={6}>
                                    <TextField
                                      margin="normal"
                                      required
                                      fullWidth
                                      id="budget"
                                      label="Your Budget"
                                      name="budget"
                                      variant="standard"
                                      value={offer.budget}
                                      onChange={handleInputs}
                                    />
                                  </GridItem>

                                  <GridItem xs={6} sm={6} md={12}>
                                    <TextField
                                      margin="normal"
                                      required
                                      fullWidth
                                      id="address"
                                      label="Address"
                                      name="address"
                                      variant="standard"
                                      value={offer.address}
                                      onChange={handleInputs}
                                    />
                                  </GridItem>

                                  <GridItem>
                                    <TextField
                                      margin="normal"
                                      fullWidth
                                      required
                                      multiline
                                      rows={8}
                                      textarea
                                      id="description"
                                      name="description"
                                      label="Job Details"
                                      value={offer.description}
                                      onChange={handleInputs}
                                    />
                                  </GridItem>
                                  <GridItem>
                                    <Button
                                      color="green"
                                      href=""
                                      onClick={sendJobOffer}
                                    >
                                      Send job offer
                                    </Button>
                                    <Button
                                      color="green"
                                      href=""
                                      onClick={setBuyer}
                                    >
                                      Set Buyer
                                    </Button>
                                    <Button
                                      color="green"
                                      href=""
                                      onClick={Deposit}
                                    >
                                      Deposit
                                    </Button>
                                    <Button
                                      color="green"
                                      href=""
                                      onClick={jobDone}
                                    >
                                      Job Done
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
                      </h4>
                    </GridItem>

                    <GridItem xs={6} sm={6} md={12}>
                      {/*<h3>
                        <strong>Title: Plumbing</strong>
                      </h3>*/}
                      <h3 className={classes.head}>
                        <strong>Gig Description</strong>
                        <p> {gig.gigdescription} </p>
                        {/* {console.log(gig.workerId)} */}
                      </h3>
                      <Divider
                        sx={{ width: 1020, m: 0.5 }}
                        orientation="horizontal"
                      />
                      <h3 className={classes.head}>
                        <strong>About Worker</strong>
                        <p>{worker.about}</p>
                      </h3>

                      <h3 className={classes.head}>
                        <strong>Worker Reviews </strong>
                      </h3>
                      <br></br>

                      <GridItem xs={12} sm={12} md={12}>
                        <Slider className={classes.reviews} {...settings}>
                          {reviewdata.reviews.length > 1 ? (
                            reviewdata.reviews.map((reviews, index) => {
                              return (
                                <div
                                  key={index}
                                  className={classes.sliderContent}
                                >
                                  {/* <div className={classes.sliderImg}>
                                <img
                                  alt="Travis Howard"
                                  src={team2}
                                  className={classes.imgFluid}
                                />
                              </div> */}

                                  <div className={classes.sliderText}>
                                    <h3>
                                      <strong>{reviews.clientName}</strong>
                                    </h3>

                                    <p className={classes.p}>
                                      <p>{reviews.description}</p>
                                    </p>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <ListItem alignItems="flex-start">
                              {/* <Card className={classes.jobCard}> */}
                              <ListItemText
                                primary={
                                  <Typography className={classes.heading}>
                                    <strong>No Present!</strong>
                                  </Typography>
                                }
                                secondary={<React.Fragment></React.Fragment>}
                              />
                              {/* </Card> */}
                            </ListItem>
                          )}
                        </Slider>
                      </GridItem>
                      <br></br>
                      <h3 className={classes.head}>
                        <strong>Other gigs by this worker</strong>
                      </h3>
                    </GridItem>
                    {otherGigs.gigs.map((gigs, index) => {
                      return (
                        <GridItem xs={12} sm={12} md={4} key={index}>
                          <Card carousel>
                            <img
                              src={"data:image/png;base64," + gigs.picture}
                              className={imageClasses1}
                            />
                            <CardBody>
                              <h4 className={classes.cardTitle}>
                                {gigs.gigTitle}
                              </h4>

                              <p className={classes.description}>
                                <strong>Budget: </strong>${gigs.budget}
                                <br />
                                <strong>Category: </strong>
                                {gigs.category}
                                <br />
                                <strong>Description: </strong>
                                {gigs.gigdescription}
                              </p>
                            </CardBody>
                          </Card>
                        </GridItem>
                      );
                    })}
                    {/* <GridItem xs={12} sm={12} md={4}>
                      <Card carousel>
                        <img src={gig3} alt="..." className={imageClasses1} />
                        <CardBody>
                          <h4 className={classes.cardTitle}>M.Wadood</h4>
                          <p className={classes.description}>
                            I Will get the truck and all moving supplies added
                            on the invoice.
                          </p>
                        </CardBody>
                      </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Card carousel>
                        <img src={gig6} alt="..." className={imageClasses1} />
                        <CardBody>
                          <h4 className={classes.cardTitle}>M.Wadood</h4>
                          <p className={classes.description}>
                            I have experience in low volt electrical and home
                            renovations.
                          </p>
                        </CardBody>
                      </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Card carousel>
                        <img src={gig3} alt="..." className={imageClasses1} />
                        <CardBody>
                          <h4 className={classes.cardTitle}>M.Wadood</h4>
                          <p className={classes.description}>
                            I Will get the truck and all moving supplies added
                            on the invoice.
                          </p>
                        </CardBody>
                      </Card>
                    </GridItem> */}
                  </GridContainer>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
          {/* </Paper> */}
        </div>
        <Footer />
      </div>
    </div>
  );
}
