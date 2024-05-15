import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import Icon from "@material-ui/core/Icon";
// @material-ui/icons
// import Email from "@material-ui/icons/Email";
// import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// import { Preloader } from "components/UIHelper/preloader.jsx";

// import axios from "axios";
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
import LocationCity from "@material-ui/icons/LocationCity";
import Language from "@material-ui/icons/Language";
import Edit from "@material-ui/icons/Edit";
import Budget from "@material-ui/icons/Money";
//import Photo from "@material-ui/icons/Photo";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useMoralis } from "react-moralis";
import { useHistory } from "react-router-dom"; // version 5.2.0

// import Paper from "@mui/material/Paper";

import styles from "assets/jss/material-kit-react/views/workerpage.js";
import { ethers } from "ethers";
import { abi, bytecode } from "views/Contract/Contract.js";

// import image from "assets/img/bg7.jpg";
// import helper from "assets/img/services/helper.jpg";
var contract = 0;
var provider = 0;
var signer = 0;
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
    value: "Helper",
  },
  {
    value: "Carpenter",
  },
  {
    value: "Painter",
  },
  {
    value: "Others",
  },
];

export default function WorkerPage(props) {
  // const [loading, setLoading] = useState(false);
  const { Moralis, isAuthenticated, user } = useMoralis();
  var id;
  if (isAuthenticated) {
    id = user.id;
  }
  // const [job, setJobData] = useState({
  //   title: "",
  //   budget: "",
  //   city: "",
  //   address: "",
  //   description: "",
  //   category: "",
  //   clientId: "",
  // });
  const contractDeploy = async () => {
    // console.log(bytecode);
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    const factory = new ethers.ContractFactory(abi, bytecode, signer);
    contract = await factory.deploy();
    console.log(contract.deployTransaction.hash);
    await contract.deployed();
    return contract.address;
  };
  const initialValues = {
    title: "",
    budget: "",
    city: "",
    address: "",
    category: "",
    description: "",
    clientId: "",
    picture: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const history = useHistory();

  const postData = async () => {
    console.log("Inside post data");

    const ContractAddress = await contractDeploy();
    // e.preventDefault();
    // console.log(e.target.value);
    // console.log("Job is to be posted");

    const clientId = id;
    const { title, budget, city, address, description, category } = formValues;
    const res = await fetch("/job/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        budget,
        city,
        address,
        description,
        category,
        clientId,
      }),
    });

    const data = await res.json();

    if (data.status === 42 || !data) {
      window.alert("Invalid registeration");
      console.log("Invalid registeration");
    } else {
      // console.log(data);
      // history.push("/landing-page");
    }
    // }
    // const formdata = new FormData();

    // console.log("data added");
    // formdata.append("picture", formValues.picture, formValues.picture.name);
    // formdata.append("title", formValues.title);
    // formdata.append("budget", formValues.budget);
    // formdata.append("category", formValues.category);
    // formdata.append("city", formValues.city);
    // formdata.append("address", formValues.address);
    // formdata.append("description", formValues.description);
    // formdata.append("clientId", id);
    // var res = " ";
    // try {
    // console.log("inside try block");

    // const res = await axios
    //   .post("/job/create", formdata)
    //   .then(function (response) {
    //     console.log(response.data);
    //   });
    // console.log(res);
    // if (res.status === 42) {
    //   window.alert("Invalid registeration");
    //   console.log("Invalid registeration");
    // } else {
    //   console.log(res);
    // }
    // console.log("inside try block");
    // } catch (e) {
    //   window.alert("catch block ");
    // }
    console.log("About to create contract");
    // const data = await res.json();
    console.log("customjobid:", data.job._id);
    const jobOfferId = data.job._id;
    const res1 = await fetch("/contract/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ContractAddress,
        jobOfferId,
      }),
    });

    const data1 = await res1.json();

    if (data1.status === 42 || !data1) {
      window.alert("Invalid registeration");
      console.log("Invalid registeration");
    } else {
      // console.log(data);
      // history.push("/landing-page");
    }
    console.log(history, id_of);

    history.push("/customjobs-page/" + id_of.id);
  };
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
    // setLoading(true);
    postData();
    // postData();
  }
  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z ]*$/;

    ////////////////////////////////////////////////////
    if (!values.title) {
      errors.title = "Title is required!";
    } else if (values.title.length < 15) {
      errors.title = "Title cannot be less than 15 characters";
    }
    if (!values.budget) {
      errors.budget = "Budget is required!";
    } else if (isNaN(values.budget)) {
      errors.budget = "Please enter numeric value!";
    }
    if (!values.city) {
      errors.city = "City is required";
    } else if (!regex.test(values.city)) {
      errors.city = "Invalid city";
    }

    if (!values.address) {
      errors.address = "Address is required";
    }

    if (!values.description) {
      errors.description = "Description is required";
    } else if (values.description.length > 150) {
      errors.description = "Description cannot exceed more than 150 characters";
    } else if (values.description.length < 30) {
      errors.description = "Description cannot be less than 30 characters";
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
  // const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);

  // const validate = (values) => {
  //   const errors = {};
  //   //const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  //   if (!values.title) {
  //     errors.title = "Title is required!";
  //   } else if (values.title.length > 70) {
  //     errors.title = "Title cannot exceed more than 70 characters";
  //   }
  //   if (!values.budget) {
  //     errors.budget = "Budget is required!";
  //   }
  //   //  else if (!isNaN(values.budget)) {
  //   //   errors.budget = "Please enter numeric value!";
  //   // }
  //   // else if (!regex.test(values.email)) {
  //   //   errors.email = "This is not a valid email format!";
  //   // }
  //   if (!values.city) {
  //     errors.city = "City is required";
  //   }
  //   // else if (values.city != Text) {
  //   //   errors.city = "Invalid city";
  //   // }
  //   if (!values.address) {
  //     errors.address = "Address is required";
  //   }
  //   // else if (values.password.length < 4) {
  //   //   errors.password = "Password must be more than 4 characters";
  //   // }

  //   if (!values.description) {
  //     errors.description = "Description is required";
  //   } else if (values.description.length > 150) {
  //     errors.description = "Description cannot exceed more than 150 characters";
  //   }

  //   if (!currency) {
  //     errors.category = "category is required";
  //   }

  //   return errors;
  // };

  // let name, value;
  // const handleInputs = (e) => {
  //   name = e.target.name;
  //   value = e.target.value;
  //   console.log(e);
  //   setJobData({ ...job, [name]: value });
  // };

  // const [category, setCategory] = React.useState("None");
  // let name, value;
  // const handleCategory = (event) => {
  //   setCategory(event.target.value);
  // };
  // const handleInputs = (e) => {
  //   name = e.target.name;
  //   value = e.target.value;
  //   console.log(e);
  //   setJobData({ ...job, [name]: value });
  // };
  const imageUpload = (e) => {
    //console.log(e.target.files[0]);
    setFormValues({ ...formValues, picture: e.target.files[0] });
  };

  // const postData = async (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  //   console.log(e.target.value);

  //   const formdata = new FormData();

  //   console.log("data added");
  //   formdata.append("picture", job.picture, job.picture.name);
  //   formdata.append("title", job.title);
  //   formdata.append("budget", job.budget);
  //   formdata.append("category", job.category);
  //   formdata.append("city", job.city);
  //   formdata.append("address", job.address);
  //   formdata.append("description", job.description);
  //   formdata.append("clientId", id);

  //   try {
  //     const res = await axios.post("/job/create", formdata);
  //     if (res.status === 42) {
  //       window.alert("Invalid registeration");
  //       console.log("Invalid registeration");
  //     } else {
  //       console.log(res);
  //     }
  //   } catch (e) {
  //     window.alert("catch block ");
  //   }
  // };

  //   const clientId = id;
  //   const { title, budget, city, address, description, category } = job;
  //   const res = await fetch("/job/create", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       title,
  //       budget,
  //       city,
  //       address,
  //       description,
  //       category,
  //       clientId,
  //     }),
  //   });

  //   const data = await res.json();

  //   if (data.status === 42 || !data) {
  //     window.alert("Invalid registeration");
  //     console.log("Invalid registeration");
  //   } else {
  //     // console.log(data);
  //     // history.push("/landing-page");
  //   }
  //   // }
  // };
  // const [currency, setCurrency] = React.useState("None");

  // const handleChange = (event) => {
  //   setCurrency(event.target.value);
  //   name = event.target.name;
  //   value = event.target.value;
  //   // console.log(e);
  //   setFormValues({ ...formValues, [name]: value });
  //   // setJobData({ ...job, [name]: value });
  // };
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
        rightLinks={<HeaderLinks />}
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
                    <h4> Post a new job today !</h4>
                  </CardHeader>
                  <p className={classes.divider}></p>
                  <GridContainer>
                    <GridItem xs={6} sm={6} md={12}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        value={formValues.title}
                        onChange={handleChange}
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
                      <p className={classes.warningPara}>{formErrors.title}</p>

                      {/* <span style={{ color: "red" }}>{formErrors.title}</span> */}
                    </GridItem>

                    <GridItem xs={6} sm={6} md={6}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="budget"
                        label="Budget"
                        name="budget"
                        value={formValues.budget}
                        onChange={handleChange}
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
                        margin="normal"
                        required
                        fullWidth
                        id="city"
                        label="City"
                        name="city"
                        value={formValues.city}
                        onChange={handleChange}
                        InputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <LocationCity
                                className={classes.inputIconsColor}
                              />
                            </InputAdornment>
                          ),
                        }}
                        variant="standard"
                      />
                      <p className={classes.warningPara}>{formErrors.city}</p>

                      {/* <span style={{ color: "red" }}>{formErrors.city}</span> */}
                    </GridItem>

                    <GridItem xs={6} sm={6} md={12}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="address"
                        label="Address"
                        name="address"
                        value={formValues.address}
                        onChange={handleChange}
                        InputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Language className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                        variant="standard"
                      />
                      <p className={classes.warningPara}>
                        {formErrors.address}
                      </p>

                      {/* <span style={{ color: "red" }}>{formErrors.address}</span> */}
                    </GridItem>

                    <GridItem xs={6} sm={6} md={12}>
                      <TextField
                        required
                        fullWidth
                        id="outlined-select-currency"
                        select
                        margin="normal"
                        label=" "
                        name="category"
                        value={formValues.category}
                        helperText="Category"
                        onChange={handleChange}
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
                      {/* <span style={{ color: "red" }}> */}
                      {/* {formErrors.category} */}
                      {/* </span> */}
                      <p className={classes.warningPara}>
                        {formErrors.category}
                      </p>
                    </GridItem>

                    <GridItem>
                      <TextField
                        margin="normal"
                        fullWidth
                        required
                        multiline
                        rows={8}
                        textarea
                        id="description"
                        label="Job Description"
                        name="description"
                        value={formValues.description}
                        onChange={handleChange}
                      />
                      {/* <span style={{ color: "red" }}>
                        {formErrors.description}
                      </span> */}
                      <p className={classes.warningPara}>
                        {formErrors.description}
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
                    </GridItem>
                    <p className={classes.warningPara}>{formErrors.picture}</p>
                    <GridItem>
                      {/* {console.log(Object.keys(formErrors).length)} */}

                      <Button
                        color="black"
                        // href="/customjobs-page"
                        onClick={handleSubmit}
                      >
                        Post job
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
      {/* <Preloader state={loading} /> */}
    </div>
  );
}
