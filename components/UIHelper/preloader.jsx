import React from "react";
import Backdrop from "@mui/material/Backdrop";
import PropTypes from "prop-types";

import { DotLoader } from "react-spinners";

export const Preloader = (props) => {
  return (
    <Backdrop sx={{ color: "#fff" }} open={props.state}>
      <DotLoader color="#36D7B7" loading={props.state} size={75} />
    </Backdrop>
  );
};
Preloader.propTypes = {
  state: PropTypes.bool,
};
