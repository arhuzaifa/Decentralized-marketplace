import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

//import List from "@mui/material/List";
//import ListItem from "@mui/material/ListItem";
//import ListItemText from "@mui/material/ListItemText";

// @material-ui/icons
//import Face from "@material-ui/icons/Face";
//import Chat from "@material-ui/icons/Chat";
//import Build from "@material-ui/icons/Build";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
//import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/FileDownloadDone";
//import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/ArrowRightAlt";
//import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/East";

import styles from "assets/jss/material-kit-react/views/componentsSections/tabsStyle.js";
import CardHeader from "components/Card/CardHeader";
//import GuideView2 from "views/GuidePage/Sections/GuideView2.js";

const useStyles = makeStyles(styles);

export default function GuideView() {
  const [dense] = React.useState(false);
  const [secondary] = React.useState(false);
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div id="nav-tabs">
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CustomTabs
              plainTabs
              centered
              headerColor="green"
              tabs={[
                {
                  tabName: "Sign-Up",
                  tabContent: (
                    <GridContainer className={classes.container}>
                      <GridItem xs={12} sm={12} md={8}>
                        <Card className={classes.card}>
                          <CardHeader>
                            <h2>Sign-Up</h2>
                          </CardHeader>
                          <CardBody>
                            <List dense={dense}>
                              <ListItem>
                                <ListItemIcon>
                                  <CheckCircleOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Sign up to the website by providing your email and password."
                                  secondary={
                                    secondary ? "Secondary text" : null
                                  }
                                />
                              </ListItem>
                              <ListItem>
                                <ListItemIcon>
                                  <CheckCircleOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Verify your details and explore our services."
                                  secondary={
                                    secondary ? "Secondary text" : null
                                  }
                                />
                              </ListItem>
                            </List>
                          </CardBody>
                        </Card>
                      </GridItem>
                    </GridContainer>
                  ),
                },
                {
                  tabName: "Find Worker",
                  tabContent: (
                    <GridContainer className={classes.container}>
                      <GridItem xs={12} sm={12} md={8}>
                        <Card className={classes.card}>
                          <CardHeader>
                            <h2>Find Worker</h2>
                          </CardHeader>
                          <CardBody>
                            <List dense={dense}>
                              <ListItem>
                                <ListItemIcon>
                                  <CheckCircleOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Use filters to search any services."
                                  secondary={
                                    secondary ? "Secondary text" : null
                                  }
                                />
                              </ListItem>
                              <ListItem>
                                <ListItemIcon>
                                  <CheckCircleOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Explore the profiles of workers and find your desired worker."
                                  secondary={
                                    secondary ? "Secondary text" : null
                                  }
                                />
                              </ListItem>
                              <ListItem>
                                <ListItemIcon>
                                  <CheckCircleOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Post your custom jobs by providing required details about your task and let the workers contact you."
                                  secondary={
                                    secondary ? "Secondary text" : null
                                  }
                                />
                              </ListItem>
                              <ListItem>
                                <ListItemIcon>
                                  <CheckCircleOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Let the workers bid for your jobs."
                                  secondary={
                                    secondary ? "Secondary text" : null
                                  }
                                />
                              </ListItem>
                            </List>
                          </CardBody>
                        </Card>
                      </GridItem>
                    </GridContainer>
                  ),
                },
                {
                  tabName: "Hire Worker",
                  tabContent: (
                    <GridContainer className={classes.container}>
                      <GridItem xs={12} sm={12} md={8}>
                        <Card className={classes.card}>
                          <CardHeader>
                            <h2>Hire Worker</h2>
                          </CardHeader>
                          <CardBody>
                            <List dense={dense}>
                              <ListItem>
                                <ListItemIcon>
                                  <CheckCircleOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Compare the bids and select the most suitable worker."
                                  secondary={
                                    secondary ? "Secondary text" : null
                                  }
                                />
                              </ListItem>
                              <ListItem>
                                <ListItemIcon>
                                  <CheckCircleOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary=" Check out worker's profile. Compare reviews/ratings and decide."
                                  secondary={
                                    secondary ? "Secondary text" : null
                                  }
                                />
                              </ListItem>
                              <ListItem>
                                <ListItemIcon>
                                  <CheckCircleOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Contact the worker and finalize the job."
                                  secondary={
                                    secondary ? "Secondary text" : null
                                  }
                                />
                              </ListItem>
                              <ListItem>
                                <ListItemIcon>
                                  <CheckCircleOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Hire the worker and get your task done. "
                                  secondary={
                                    secondary ? "Secondary text" : null
                                  }
                                />
                              </ListItem>
                            </List>
                          </CardBody>
                        </Card>
                      </GridItem>
                    </GridContainer>
                  ),
                },

                {
                  tabName: "Make Payment ",
                  tabContent: (
                    <GridContainer className={classes.container}>
                      <GridItem xs={12} sm={12} md={8}>
                        <Card className={classes.card}>
                          <CardHeader>
                            <h2>Make Payment</h2>
                          </CardHeader>
                          <CardBody>
                            <List dense={dense}>
                              <ListItem>
                                <ListItemIcon>
                                  <CheckCircleOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Once your task is complete, pay the custmer using cryptocurrency."
                                  secondary={
                                    secondary ? "Secondary text" : null
                                  }
                                />
                              </ListItem>

                              <ListItem>
                                <ListItemIcon>
                                  <CheckCircleOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Contact the worker and finalize the job."
                                  secondary={
                                    secondary ? "Secondary text" : null
                                  }
                                />
                              </ListItem>
                              <ListItem>
                                <ListItemIcon>
                                  <CheckCircleOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Verify your payment and you're done!  "
                                  secondary={
                                    secondary ? "Secondary text" : null
                                  }
                                />
                              </ListItem>
                            </List>
                          </CardBody>
                        </Card>
                      </GridItem>
                    </GridContainer>
                  ),
                },
              ]}
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
