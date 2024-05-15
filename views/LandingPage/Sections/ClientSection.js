import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
//import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import team1 from "assets/img/faces/test1.jpg";
import team2 from "assets/img/faces/christian.jpg";
import team3 from "assets/img/faces/test3.jpg";

const useStyles = makeStyles(styles);

export default function ClientSection() {
  const testImages = [team1, team2, team3];
  const [testimonial, setUserData] = useState({
    testimonials: [
      {
        _id: "",
        Name: "",
        Testimonial: "",
      },
    ],
  });

  const callAboutPage = async () => {
    console.log("Check");
    try {
      const res = await fetch("/testimonial", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data);
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

  useEffect(() => {
    callAboutPage();
  }, []);

  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>What they are saying!</h2>
      <div>
        <GridContainer>
          {console.log(testimonial)}
          {testimonial.testimonials.map((testimonials, index) => {
            return (
              <GridItem xs={12} sm={12} md={4} key={index}>
                <Card carousel>
                  <Link to={"testimonial/" + testimonials._id}>
                    {/* <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team1} alt="..." className={imageClasses} />
              </GridItem> */}
                    <svg
                      className={classes.svgIcon}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                    </svg>

                    <CardBody>
                      <p className={classes.description}>
                        <p>{testimonials.Testimonial}</p>
                      </p>
                    </CardBody>

                    <CardFooter className={classes.justifyCenter}>
                      <h4 className={classes.cardMargin}>
                        {testimonials.Name}
                        <br></br>
                      </h4>
                    </CardFooter>
                  </Link>
                </Card>
                <div className={classes.profile}>
                  <img
                    src={testImages[index]}
                    alt="..."
                    className={imageClasses}
                  />
                </div>
              </GridItem>
            );
          })}

          {/* <GridItem xs={12} sm={12} md={4}>
            <Card carousel>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team2} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                M.Wadood
                <br />
                <small className={classes.smallTitle}>Designer</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  You can write here details about one of your team members. You
                  can give more details about what they do. Feel free to add
                  some <a href="#pablo">links</a> for people to be able to
                  follow them outside the site.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button justIcon color="transparent" className={classes.margin5}>
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button justIcon color="transparent" className={classes.margin5}>
                  <i className={classes.socials + " fab fa-linkedin"} />
                </Button>
              </CardFooter>
            </Card>
            <div className={classes.profile}>
              <img src={team2} alt="..." className={imageClasses} />
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card carousel>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team3} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Arooj Sikandar
                <br />
                <small className={classes.smallTitle}>Model</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  You can write here details about one of your team members. You
                  can give more details about what they do. Feel free to add
                  some <a href="#pablo">links</a> for people to be able to
                  follow them outside the site.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button justIcon color="transparent" className={classes.margin5}>
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button justIcon color="transparent" className={classes.margin5}>
                  <i className={classes.socials + " fab fa-instagram"} />
                </Button>
                <Button justIcon color="transparent" className={classes.margin5}>
                  <i className={classes.socials + " fab fa-facebook"} />
                </Button>
              </CardFooter>
            </Card>
            <div className={classes.profile}>
              <img src={team3} alt="..." className={imageClasses} />
            </div>
          </GridItem> */}
        </GridContainer>
      </div>
    </div>
  );
}
