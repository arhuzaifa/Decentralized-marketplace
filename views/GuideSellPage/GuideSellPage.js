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
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
//import CustomInput from "components/CustomInput/CustomInput.js";
//import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
//import Search from "@material-ui/icons/Search";

import styles from "assets/jss/material-kit-react/views/landingPageSections/guidepage.js";

// Sections for this page
//import ProductSection from "./Sections/ProductSection.js";
//import TeamSection from "./Sections/TeamSection.js";
//import WorkSection from "./Sections/WorkSection.js";
//import ClientSection from "./Sections/ClientSection.js";
import GuideSell from "views/GuideSellPage/Sections/GuideSell.js";
//import GuideView2 from "views/GuidePage/Sections/GuideView2.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="MARKAZ"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax className={classes.background}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>How to sell services</h1>
              <h4>
                Follow our step by step guide to become a worker and sell your
                services.
              </h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.content}>
          <GuideSell />
          {/* <ProductSection /> */}
          {/* <ClientSection /> */}
          {/* <TeamSection /> */}
          {/* <WorkSection /> */}
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
      <Footer />
    </div>
  );
}
