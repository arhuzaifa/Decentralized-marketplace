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
import { useHistory } from "react-router-dom";
import { Preloader } from "components/UIHelper/preloader.jsx";

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
// var accountLinked = "";
// var currentUser = 0;
var contract = 0;
var provider = 0;
var signer = 0;
// var numberContract = "";
// var ContractAbi = "";

export default function Gig(props) {
  const [loading, setLoading] = useState(true);

  const { isAuthenticated, user } = useMoralis();
  //contract integration
  const openmodel = () => {
    setClassicModal(true);
  };
  const contractDeploy = async () => {
    // setClassicModal(true);
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
    return contract.address;
    // Done! The contract is deployed.
  };
  var id;
  var clientname;
  if (isAuthenticated) {
    id = user.id;
    clientname = user.attributes.username;

    // console.log("email: ", email);
  }

  // const [currency, setCurrency] = React.useState("None");
  // const handleChange = (event) => {
  //   setCurrency(event.target.value);
  // };
  const history = useHistory();
  const [gig, setGigData] = useState({
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

  // const [offer, setJobOfferData] = useState({
  //   title: "",
  //   city: "",
  //   budget: "",
  //   address: "",
  //   description: "",
  //   // clientId: "",
  //   // clientName: "",
  // });

  const initialValues = {
    title: "",
    budget: "",
    city: "",
    address: "",
    // category: "",
    description: "",
    // clientId: "",
    // picture: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z ]*$/;

    ////////////////////////////////////////////////////
    if (!values.title) {
      errors.title = "Title is required!";
    } else if (values.title.length < 20) {
      errors.title = "Title should be more than 20 characters";
    }
    if (!values.budget) {
      errors.budget = "Budget is required!";
    } else if (isNaN(values.budget)) {
      errors.budget = "Please enter numeric value!";
    }
    if (!values.city) {
      errors.city = "City is required";
    } else if (!regex.test(values.city)) {
      errors.city = "Invalid city";
    }

    if (!values.address) {
      errors.address = "Address is required";
    }

    if (!values.description) {
      errors.description = "Description is required";
    } else if (values.description.length > 150) {
      errors.description = "Description cannot exceed more than 150 characters";
    }

    // if (!values.category) {
    //   errors.category = "Category is required";
    // }

    // if (!values.picture) {
    //   errors.picture = "Picture is required";
    // }
    /////////////////////////////////////
    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log(Object.keys(formErrors).length);
    console.log(isSubmit);
    // if (Object.keys(formErrors).length === 0 && isSubmit) {
    //   postData();
    //   history.push("/customjobs-page/" + id_of.id);
    // }
  };
  // let name, value;
  // const handleInputs = (e) => {
  //   console.log("Handle inputs block");
  //   name = e.target.name;
  //   value = e.target.value;
  //   console.log(e);
  //   setJobOfferData({ ...offer, [name]: value });
  // };

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
      setLoading(false);
      if (!res3.status === 200) {
        const error = new Error(res3.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      // history.push('/login');
    }
  };

  const sendJobOffer = async () => {
    //contract function call
    ContractAddress = await contractDeploy();
    ////
    // e.preventDefault();
    // console.log(e.target.value);

    const clientId = id;
    const worker = gig.workerId;
    const clientName = clientname;
    const { title, city, budget, category, address, description } = formValues;
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
        category,
        clientId,
        clientName,
        worker,
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
    history.push("/landing-page");
  };
  function checkData() {
    console.log("inside Check data");
    console.log(Object.keys(formErrors).length);
    console.log(isSubmit);
    sendJobOffer();
    // postData();
  }

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
      {console.log(loading)}

      <Header
        absolute
        color="black"
        brand="MARKAZ"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div className={classes.pageHeader}>
        <div className={loading ? classes.container1 : classes.container}>
          {/* <Paper elevation={3} style={styles.paperContainer}> */}
          <div className={classes.loader}>
            <Preloader state={loading} />
          </div>
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
                        <Button color="green" onClick={openmodel}>
                          {" "}
                          Send job offer
                        </Button>
                        {/* <Button color="black" onClick={LinkMetaMask}>
                          Connect to Crypto Wallet
                        </Button> */}
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
                                      value={formValues.title}
                                      onChange={handleChange}
                                    />
                                    <p className={classes.warningPara}>
                                      {formErrors.title}
                                    </p>
                                  </GridItem>

                                  <GridItem xs={6} sm={6} md={6}>
                                    <TextField
                                      required
                                      fullWidth
                                      variant="standard"
                                      id="outlined-select-currency"
                                      select
                                      margin="normal"
                                      name="city"
                                      label="Select"
                                      value={formValues.city}
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
                                    <p className={classes.warningPara}>
                                      {formErrors.city}
                                    </p>
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
                                      value={formValues.budget}
                                      onChange={handleChange}
                                    />
                                    <p className={classes.warningPara}>
                                      {formErrors.budget}
                                    </p>
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
                                      value={formValues.address}
                                      onChange={handleChange}
                                    />
                                    <p className={classes.warningPara}>
                                      {formErrors.address}
                                    </p>
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
                                      value={formValues.description}
                                      onChange={handleChange}
                                    />
                                    <p className={classes.warningPara}>
                                      {formErrors.description}
                                    </p>
                                  </GridItem>
                                  <GridItem>
                                    <Button
                                      color="green"
                                      href=""
                                      onClick={handleSubmit}
                                    >
                                      Send job offer
                                    </Button>
                                    {Object.keys(formErrors).length === 0 &&
                                    isSubmit
                                      ? // <div className="ui message success">Signed in successfully</div>
                                        checkData()
                                      : console.log("Error in form!")}
                                    {/* <Button
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
                                    </Button> */}
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
