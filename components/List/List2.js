import * as React from "react";
//import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
//import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
//import Avatar from "@mui/material/Avatar";
//import IconButton from "@mui/material/IconButton";
//import FormGroup from "@mui/material/FormGroup";
//import FormControlLabel from "@mui/material/FormControlLabel";
//import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
//import Typography from "@mui/material/Typography";
//import Check from "@mui/icons-material/CheckBox";
//import CheckCircle from "@mui/icons-material/CheckCircle";
import DownloadDoneIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

//import DeleteIcon from "@mui/icons-material/Delete";
//import { makeStyles } from "@material-ui/core/styles";
//import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
//const useStyles = makeStyles(styles);

export default function InteractiveList() {
  const [dense] = React.useState(false);
  const [secondary] = React.useState(false);
  //const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid item xs={12} md={9}>
        <List dense={dense}>
          <ListItem>
            <ListItemIcon>
              <DownloadDoneIcon />
            </ListItemIcon>
            <ListItemText
              primary="Explore and hire the perfect worker for your task."
              secondary={secondary ? "Secondary text" : null}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <DownloadDoneIcon />
            </ListItemIcon>
            <ListItemText
              primary="Use crypto tokens to avail our services."
              secondary={secondary ? "Secondary text" : null}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <DownloadDoneIcon />
            </ListItemIcon>
            <ListItemText
              primary="Create custom job posts and connect to your desired worker."
              secondary={secondary ? "Secondary text" : null}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <DownloadDoneIcon />
            </ListItemIcon>
            <ListItemText
              primary="Get 24/7 support and guidlines to have a better experience."
              secondary={secondary ? "Secondary text" : null}
            />
          </ListItem>
        </List>
      </Grid>
    </Box>
  );
}
