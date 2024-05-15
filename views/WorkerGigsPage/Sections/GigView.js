import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// import { useHistory } from "react-router-dom";

//import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Delete, Edit } from "@material-ui/icons";
// import Button from "components/CustomButtons/Button.js";

//import Slider from "react-slick";
//import Parallax from "components/Parallax/Parallax.js";

// @material-ui/icons

// core components
//import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
//import { People } from "@material-ui/icons";

//import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
//import Button from "components/CustomButtons/Button.js";
//import CardFooter from "components/Card/CardFooter.js";
//import Paginations from "components/Pagination/Pagination.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/gigViewStyle.js";
import GridContainer from "components/Grid/GridContainer";

//import team1 from "assets/img/faces/avatar.jpg";
//import gig1 from "assets/img/gigs/gig1.jpg";
// import gig2 from "assets/img/gigs/gig2.jpg";
// import gig3 from "assets/img/gigs/gig3.jpg";
// import gig4 from "assets/img/gigs/gig4.jpg";
// import gig5 from "assets/img/gigs/gig5.jpg";
// import gig6 from "assets/img/gigs/gig6.jpg";

//import { Divider } from "@mui/material";

//import IconButton from "@material-ui/core/IconButton";
//import Dialog from "@material-ui/core/Dialog";
//import DialogTitle from "@material-ui/core/DialogTitle";
//import DialogContent from "@material-ui/core/DialogContent";
//import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

//import CustomInput from "components/CustomInput/CustomInput.js";

// @material-ui/icons

//import TextField from "@mui/material/TextField";
//import MenuItem from "@mui/material/MenuItem";
//import Close from "@material-ui/icons/Close";
{
  /*const currencies = [
  {
    value: "Lahore",
  },
  {
    value: "Sukkur",
  },
  {
    value: "Multan",
  },
];*/
}

//import team3 from "assets/img/faces/kendall.jpg";
//import { cardTitle } from "assets/jss/material-kit-react";

const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";
// var gigid = "";

export default function GigView(props) {
  // const history = useHistory();
  //fetch data from database
  // var gigid = "";
  //var data = null;
  const { ...rest } = props;
  //   console.warn(rest);
  const workerId = rest.workerId;
  //   console.warn(workerId);
  const [gig, setUserData] = useState({
    gigs: [
      {
        _id: "",
        title: "",
        budget: "",
        category: "",
        gigdescription: "",
        picture: "",
      },
    ],
  });
  const DeleteGig = async (id) => {
    // console.log("Check");
    try {
      const res = await fetch(`/gig/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      // history.push("/gigs-page");
      // window.location.reload();

      // const data = await res.json();
      // console.log(data);
      // setUserData(data);
      // gigid = {
      //   pathname: "/gig",
      //   // param1: gig._id,
      // };
      // history.push("/gigs-page");

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const callAboutPage = async () => {
    console.log("Check");
    try {
      const res = await fetch("/gig/get/" + workerId, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setUserData(data);
      // gigid = {
      //   pathname: "/gig",
      //   // param1: gig._id,
      // };

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      // history.push('/login');
    }
  };

  //   const checkFunction = () => {
  //     const source = new EventSource(`http://localhost:6942/check`);

  //     source.addEventListener("open", () => {
  //       console.log("SSE opened!");
  //     });

  //     source.addEventListener("message", (e) => {
  //       const data = JSON.parse(e.data);
  //       console.log(data);
  //       // console.log(e);
  //       // console.log("Event called: ", e.data);
  //       setUserData(data);
  //       // const data = JSON.parse(e.data);
  //     });

  //     // source.addEventListener("error", (e) => {
  //     //   console.error("Error: ", e);
  //     // });

  //     return () => {
  //       source.close();
  //     };
  //   };

  useEffect(() => {
    callAboutPage();
    // checkFunction();
  }, []);

  //

  //const [currency, setCurrency] = React.useState("None");

  //const handleChange = (event) => {
  //setCurrency(event.target.value);
  //};
  const classes = useStyles();
  //const [classicModal, setClassicModal] = React.useState(false);
  //   const settings = {
  //     dots: true,
  //     color: "black",
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 3,
  //     slidesToScroll: 1,
  //     autoplay: false,
  //   };
  const imageClasses = classNames(classes.imgCard);
  //const cardClasses = classNames(classes.cardTitle, classes.cardMargin);
  return (
    <div className={classes.section}>
      {/* </Slider> */}

      <GridContainer>
        {console.log(gig)}

        {gig.gigs.length > 0 ? (
          gig.gigs.map((gigs, index) => {
            return (
              <GridItem xs={12} sm={12} md={3} key={index}>
                <Card className={classes.card}>
                  {/* <Link to={"gig/" + gigs._id}> */}
                  {/* {(data = gigs.picture.toString("base64"))} */}
                  {/* console.log(gigs.picture.toString("base64")) */}
                  {/* {console.log(data)} */}

                  {/* <img src="" alt="..." className={imageClasses} /> */}
                  {/* <img
                    src="data:image/<%=gigs.picture.image/png%>;base64,
                     <%=gigs.picture.data.toString('base64')%>"
                    alt="..."
                    className={imageClasses}
                  ></img> */}
                  {/* <img
                    src='data:image/png;base64,gigs.picture.toString("base64")'
                    className={imageClasses}
                  ></img> */}
                  <img
                    src={"data:image/png;base64," + gigs.picture}
                    className={imageClasses}
                  />

                  <CardBody>
                    <h4 className={classes.cardTitle}>{gigs.title}</h4>
                    <p className={classes.description}>
                      {/* {console.log(userData, "HELLO!")} */}
                      <strong>Budget: </strong>${gigs.budget}
                      <br />
                      <strong>Category: </strong>
                      {gigs.category}
                      <br />
                      <strong>Description: </strong>
                      {gigs.gigdescription}
                    </p>
                  </CardBody>
                  {/* </Link> */}
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <Link
                        onClick={() => DeleteGig(gigs._id)}
                        // to={"gigs-page/"}
                        className={classes.dropdownLink}
                      >
                        <Delete className={classes.inputIconsColor} />
                      </Link>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <Link
                        to={"/updateWorkerGig-page/" + gigs._id}
                        className={classes.dropdownLink}
                      >
                        <Edit className={classes.inputIconsColor} />
                      </Link>
                    </GridItem>
                  </GridContainer>
                  {/* {console.log(gigs._id)} */}
                  {/* <CustomDropdown
                  noLiPadding
                  buttonProps={{
                    className: classes.navLink,
                    color: "transparent",
                  }}
                  buttonIcon={People}
                  dropdownList={[
                    <Link
                      key={index}
                      to={"updategig-page/" + gigs._id}
                      className={classes.dropdownLink}
                    >
                      Update
                    </Link>,
                    <Link
                      onClick={() => DeleteGig(gigs._id)}
                      key={index}
                      // to={"gigs-page/"}
                      className={classes.dropdownLink}
                    >
                      Delete
                    </Link>,
                    // <Button
                    //   key={index}
                    //   color="black"
                    //   // href="/gigs-page"
                    //   // disabled={gig.title === "" || gig.budget === ""}
                    //   // onClick={DeleteGig(gigs._id)}
                    // >
                    //   Delete
                    // </Button>,
                  ]}
                /> */}
                </Card>
              </GridItem>
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

        {/* <GridItem xs={12} sm={12} md={3}>
          <Card className={classes.card}>
            <Link to="gig">
              <img src={gig1} alt="..." className={imageClasses} />
              <CardBody>
                <h4 className={classes.cardTitle}>{gig.title}</h4>
                <p className={classes.description}>
                  <strong>Budget: </strong>${gig.budget}
                  <br />
                  <strong>Category: </strong>
                  {gig.category}
                  <br />
                  <strong>Description: </strong>
                  {gig.gigdescription}
                </p>
              </CardBody>
            </Link>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <Card className={classes.card} carousel>
            <Link to="gig">
              <img src={gig6} alt="..." className={imageClasses} />
              <CardBody>
                <h4 className={classes.cardTitle}>AbdulRehman Huzaifa</h4>
                <p className={classes.description}>
                  I can do brakes, oil change, tune up love what I do.I can do
                  oil change.
                </p>
              </CardBody>
            </Link>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <Card className={classes.card} carousel>
            <Link to="gig">
              <img src={gig3} alt="..." className={imageClasses} />
              <CardBody>
                <h4 className={classes.cardTitle}>M.Musa</h4>
                <p className={classes.description}>
                  {" "}
                  I paint, can help a full renovation, and installing devices is
                  a breeze.
                </p>
              </CardBody>
            </Link>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <Card className={classes.card} carousel>
            <Link to="gig">
              <img src={gig1} alt="..." className={imageClasses} />
              <CardBody>
                <h4 className={classes.cardTitle}>AbdulRehman Huzaifa</h4>
                <p className={classes.description}>
                  I can do brakes, oil change, tune up love what I do.I can do
                  oil change.
                </p>
              </CardBody>
            </Link>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <Card className={classes.card} carousel>
            <Link to="gig">
              <img src={gig3} alt="..." className={imageClasses} />
              <CardBody>
                <h4 className={classes.cardTitle}>M.Wadood</h4>
                <p className={classes.description}>
                  I am your ultimate handyman when it comes to home repairs.
                </p>
              </CardBody>
            </Link>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <Card className={classes.card} carousel>
            <Link to="gig">
              <img src={gig6} alt="..." className={imageClasses} />
              <CardBody>
                <h4 className={classes.cardTitle}>M.Wadood</h4>
                <p className={classes.description}>
                  I paint, can help a full renovation, and installing devices is
                  a breeze.
                </p>
              </CardBody>
            </Link>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <Card className={classes.card} carousel>
            <Link to="gig">
              <img src={gig1} alt="..." className={imageClasses} />
              <CardBody>
                <h4 className={classes.cardTitle}>M.Musa</h4>
                <p className={classes.description}>
                  {" "}
                  I paint, can help a full renovation, and installing devices is
                  a breeze.
                </p>
              </CardBody>
            </Link>
          </Card>
        </GridItem> */}
      </GridContainer>

      {/* </Slider> */}
    </div>
  );
}
