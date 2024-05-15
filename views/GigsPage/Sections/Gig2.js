import React, { useEffect } from "react";
// nodejs library that concatenates classes

import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Divider from "@mui/material/Divider";

//import { Widget, addResponseMessage, toggleWidget } from "react-chat-widget";

//import "react-chat-widget/lib/styles.css";
//import logo from "assets/img/faces/test1.jpg";

// import Avatar from "@mui/material/Avatar";
// import Image from "@mui/material/Image";
import team2 from "assets/img/faces/face5.jpg";
import team3 from "assets/img/faces/face6.jpg";

// import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import Slider from "react-slick";

import gig1 from "assets/img/gigs/gig1.jpg";
import gig3 from "assets/img/gigs/gig3.jpg";
import gig6 from "assets/img/gigs/gig6.jpg";
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

// import image from "assets/img/bg7.jpg";
// import helper from "assets/img/services/helper.jpg";

const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";
const currencies = [
  {
    value: "Lahore",
  },
  {
    value: "Sukkur",
  },
  {
    value: "Multan",
  },
];
export default function Gig(props) {
  useEffect(() => {
    //addResponseMessage("How may I be of your assistance?");
  }, []);
  const [currency, setCurrency] = React.useState("None");
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  // const handleNewUserMessage = (newMessage) => {
  //console.log(`New message incoming! ${newMessage}`);
  // Now send the message throught the backend API
  // isWidgetOpened(false);
  //toggleWidget();
  // };
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
                        alt="Travis Howard"
                        src={team2}
                        className={imageClasses}
                      />
                      {/* <h1 className={classes.name}>Wadood </h1>
                        <i className="fas fa-map-marker" />
                        <p>Lahore</p> */}
                      {/* </h1> */}
                      {/* </div> */}
                    </GridItem>
                    <GridItem md={6}>
                      <h1 className={classes.name}>M.Wadood </h1>
                      <h4>
                        <i className="fas fa-map-marker-alt">
                          <span className={classes.data}>Lahore</span>
                        </i>
                      </h4>
                      <h4>
                        <i className="fas fa-mobile-alt">
                          <span className={classes.data}>0333-6655509</span>
                        </i>
                      </h4>
                      <h4>
                        <i className="fas fa-envelope">
                          <span className={classes.data}>
                            muhammadwadoodulhaq@gmail.com
                          </span>
                        </i>
                      </h4>
                      <h4>
                        <Button
                          color="green"
                          onClick={() => setClassicModal(true)}
                        >
                          Send job offer
                        </Button>

                        <Button color="green" href="/payment-page">
                          Make Payment
                        </Button>
                        {/* <Button color="green" onClick={() => toggleWidget()}> 
                          Chat <i className="fa fa-comment" />
                        </Button>*/}
                        <div className="App">
                          {/* <Widget
                            handleNewUserMessage={handleNewUserMessage}
                            profileAvatar={logo}
                            // launcher={(handleToggle) => getCustomLauncher(handleToggle)}
                            title="Chat"
                            // subtitle="And my cool subtitle"
                          /> */}
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
                                      variant="standard"
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
                                      id="bidget"
                                      label="Your Budget"
                                      variant="standard"
                                    />
                                  </GridItem>

                                  <GridItem xs={6} sm={6} md={12}>
                                    <TextField
                                      margin="normal"
                                      required
                                      fullWidth
                                      id="address"
                                      label="Address"
                                      variant="standard"
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
                                      id="detail"
                                      label="Job Details"
                                    />
                                  </GridItem>
                                  <GridItem>
                                    <Button color="green" href="/gig">
                                      Send job offer
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

                      <Divider
                        sx={{ width: 1020, m: 0.5 }}
                        orientation="horizontal"
                      />
                      <h3 className={classes.head}>
                        <strong>About Worker</strong>
                      </h3>
                      <p>
                        I enjoy solving problem and finishing what I start. I
                        approach every task with enthusiasm and and look to
                        exceed client expectationsI enjoy solving problem and
                        finishing what I start. I approach every task with
                        enthusiasm and and look to exceed client expectations.I
                        enjoy solving problem and finishing what I start. I
                        approach every task with enthusiasm and and look to
                        exceed client expectations.I approach every task with
                        enthusiasm and and look to exceed client expectations.I
                        enjoy solving problem and finishing what I start.I
                        approach every task with enthusiasm and and look to
                        exceed client expectations.I enjoy solving problem and
                        finishing what I start. I approach every task with
                        enthusiasm and and look to exceed client expectations.I
                        approach every task with enthusiasm and and look to
                        exceed client expectations.I enjoy solving problem and
                        finishing what I start.
                      </p>

                      <h3 className={classes.head}>
                        <strong>Worker Reviews </strong>
                      </h3>
                      <br></br>
                      <Slider className={classes.reviews} {...settings}>
                        <div className={classes.sliderContent}>
                          <div className={classes.sliderImg}>
                            <img
                              alt="Travis Howard"
                              src={team2}
                              className={classes.imgFluid}
                            />
                          </div>
                          <div className={classes.sliderText}>
                            <p className={classes.p}>
                              “Very professional. Made sure the job was
                              completed, even though it went well over my
                              estimate. Also made suggestions to make things
                              easier down the line. Would recommend highly.”
                            </p>
                            <p className={classes.p1}>M.Wadood</p>
                          </div>
                        </div>
                        <div className={classes.sliderContent}>
                          <div className={classes.sliderImg}>
                            <img
                              alt="Travis Howard"
                              src={team3}
                              className={classes.imgFluid}
                            />
                          </div>
                          <div className={classes.sliderText}>
                            <p className={classes.p}>
                              “Had the best experience possible. Did anything to
                              get the job done and can’t thank him enough.”
                            </p>
                            <p className={classes.p1}>M.Wadood</p>
                          </div>
                        </div>
                      </Slider>
                      <br></br>
                      <h3 className={classes.head}>
                        <strong>Worker Gigs</strong>
                      </h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Card carousel>
                        <img src={gig1} alt="..." className={imageClasses1} />
                        <CardBody>
                          <h4 className={classes.cardTitle}>M.Wadood</h4>
                          <p className={classes.description}>
                            I can bend pipes pretty well, running wire and
                            installing devices is a breeze.
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
                    </GridItem>
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
