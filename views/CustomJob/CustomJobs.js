import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";

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

import styles from "assets/jss/material-kit-react/views/GigPage.js";

// Sections for this page
//import ProductSection from "./Sections/ProductSection.js";
//import TeamSection from "./Sections/TeamSection.js";
//import WorkSection from "./Sections/WorkSection.js";
//import ClientSection from "./Sections/ClientSection.js";
import CustomJobsView from "views/CustomJob/Sections/CustomJobsView.js";
import { useMoralis } from "react-moralis";
import { useHistory } from "react-router-dom";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function CustomJobs(props) {
  const classes = useStyles();
  const { ...rest } = props;
  // console.log(rest);
  const { isUnauthenticated } = useMoralis();
  const history = useHistory();
  if (isUnauthenticated) {
    history.push("/signup-page");
  }
  // console.log(props);
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="MARKAZ"
        rightLinks={<HeaderLinks />}
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
            <GridItem xs={12} sm={12} md={7}>
              <h1 className={classes.title}>Create Custom Job Posts</h1>
              <h4>
                Specify your details and hire the perfect worker for your
                everyday tasks.
              </h4>
              <Button
                color="black"
                size="md"
                href="/createjob-page"
                //target="_blank"
                rel="noopener noreferrer"
                className={classes.button}
                //block
              >
                {/*<i className="fas fa-play" />*/}
                Post a new job
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <CustomJobsView userId={rest.match.params.userId} />
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
