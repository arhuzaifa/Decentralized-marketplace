import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import PropTypes from "prop-types";

// import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import AlertTitle from "@mui/material/AlertTitle";
export default function ErrorBox(props) {
  const [open, setOpen] = React.useState(true);
  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle>{props.title}</AlertTitle>
          {props.message}
        </Alert>
      </Collapse>
    </Box>
  );
}
ErrorBox.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};
