import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
//import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import Slider from "react-slick";
//import Parallax from "components/Parallax/Parallax.js";

// @material-ui/icons
// import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
// import { People } from "@material-ui/icons";

// core components
//import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
//import CardFooter from "components/Card/CardFooter.js";
// import Paginations from "components/Pagination/Pagination.js";
import { Link } from "react-router-dom";
// import gig1 from "assets/img/gigs/gig1.jpg";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
import GridContainer from "components/Grid/GridContainer";
import { Preloader } from "components/UIHelper/preloader.jsx";

//import team1 from "assets/img/faces/avatar.jpg";
// import team2 from "assets/img/faces/christian.jpg";
// import team3 from "assets/img/faces/face1.jpg";
// import team4 from "assets/img/faces/face2.jpg";
// import team5 from "assets/img/faces/face3.jpg";
// import team6 from "assets/img/faces/face4.jpg";
// import team7 from "assets/img/faces/face5.jpg";
//import team3 from "assets/img/faces/kendall.jpg";
//import { cardTitle } from "assets/jss/material-kit-react";

const useStyles = makeStyles(styles);

export default function ServicesView(props) {
  const [loading, setLoading] = useState(true);

  const { ...rest } = props;
  console.log(rest);

  const category = rest.category;
  console.log(category);
  const classes = useStyles();
  const [gig, setGigData] = useState({
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

  // const DeleteGig = async (id) => {
  //   console.log("Check");
  //   try {
  //     const res = await fetch(`/gig/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     // history.push("/gigs-page");
  //     window.location.reload();

  //     // const data = await res.json();
  //     // console.log(data);
  //     // setUserData(data);
  //     // gigid = {
  //     //   pathname: "/gig",
  //     //   // param1: gig._id,
  //     // };
  //     // history.push("/gigs-page");

  //     if (!res.status === 200) {
  //       const error = new Error(res.error);
  //       throw error;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  //   const settings = {
  //     dots: true,
  //     color: "black",
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 3,
  //     slidesToScroll: 1,
  //     autoplay: false,
  //   };
  const callAboutPage = async () => {
    console.log("Check");
    try {
      const res = await fetch(`/gig/category-wise/${category}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data);
      setGigData(data);
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

  const imageClasses = classNames(classes.imgCard);
  useEffect(() => {
    callAboutPage();
  }, []);
  //const cardClasses = classNames(classes.cardTitle, classes.cardMargin);
  return (
    <div className={classes.section}>
      {/* </Slider> */}
      <h2 className={classes.title}>Choose from services of your choice</h2>
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
                You can write here details about one of your team members. You
                can give more details about what they do. Feel free to add some{" "}
                <a href="#pablo">links</a> for people to be able to follow them
                outside the site.
              </p>
            </div>
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
      <div>
        <GridItem xs={12} sm={12}>
          <Card carousel>
            <h4 className={classes.infoCardHeader}>
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
      </div>
      <div>
        <GridItem xs={12} sm={12}>
          <Card carousel>
            <h4 className={classes.infoCardHeader}>
              Arooj Sikandar
              <br />
              <small className={classes.smallTitle}>Model</small>
            </h4>
            <CardBody className={classes.cardBackground}>
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
      </div>
      <div>
        <GridItem xs={12} sm={12}>
          <Card carousel>
            <h4 className={classes.infoCardHeader}>
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
      </div> */}
      <div className={classes.section}>
        <GridContainer>
          {gig.gigs.map((gigs, index) => {
            return (
              <GridItem xs={12} sm={12} md={3} key={index}>
                <Card className={classes.card}>
                  <Link to={"/gig/" + gigs._id}>
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
                  </Link>
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
          })}
          {/* <GridItem xs={12} sm={12} md={3}>
          <Card carousel>
            <Link to="gig">
              <img src={team2} alt="..." className={imageClasses} />
              <CardBody>
                <h4 className={classes.cardTitle}>M.Wadood</h4>
                <p className={classes.description}>I can do plumbing well!</p>
              </CardBody>
            </Link>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <Card carousel>
            <Link to="gig">
              <img src={team3} alt="..." className={imageClasses} />
              <CardBody>
                <h4 className={classes.cardTitle}>M.Wadood</h4>
                <p className={classes.description}>I can do plumbing well!</p>
              </CardBody>
            </Link>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <Card carousel>
            <Link to="gig">
              <img src={team4} alt="..." className={imageClasses} />
              <CardBody>
                <h4 className={classes.cardTitle}>M.Wadood</h4>
                <p className={classes.description}>I can do plumbing well!</p>
              </CardBody>
            </Link>
            {/* <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
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
            <CardFooter className={classes.justifyCenter}></CardFooter> */}
          {/* </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <Card carousel>
            <Link to="gig">
              <img src={team5} alt="..." className={imageClasses} />
              <CardBody>
                <h4 className={classes.cardTitle}>M.Wadood</h4>
                <p className={classes.description}>I can do plumbing well!</p>
              </CardBody>
            </Link>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <Card carousel>
            <Link to="gig">
              <img src={team6} alt="..." className={imageClasses} />
              <CardBody>
                <h4 className={classes.cardTitle}>M.Wadood</h4>
                <p className={classes.description}>I can do plumbing well!</p>
              </CardBody>
            </Link>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <Card carousel>
            <Link to="gig">
              <img src={team7} alt="..." className={imageClasses} />
              <CardBody>
                <h4 className={classes.cardTitle}>M.Wadood</h4>
                <p className={classes.description}>I can do plumbing well!</p>
              </CardBody>
            </Link>
          </Card>
        </GridItem> */}
        </GridContainer>
      </div>
      {/* <Paginations
        pages={[
          { text: "PREV" },
          { text: 1 },
          { text: 2 },
          { active: true, text: 3 },
          { text: 4 },
          { text: 5 },
          { text: "NEXT" },
        ]}
        color="info"
      ></Paginations> */}
      {/* </Slider> */}
      <Preloader state={loading} />
    </div>
  );
}
