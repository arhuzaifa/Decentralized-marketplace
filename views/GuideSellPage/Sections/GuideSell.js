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
                  tabName: "Register as a worker",
                  tabContent: (
                    <GridContainer className={classes.container}>
                      <GridItem xs={12} sm={12} md={8}>
                        <Card className={classes.card}>
                          <CardHeader>
                            <h2>Register as a worker</h2>
                          </CardHeader>
                          <CardBody>
                            <List dense={dense}>
                              <ListItem>
                                <ListItemIcon>
                                  <CheckCircleOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Register yourself as a worker."
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
                                  primary="Provide necessary details for the clients to know such as your introduction, skills etc."
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
                                  primary="Submit the details and you are good to go!"
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
                  tabName: "Create Gigs",
                  tabContent: (
                    <GridContainer className={classes.container}>
                      <GridItem xs={12} sm={12} md={8}>
                        <Card className={classes.card}>
                          <CardHeader>
                            <h2>Create Gigs</h2>
                          </CardHeader>
                          <CardBody>
                            <List dense={dense}>
                              <ListItem>
                                <ListItemIcon>
                                  <CheckCircleOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary="From your dashboard, go to the gigs page."
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
                                  primary="Click on the create a new gig option."
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
                                  primary="Create your gigs by providing required details about your gig such as gig detail, your budget etc "
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
                                  primary="You can create more than one gigs. "
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
                                  primary="Now wait for the clients to contact you. "
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
                  tabName: "Find Jobs ",
                  tabContent: (
                    <GridContainer className={classes.container}>
                      <GridItem xs={12} sm={12} md={8}>
                        <Card className={classes.card}>
                          <CardHeader>
                            <h2>Find Jobs</h2>
                          </CardHeader>
                          <CardBody>
                            <List dense={dense}>
                              <ListItem>
                                <ListItemIcon>
                                  <CheckCircleOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary="You can find custom jobs posted by the clients on the Find Jobs page."
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
                                  primary="Checkout the jobs and bid for the one you like."
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
                                  primary="Now wait for the client to select your bid and contact you.  "
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
