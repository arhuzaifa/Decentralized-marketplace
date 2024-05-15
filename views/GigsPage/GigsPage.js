import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
//import Search from "@material-ui/icons/Search";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//import Button from "components/CustomButtons/Button.js";
import WorkerHeaderLinks from "components/Header/WorkerHeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Button from "components/CustomButtons/Button.js";

//import CustomInput from "components/CustomInput/CustomInput.js";
//import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
//import Search from "@material-ui/icons/Search";

import styles from "assets/jss/material-kit-react/views/GigPage.js";

// Sections for this page
//import ProductSection from "./Sections/ProductSection.js";
//import TeamSection from "./Sections/TeamSection.js";
//import WorkSection from "./Sections/WorkSection.js";
//import ClientSection from "./Sections/ClientSection.js";
import GigView from "views/GigsPage/Sections/GigView.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function GigsPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="MARKAZ"
        rightLinks={<WorkerHeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 100,
          color: "white",
        }}
        {...rest}
      />
      <Parallax className={classes.background}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <h1 className={classes.title}>Create your gigs</h1>
              <h4>
                Let your customers know about your services. Attract more
                clients and earn more money.
              </h4>
              <Button
                color="black"
                size="md"
                href="/creategig-page"
                //target="_blank"
                rel="noopener noreferrer"
                className={classes.button}
                //block
              >
                Create a new gig
              </Button>
              {/* <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Watch video
              </Button> */}
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GigView />
          {/* <ProductSection /> */}

          {/* <ClientSection /> */}
          {/* <TeamSection /> */}
          {/* <WorkSection /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
