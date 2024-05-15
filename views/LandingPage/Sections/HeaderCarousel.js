import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
//import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
//import LocationOn from "@material-ui/icons/LocationOn";
// core components
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";
// import Card from "components/Card/Card.js";

import image1 from "assets/img/TopCarousel/car1.jpg";
import image2 from "assets/img/TopCarousel/car2.jpg";
// import image3 from "assets/img/TopCarousel/car3.jpg";

//import image2 from "assets/img/bg2.jpg";
//import image3 from "assets/img/bg3.jpg";

// import Button from "components/CustomButtons/Button.js";
// import Search from "@material-ui/icons/Search";
// import CustomInput from "components/CustomInput/CustomInput.js";

//import styles from "assets/jss/material-kit-react/views/componentsSections/carouselStyle.js";
//import { createFalse } from "typescript";

//const useStyles = makeStyles(styles);

export default function HeaderCarousel() {
  //const classes = useStyles();
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  return (
    <div>
      <div>
        <Carousel {...settings}>
          <div>
            <img src={image1} alt="First slide" className="slick-image" />
          </div>
          <div>
            <img src={image2} alt="First slide" className="slick-image" />
          </div>
          {/* <div>
            <img src={image3} alt="First slide" className="slick-image" />
          </div> */}
        </Carousel>
      </div>
      {/* <div>
        <h1 className={classes.title}>Your tasking Partner</h1>
        <h4>
          Making your daily live{"'"}s tasks easier by providing assistance all
          that you need. This change is committed.
        </h4>

        <CustomInput
          white
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search",
              className: classes.searchInput,
            },
          }}
        />
        <Button justIcon round color="white" className={classes.searchBtn}>
          <Search className={classes.searchIcon} />
        </Button>

        <Button
          color="danger"
          size="lg"
          href="/signup-page"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-check" />
          Get Started
        </Button>
      </div> */}
    </div>
  );
}
