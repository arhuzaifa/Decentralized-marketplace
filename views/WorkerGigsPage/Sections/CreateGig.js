import React, { useState } from "react";

import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import Icon from "@material-ui/core/Icon";
// @material-ui/icons
// import Email from "@material-ui/icons/Email";
// import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import WorkerHeaderLinks from "components/Header/WorkerHeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
//import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
//import CardFooter from "components/Card/CardFooter.js";
//import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
//import Chip from "@mui/material/Chip";
//import Autocomplete from "@mui/material/Autocomplete";
//import Stack from "@mui/material/Stack";
//import Icon from "@material-ui/core/Icon";
//import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";

import Edit from "@material-ui/icons/Edit";
import Budget from "@material-ui/icons/Money";
//import Photo from "@material-ui/icons/Photo";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useMoralis } from "react-moralis";
import { useHistory } from "react-router-dom"; // version 5.2.0

// import Paper from "@mui/material/Paper";

import styles from "assets/jss/material-kit-react/views/workerpage.js";

// import image from "assets/img/bg7.jpg";
// import helper from "assets/img/services/helper.jpg";

const useStyles = makeStyles(styles);

const currencies = [
  {
    value: "Plumber",
  },
  {
    value: "Electrician",
  },
  {
    value: "Chef",
  },
  {
    value: "Gardener",
  },
  {
    value: "Others",
  },
];

export default function CreateWorkerGig(props) {
  //getting variables from form
  const { isAuthenticated, user, Moralis } = useMoralis();
  var id;
  if (isAuthenticated) {
    id = user.id;
  }
  const history = useHistory();
  //   const [gig, setGig] = useState({
  //     gigTitle: "",
  //     budget: "",
  //     category: "",
  //     gigdescription: "",
  //     picture: "",
  //   });

  const initialValues = {
    gigTitle: "",
    budget: "",
    category: "",
    gigDescription: "",
    picture: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);

  // const validate = (values) => {
  //   const errors = {};
  //   //const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  //   if (!values.gigTitle) {
  //     errors.gigTitle = "Title is required!";
  //   } else if (values.gigTitle.length > 40) {
  //     errors.gigTitle = "Title cannot exceed more than 40 characters";
  //   }
  //   if (!values.budget) {
  //     errors.budget = "Budget is required!";
  //   }

  //   if (!values.gigdescription) {
  //     errors.gigdescription = "Description is required";
  //   } else if (values.gigdescription.length > 150) {
  //     errors.gigdescription =
  //       "Description cannot exceed more than 150 characters";
  //   }
  //   if (!values.picture) {
  //     errors.picture = "Picture is required";
  //   }
  //   return errors;
  // };

  //   let name, value;
  //   const handleInputs = (e) => {
  //     name = e.target.name;
  //     value = e.target.value;
  //     console.log(e);
  //     setGig({ ...gig, [name]: value });
  //   };

  const imageUpload = (e) => {
    //console.log(e.target.files[0]);
    setFormValues({ ...formValues, picture: e.target.files[0] });
    // setGig({ ...gig, picture: e.target.files[0] });
  };

  const postData = async () => {
    // e.preventDefault();
    // setFormErrors(validate(gig));
    // setIsSubmit(true);

    // if (Object.keys(formErrors).length === 0 && isSubmit) {
    //const { gigTitle, budget, category, gigDescription } = gig;

    // console.log(e.target.value);
    // console.log("form valid");
    const formdata = new FormData();

    //console.log("==", gig.picture, "===", gig.picture.name);
    console.log("data added");
    formdata.append("picture", formValues.picture, formValues.picture.name);
    formdata.append("gigTitle", formValues.gigTitle);
    formdata.append("budget", formValues.budget);
    formdata.append("category", formValues.category);
    formdata.append("gigdescription", formValues.gigDescription);
    formdata.append("workerId", id);
    console.log(id);
    //let url = "/gig/create";
    try {
      const res = await axios.post("/gig/create", formdata);
      // {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     gigTitle,
      //     budget,
      //     category,
      //     gigDescription,
      //   }),
      // });

      // const data = await res.json();

      // if (data.status === 42 || !data) {
      //   window.alert("Invalid registeration");
      //   console.log("Invalid registeration");
      // } else {
      //   console.log(data);
      //   history.push("/gigs-page");
      // }

      if (res.status === 42) {
        window.alert("Invalid registeration");
        console.log("Invalid registeration");
      } else {
        console.log(res);
      }
      //   history.push("/gigs-page");
    } catch (e) {
      window.alert("catch block ");
    }
  };
  //
  let id_of;
  if (isAuthenticated) {
    id_of = Moralis.User.current();
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log(Object.keys(formErrors).length);
    console.log(isSubmit);
    // if (Object.keys(formErrors).length === 0 && isSubmit) {
    //   postData();
    //   history.push("/customjobs-page/" + id_of.id);
    // }
  };
  function checkData() {
    console.log("inside Check data");
    console.log(Object.keys(formErrors).length);
    console.log(isSubmit);
    postData();
    history.push("/workerGigs-page/" + id_of.id);
    // postData();
  }
  const validate = (values) => {
    const errors = {};
    // const regex = /^[a-zA-Z ]*$/;

    ////////////////////////////////////////////////////
    if (!values.gigTitle) {
      errors.gigTitle = "Title is required!";
    } else if (values.gigTitle.length < 20) {
      errors.gigTitle = "Title cannot be less than 20 characters";
    }
    if (!values.budget) {
      errors.budget = "Budget is required!";
    } else if (isNaN(values.budget)) {
      errors.budget = "Please enter numeric value!";
    }
    // if (!values.city) {
    //   errors.city = "City is required";
    // } else if (!regex.test(values.city)) {
    //   errors.city = "Invalid city";
    // }

    // if (!values.address) {
    //   errors.address = "Address is required";
    // }

    if (!values.gigDescription) {
      errors.gigDescription = "Description is required";
    } else if (values.gigDescription.length > 150) {
      errors.gigDescription =
        "Description cannot exceed more than 150 characters";
    } else if (values.gigDescription.length < 30) {
      errors.gigDescription = "Description cannot be less than 30 characters";
    }

    if (!values.category) {
      errors.category = "Category is required";
    }

    if (!values.picture) {
      errors.picture = "Picture is required";
    }
    /////////////////////////////////////
    return errors;
  };
  // const [currency, setCurrency] = React.useState("None");

  // const handleChange = (event) => {
  //   setCurrency(event.target.value);
  // };
  //   const [category, setCategory] = React.useState("None");
  //   let name, value;
  //   const handleCategory = (event) => {
  //     setCategory(event.target.value);
  //     name = event.target.name;
  //     value = event.target.value;
  //     // console.log(e);
  //     setFormValues({ ...formValues, [name]: value });
  //     // setJobData({ ...job, [name]: value });
  //   };
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  // const styles = {
  //   paperContainer: {
  //     //   backgroundImage: `url(${image})`,
  //     backgroundColor: "#F6FFF7",
  //     paddingTop: "50px",
  //     paddingBottom: "50px",
  //     paddingLeft: "20px",
  //   },
  // };
  return (
    <div>
      <Header
        absolute
        color="black"
        brand="MARKAZ"
        rightLinks={<WorkerHeaderLinks />}
        {...rest}
      />
      <div className={classes.pageHeader}>
        <div className={classes.container}>
          {/* <Paper elevation={3} style={styles.paperContainer}> */}
          <GridContainer xs={12} sm={12} md={12}>
            <GridItem xs={12} sm={12} md={7}>
              <Card className={(classes[cardAnimaton], classes.card2)}>
                <form className={classes.form}>
                  <CardHeader color="green" className={classes.cardHeader}>
                    <h4>Create a new gig today !</h4>
                  </CardHeader>
                  <p className={classes.divider}></p>
                  <GridContainer>
                    <GridItem xs={6} sm={6} md={12}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="gigTitle"
                        value={formValues.gigTitle}
                        onChange={handleChange}
                        id="title"
                        label="Gig Title"
                        InputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                        variant="standard"
                      />
                      <p className={classes.warningPara}>
                        {formErrors.gigTitle}
                      </p>

                      {/* <span style={{ color: "red" }}>
                        {formErrors.gigTitle}
                      </span> */}
                    </GridItem>

                    <GridItem xs={6} sm={6} md={6}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="budget"
                        value={formValues.budget}
                        onChange={handleChange}
                        id="budget"
                        label="Budget"
                        InputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Budget className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                        variant="standard"
                      />
                      <p className={classes.warningPara}>{formErrors.budget}</p>

                      {/* <span style={{ color: "red" }}>{formErrors.budget}</span> */}
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6}>
                      <TextField
                        required
                        fullWidth
                        id="outlined-select-currency"
                        select
                        margin="normal"
                        label=" "
                        name="category"
                        value={formValues.category}
                        onChange={handleChange}
                        helperText="Category"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <Edit className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                        variant="standard"
                      >
                        {currencies.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.value}
                          </MenuItem>
                        ))}
                      </TextField>
                      <p className={classes.warningPara}>
                        {formErrors.category}
                      </p>
                    </GridItem>
                    <GridItem>
                      <TextField
                        margin="normal"
                        fullWidth
                        name="gigDescription"
                        value={formValues.gigDescription}
                        onChange={handleChange}
                        required
                        multiline
                        rows={8}
                        textarea
                        id="desc"
                        label="Gig Description"
                      />
                      {/* <span style={{ color: "red" }}>
                        {formErrors.gigdescription}
                      </span> */}
                      <p className={classes.warningPara}>
                        {formErrors.gigDescription}
                      </p>
                    </GridItem>

                    <GridItem>
                      <Button
                        variant="contained"
                        component="label"
                        name="picture"
                        color="green"
                        margin="normal"
                        //fullWidth
                        value={formValues.picture}
                        onChange={imageUpload}
                      >
                        Upload Picture
                        <input type="file" hidden />
                      </Button>
                      <p className={classes.warningPara}>
                        {formErrors.picture}
                      </p>

                      {/* <span style={{ color: "red" }}>{formErrors.picture}</span> */}
                    </GridItem>

                    <GridItem>
                      <Button
                        color="black"
                        //href="/gigs-page"
                        onClick={handleSubmit}
                      >
                        Create Gig
                      </Button>
                      {Object.keys(formErrors).length === 0 && isSubmit
                        ? // <div className="ui message success">Signed in successfully</div>
                          checkData()
                        : console.log("Error in form!")}
                    </GridItem>
                  </GridContainer>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
          {/* </Paper> */}
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
