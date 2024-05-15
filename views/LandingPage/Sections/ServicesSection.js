import React, { useEffect, useState } from "react";

// nodejs library that concatenates classes
//import classNames from "classnames";
//import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slider from "react-slick";
import { Link } from "react-router-dom";
//import { ServicesView } from "views/ServicePage/Sections/ServicesView";

//import Parallax from "components/Parallax/Parallax.js";

// @material-ui/icons

// core components
//import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// import GridContainer from "components/Grid/GridContainer";
//import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
//import CardBody from "components/Card/CardBody.js";
//import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
//import GridContainer from "components/Grid/GridContainer";

import carpenter from "assets/img/services/carpenter.jpg";
import chef from "assets/img/services/chef.jpg";
import driver from "assets/img/services/driver.jpg";
import electrician from "assets/img/services/electrician.jpg";
import gardener from "assets/img/services/gardener.jpg";
import painter from "assets/img/services/painter.jpg";
import plumbing from "assets/img/services/plumbing.jpg";
import helper from "assets/img/services/helper.jpg";
import others from "assets/img/services/others.jpg";
import { Preloader } from "components/UIHelper/preloader.jsx";

//import { cardTitle } from "assets/jss/material-kit-react";

const useStyles = makeStyles(styles);

export default function ServicesSection() {
  const [loading, setLoading] = useState(true);
  const images = [
    electrician,
    plumbing,
    painter,
    carpenter,
    gardener,
    chef,
    driver,
    helper,
    others,
  ];
  const [category, setUserData] = useState({
    categories: [
      {
        _id: "",
        Name: "",
        title: "",
      },
    ],
  });

  const callAboutPage = async () => {
    console.log("Check");
    try {
      const res = await fetch("/category", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data);
      setUserData(data);
      setLoading(false);
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
  const settings = {
    dots: false,
    color: "black",
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
  };
  //const imageClasses = classNames(classes.imgCardTop);
  //const cardClasses = classNames(classes.cardTitle, classes.cardMargin);
  return (
    // <div className={classes.container}>
    <div className={classes.section}>
      <h2 className={classes.title}>Explore our Services</h2>
      <Slider {...settings}>
        {/* {console.log(category)} */}

        {/* <GridContainer> */}
        {category.categories.map((categories, index) => {
          return (
            <div className={classes.marginClass} key={index}>
              <GridItem xs={12} sm={12} md={12} key={index}>
                <Link to={"/service-page/" + categories.Name}>
                  <Card carousel className={classes.cardLayout}>
                    <img
                      src={images[index]}
                      alt="..."
                      className={classes.serviceCardImg}
                    />
                    <div className={classes.serviceCardText}>
                      {categories.title}
                    </div>
                    <div className={classes.serviceCardHeading}>
                      {categories.Name}
                    </div>
                  </Card>
                </Link>
              </GridItem>
            </div>
          );
        })}
        {/* </GridContainer> */}
        {/* </Link> */}
        {/* </div> */}

        {/* <GridItem xs={12} sm={12} className={classes.marginAuto}>
            <Card carousel>
              <h4 className={classes.infoCardHeader}>
                AR Huzaifa
                <br />
                <small className={classes.smallTitle}>Model</small>
              </h4>
              <CardBody>
                <div className={classes.container}>
                  <p className={classes.description}>
                    You can write here details about one of your team members.
                    You can give more details about what they do. Feel free to
                    add some <a href="#pablo">links</a> for people to be able to
                    follow them outside the site.
                  </p>
                </div>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  color="primary"
                  size="sm"
                  href="/service-page"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-search" />
                  View Service
                </Button>
                <Button
                  color="success"
                  size="sm"
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-gavel" />
                  Make Bid
                </Button>
              </CardFooter>
            </Card>
          </GridItem> */}

        {/* <div>
          <Link to="/service-page">
            <GridItem xs={12} sm={12}>
              <Card carousel className={classes.cardLayout}>
                <img
                  src={electrician}
                  alt="..."
                  className={classes.serviceCardImg}
                />
                <div className={classes.serviceCardText}>See our spark</div>
                <div className={classes.serviceCardHeading}>Electrician</div>
              </Card>
            </GridItem>
          </Link>
        </div>
        <div>
          <Link to="/service-page">
            <GridItem xs={12} sm={12}>
              <Card carousel className={classes.cardLayout}>
                <img
                  src={plumbing}
                  alt="..."
                  className={classes.serviceCardImg}
                />
                <div className={classes.serviceCardText}>Say no to leaks</div>
                <div className={classes.serviceCardHeading}>Plumber</div>
              </Card>
            </GridItem>
          </Link>
        </div>
        <div>
          <Link to="/service-page">
            <GridItem xs={12} sm={12}>
              <Card carousel className={classes.cardLayout}>
                <img
                  src={plumbing}
                  alt="..."
                  className={classes.serviceCardImg}
                />
                <div className={classes.serviceCardText}>
                  Make walls stand out
                </div>
                <div className={classes.serviceCardHeading}>Painter</div>
              </Card>
            </GridItem>
          </Link>
        </div>
        <div>
          <Link to="/service-page">
            <GridItem xs={12} sm={12}>
              <Card carousel className={classes.cardLayout}>
                <img
                  src={carpenter}
                  alt="..."
                  className={classes.serviceCardImg}
                />
                <div className={classes.serviceCardText}>
                  Assembling made easy
                </div>
                <div className={classes.serviceCardHeading}>Carpenter</div>
              </Card>
            </GridItem>
          </Link>
        </div>
        <div>
          <Link to="/service-page">
            <GridItem xs={12} sm={12}>
              <Card carousel className={classes.cardLayout}>
                <img
                  src={helper}
                  alt="..."
                  className={classes.serviceCardImg}
                />
                <div className={classes.serviceCardText}>
                  Make walls stand out
                </div>
                <div className={classes.serviceCardHeading}>Painter</div>
              </Card>
            </GridItem>
          </Link>
        </div>

        <div>
          <Link to="/service-page">
            <GridItem xs={12} sm={12}>
              <Card carousel className={classes.cardLayout}>
                <img
                  src={gardener}
                  alt="..."
                  className={classes.serviceCardImg}
                />
                <div className={classes.serviceCardText}>Let gardens bloom</div>
                <div className={classes.serviceCardHeading}>Gardener</div>
              </Card>
            </GridItem>
          </Link>
        </div>
        <div>
          <Link to="/service-page">
            <GridItem xs={12} sm={12}>
              <Card carousel className={classes.cardLayout}>
                <img src={chef} alt="..." className={classes.serviceCardImg} />
                <div className={classes.serviceCardText}>
                  Food changes the mood
                </div>
                <div className={classes.serviceCardHeading}>Chef</div>
              </Card>
            </GridItem>
          </Link>
        </div>
        <div>
          <Link to="/service-page">
            <GridItem xs={12} sm={12}>
              <Card carousel className={classes.cardLayout}>
                <img
                  src={driver}
                  alt="..."
                  className={classes.serviceCardImg}
                />
                <div className={classes.serviceCardText}>Travel with ease</div>
                <div className={classes.serviceCardHeading}>Driver</div>
              </Card>
            </GridItem>
          </Link>
        </div> */}

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
                can give more details about what they do. Feel free to add some{" "}
                <a href="#pablo">links</a> for people to be able to follow them
                outside the site.
              </p>
            </CardBody>
            <CardFooter className={classes.justifyCenter}>
              <Button
                color="info"
                size="sm"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-search" />
                View Service
              </Button>
              <Button
                color="success"
                size="sm"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-gavel" />
                Make Bid
              </Button>
            </CardFooter>
          </Card>
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
                can give more details about what they do. Feel free to add some{" "}
                <a href="#pablo">links</a> for people to be able to follow them
                outside the site.
              </p>
            </CardBody>
            <CardFooter className={classes.justifyCenter}>
              <Button
                color="info"
                size="sm"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-search" />
                View Service
              </Button>
              <Button
                color="success"
                size="sm"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-gavel" />
                Make Bid
              </Button>
            </CardFooter>
          </Card>
        </GridItem> */}
      </Slider>
      {/* </Slider> */}
      <Preloader state={loading} />
    </div>
    //  </div>
  );
}
