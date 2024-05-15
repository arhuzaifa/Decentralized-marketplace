import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
//import Camera from "@material-ui/icons/Camera";
//import Palette from "@material-ui/icons/Palette";
//import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
//import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
// import Table3 from "components/Table/Table3.js";
import Table4 from "components/Table/Table4.js";
//import Table2 from "components/Table2/Table2.js";
import Parallax from "components/Parallax/Parallax.js";

import profile from "assets/img/faces/ClientPicture.jpg";

import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
//import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";

// import studio1 from "assets/img/examples/studio-1.jpg";
// import studio2 from "assets/img/examples/studio-2.jpg";
// import studio3 from "assets/img/examples/studio-3.jpg";
// import studio4 from "assets/img/examples/studio-4.jpg";
// import studio5 from "assets/img/examples/studio-5.jpg";
// import work1 from "assets/img/examples/olu-eletu.jpg";
// import work2 from "assets/img/examples/clem-onojeghuo.jpg";
// import work3 from "assets/img/examples/cynthia-del-rio.jpg";
// import work4 from "assets/img/examples/mariya-georgieva.jpg";
// import work5 from "assets/img/examples/clem-onojegaw.jpg";
//import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import Edit from "@material-ui/icons/Edit";
import Person from "@material-ui/icons/Person";
// import HomeOutlined from "@material-ui/icons/Home";
// import City from "@material-ui/icons/LocationCity";

// import BuildIcon from "@mui/icons-material/Build";
// import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
// import Payment from "@material-ui/icons/Payment";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
//////BCK
import { useMoralis } from "react-moralis";
import { useHistory } from "react-router-dom";

// import { useState } from "react";
import ErrorBox from "components/Errorbox/Error.js";
const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  //const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  //setTimeout(function () {
  //  setCardAnimation("");
  //}, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const clientID = rest.match.params.client_id;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const [project, setWorkerProject] = useState({
    _id: "",
    clientName: "",
    workerName: "",
    budget: "",
    status: "",
    description: "",
    workerId: "",
    clientID: "",
    job_id: "",
  });

  //const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  const { isUnauthenticated, user, userError, setUserData } = useMoralis();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();
  if (isUnauthenticated) {
    history.push("/signup-page");
  }

  const getWorkerProjects = async (client_id) => {
    try {
      // const id = await user.id;
      // console.log(user.id);

      const res = await fetch(`/projects/client/${client_id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setWorkerProject(data);

      // if (data) {
      //   // console.log("WE HEREEE");
      //   setReference("/worker-dashboard");
      //   // reference = "/worker-dashboard";
      // } else {
      //   setReference("/worker-page");
      //   // reference = "/worker-page";
      // }

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      // history.push('/login');
    }
    // return;
  };
  useEffect(() => {
    getWorkerProjects(clientID);

    if (!user) return null;
    setUsername(user.get("username"));
    setEmail(user.get("email"));
  }, [user]);
  const handleSave = () => {
    setUserData({
      username,
      email,
      password: password === "" ? undefined : password,
    });
  };
  return (
    <div>
      <Header
        color="transparent"
        brand="MARKAZ"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 100,
          color: "white",
        }}
        {...rest}
      />
      {console.log(project)}
      <Parallax className={classes.background}></Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{username}</h3>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <NavPills
                  color="green"
                  horizontal={{
                    tabsGrid: { xs: 12, sm: 2, md: 2 },
                    contentGrid: { xs: 12, sm: 10, md: 10 },
                  }}
                  tabs={[
                    {
                      tabButton: "Details",
                      tabIcon: Person,
                      tabContent: (
                        <div className={classes.profilePill}>
                          <i className="fas fa-map-marker"></i>
                          <b className={classes.desc}>User Name</b>
                          <p>{username}</p>
                          <hr className={classes.hr} />
                          <i className="fas fa-envelope"></i>
                          <b className={classes.desc}>Email</b>
                          <p>{email}</p>
                          <hr className={classes.hr} />

                          {/* <i className="fas fa-home"></i>
                          <b className={classes.desc}>Address</b>
                          <p>Street: 24, Housing Colony</p>
                          <hr className={classes.hr} />
                          <i className="fas fa-map-marker"></i>
                          <b className={classes.desc}>City</b>
                          <p>Islamabad</p>
                          <hr className={classes.hr} /> */}
                          {/*} <i className="fas fa-file-alt"></i>
                          <b className={classes.desc}>About Me</b>
                          <p>
                            I am in between work and I have numerous viable
                            skills that I believe can be utilized in the open
                            market place. I am a go getter and one who is not
                            shy to work. If you are looking for someone who
                            enjoys helping others than I am your man. I am in
                            between work and I have numerous viable skills that
                            I believe can be utilized in the open market place.
                          </p>
                      <hr className={classes.hr} />*/}
                        </div>
                      ),
                    },
                    {
                      tabButton: "Edit",
                      tabIcon: Edit,
                      tabContent: (
                        <Card className={classes.contentContainer}>
                          <form className={classes.form}>
                            <p className={classes.divider}></p>
                            <CardBody>
                              <CustomInput
                                labelText="Edit Name"
                                id="first"
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                value={username}
                                onChange={(event) =>
                                  setUsername(event.currentTarget.value)
                                }
                                inputProps={{
                                  type: "text",
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <People
                                        className={classes.inputIconsColor}
                                      />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                              <CustomInput
                                labelText="Edit Email"
                                id="email"
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                value={email}
                                onChange={(event) =>
                                  setEmail(event.currentTarget.value)
                                }
                                inputProps={{
                                  type: "email",
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Email
                                        className={classes.inputIconsColor}
                                      />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                              <CustomInput
                                labelText="Old Password"
                                id="password"
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                inputProps={{
                                  type: "password",
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Icon className={classes.inputIconsColor}>
                                        lock_outline
                                      </Icon>
                                    </InputAdornment>
                                  ),
                                  autoComplete: "off",
                                }}
                              />
                              <CustomInput
                                labelText="New Password"
                                id="password"
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                value={password}
                                onChange={(event) =>
                                  setPassword(event.currentTarget.value)
                                }
                                inputProps={{
                                  type: "password",
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Icon className={classes.inputIconsColor}>
                                        lock_outline
                                      </Icon>
                                    </InputAdornment>
                                  ),
                                  autoComplete: "on",
                                }}
                              />

                              {/* <CustomInput
                                labelText="Edit Address"
                                id="password"
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                inputProps={{
                                  type: "password",
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <HomeOutlined
                                        className={classes.inputIconsColor}
                                      />
                                    </InputAdornment>
                                  ),
                                  autoComplete: "on",
                                }}
                              />

                              <CustomInput
                                labelText="Edit City"
                                id="password"
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                inputProps={{
                                  type: "password",
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <City
                                        className={classes.inputIconsColor}
                                      />
                                    </InputAdornment>
                                  ),
                                  autoComplete: "on",
                                }}
                              /> */}
                            </CardBody>
                            {userError && (
                              <ErrorBox
                                title="User updation has Failed!"
                                message={userError.message}
                              />
                            )}
                            <CardFooter className={classes.cardFooter}>
                              <Button
                                color="black"
                                onClick={() => handleSave()}
                              >
                                Update
                              </Button>
                            </CardFooter>
                          </form>
                        </Card>
                      ),
                    },
                    // {
                    //   tabButton: "Skills",
                    //   tabIcon: BuildIcon,
                    //   tabContent: <p></p>,
                    // },

                    {
                      tabButton: "Current Projects",
                      tabIcon: Schedule,
                      tabContent: <Table4 projects={project} />,
                    },
                    // {
                    //   tabButton: "Projects History",
                    //   tabIcon: Schedule,
                    //   tabContent: <Table3 />,
                    // },

                    // {
                    //   tabButton: "About Myself",
                    //   tabIcon: EmojiPeopleIcon,
                    //   tabContent: <p></p>,
                    // },

                    // {
                    //   tabButton: "Payments",
                    //   tabIcon: Payment,
                    //   tabContent: (
                    //     <span>
                    //       <p>
                    //         Efficiently unleash cross-media information without
                    //         cross-media value. Quickly maximize timely
                    //         deliverables for real-time schemas.
                    //       </p>
                    //       <br />
                    //       <p>
                    //         Dramatically maintain clicks-and-mortar solutions
                    //         without functional solutions. Dramatically visualize
                    //         customer directed convergence without revolutionary
                    //         ROI. Collaboratively administrate empowered markets
                    //         via plug-and-play networks. Dynamically
                    //         procrastinate B2C users after installed base
                    //         benefits.
                    //       </p>
                    //     </span>
                    //   ),
                    // },
                  ]}
                />
              </GridItem>
            </GridContainer>
            {/* <div className={classes.description}>
              <p>
                An artist of considerable range, Chet Faker — the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                and records all of his own music, giving it a warm, intimate
                feel with a solid groove structure.{" "}
              </p>
            </div> */}
            {/* <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Studio",
                      tabIcon: Camera,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={studio1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio2}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={studio5}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio4}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      ),
                    },
                    {
                      tabButton: "Work",
                      tabIcon: Palette,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work2}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work3}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work4}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work5}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      ),
                    },
                    {
                      tabButton: "Favorite",
                      tabIcon: Favorite,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work4}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio3}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work2}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio1}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      ),
                    },
                  ]}
                />
              </GridItem>
            </GridContainer> */}
          </div>
        </div>
      </div>
      <Footer className={classes.profileFooter} />
    </div>
  );
}
