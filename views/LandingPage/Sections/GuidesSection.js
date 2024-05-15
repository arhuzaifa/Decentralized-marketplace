import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
//import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

//import Slider from "react-slick";
//import Parallax from "components/Parallax/Parallax.js";

// @material-ui/icons

// core components
//import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
//import CardFooter from "components/Card/CardFooter.js";
//import Paginations from "components/Pagination/Pagination.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/guideStyle.js";
import GridContainer from "components/Grid/GridContainer";

//import team1 from "assets/img/faces/avatar.jpg";
import guide1 from "assets/img/gig1.jpg";
import guide2 from "assets/img/guide2.jpg";
//import { Link } from "react-router-dom";
//import team3 from "assets/img/faces/kendall.jpg";
//import { cardTitle } from "assets/jss/material-kit-react";

const useStyles = makeStyles(styles);

export default function ServicesView() {
  const classes = useStyles();
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
      <h2 className={classes.title2}>Check out our step by step guides</h2>
      {/* <Link to="guidebuy-page"> */}
      <div>
        <GridContainer className={classes.sectionguide}>
          <GridItem xs={12} sm={12} md={6}>
            <Card className={classes.card}>
              <Link to="guidebuy-page" className={classes.color}>
                <img
                  src={guide1}
                  alt="..."
                  className={imageClasses + " " + classes.img}
                />
                <CardBody>
                  <h4 className={classes.cardTitle}>Hire a worker</h4>
                  <p className={classes.body}>
                    Step by step procedure for hiring a worker.
                  </p>
                </CardBody>
              </Link>
            </Card>
          </GridItem>
          {/* </Link> */}
          <GridItem xs={12} sm={12} md={6}>
            <Card className={classes.card}>
              <Link to="guidesell-page" className={classes.color}>
                <img
                  src={guide2}
                  alt="..."
                  className={imageClasses + " " + classes.img}
                />
                <CardBody>
                  <h4 className={classes.cardTitle}>Sell your services</h4>
                  <p className={classes.body}>
                    Step by step procedure for selling services.
                  </p>
                </CardBody>
              </Link>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
